"use cleint";
import React from "react";

// Components
import Tiptap from "@/components/tiptap/Tiptap";
import BackToButton from "@/components/buttons/BackToButton";
import NavbarLogo from "@/components/navbar/NavbarLogo";

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const page = () => {
  return (
    <section className="h-screen w-screen">
      <div className="grid grid-cols-[1fr_10fr] h-full w-full ">
        <div className="w-[16rem] flex justify-center border-r border-primary-300 my-10">
          <NavbarLogo
            logoTextColor={"text-black"}
            menuTextColor={"text-black"}
          />
        </div>

        <div className="px-10 flex flex-col items-center mt-20">
          <h2 className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r to-primary-700 from-primary-900 mb-10">
            Create post
          </h2>
          <Tiptap />
        </div>
      </div>
    </section>
  );
};

export default page;
