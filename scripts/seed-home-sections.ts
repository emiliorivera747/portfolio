// payload.config.ts reads process.env at module-evaluation time, and ESM
// import statements are hoisted above other top-level code — so the env
// file must be loaded before payload.config is imported, via a dynamic
// import inside seed() rather than a static top-level import.
process.loadEnvFile(".env");

// The pooled connection on :5432 is Supavisor session mode, capped at 15
// concurrent sessions on this project — the schema-push introspection that
// runs on Payload init blows through that once there are this many tables.
// Route this one-off script through the transaction-mode pooler on :6543
// instead, which multiplexes far more clients onto the same backend
// connections (fine here since introspection is just plain selects, no
// session state like temp tables or prepared statements across calls).
if (process.env.DATABASE_URL?.includes("pooler.supabase.com:5432")) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace(
    "pooler.supabase.com:5432",
    "pooler.supabase.com:6543"
  );
}

import { getPayload } from "payload";
import { homeProjectSections } from "../utils/data/home/projectSectionsData";

async function seed() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  // toolsFromProject is a relationship, so the slugs in the data file have to
  // be resolved to document IDs before the global will accept them.
  const { docs: projects } = await payload.find({
    collection: "projects",
    limit: 200,
    select: { slug: true },
  });
  const idBySlug = new Map(projects.map((project) => [project.slug, project.id]));

  const projectSections = homeProjectSections.map((section) => ({
    title: section.title,
    subtitle: section.subtitle,
    url: section.url,
    buttonLabel: section.buttonLabel,
    headerStyle: section.headerStyle,
    mediaType: section.mediaType,
    videoUrl: section.videoUrl,
    imageSource: "url",
    imageUrl: section.imageUrl,
    imageAlt: section.imageAlt,
    toolsFromProject: section.toolsSlug
      ? idBySlug.get(section.toolsSlug)
      : undefined,
    showDividerBefore: section.showDividerBefore,
  }));

  const missing = homeProjectSections
    .filter((s) => s.toolsSlug && !idBySlug.has(s.toolsSlug))
    .map((s) => s.toolsSlug);
  if (missing.length) {
    console.warn(`No project found for tools slug(s): ${missing.join(", ")}`);
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: { projectSections } as any,
  });

  const saved = await payload.findGlobal({ slug: "site-settings", depth: 1 });
  console.log(
    "Seeded home project sections:\n" +
      (saved.projectSections ?? [])
        .map(
          (s) =>
            `  ${s.showDividerBefore ? "──  " : "    "}${s.title} (${s.headerStyle}, ${s.mediaType})` +
            (typeof s.toolsFromProject === "object" && s.toolsFromProject
              ? ` + tools: ${s.toolsFromProject.slug}`
              : "")
        )
        .join("\n")
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
