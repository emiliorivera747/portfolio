import { Post, PostListProps } from "@/features/blogs/types/post";

// Components
import BlogListImageSection from "@/features/blogs/components/BlogListImageSection";
import BlogItemContent from "@/features/blogs/components/BlogItemContent";

/**
 *
 * Displays a blog list
 *
 * @param param0
 * @returns
 */
const BlogList = ({ posts }: PostListProps) => {
  const sortedPosts = Array.isArray(posts)
    ? [...posts].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    : [];

  return (
    <div>
      {sortedPosts.map(({ imageUrl, title, description, id, createdAt }: Post) => {
        return (
          <div
            key={id}
            className="border-y py-8 flex gap-10 border-primary-200 flex-col sm:flex-row"
          >
            <BlogListImageSection
              imageUrl={imageUrl}
              title={title}
              id={id}
            />
            <BlogItemContent
              title={title}
              id={id}
              description={description}
              createdAt={createdAt}
            />
          </div>
        );
      })}
      {(!posts || posts?.length === 0) && <div className="text-2xl text-primary-700 font-extralight">No posts found at this time.</div>}
    </div>
  );
};

export default BlogList;
