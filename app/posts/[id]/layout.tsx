import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return {
    title: `${id}`,
    description:
      "Browse a collection of posts showcasing Emilio Rivera's projects, experiences, and insights. Discover detailed write-ups and updates on topics including public speaking, software engineering, and more",
  };
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
