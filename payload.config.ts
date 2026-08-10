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
import { payloadCloudinaryPlugin } from "@jhb.software/payload-cloudinary-plugin";
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

// Lets an item either link an image URL (Cloudinary, etc.) or upload an image
// straight into Media. Shared by project tool icons and gallery screenshots so
// both offer the same choice and store it the same way — `imageSource` decides
// which of `imageUrl` / `image` is shown and required. Neither field can be
// `required` outright, since exactly one of them applies at a time.
// `optional` drops the "you must supply one or the other" rules, for places
// where having no image at all is a valid state. Without it, adding this group
// to an existing collection would block saving every document already in the
// database, since defaultValue only applies to newly created docs and existing
// rows come back with a null imageSource.
function imageSourceFields(
  subject: string,
  {
    optional = false,
    when,
  }: { optional?: boolean; when?: (siblingData: any) => boolean } = {}
): Field[] {
  // `when` lets a caller hide the whole group behind something else in the
  // same row — a homepage section only offers image fields once its media type
  // is set to "image". It combines with each field's own imageSource condition
  // rather than replacing it.
  const shown = (siblingData: any) => (when ? when(siblingData) : true);

  return [
    {
      name: "imageSource",
      type: "radio",
      required: !optional,
      defaultValue: "url",
      options: [
        { label: "Image URL", value: "url" },
        { label: "Upload", value: "upload" },
      ],
      admin: {
        layout: "horizontal",
        condition: (_, siblingData) => shown(siblingData),
      },
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        condition: (_, siblingData) =>
          shown(siblingData) && siblingData?.imageSource !== "upload",
        description: `Image URL for the ${subject}.`,
      },
      validate: (value: string | null | undefined, { siblingData }: any) =>
        optional || siblingData?.imageSource === "upload" || value
          ? true
          : "Image URL is required unless you upload an image.",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) =>
          shown(siblingData) && siblingData?.imageSource === "upload",
        description: `Upload an image for the ${subject} instead of using a URL.`,
      },
      validate: ((value: unknown, { siblingData }: any) =>
        optional || siblingData?.imageSource !== "upload" || value
          ? true
          : "An uploaded image is required when using upload mode.") as any,
    },
  ];
}

// Shared shape for one entry in a project's Front End / Back End / Both
// tools array.
function toolItemFields(): Field[] {
  return [
    { name: "name", type: "text", required: true },
    ...imageSourceFields("tool's icon"),
  ];
}

// Payload's own admin-user auth, intentionally separate from the app's Supabase users.
const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [],
};

// Upload-enabled collection backed by Cloudinary (see the storage plugin below).
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
// Projects also feed the navbar's dropdown (see lib/navbar.ts), which renders
// on every page — so /about and /blog have to be busted too, not just the
// pages that show project content directly.
const projectPaths = (slug?: string) => [
  "/",
  "/projects",
  "/about",
  "/blog",
  slug ? `/projects/${slug}` : undefined,
];

const revalidateProject: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths(projectPaths(doc?.slug));
  return doc;
};

const revalidateProjectOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePaths(projectPaths(doc?.slug));
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
    // relationship since these screenshots were uploaded to Cloudinary
    // directly, outside of Payload's Media collection.
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
        ...imageSourceFields("gallery image"),
        { name: "caption", type: "richText" },
      ],
    },
    // Drives this project's entry in the navbar's Projects dropdown. Kept on
    // the project rather than in a separate navigation global so there's one
    // source of truth — adding a project puts it in the menu automatically.
    {
      name: "navLogo",
      type: "group",
      label: "Navigation Menu Logo",
      admin: {
        description:
          "Logo shown next to this project in the site's Projects dropdown.",
      },
      fields: [
        {
          name: "initials",
          type: "text",
          admin: {
            description:
              'Shown when no image is set, e.g. "TM". Falls back to the first letters of the title.',
          },
        },
        ...imageSourceFields("navigation menu logo", { optional: true }),
      ],
    },
    {
      name: "showInNav",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Show this project in the navbar's Projects dropdown.",
      },
    },
    // Deliberately separate from `order` below. `order` sorts the /projects
    // grid and the homepage, and the menu wants its own sequence — sharing one
    // field meant reordering the menu dragged the grid along with it. Left
    // empty this falls back to `order`, so the menu keeps its current sequence
    // until someone actually wants the two to differ.
    {
      name: "navOrder",
      type: "number",
      admin: {
        description:
          "Position in the navbar's Projects dropdown — lower numbers show first. Leave empty to reuse the Order field below.",
      },
    },
    { name: "showOnHome", type: "checkbox", defaultValue: false },
    { name: "homeVideoUrl", type: "text" },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description:
          "Lower numbers show first. Sorts the /projects grid and the homepage — and the navbar dropdown too, unless Nav Order is set.",
      },
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
    // The full-bleed project bands down the homepage, which used to be
    // hardcoded JSX in HomeClient.tsx. Rows are drag-orderable, so resequencing
    // the homepage is a drag rather than an edit.
    {
      name: "projectSections",
      type: "array",
      labels: { singular: "Project Section", plural: "Project Sections" },
      admin: {
        description:
          "Full-screen project bands, in order. Leave empty to fall back to the hardcoded homepage.",
      },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "subtitle",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.headerStyle === "featured",
            description: "Only shown on the Featured header style.",
          },
        },
        {
          name: "url",
          type: "text",
          required: true,
          admin: { description: 'Where the button links, e.g. "/projects/trellis-money".' },
        },
        {
          name: "buttonLabel",
          type: "text",
          required: true,
          defaultValue: "Learn More",
        },
        {
          name: "headerStyle",
          type: "radio",
          required: true,
          defaultValue: "standard",
          options: [
            { label: "Featured (large, centered)", value: "featured" },
            { label: "Standard", value: "standard" },
            { label: "Compact", value: "compact" },
          ],
          admin: { layout: "horizontal" },
        },
        // The point of this whole group: a section can be backed by a looping
        // video or a still image.
        {
          name: "mediaType",
          type: "radio",
          required: true,
          defaultValue: "video",
          options: [
            { label: "Video", value: "video" },
            { label: "Image", value: "image" },
          ],
          admin: { layout: "horizontal" },
        },
        {
          name: "videoUrl",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType !== "image",
            description: "Looping background video (mp4). Cloudinary URLs get a mobile-optimised variant automatically.",
          },
          validate: (value: string | null | undefined, { siblingData }: any) =>
            siblingData?.mediaType === "image" || value
              ? true
              : "A video URL is required unless this section uses an image.",
        },
        ...imageSourceFields("project section", {
          optional: true,
          when: (siblingData) => siblingData?.mediaType === "image",
        }),
        {
          name: "imageAlt",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === "image",
            description: "Describes the image for screen readers. Falls back to the title.",
          },
        },
        // A still to serve phones in place of the video. Autoplaying video is
        // expensive on a phone connection, and the section is only ever mounted
        // once it nears the viewport — so on mobile the video is never fetched
        // at all when this is set, rather than fetched and then swapped out.
        // Grouped so its URL-or-upload fields don't collide with the
        // full-width image fields above.
        {
          name: "mobileImage",
          type: "group",
          label: "Mobile Image",
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType !== "image",
            description:
              "Optional. Shown instead of the video on phones (under 768px). Leave empty to play the video everywhere.",
          },
          fields: [
            ...imageSourceFields("mobile image", { optional: true }),
            {
              name: "alt",
              type: "text",
              admin: {
                description:
                  "Describes the mobile image for screen readers. Falls back to the title.",
              },
            },
          ],
        },
        {
          name: "toolsFromProject",
          type: "relationship",
          relationTo: "projects",
          admin: {
            description:
              "Optional — show that project's Tools Used strip directly beneath this section.",
          },
        },
        {
          name: "showDividerBefore",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description:
              "Draw a dividing rule above this section. Turn off when this section continues the project above it.",
          },
        },
      ],
    },
  ],
};

const revalidateAbout: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePaths(["/about"]);
  return doc;
};

// Drives the whole /about page, which used to be hardcoded JSX. The page is a
// hero banner followed by alternating text-and-photo sections, so `sections`
// is an array rather than a fixed set of fields — adding a new chapter to the
// story is a matter of adding a row, not editing the component.
const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  admin: { group: "About Page" },
  hooks: { afterChange: [revalidateAbout] },
  fields: [
    {
      name: "hero",
      type: "group",
      label: "Hero Banner",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "About Me.",
        },
        {
          name: "alt",
          type: "text",
          admin: { description: "Describes the banner image for screen readers." },
        },
        {
          name: "caption",
          type: "richText",
          admin: { description: "Small print under the title — photo credit, etc." },
        },
        ...imageSourceFields("hero banner", { optional: true }),
      ],
    },
    {
      name: "sections",
      type: "array",
      labels: { singular: "Section", plural: "Sections" },
      admin: {
        description:
          "Each row is one heading + paragraphs + photo. The photo alternates sides down the page, which `imagePosition` controls.",
      },
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "richText", required: true },
        {
          name: "imagePosition",
          type: "radio",
          required: true,
          defaultValue: "right",
          options: [
            { label: "Right of text", value: "right" },
            { label: "Left of text", value: "left" },
          ],
          admin: { layout: "horizontal" },
        },
        {
          name: "imageAlt",
          type: "text",
          admin: { description: "Describes the photo for screen readers." },
        },
        {
          name: "imageCaption",
          type: "richText",
          admin: { description: "Caption shown directly under the photo." },
        },
        ...imageSourceFields("section photo", { optional: true }),
        // The gradient pull quote sits between two sections rather than at a
        // fixed spot on the page, so it hangs off whichever section it follows.
        // That keeps it movable without needing a separate ordered list.
        {
          name: "quoteAfter",
          type: "richText",
          admin: {
            description:
              "Optional large gradient quote, rendered after this section. Leave empty for none.",
          },
        },
      ],
    },
  ],
};

// The navbar renders on every page, so a change here has to bust all of them.
const revalidateNavigation: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePaths(["/", "/projects", "/about", "/blog"]);
  return doc;
};

// Top-level navbar entries, previously hardcoded in
// utils/data/navbar/navbarData.ts. Array rows are drag-orderable in the admin,
// so reordering the menu is a drag rather than a field to renumber — which is
// why there's no `order` field here, unlike Projects.
const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation Menu",
  admin: { group: "Navigation" },
  hooks: { afterChange: [revalidateNavigation] },
  fields: [
    {
      name: "items",
      type: "array",
      labels: { singular: "Menu Item", plural: "Menu Items" },
      admin: {
        description:
          "Drag to reorder. Leaving this empty falls back to the hardcoded menu in navbarData.ts.",
      },
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "url",
          type: "text",
          required: true,
          admin: { description: 'Path such as "/about", or "/#contact" to jump to a section.' },
        },
        {
          name: "populateWithProjects",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description:
              "Build this item's dropdown from the Projects collection instead of the sub-items below. Project order and logos are then managed per project.",
          },
        },
        {
          name: "subItems",
          type: "array",
          labels: { singular: "Sub Item", plural: "Sub Items" },
          admin: {
            condition: (_, siblingData) => !siblingData?.populateWithProjects,
            description: "Drag to reorder. Leave empty for a plain link with no dropdown.",
          },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
      ],
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
  globals: [SiteSettings, AboutPage, Navigation],
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
  // and Cloudinary already does transformation and optimization on delivery.
  // Its native libvips binaries also don't survive Vercel's packaging step
  // under pnpm's symlinked node_modules, which broke deploys outright.
  plugins: [
    // Media used to live in a public S3 bucket, which meant a second storage
    // provider, a second set of long-lived credentials, and a world-readable
    // bucket to keep hardened — all for ~5MB of assets. Cloudinary already
    // serves the rest of the site's imagery, so uploads go there too and the
    // AWS surface goes away entirely.
    payloadCloudinaryPlugin({
      collections: {
        // Serve straight from Cloudinary's CDN rather than proxying every read
        // through this app's server — important for the homepage hero video.
        media: { disablePayloadAccessControl: true },
      },
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
      credentials: {
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINARY_API_SECRET || "",
      },
      // Keeps Payload's uploads in their own folder, so they stay distinct from
      // the pre-existing Cloudinary assets that project pages reference by URL.
      folder: "payload",
      // Vercel caps a serverless request body at 4.5MB, and the hero video is
      // already 4MB — a server-side upload would fail on the next one. This
      // uploads from the browser straight to Cloudinary with a signed request,
      // so the file never passes through a Vercel function.
      clientUploads: true,
    }),
  ],
});
