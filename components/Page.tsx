"use client";
import { useEffect, useState } from "react";
import LoadingPage from "./loading/LoadingPage";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return <LoadingPage theme="white" />;
  return <main>{children}</main>;
};

export default Page;
