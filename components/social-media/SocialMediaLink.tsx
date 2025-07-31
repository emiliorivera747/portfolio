
import React from "react";
import Link from "next/link";
import { SocialMediaLinkProps } from "@/types/socialMediaLink";


/**
 * A reusable component for rendering a social media link.
 * This component wraps its children with a Next.js `Link` component
 * to navigate to the specified URL.
 *
 * @param {SocialMediaLinkProps} props - The properties for the SocialMediaLink component.
 * @param {string} props.url - The URL to navigate to when the link is clicked.
 * @param {React.ReactNode} props.children - The content to be displayed inside the link.
 * @returns {JSX.Element} A Next.js `Link` component wrapping the provided children.
 */
const SocialMediaLink = ({ url, children }: SocialMediaLinkProps) => {
  return (
    <Link href={url}>
        {children}
    </Link>
  );
};

export default SocialMediaLink;
