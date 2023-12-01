/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  sassOptions: {
    includePath: [path.join(__dirname, "styles")],
  },
  images: {
    unoptimized: true,
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
