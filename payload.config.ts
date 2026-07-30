import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";
import type { CollectionConfig } from "payload";

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
  admin: { useAsTitle: "name" },
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
  collections: [Users, Media, Showcase, Testimonials],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
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
  sharp,
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
