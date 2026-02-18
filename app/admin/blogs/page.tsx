"use client";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";
import { Post } from "@/features/blogs/types/post";
import PrimaryHeader from "@/components/headers/PrimaryHeader";

const AdminBlogsPage = () => {
  const { postsResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();

  const posts: Post[] = postsResponse?.data ?? [];

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime()
  );

  return (
    <section className="w-full max-h-screen overflow-y-scroll p-6">
      <div className="flex items-center justify-between mb-8">
        <PrimaryHeader title="Blogs" />
        <Link
          href="/admin/blog-composer"
          className="px-4 py-2 bg-primary-1000 text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          New Post
        </Link>
      </div>

      {isLoadingPosts && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse flex gap-4 p-4 border border-primary-200 rounded-lg"
            >
              <div className="w-20 h-20 bg-gray-300 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-300 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isErrorPosts && (
        <div className="text-red-500 text-center py-10">
          Failed to load posts. Please try again.
        </div>
      )}

      {!isLoadingPosts && !isErrorPosts && sortedPosts.length === 0 && (
        <div className="text-primary-700 text-center py-10 font-extralight text-xl">
          No posts found. Create your first post!
        </div>
      )}

      {!isLoadingPosts && !isErrorPosts && sortedPosts.length > 0 && (
        <div className="space-y-3">
          {sortedPosts.map((post: Post) => (
            <Link
              key={post.id}
              href={`/admin/blogs/${post.id}/edit`}
              className="flex gap-4 p-4 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                <CldImage
                  src={
                    post.image_url ||
                    "https://res.cloudinary.com/dcss55nem/image/upload/v1700596192/Untitled_design_2_udsazb.png"
                  }
                  height={80}
                  width={80}
                  alt={post.title || "Post image"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-primary-1000 text-lg group-hover:underline truncate">
                  {post.title || "Untitled"}
                </h3>
                <p className="text-primary-800 font-extralight text-sm truncate">
                  {post.description || "No description"}
                </p>
                <span className="text-primary-600 text-xs">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "No date"}
                </span>
              </div>
              <div className="flex items-center text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminBlogsPage;
