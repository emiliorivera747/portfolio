import React from 'react';

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <main>{children}</main>
  )
}

export default Page;