import { getPayload } from "payload";
import config from "@/payload.config";
import AboutClient, { type AboutSectionView } from "./AboutClient";
import { resolveImageUrl } from "@/lib/images";

export const revalidate = 3600;

/**
 * Displays information about me.
 *
 * The copy and photos all live in the `about-page` global, so this only
 * resolves each section's image (pasted URL or Media upload) down to a plain
 * URL and hands the result to the client component that does the animation.
 */
export default async function About() {
  const payload = await getPayload({ config });
  const about = await payload.findGlobal({ slug: "about-page", depth: 1 });

  const hero = {
    title: about?.hero?.title ?? "About Me.",
    alt: about?.hero?.alt ?? "",
    imageUrl: resolveImageUrl(about?.hero ?? {}),
    caption: about?.hero?.caption,
  };

  const sections: AboutSectionView[] = (about?.sections ?? []).map(
    (section) => ({
      heading: section.heading,
      body: section.body,
      imageUrl: resolveImageUrl(section),
      imageAlt: section.imageAlt ?? "",
      imageCaption: section.imageCaption,
      imagePosition: section.imagePosition === "left" ? "left" : "right",
      quoteAfter: section.quoteAfter,
    })
  );

  return <AboutClient hero={hero} sections={sections} />;
}
