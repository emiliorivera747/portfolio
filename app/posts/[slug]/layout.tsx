import React from "react";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  return {
    title: `${params.slug}`,
    description:
      "Browse a collection of posts showcasing Emilio Rivera's projects, experiences, and insights. Discover detailed write-ups and updates on topics including public speaking, software engineering, and more",
  };
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
