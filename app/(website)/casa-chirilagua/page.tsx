"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectGallery, {
  ProjectGalleryItem,
} from "@/components/project/ProjectGallery";

const galleryItems: ProjectGalleryItem[] = [
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625338/Screenshot_2025-05-18_at_8.23.36_PM_sqxg9w.png",
    title: "Sign In Page",
    paragraph:
      "The front end and back end are protected with Auth0, a third-party authentication service. Auth0 uses AES-256 to encrypt data at rest and is ISO27018 certified, complying with security and privacy guidelines for managing PII.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625577/Screenshot_2025-05-18_at_8.23.59_PM_fvumyy.png",
    title: "Dashboard",
    paragraph: (
      <ul>
        Created custom dashboard components using the recharts library.
        <li>
          <span className="font-bold">Pie chart</span>: Categorizes the
          programs by the number of students.
        </li>
        <li>
          <span className="font-bold">Reusable card component</span>: Used to
          display useful metrics such as percentages or numbers.
        </li>
      </ul>
    ),
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625347/Screenshot_2025-05-18_at_8.24.52_PM_qelt8k.png",
    title: "Student Page",
    paragraph: (
      <ul>
        Students, parents, programs, and families have a similar user
        interface, utilizing:
        <li className="">
          <span className="font-bold">Custom reusable table component</span>:
          Displays useful information such as names and other relevant fields.
        </li>
        <li>
          <span className="font-bold">Custom reusable Search bar</span>: Helps
          in finding specific users.
        </li>
        <li>
          <span className="font-bold">
            Custom reusable Side navigation bar
          </span>
          : Facilitates easy navigation within the pages.
        </li>
      </ul>
    ),
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625356/Screenshot_2025-05-18_at_8.25.06_PM_nlyckk.png",
    title: "Student Profile Part 1",
    paragraph: (
      <ul>
        Students, parents, programs, and families have a similar user
        interface, utilizing:
        <li>
          <span className="font-extrabold">
            Custom reusable profile component
          </span>
          : Displays relevant relationships, such as programs, parents, or
          children for the parent profile. Provides the flexibility of adding
          a parent to a specific student or adding a student to a particular
          program.
        </li>{" "}
      </ul>
    ),
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625364/Screenshot_2025-05-18_at_8.25.45_PM_l9wfbo.png",
    title: "Student Profile Part 2",
    paragraph:
      "Collapsible headers provide useful information about the student, program, parent, or other entities.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625378/Screenshot_2025-05-18_at_8.27.30_PM_rdolf3.png",
    title: "Student Profile Part 3",
    paragraph: "Notes section allows users to add notes about the student.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747625386/Screenshot_2025-05-18_at_8.26.25_PM_lokv3k.png",
    title: "Student Profile Part 4",
    paragraph: "Created a custom reusable modal",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747624565/registration-part-1_lhvrsu.png",
    title: "Student Registration Part 1",
    paragraph: "",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747624579/Screenshot_2025-05-01_at_9.42.37_AM_rljoqx_rnm0dj.png",
    title: "Student Registration Part 2",
    paragraph: "",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dcss55nem/image/upload/v1747624565/registration-part-1_lhvrsu.png",
    title: "Student Registration Part 3",
    paragraph: "",
  },
];

/**
 * Casa Chirilagua Project
 *
 * @returns
 */
function Project1() {
  return (
    <section className="h-screen w-screen overflow-x-hidden bg-white">
      <ProjectHero title="Casa Chirilagua" />

      <ProjectOverview
        description={
          <>
            Developed an internal web application using{" "}
            <strong>MongoDB</strong>, <strong>Express.js</strong>,{" "}
            <strong>Node.js</strong>, <strong>Next.js</strong>, and{" "}
            <strong>React.js</strong> to help manage programs for Casa
            Chirilagua, a non-profit organization based in the City of
            Alexandria, Virginia.
          </>
        }
        role="Full Stack Engineer"
        responsibility="Consultation, Front End Architecture, Back End Development, Create and Manage Database, Create RESTful APIs, Security, UI/UX Design, Figma Prototyping, Deployment, Present Demos, Employee Training."
        learnMoreLabel="Casa Chirilagua"
        learnMoreHref="https://casachirilagua.org/"
      />

      <ProjectGallery items={galleryItems} />
    </section>
  );
}

export default Project1;
