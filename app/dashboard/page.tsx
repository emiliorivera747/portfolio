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
      <div className="grid grid-cols-[1fr_10fr] h-full w-full mt-10">
        <div className="px-6 mt-2">
          <BackToButton />
        </div>

        <div className="px-10 flex flex-col  items-center ">
          <h2 className="font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r to-primary-700 from-primary-900 mb-10">
            Create Post
          </h2>
          <Tiptap />
        </div>
      </div>
    </section>
  );
};

export default page;
