import path from "path";
import { fileURLToPath } from "url";
import { revalidatePath } from "next/cache";
import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  BlocksFeature,
  CodeBlock,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig } from "payload";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  Field,
  GlobalAfterChangeHook,
  GlobalConfig,
} from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Pages fetch Payload data with `revalidate = 3600`, so without this,
// content edits sit invisible on the live site for up to an hour even
// though they show up immediately in local dev (which doesn't cache
// renders). Called from collection/global hooks below to bust the specific
// cached paths a save affects, right when it happens.
function revalidatePaths(paths: (string | undefined)[]) {
  for (const path of paths) {
    if (!path) continue;
    try {
      revalidatePath(path);
    } catch (error) {
      // Hooks also run outside a Next.js request (e.g. seed scripts run via
      // `tsx`) — revalidatePath throws there since there's no request-scoped
      // cache to invalidate. Safe to ignore; the doc write itself succeeded.
      console.warn(
        `Skipped revalidating "${path}":`,
        error instanceof Error ? error.message : error
      );
    }
  }
}

// Shared shape for one entry in a project's Front End / Back End / Both
// tools array — lets each tool either link a Cloudinary (or other) URL or
// upload an image straight into Media.
function toolItemFields(): Field[] {
  return [
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
  ];
}

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

const revalidateHome: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths(["/"]);
  return doc;
};

const revalidateHomeOnDelete: CollectionAfterDeleteHook = () => {
  revalidatePaths(["/"]);
};

// Powers the "Client Testimonials" section on the real homepage.
const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", group: "Home Page" },
  defaultSort: "order",
  hooks: {
    afterChange: [revalidateHome],
    afterDelete: [revalidateHomeOnDelete],
  },
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

// A project's tools (tabs below) show on both "/" and its own page, so
// any change — including just editing Front End/Back End/Both tools —
// needs to bust both, plus the /projects grid for card-level fields.
const revalidateProject: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths(["/", "/projects", doc?.slug ? `/projects/${doc.slug}` : undefined]);
  return doc;
};

const revalidateProjectOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePaths(["/", "/projects", doc?.slug ? `/projects/${doc.slug}` : undefined]);
};

// Powers the /projects grid and each project's /projects/[slug] case-study page.
const Projects: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "title", group: "Projects" },
  defaultSort: "order",
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateProjectOnDelete],
  },
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
    // Powers this project's "Tools Used" section (shown on both the
    // homepage and this project's own page) — grouped into tabs so editing
    // a project's tools means picking Front End / Back End / Both and
    // managing that array directly, instead of jumping to a separate
    // collection and filtering by project + category.
    {
      type: "tabs",
      tabs: [
        {
          label: "Front End Tools",
          fields: [
            {
              name: "frontEndTools",
              type: "array",
              labels: { singular: "Tool", plural: "Tools" },
              fields: toolItemFields(),
            },
          ],
        },
        {
          label: "Back End Tools",
          fields: [
            {
              name: "backEndTools",
              type: "array",
              labels: { singular: "Tool", plural: "Tools" },
              fields: toolItemFields(),
            },
          ],
        },
        {
          label: "Both Tools",
          fields: [
            {
              name: "bothTools",
              type: "array",
              labels: { singular: "Tool", plural: "Tools" },
              fields: toolItemFields(),
            },
          ],
        },
      ],
    },
  ],
};

const revalidatePost: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths(["/blog", doc?.slug ? `/blog/${doc.slug}` : undefined]);
  return doc;
};

const revalidatePostOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePaths(["/blog", doc?.slug ? `/blog/${doc.slug}` : undefined]);
};

// Powers the /blog list page and each post's /blog/[slug] page.
const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Blog",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  defaultSort: "-createdAt",
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostOnDelete],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "Short summary shown on the blog list page." },
    },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "body",
      type: "richText",
      required: true,
      // Extends the default toolbar (headings, lists, links, formatting) with
      // inline images and syntax-highlighted code blocks, so a post can mix
      // text/images/code the way the old block-composer blog did.
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UploadFeature({ collections: { media: { fields: [] } } }),
          BlocksFeature({ blocks: [CodeBlock()] }),
        ],
      }),
    },
  ],
};

const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePaths(["/"]);
  return doc;
};

// Singleton site-wide settings, starting with the homepage hero's
// background video (currently hardcoded in HomeClient.tsx).
const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Home Page" },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
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
  collections: [Users, Media, Showcase, Testimonials, Projects, Posts],
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
  // `public` schema (User, Post, Media, etc.) in the same DB.
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      // DATABASE_URL points at Supabase's transaction-mode pooler (:6543),
      // which multiplexes many concurrent clients onto few backend
      // connections — the right fit for serverless, where several Vercel
      // instances can be running concurrently. We were previously on the
      // session-mode pooler (:5432, capped at 15 total sessions project-wide)
      // and even a small handful of concurrent instances blew through that,
      // taking down /studio and every Payload-backed page in production.
      // Keep this pool small regardless — no need for many connections per
      // instance when the pooler itself already handles the fan-out.
      max: 3,
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
