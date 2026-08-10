import { getPayload } from "payload";
import config from "@/payload.config";
import Navbar from "@/components/navbar/Navbar";
import { getNavBarData } from "@/lib/navbar";
import HeroImageBanner from "@/components/HeroImageBanner";
import BlogCard from "@/components/blog/BlogCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

/**
 *  Displays the blog list page
 *
 * @returns the blog list page
 */
export default async function BlogPage() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    depth: 1,
    sort: "-createdAt",
    limit: 50,
  });

  const menuItems = await getNavBarData();

  return (
    <section className="w-screen min-h-screen h-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <Navbar menuItems={menuItems} mode="light" />
      <HeroImageBanner title="Blogs." className="bg-[#1877F2]" />
      <div className="mx-[5%]">
        <div className="text-4xl sm:text-6xl pt-[10rem] pb-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-primary-800">
          Latest Posts
        </div>
        {posts.length === 0 ? (
          <div className="text-2xl text-primary-700 font-extralight pb-20">
            No posts found at this time.
          </div>
        ) : (
          <div className="sm:grid sm:grid-cols-3 gap-4 pb-20">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
