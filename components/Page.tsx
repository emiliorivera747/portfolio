"use client";
import { useEffect, useState, memo } from "react";
import LoadingPage from "./loading/LoadingPage";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reduce artificial delay for better performance
    // Only show loading for minimum necessary time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Reduced from 1000ms to 300ms

    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) return <LoadingPage theme="white" />;
  return <main>{children}</main>;
};

export default memo(Page);
