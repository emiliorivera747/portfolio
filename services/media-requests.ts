import { API_URL } from "@/utils/global-variables/globals";

interface Media {
  remoteUrl: string;
  alt: string;
  media_type: string;
}

const saveMedia = async (data: Media) => {
  if (!API_URL || typeof API_URL !== "string") {
    throw new Error("Invalid or undefined API_URL");
  }
  const res = await fetch(`${API_URL}/utils/save-remote-media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });

  if (!res.ok) throw new Error("Failed to save Media");

  const contentType = res.headers.get("Content-Type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Unexpected response format");
  }

  return res.json();
};

const mediaService = {
  saveMedia,
};

export default mediaService;
