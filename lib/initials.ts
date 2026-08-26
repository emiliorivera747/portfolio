// Initials used as an avatar fallback wherever a person or project has no
// image — the navbar's project logos and the homepage testimonials. Shared so
// the two can't drift into producing different initials for the same name.
//
// Splits on any run of whitespace rather than a single space, so stray or
// leading spaces in CMS-entered names don't yield empty initials.
export function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
