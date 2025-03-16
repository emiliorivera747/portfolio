import React from "react";
import Link from "next/link";

interface SocialMediaLinkProps {
    children: React.ReactNode;
    url: string;
}

const SocialMediaLink = ({ url, children }: SocialMediaLinkProps) => {
  return (
    <Link href={url}>
        {children}
    </Link>
  );
};

export default SocialMediaLink;
