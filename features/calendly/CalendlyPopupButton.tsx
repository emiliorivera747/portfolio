"use client"; // Required for client-side rendering in Next.js
import React, { useRef, useState, useEffect } from "react";
import { PopupButton } from "react-calendly";

const CalendlyPopupButton = () => {
  const rootElementRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
 
      const root = document.getElementById("__next") || document.getElementById("root");
      if (root) {
        rootElementRef.current = root;
        setIsReady(true);
      } else {
        console.error("Root element not found. Ensure the DOM contains an element with id='__next' or 'root'.");
      }
    }
  }, []);

  // Show a fallback if the component is not ready or URL is missing
  if (!isReady) {
    return <div>Loading Calendly button...</div>;
  }

  const calendlyUrl = "https://calendly.com/emiliorivera747/30min";
  if (!calendlyUrl) {
    console.error("Calendly URL is missing. Please set NEXT_PUBLIC_CALENDLY_EVENT_LINK in .env.");
    return <div>Error: Calendly URL not configured</div>;
  }

  return (
    <PopupButton
      className="border-2 border-white px-6 py-4 font-semibold text-white hover:bg-white hover:text-primary-1000 rounded-full"
      url={calendlyUrl}
      rootElement={rootElementRef.current as HTMLElement}
      text="Schedule Consultation"
    />
  );
};

export default CalendlyPopupButton;