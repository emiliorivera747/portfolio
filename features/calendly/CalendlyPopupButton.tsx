"use client"; // Required for client-side rendering in Next.js
import React, { useRef, useState, useEffect } from "react";
import { PopupButton } from "react-calendly";
import { useTime, useTransform, motion } from "framer-motion";

const CalendlyPopupButton = () => {
  const time = useTime();
  const rootElementRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const rotate = useTransform(time, [0, 2000], [0, 360], { clamp: false });

  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, #e03131, #4263eb, #4263eb,#fcc419, #e03131)`;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Use useEffect to set the root element after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const root =
        document.getElementById("__next") || document.getElementById("root");
      if (root) {
        rootElementRef.current = root;
        setIsReady(true);
      } else {
      }
    }
  }, []);
  
  if (!isReady) {
    return <div>Loading Calendly button...</div>;
  }

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_EVENT_LINK;
  if (!calendlyUrl) return <div>Error: Calendly URL not configured</div>;

  return (
    <div className="popup-button-wrapper">
      <PopupButton
        className={`calendlyButton px-6 py-4 font-semibold rounded-full ${
          isVisible ? "border-transparent" : ""
        }`}
        url={calendlyUrl}
        rootElement={rootElementRef.current as HTMLElement}
        text="Schedule Consultation"
      />

      {isVisible && (
        <motion.div
          style={{
            background: rotatingBg,
          }}
          {...{ className: "popup-button-border" }}
        />
      )}
    </div>
  );
};

export default CalendlyPopupButton;
