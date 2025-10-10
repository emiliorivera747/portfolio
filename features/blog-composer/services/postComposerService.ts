import { API_URL } from "@/utils/global-variables/globals";

/**
 * Will send API request to create a post
 */
const createPost = async (data: any) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const postService = {
  createPost,
};
