// The homepage's full-screen project bands. These live in the `site-settings`
// global (Home Page > Project Sections) — this file is the fallback used when
// that global is empty or the database is unreachable, the same way
// navbarData.ts backs the navbar.
//
// Keep it in sync with the seed in scripts/seed-home-sections.ts, which reads
// straight from here.

export type HomeProjectSection = {
  title: string;
  subtitle?: string;
  url: string;
  buttonLabel: string;
  /** Picks the header treatment and object-fit — see HomeClient. */
  headerStyle: "featured" | "standard" | "compact";
  mediaType: "video" | "image";
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Replaces the video on phones. Empty means the video plays everywhere. */
  mobileImageUrl?: string;
  mobileImageAlt?: string;
  /** Slug of the project whose Tools Used strip renders beneath this section. */
  toolsSlug?: string;
  showDividerBefore: boolean;
};

export const homeProjectSections: HomeProjectSection[] = [
  {
    title: "Trellis Money",
    url: "/projects/trellis-money",
    buttonLabel: "Learn More",
    headerStyle: "featured",
    mediaType: "video",
    videoUrl:
      "https://res.cloudinary.com/dxxdfgpdh/video/upload/v1772235119/Portfolio_Video_2_tupy6r.mp4",
    toolsSlug: "trellis-money",
    showDividerBefore: false,
  },
  {
    title: "Casa Chirilagua",
    url: "/projects/casa-chirilagua",
    buttonLabel: "Learn More",
    headerStyle: "standard",
    mediaType: "video",
    videoUrl:
      "https://res.cloudinary.com/davx3yyob/video/upload/v1760237004/Untitled_design_23_gbdkes_inbtze_fni0i9.mp4",
    toolsSlug: "casa-chirilagua",
    showDividerBefore: true,
  },
  {
    title: "Portfolio",
    url: "/projects/my-portfolio",
    buttonLabel: "Learn More",
    headerStyle: "standard",
    mediaType: "video",
    videoUrl:
      "https://res.cloudinary.com/davx3yyob/video/upload/v1760242424/Portfolio_Video_1_hnsfub.mp4",
    showDividerBefore: true,
  },
  {
    // Continues the Portfolio project above, so no rule between the two.
    title: "Responsive Design",
    url: "/projects/my-portfolio",
    buttonLabel: "Learn More",
    headerStyle: "compact",
    mediaType: "video",
    videoUrl:
      "https://res.cloudinary.com/davx3yyob/video/upload/v1760242715/Untitled_design_20_pg1n4r_kv58m5.mp4",
    toolsSlug: "my-portfolio",
    showDividerBefore: false,
  },
];
