"use client";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";

//Components
import BlogList from "@/features/blogs/components/BlogList";
import BlogListSkeleton from "@/features/blogs/components/skeletons/BlogListSkeleton";
import HeroImageBanner from "@/components/HeroImageBanner";

const Page = () => {
  const { postsResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();
  if (isLoadingPosts) return <BlogListSkeleton />;
  return (
    <section className="w-screen min-h-screen h-auto">
      <HeroImageBanner
        title="Blogs."
        className="bg-[#1877F2]"
        caption={
          <>
            Photo: <em>Starstruck</em> — Milky Way captured by the Artemis II
            crew, April 7, 2026. Credit: NASA/JSC
          </>
        }
      />
      <div className="mx-[5%]">
        <div className=" text-4xl sm:text-6xl pt-[10rem] pb-4 font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-primary-800">
          Latest Posts
        </div>
        <BlogList posts={postsResponse?.data} />
      </div>
    </section>
  );
};

export default Page;
