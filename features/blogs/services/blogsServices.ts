import { API_URL } from "@/utils/global-variables/globals";

const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
};

export const blogsServices = {
  fetchPosts,
};
