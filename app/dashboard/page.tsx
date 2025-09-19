import React from "react";

// Components
import Tiptap from "@/components/tiptap/Tiptap";
import BackToButton from "@/components/buttons/BackToButton";

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const page = () => {
  return (
    <section className="h-screen w-screen">
      <div className="grid grid-cols-[1fr_90vw] h-full w-full mt-10">
        <div className="px-10 mt-2">
          <BackToButton />
        </div>

        <div className="px-10">
          <h2 className="font-bold text-4xl text-primary-1000 mb-4">Create Post</h2>
          <Tiptap />
        </div>
      </div>
    </section>
  );
};

export default page;
