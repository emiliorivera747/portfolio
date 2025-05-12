// cloudinary-loader.js
export default function cloudinaryLoader({ src, width, quality }) {
  // Ensure src is a public ID (e.g., "tools/tool1"), not a full URL
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;

  const params = [
    "f_auto", // Automatic format (WebP/AVIF)
    "q_auto", // Automatic quality
    `w_${width}`, // Resize to specified width
    // Add more transformations if needed (e.g., "c_fill", "g_auto")
  ];
  const paramsString = params.join(",");
  return `https://res.cloudinary.com/dcss55nem/image/upload/${paramsString}/${normalizedSrc}`;
}