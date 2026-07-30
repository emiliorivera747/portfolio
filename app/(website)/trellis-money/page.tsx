"use client";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectGallery, {
  ProjectGalleryItem,
} from "@/components/project/ProjectGallery";

// TODO: replace with real screenshots for this project.
const galleryItems: ProjectGalleryItem[] = [
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1782445441/TrellisMoneyDashboard_ccvlyj.png",
    title: "Dashboard",
  },
];

/**
 * Trellis Money Project
 *
 * @returns
 */
function TrellisMoney() {
  return (
    <section className="h-screen w-screen overflow-x-hidden bg-white">
      <ProjectHero title="Trellis Money" />

      <ProjectOverview
        description={
          <>
            Built a full-stack personal finance platform using{" "}
            <strong>Next.js</strong>, <strong>TypeScript</strong>,{" "}
            <strong>PostgreSQL</strong> on <strong>AWS RDS</strong>, and{" "}
            <strong>Drizzle ORM</strong> to help families aggregate bank and
            investment accounts, track net worth, and project their future
            financial health.
          </>
        }
        role="Full Stack Engineer"
        responsibility={
          <ul>
            <li>
              <span className="font-bold">Database & Infrastructure</span>:
              Designed the schema and migrations (Drizzle ORM + Drizzle Kit)
              running on a PostgreSQL AWS RDS instance.
            </li>
            <li>
              <span className="font-bold">Integrations</span>: Plaid for bank
              and investment data aggregation, Stripe for subscription
              billing, Supabase for authentication.
            </li>
            <li>
              <span className="font-bold">Performance</span>: Replaced table
              scans with index lookups, batched N+1 queries, and parallelized
              async syncs.
            </li>
            <li>
              <span className="font-bold">Front End & Testing</span>: Cash
              flow and net worth visualizations with Visx/D3, covered by
              Jest, React Testing Library, and Cypress.
            </li>
            <li>
              <span className="font-bold">Deployment</span>: Vercel hosting
              with Docker support.
            </li>
          </ul>
        }
        learnMoreLabel="Trellis Money"
        learnMoreHref="https://www.trellismoney.com/"
      />

      <ProjectGallery items={galleryItems} />
    </section>
  );
}

export default TrellisMoney;
