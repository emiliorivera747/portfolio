import React from "react";

const Footer = () => {
  return (
    <footer className=" text-primary-700 py-6 border-tertiary-100 sm:mx-20 bottom-0 left-0 right-0 text-xs border-t font-light">
      <div className="h-full text-center items-center w-full">
        <p className="text-xs text-tertiary-1000">
          &copy; {new Date().getFullYear()} Emilio Ulises Rivera. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-tertiary-200">
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" className="hover:text-gray-400 ml-2">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
