export const getMobileVideoUrl = (url: string): string => {
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/w_1080,q_auto:best,vc_auto/");
};
