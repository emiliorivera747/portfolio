// payload.config.ts reads process.env at module-evaluation time, and ESM
// import statements are hoisted above other top-level code — so the env
// file must be loaded before payload.config is imported, via a dynamic
// import inside seed() rather than a static top-level import.
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

type SeedGalleryItem = {
  title: string;
  imageUrl: string;
  captionMarkdown?: string;
};

type SeedProject = {
  title: string;
  slug: string;
  category: string;
  cardDescription: string;
  cardImage: string;
  overviewMarkdown: string;
  role: string;
  responsibilityMarkdown: string;
  learnMoreLabel: string;
  learnMoreHref: string;
  learnMoreLinkText?: string;
  order: number;
  showOnHome?: boolean;
  homeVideoUrl?: string;
  gallery: SeedGalleryItem[];
};

const projects: SeedProject[] = [
  {
    title: "Trellis Money",
    slug: "trellis-money",
    category: "FinTech",
    cardDescription:
      "Financial platform helping families build wealth and access financial tools.",
    cardImage:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1782445441/TrellisMoneyDashboard_ccvlyj.png",
    overviewMarkdown:
      "Built a full-stack personal finance platform using **Next.js**, **TypeScript**, **PostgreSQL** on **AWS RDS**, and **Drizzle ORM** to help families aggregate bank and investment accounts, track net worth, and project their future financial health.",
    role: "Full Stack Engineer",
    responsibilityMarkdown: `- **Database & Infrastructure**: Designed the schema and migrations (Drizzle ORM + Drizzle Kit) running on a PostgreSQL AWS RDS instance.
- **Integrations**: Plaid for bank and investment data aggregation, Stripe for subscription billing, Supabase for authentication.
- **Performance**: Replaced table scans with index lookups, batched N+1 queries, and parallelized async syncs.
- **Front End & Testing**: Cash flow and net worth visualizations with Visx/D3, covered by Jest, React Testing Library, and Cypress.
- **Deployment**: Vercel hosting with Docker support.`,
    learnMoreLabel: "Trellis Money",
    learnMoreHref: "https://www.trellismoney.com/",
    order: 1,
    showOnHome: true,
    homeVideoUrl:
      "https://res.cloudinary.com/dxxdfgpdh/video/upload/v1772235119/Portfolio_Video_2_tupy6r.mp4",
    gallery: [
      {
        title: "Dashboard",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1782445441/TrellisMoneyDashboard_ccvlyj.png",
      },
    ],
  },
  {
    title: "Casa Chirilagua",
    slug: "casa-chirilagua",
    category: "Web Application",
    cardDescription:
      "Internal management platform for a non-profit in Alexandria, VA.",
    cardImage:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625338/Screenshot_2025-05-18_at_8.23.36_PM_sqxg9w.png",
    overviewMarkdown:
      "Developed an internal web application using **MongoDB**, **Express.js**, **Node.js**, **Next.js**, and **React.js** to help manage programs for Casa Chirilagua, a non-profit organization based in the City of Alexandria, Virginia.",
    role: "Full Stack Engineer",
    responsibilityMarkdown:
      "Consultation, Front End Architecture, Back End Development, Create and Manage Database, Create RESTful APIs, Security, UI/UX Design, Figma Prototyping, Deployment, Present Demos, Employee Training.",
    learnMoreLabel: "Casa Chirilagua",
    learnMoreHref: "https://casachirilagua.org/",
    order: 2,
    showOnHome: true,
    homeVideoUrl:
      "https://res.cloudinary.com/davx3yyob/video/upload/v1760237004/Untitled_design_23_gbdkes_inbtze_fni0i9.mp4",
    gallery: [
      {
        title: "Sign In Page",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747625338/Screenshot_2025-05-18_at_8.23.36_PM_sqxg9w.png",
        captionMarkdown:
          "The front end and back end are protected with Auth0, a third-party authentication service. Auth0 uses AES-256 to encrypt data at rest and is ISO27018 certified, complying with security and privacy guidelines for managing PII.",
      },
      {
        title: "Dashboard",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747625577/Screenshot_2025-05-18_at_8.23.59_PM_fvumyy.png",
        captionMarkdown: `Created custom dashboard components using the recharts library.

- **Pie chart**: Categorizes the programs by the number of students.
- **Reusable card component**: Used to display useful metrics such as percentages or numbers.`,
      },
      {
        title: "Student Page",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747625347/Screenshot_2025-05-18_at_8.24.52_PM_qelt8k.png",
        captionMarkdown: `Students, parents, programs, and families have a similar user interface, utilizing:

- **Custom reusable table component**: Displays useful information such as names and other relevant fields.
- **Custom reusable Search bar**: Helps in finding specific users.
- **Custom reusable Side navigation bar**: Facilitates easy navigation within the pages.`,
      },
      {
        title: "Student Profile Part 1",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747625356/Screenshot_2025-05-18_at_8.25.06_PM_nlyckk.png",
        captionMarkdown: `Students, parents, programs, and families have a similar user interface, utilizing:

- **Custom reusable profile component**: Displays relevant relationships, such as programs, parents, or children for the parent profile. Provides the flexibility of adding a parent to a specific student or adding a student to a particular program.`,
      },
      {
        title: "Student Profile Part 2",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747625364/Screenshot_2025-05-18_at_8.25.45_PM_l9wfbo.png",
        captionMarkdown:
          "Collapsible headers provide useful information about the student, program, parent, or other entities.",
      },
      {
        title: "Student Profile Part 3",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747625378/Screenshot_2025-05-18_at_8.27.30_PM_rdolf3.png",
        captionMarkdown:
          "Notes section allows users to add notes about the student.",
      },
      {
        title: "Student Profile Part 4",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747625386/Screenshot_2025-05-18_at_8.26.25_PM_lokv3k.png",
        captionMarkdown: "Created a custom reusable modal",
      },
      {
        title: "Student Registration Part 1",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747624565/registration-part-1_lhvrsu.png",
      },
      {
        title: "Student Registration Part 2",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747624579/Screenshot_2025-05-01_at_9.42.37_AM_rljoqx_rnm0dj.png",
      },
      {
        title: "Student Registration Part 3",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1747624565/registration-part-1_lhvrsu.png",
      },
    ],
  },
  {
    title: "Cipotes Sonriendo Foundation",
    slug: "cipotes-sonriendo-foundation",
    category: "Non-Profit",
    cardDescription: "Website for the Cipotes Sonriendo Foundation.",
    cardImage:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1782442242/Screenshot_2026-06-25_at_7.50.20_PM_v5djhd.png",
    // TODO: replace with a real description of the work.
    overviewMarkdown: "Website for the Cipotes Sonriendo Foundation.",
    // TODO: replace with your role on this project.
    role: "TODO: Add your role",
    // TODO: replace with your responsibilities on this project.
    responsibilityMarkdown: "TODO: Add your responsibilities",
    learnMoreLabel: "Cipotes Sonriendo Foundation",
    learnMoreHref: "https://www.cipotessonriendofoundation.org/",
    order: 3,
    gallery: [
      {
        title: "Homepage",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1782442242/Screenshot_2026-06-25_at_7.50.20_PM_v5djhd.png",
      },
    ],
  },
  {
    title: "Portfolio Website",
    slug: "my-portfolio",
    category: "Portfolio",
    cardDescription:
      "Personal portfolio showcasing projects, skills, and experience.",
    cardImage:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1753932226/Screenshot_2025-07-30_at_8.22.13_PM_eu24ir.png",
    overviewMarkdown:
      "Built this personal portfolio with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**, backed by **Drizzle ORM** + **Supabase Postgres** and Cloudinary-hosted media.",
    // TODO: replace with your role on this project.
    role: "TODO: Add your role",
    // TODO: replace with your responsibilities on this project.
    responsibilityMarkdown: "TODO: Add your responsibilities",
    learnMoreLabel: "Source Code",
    learnMoreHref: "https://github.com/emiliorivera747/portfolio",
    learnMoreLinkText: "View Source Code",
    order: 4,
    showOnHome: true,
    homeVideoUrl:
      "https://res.cloudinary.com/davx3yyob/video/upload/v1760242424/Portfolio_Video_1_hnsfub.mp4",
    gallery: [
      {
        title: "Home Page",
        imageUrl:
          "https://res.cloudinary.com/dcss55nem/image/upload/v1753932226/Screenshot_2025-07-30_at_8.22.13_PM_eu24ir.png",
      },
    ],
  },
];

async function seed() {
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  for (const project of projects) {
    const { overviewMarkdown, responsibilityMarkdown, gallery, ...rest } =
      project;

    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping "${project.title}" — already seeded.`);
      continue;
    }

    await payload.create({
      collection: "projects",
      data: {
        ...rest,
        overviewDescription: await markdownToRichText(
          payload,
          overviewMarkdown
        ),
        responsibility: await markdownToRichText(
          payload,
          responsibilityMarkdown
        ),
        gallery: await Promise.all(
          gallery.map(async (item) => ({
            title: item.title,
            imageUrl: item.imageUrl,
            caption: item.captionMarkdown
              ? await markdownToRichText(payload, item.captionMarkdown)
              : undefined,
          }))
        ),
      },
    });
    console.log(`Created project: ${project.title}`);
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error("Failed to seed projects:", error);
  process.exit(1);
});
