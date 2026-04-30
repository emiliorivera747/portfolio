export const getMobileVideoUrl = (url: string): string => {
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/w_640,q_auto:low,vc_auto/");
};
