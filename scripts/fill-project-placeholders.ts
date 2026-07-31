// See seed-projects.ts for why the env file is loaded before payload.config
// is imported (via a dynamic import inside the run function below).
process.loadEnvFile(".env");

import { getPayload, type Payload } from "payload";
import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical";

async function markdownToRichText(payload: Payload, markdown: string) {
  const editorConfig = await editorConfigFactory.default({
    config: payload.config,
  });
  return convertMarkdownToLexical({ editorConfig, markdown });
}

// seed-projects.ts skips any project whose slug already exists, so filling in
// a seed entry's TODO placeholders after the initial seed never reaches the
// database. This patches those specific fields on already-seeded docs.
const updates: { slug: string; role: string; responsibilityMarkdown: string }[] =
  [
    {
      slug: "cipotes-sonriendo-foundation",
      role: "Front End Engineer",
      responsibilityMarkdown: `- **Design**: UI/UX design and page layouts.
- **Front End**: Responsive, reusable components across mobile and desktop.
- **SEO & Accessibility**: Semantic markup and metadata.
- **Deployment**: Hosting, domain setup, and ongoing updates.`,
    },
  ];

async function run() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  for (const update of updates) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: update.slug } },
      limit: 1,
    });
    const doc = existing.docs[0];
    if (!doc) {
      console.log(`Skipping "${update.slug}" — not found.`);
      continue;
    }

    await payload.update({
      collection: "projects",
      id: doc.id,
      data: {
        role: update.role,
        responsibility: await markdownToRichText(
          payload,
          update.responsibilityMarkdown
        ),
      },
    });
    console.log(`Updated project: ${update.slug}`);
  }

  process.exit(0);
}

run().catch((error) => {
  console.error("Failed to update projects:", error);
  process.exit(1);
});
