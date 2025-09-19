"use client";
import React from "react";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Components
import Tiptap from "@/components/tiptap/Tiptap";
// Removed unused import BackToButton
import NavbarLogo from "@/components/navbar/NavbarLogo";
import MenuBar from "@/components/tiptap/MenuBar";

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const Page = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    immediatelyRender: false,
    content: `
      <h3 style="text-align:center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p style="text-align:center">
        I come home in the morning light<br>
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p style="text-align:center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p style="text-align:center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
  });

  if (!editor) return null;
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
          <MenuBar editor={editor} />
          <Tiptap />
        </div>
      </div>
    </section>
  );
};

export default Page;
