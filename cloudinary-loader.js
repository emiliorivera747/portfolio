// cloudinary-loader.js
export default function cloudinaryLoader({ src, width, quality }) {
  // Handle local paths (e.g., "/images/local-image.jpg")
  if (src.startsWith('/')) {
    return src; // Serve local images directly (from public/)
  }

  // Handle Cloudinary public IDs (e.g., "tools/tool1")
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const params = ["f_auto", "q_auto", `w_${width}`];
  const paramsString = params.join(",");
  const cloudinaryUrl = `https://res.cloudinary.com/dcss55nem/image/upload/${paramsString}/${normalizedSrc}`;

  return cloudinaryUrl;
}