import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig } from "payload";
import type { CollectionConfig, GlobalConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Payload's own admin-user auth, intentionally separate from the app's Supabase users.
const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [],
};

// Upload-enabled collection backed by S3 (see s3Storage plugin below).
const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [{ name: "alt", type: "text" }],
};

// Small demo content type, separate from the app's existing `Post` model.
const Showcase: CollectionConfig = {
  slug: "showcase",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "richText" },
    { name: "coverImage", type: "relationship", relationTo: "media" },
    { name: "video", type: "relationship", relationTo: "media" },
  ],
};

// Powers the "Client Testimonials" section on the real homepage.
const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", group: "Home Page" },
  defaultSort: "order",
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "title", type: "text" },
    { name: "linkLabel", type: "text" },
    { name: "linkUrl", type: "text" },
    { name: "photo", type: "relationship", relationTo: "media" },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers show first." },
    },
  ],
};

// Powers the /projects grid and each project's /projects/[slug] case-study page.
const Projects: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "title", group: "Projects" },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    { name: "category", type: "text", required: true },
    { name: "cardDescription", type: "textarea", required: true },
    // Cloudinary URL — kept as plain text rather than a Payload Media
    // relationship since existing screenshots already live on Cloudinary,
    // not S3 (see Media collection below).
    { name: "cardImage", type: "text", required: true },
    { name: "overviewDescription", type: "richText", required: true },
    { name: "role", type: "text", required: true },
    { name: "responsibility", type: "richText", required: true },
    { name: "learnMoreLabel", type: "text", required: true },
    { name: "learnMoreHref", type: "text", required: true },
    { name: "learnMoreLinkText", type: "text" },
    {
      name: "gallery",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "imageUrl", type: "text", required: true },
        { name: "caption", type: "richText" },
      ],
    },
    { name: "showOnHome", type: "checkbox", defaultValue: false },
    { name: "homeVideoUrl", type: "text" },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers show first." },
    },
  ],
};

// Powers the "Tools Used" section under each project row on the homepage.
const Tools: CollectionConfig = {
  slug: "tools",
  admin: {
    useAsTitle: "name",
    group: "Home Page",
    defaultColumns: ["name", "project", "category", "order"],
  },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "imageSource",
      type: "radio",
      required: true,
      defaultValue: "url",
      options: [
        { label: "Image URL", value: "url" },
        { label: "Upload", value: "upload" },
      ],
      admin: { layout: "horizontal" },
    },
    {
      // Cloudinary (or other) URL — same convention as Project.cardImage.
      name: "imageUrl",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.imageSource !== "upload",
        description: "Image URL for the tool's icon.",
      },
      validate: (value: string | null | undefined, { siblingData }: any) =>
        siblingData?.imageSource === "upload" || value
          ? true
          : "Image URL is required unless you upload an image.",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) => siblingData?.imageSource === "upload",
        description: "Upload an icon image instead of using a URL.",
      },
      validate: ((value: unknown, { siblingData }: any) =>
        siblingData?.imageSource !== "upload" || value
          ? true
          : "An uploaded image is required when using upload mode.") as any,
    },
    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
      required: true,
      admin: {
        description: "Which project's Tools Used section this tool appears in.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Front End", value: "frontEnd" },
        { label: "Back End", value: "backEnd" },
        { label: "Both", value: "both" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers show first." },
    },
  ],
};

// Singleton site-wide settings, starting with the homepage hero's
// background video (currently hardcoded in HomeClient.tsx).
const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Home Page" },
  fields: [
    {
      name: "heroVideo",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Background video on the homepage hero section. Upload a video file (mp4 recommended). Falls back to the default video if not set.",
      },
    },
  ],
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: "/studio",
  },
  // Without this, Payload can't build absolute URLs (e.g. the password
  // reset link in the email) — it falls back to the request's Host header,
  // and only trusts that if it's in the cors/csrf allowlist, which isn't
  // configured either. The result was a bare relative path in the reset
  // email, which mail clients then mangled into an invalid "http:///" URL.
  serverURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  collections: [Users, Media, Showcase, Testimonials, Projects, Tools],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  // Without this, Payload has no way to send anything (password resets,
  // etc.) — it just logs emails to the server console instead.
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || "",
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Emilio Rivera's Portfolio",
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // Dedicated Postgres schema keeps Payload's tables fully isolated from the
  // Drizzle-managed `public` schema (User, Post, Media, etc.) in the same DB.
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    schemaName: "payload",
  }),
  // Deliberately no `sharp`. Payload only needs it to resize/convert uploads
  // and record image dimensions — the Media collection defines no imageSizes,
  // and site imagery is served from Cloudinary, not Payload's S3 bucket. Its
  // native libvips binaries also don't survive Vercel's packaging step under
  // pnpm's symlinked node_modules, which broke deploys outright.
  plugins: [
    s3Storage({
      collections: {
        // Serve files directly from S3 (public bucket + policy) instead of
        // proxying every read through this app's server — important for video.
        media: { disablePayloadAccessControl: true },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        region: process.env.S3_REGION,
        // Needed for the adapter to build public URLs (bucket/key), not just
        // for making authenticated requests.
        endpoint: `https://s3.${process.env.S3_REGION}.amazonaws.com`,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
});
