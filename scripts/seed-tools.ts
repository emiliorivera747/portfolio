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

type SeedTool = {
  name: string;
  imageUrl: string;
  projectSlug: string;
  category: "frontEnd" | "backEnd" | "both";
};

// Tools are seeded into each project's frontEndTools/backEndTools/bothTools
// array fields (in this listed order), rather than as separate documents.
const tools: SeedTool[] = [
  // casa-chirilagua — Front End
  {
    name: "React",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/react.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
  },
  {
    name: "Tailwind",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/tailwind.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
  },
  {
    name: "Sass",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/sass.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
  },
  {
    name: "Figma",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724544103/figma.jpg",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
  },
  {
    name: "Redux Tool Kit",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/Redux.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
  },
  {
    name: "CSS",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032024/css.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
  },
  {
    name: "HTML",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/HTML.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
  },
  // casa-chirilagua — Back End
  {
    name: "Express",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/21_cwuqxj.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
  },
  {
    name: "Node.js",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/nodejs.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
  },
  {
    name: "MongoDB",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/mongoDB.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
  },
  {
    name: "Mongoose",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747623658/mongoose_cchiii.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
  },
  {
    name: "Postman",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032032/postman.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
  },
  // casa-chirilagua — Both
  {
    name: "Auth0",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/auth0.png",
    projectSlug: "casa-chirilagua",
    category: "both",
  },
  {
    name: "JavaScript",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032031/javascript.png",
    projectSlug: "casa-chirilagua",
    category: "both",
  },
  {
    name: "Cloudinary",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1700277363/samples/cloudinary-icon.png",
    projectSlug: "casa-chirilagua",
    category: "both",
  },
  {
    name: "GitHub",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547300/Github.jpg",
    projectSlug: "casa-chirilagua",
    category: "both",
  },
  {
    name: "Heroku",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547303/heroku.jpg",
    projectSlug: "casa-chirilagua",
    category: "both",
  },
  // my-portfolio — Front End
  {
    name: "Next.js",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701048415/nextjs-black.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  {
    name: "React",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/react.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  {
    name: "Google Analytics",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1754260222/Google_Analytics_zer4br.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  {
    name: "Tailwind",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/tailwind.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  {
    name: "Sass",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/sass.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  {
    name: "GitHub",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547300/Github.jpg",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  {
    name: "HTML",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/HTML.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  {
    name: "Cloudinary",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1700277363/samples/cloudinary-icon.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
  },
  // my-portfolio — Back End
  {
    name: "PgAdmin",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909388/PgAdmin_qhjyuf.svg",
    projectSlug: "my-portfolio",
    category: "backEnd",
  },
  {
    name: "Next.js",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701048415/nextjs-black.png",
    projectSlug: "my-portfolio",
    category: "backEnd",
  },
  {
    name: "PostgreSQL",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909501/PostgreSQL_esvzut.svg",
    projectSlug: "my-portfolio",
    category: "backEnd",
  },
  {
    name: "Prisma",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758908682/PostgreSQL_1_vg0yyt.svg",
    projectSlug: "my-portfolio",
    category: "backEnd",
  },
  {
    name: "Postman",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032032/postman.png",
    projectSlug: "my-portfolio",
    category: "backEnd",
  },
  // my-portfolio — Both
  {
    name: "Supabase",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909397/Supabase_ultsfo.svg",
    projectSlug: "my-portfolio",
    category: "both",
  },
  {
    name: "JavaScript",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032031/javascript.png",
    projectSlug: "my-portfolio",
    category: "both",
  },
  {
    name: "GitHub",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547300/Github.jpg",
    projectSlug: "my-portfolio",
    category: "both",
  },
  {
    name: "AWS Amplify",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909382/Amplify_zk384x.svg",
    projectSlug: "my-portfolio",
    category: "both",
  },
];

const categoryField = {
  frontEnd: "frontEndTools",
  backEnd: "backEndTools",
  both: "bothTools",
} as const;

async function seed() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  const toolsBySlug = new Map<string, SeedTool[]>();
  for (const tool of tools) {
    if (!toolsBySlug.has(tool.projectSlug)) toolsBySlug.set(tool.projectSlug, []);
    toolsBySlug.get(tool.projectSlug)!.push(tool);
  }

  for (const [slug, slugTools] of toolsBySlug) {
    const { docs } = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (docs.length === 0) {
      console.log(
        `Skipping "${slug}" — no project found with that slug. Run scripts/seed-projects.ts first.`
      );
      continue;
    }
    const project = docs[0] as unknown as Record<string, unknown>;

    const data: Record<string, unknown> = {};
    for (const category of ["frontEnd", "backEnd", "both"] as const) {
      const fieldName = categoryField[category];
      const existing = (project[fieldName] as unknown[] | null | undefined) ?? [];
      if (existing.length > 0) {
        console.log(`Skipping ${slug}/${category} — already has ${existing.length} tool(s).`);
        continue;
      }

      const entries = slugTools.filter((tool) => tool.category === category);
      if (entries.length === 0) continue;

      data[fieldName] = entries.map((tool) => ({
        name: tool.name,
        imageSource: "url" as const,
        imageUrl: tool.imageUrl,
      }));
    }

    if (Object.keys(data).length === 0) {
      console.log(`Nothing to seed for "${slug}".`);
      continue;
    }

    await payload.update({
      collection: "projects",
      id: project.id as number,
      data,
    });
    console.log(`Updated tools for "${slug}": ${Object.keys(data).join(", ")}`);
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error("Failed to seed tools:", error);
  process.exit(1);
});
