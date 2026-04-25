import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface BlogListImageSectionProps {
  imageUrl?: string;
  title?: string;
  id?: string | number;
}

const BlogListImageSection = ({
  imageUrl,
  title = "No title provided",
  id = "#",
}: BlogListImageSectionProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-[12px]"
      style={{ position: "relative" }}
    >
      <Link href={`posts/${id}`}>
        <CldImage
          src={
            imageUrl
              ? imageUrl
              : "https://res.cloudinary.com/dcss55nem/image/upload/v1700596192/Untitled_design_2_udsazb.png"
          }
          height={150}
          width={300}
          alt={title || "Default alt text"}
          className="w-full duration-200 md-block group-hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default BlogListImageSection;
