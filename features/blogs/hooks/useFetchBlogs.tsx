import { useQuery } from "@tanstack/react-query";
import { blogsServices } from "@/features/blogs/services/blogsServices";

/**
 * Fetches the blogs
 * 
 * @returns 
 */
const useFetchBlogs = () => {
  const {
    data: postResponse,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => blogsServices.fetchPosts(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { postResponse, isLoadingPosts, isErrorPosts };
};

export default useFetchBlogs;
