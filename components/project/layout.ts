// Every section of a project detail page measures its content with this, so
// the left and right edges line up all the way down the page. Previously each
// section picked its own gutter (the overview used mx-[10%], the gallery
// mx-[6%] plus p-10), so the content edge visibly stepped in and out as you
// scrolled — and it drifted differently per project depending on which
// sections that project had.
export const PROJECT_CONTAINER = "mx-auto w-full max-w-[1280px] px-6 md:px-10";
