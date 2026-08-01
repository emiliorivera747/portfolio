import { getPayload } from "payload";
import config from "@/payload.config";
import { resolveImageUrl } from "@/lib/images";
import { navBarData } from "@/utils/data/navbar/navbarData";
import type { MenuItem, SubMenuItem } from "@/types/navbar";
import type { Project } from "@/payload-types";

// How many project logos to stack on the "All Work" entry.
const STACK_SIZE = 3;

function initialsFor(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// Builds the navbar's Projects dropdown from the Projects collection, so the
// logos are editable in Payload (Projects > a project > Navigation Menu Logo)
// instead of being hardcoded URLs. The About and Blog entries stay in
// navbarData.ts — they aren't backed by a collection.
//
// Server-only: it opens a Payload connection, so call it from a layout, page,
// or other server component and pass the result down to <Navbar />.
export async function getNavBarData(): Promise<MenuItem[]> {
  const projectsEntry = navBarData.find((item) => item.url === "/projects");
  if (!projectsEntry) return navBarData as MenuItem[];

  let projects: Project[] = [];

  try {
    const payload = await getPayload({ config });
    ({ docs: projects } = await payload.find({
      collection: "projects",
      depth: 1,
      sort: "order",
      limit: 200,
    }));
  } catch (error) {
    // The navbar renders on every page, so a database hiccup must not take the
    // whole site down — fall back to the static menu.
    console.warn(
      "Falling back to static navbar data:",
      error instanceof Error ? error.message : error
    );
    return navBarData as MenuItem[];
  }

  // `showInNav` defaults to true, but rows created before the field existed
  // come back null — treat anything that isn't an explicit false as visible.
  const visible = projects.filter((project) => project.showInNav !== false);

  // navLogo is a new field, so it's empty on every project until someone fills
  // it in. Rather than have the menu lose its logos in the meantime, fall back
  // to the hardcoded ones in navbarData.ts, matched by URL. Setting a logo in
  // Payload overrides the fallback, so this quietly stops mattering as the
  // field gets populated.
  // Cast because navbarData.ts is a plain literal — TypeScript infers a union
  // of the shapes present (the "All Work" entry has no logo/initials),
  // which hides those properties on the rest.
  const fallbackByUrl = new Map(
    ((projectsEntry.content ?? []) as SubMenuItem[]).map((entry) => [
      entry.url,
      entry,
    ])
  );

  const projectLinks: SubMenuItem[] = visible.map((project, index) => {
    const navLogo = project.navLogo ?? {};
    const url = `/projects/${project.slug}`;
    const fallback = fallbackByUrl.get(url);
    const logo = resolveImageUrl(navLogo) || fallback?.logo;
    return {
      id: index + 1,
      label: project.title,
      url,
      initials:
        navLogo.initials || fallback?.initials || initialsFor(project.title),
      ...(logo ? { logo } : {}),
    };
  });

  const allProjects: SubMenuItem = {
    id: projectLinks.length + 1,
    label: "All Work",
    url: "/projects",
    stack: projectLinks.slice(0, STACK_SIZE).map((project) => ({
      initials: project.initials as string,
      ...(project.logo ? { logo: project.logo } : {}),
    })),
  };

  return navBarData.map((item) =>
    item.url === "/projects"
      ? { ...item, content: [...projectLinks, allProjects] }
      : item
  ) as MenuItem[];
}
