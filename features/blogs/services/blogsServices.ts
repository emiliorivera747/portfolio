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

const fetchPostById = async (id: string) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch post with id ${id}. Status: ${res.status}`);
  return res.json();
};

const updatePost = async (id: string, data: Record<string, any>) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Failed to update post with id ${id}`);
  return res.json();
};

const deletePost = async (id: string) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to delete post with id ${id}`);
  return res.json();
};

const fetchComments = async (postId: string) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

const createComment = async (
  postId: string,
  data: { email: string; content: string; name?: string }
) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create comment");
  }
  return res.json();
};

const verifyComment = async (
  postId: string,
  data: { pending_id: number; code: string }
) => {
  const res = await fetch(`${API_URL}/posts/${postId}/comments/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to verify comment");
  }
  return res.json();
};

export const blogsServices = {
  fetchPosts,
  fetchPostById,
  updatePost,
  deletePost,
  fetchComments,
  createComment,
  verifyComment,
};
