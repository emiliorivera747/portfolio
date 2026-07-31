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
  order: number;
};

const tools: SeedTool[] = [
  // casa-chirilagua — Front End
  {
    name: "React",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/react.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
    order: 0,
  },
  {
    name: "Tailwind",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/tailwind.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
    order: 1,
  },
  {
    name: "Sass",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/sass.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
    order: 2,
  },
  {
    name: "Figma",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724544103/figma.jpg",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
    order: 3,
  },
  {
    name: "Redux Tool Kit",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/Redux.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
    order: 4,
  },
  {
    name: "CSS",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032024/css.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
    order: 5,
  },
  {
    name: "HTML",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/HTML.png",
    projectSlug: "casa-chirilagua",
    category: "frontEnd",
    order: 6,
  },
  // casa-chirilagua — Back End
  {
    name: "Express",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/21_cwuqxj.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
    order: 0,
  },
  {
    name: "Node.js",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/nodejs.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
    order: 1,
  },
  {
    name: "MongoDB",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/mongoDB.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
    order: 2,
  },
  {
    name: "Mongoose",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747623658/mongoose_cchiii.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
    order: 3,
  },
  {
    name: "Postman",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032032/postman.png",
    projectSlug: "casa-chirilagua",
    category: "backEnd",
    order: 4,
  },
  // casa-chirilagua — Both
  {
    name: "Auth0",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/auth0.png",
    projectSlug: "casa-chirilagua",
    category: "both",
    order: 0,
  },
  {
    name: "JavaScript",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032031/javascript.png",
    projectSlug: "casa-chirilagua",
    category: "both",
    order: 1,
  },
  {
    name: "Cloudinary",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1700277363/samples/cloudinary-icon.png",
    projectSlug: "casa-chirilagua",
    category: "both",
    order: 2,
  },
  {
    name: "GitHub",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547300/Github.jpg",
    projectSlug: "casa-chirilagua",
    category: "both",
    order: 3,
  },
  {
    name: "Heroku",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547303/heroku.jpg",
    projectSlug: "casa-chirilagua",
    category: "both",
    order: 4,
  },
  // my-portfolio — Front End
  {
    name: "Next.js",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701048415/nextjs-black.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 0,
  },
  {
    name: "React",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/react.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 1,
  },
  {
    name: "Google Analytics",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1754260222/Google_Analytics_zer4br.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 2,
  },
  {
    name: "Tailwind",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/tailwind.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 3,
  },
  {
    name: "Sass",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/sass.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 4,
  },
  {
    name: "GitHub",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547300/Github.jpg",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 5,
  },
  {
    name: "HTML",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/HTML.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 6,
  },
  {
    name: "Cloudinary",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1700277363/samples/cloudinary-icon.png",
    projectSlug: "my-portfolio",
    category: "frontEnd",
    order: 7,
  },
  // my-portfolio — Back End
  {
    name: "PgAdmin",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909388/PgAdmin_qhjyuf.svg",
    projectSlug: "my-portfolio",
    category: "backEnd",
    order: 0,
  },
  {
    name: "Next.js",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701048415/nextjs-black.png",
    projectSlug: "my-portfolio",
    category: "backEnd",
    order: 1,
  },
  {
    name: "PostgreSQL",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909501/PostgreSQL_esvzut.svg",
    projectSlug: "my-portfolio",
    category: "backEnd",
    order: 2,
  },
  {
    name: "Prisma",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758908682/PostgreSQL_1_vg0yyt.svg",
    projectSlug: "my-portfolio",
    category: "backEnd",
    order: 3,
  },
  {
    name: "Postman",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032032/postman.png",
    projectSlug: "my-portfolio",
    category: "backEnd",
    order: 4,
  },
  // my-portfolio — Both
  {
    name: "Supabase",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909397/Supabase_ultsfo.svg",
    projectSlug: "my-portfolio",
    category: "both",
    order: 0,
  },
  {
    name: "JavaScript",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1701032031/javascript.png",
    projectSlug: "my-portfolio",
    category: "both",
    order: 1,
  },
  {
    name: "GitHub",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1724547300/Github.jpg",
    projectSlug: "my-portfolio",
    category: "both",
    order: 2,
  },
  {
    name: "AWS Amplify",
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1758909382/Amplify_zk384x.svg",
    projectSlug: "my-portfolio",
    category: "both",
    order: 3,
  },
];

async function seed() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  const projectIdBySlug = new Map<string, number>();

  for (const tool of tools) {
    let projectId = projectIdBySlug.get(tool.projectSlug);
    if (projectId === undefined) {
      const { docs } = await payload.find({
        collection: "projects",
        where: { slug: { equals: tool.projectSlug } },
        limit: 1,
      });
      if (docs.length === 0) {
        console.log(
          `Skipping "${tool.name}" — no project found with slug "${tool.projectSlug}". Run scripts/seed-projects.ts first.`
        );
        continue;
      }
      projectId = docs[0].id;
      projectIdBySlug.set(tool.projectSlug, projectId);
    }

    const existing = await payload.find({
      collection: "tools",
      where: {
        and: [
          { name: { equals: tool.name } },
          { project: { equals: projectId } },
          { category: { equals: tool.category } },
        ],
      },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping "${tool.name}" (${tool.projectSlug}/${tool.category}) — already seeded.`);
      continue;
    }

    await payload.create({
      collection: "tools",
      data: {
        name: tool.name,
        imageSource: "url",
        imageUrl: tool.imageUrl,
        project: projectId,
        category: tool.category,
        order: tool.order,
      },
    });
    console.log(`Created tool: ${tool.name} (${tool.projectSlug}/${tool.category})`);
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error("Failed to seed tools:", error);
  process.exit(1);
});
