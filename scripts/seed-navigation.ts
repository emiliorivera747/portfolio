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

// Mirrors utils/data/navbar/navbarData.ts, which stays in the repo as the
// fallback when the database is unreachable. The Work entry carries no
// sub-items: `populateWithProjects` builds its dropdown from the Projects
// collection, so the project links and logos stay managed per project.
const items = [
  { label: "Work", url: "/projects", populateWithProjects: true },
  {
    label: "About",
    url: "/about",
    populateWithProjects: false,
    subItems: [
      { label: "About Me", url: "/about" },
      { label: "Contact", url: "/#contact" },
    ],
  },
  { label: "Blog", url: "/blog", populateWithProjects: false },
];

async function seed() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  await payload.updateGlobal({ slug: "navigation", data: { items } as any });

  const saved = await payload.findGlobal({ slug: "navigation" });
  console.log(
    "Seeded navigation:",
    (saved.items ?? [])
      .map(
        (item) =>
          `${item.label}${item.populateWithProjects ? " (projects)" : item.subItems?.length ? ` (${item.subItems.length} sub)` : ""}`
      )
      .join(", ")
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
