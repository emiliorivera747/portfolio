import Page from "@/components/Page";
import SecondaryHeader from "@/components/titles/SecondaryHeader";

/**
 * Placeholder blog landing page. Posts aren't wired up to Payload yet —
 * this just holds the nav link and route until that content is added.
 *
 * @returns the blog page
 */
function Blog() {
  return (
    <Page>
      <section className="h-screen w-screen flex flex-col items-center justify-center bg-white px-[8%] text-center gap-4">
        <SecondaryHeader title="Blog" />
        <p className="text-primary-900 text-lg tracking-wide">
          New posts are coming soon.
        </p>
      </section>
    </Page>
  );
}

export default Blog;
