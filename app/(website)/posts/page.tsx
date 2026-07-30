"use client";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";

//Components
import BlogList from "@/features/blogs/components/BlogList";
import BlogListSkeleton from "@/features/blogs/components/skeletons/BlogListSkeleton";
import HeroImageBanner from "@/components/HeroImageBanner";
import Navbar from "@/components/navbar/Navbar";
import { navBarData } from "@/utils/data/navbar/navbarData";

const Page = () => {
  const { postsResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();
  if (isLoadingPosts) return <BlogListSkeleton />;
  if (isErrorPosts)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
        <h2 className="text-2xl font-semibold text-primary-900">
          Failed to load posts
        </h2>
        <p className="text-primary-600 text-sm">
          Something went wrong. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-2 rounded-[12px] border-2 border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    );
  return (
    <section className="w-screen min-h-screen h-auto">
      <Navbar menuItems={navBarData} mode="light" />
      <HeroImageBanner
        title="Blogs."
        className="bg-[#1877F2]"
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
