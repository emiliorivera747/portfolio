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
      "https://res.cloudinary.com/dcss55nem/image/upload/v1782442242/Screenshot_2026-06-25_at_7.50.20_PM_v5djhd.png",
    title: "Homepage",
  },
];

/**
 * Cipotes Sonriendo Foundation Project
 *
 * @returns
 */
function CipotesSonriendoFoundation() {
  return (
    <section className="h-screen w-screen overflow-x-hidden bg-white">
      <ProjectHero title="Cipotes Sonriendo Foundation" />

      <ProjectOverview
        // TODO: replace with real description of the work.
        description="Website for the Cipotes Sonriendo Foundation."
        // TODO: replace with your role on this project.
        role="TODO: Add your role"
        // TODO: replace with your responsibilities on this project.
        responsibility="TODO: Add your responsibilities"
        learnMoreLabel="Cipotes Sonriendo Foundation"
        learnMoreHref="https://www.cipotessonriendofoundation.org/"
      />

      <ProjectGallery items={galleryItems} />
    </section>
  );
}

export default CipotesSonriendoFoundation;
