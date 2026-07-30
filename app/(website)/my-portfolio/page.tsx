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
      "https://res.cloudinary.com/dcss55nem/image/upload/v1753932226/Screenshot_2025-07-30_at_8.22.13_PM_eu24ir.png",
    title: "Home Page",
  },
];

/**
 * Portfolio Website Project
 *
 * @returns
 */
function PortfolioWebsite() {
  return (
    <section className="h-screen w-screen overflow-x-hidden bg-white">
      <ProjectHero title="Portfolio Website" />

      <ProjectOverview
        description={
          <>
            Built this personal portfolio with <strong>Next.js</strong>{" "}
            (App Router), <strong>TypeScript</strong>, and{" "}
            <strong>Tailwind CSS</strong>, backed by{" "}
            <strong>Drizzle ORM</strong> + <strong>Supabase Postgres</strong>{" "}
            and Cloudinary-hosted media.
          </>
        }
        // TODO: replace with your role on this project.
        role="TODO: Add your role"
        // TODO: replace with your responsibilities on this project.
        responsibility="TODO: Add your responsibilities"
        learnMoreLabel="Source Code"
        learnMoreHref="https://github.com/emiliorivera747/portfolio"
        learnMoreLinkText="View Source Code"
      />

      <ProjectGallery items={galleryItems} />
    </section>
  );
}

export default PortfolioWebsite;
