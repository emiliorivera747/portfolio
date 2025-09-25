"use client";
import React, { useRef } from "react";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Components
import RichTextEditor from "@/components/tiptap/RichTextEditor";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import SideNavigationBar from "@/components/navigation/SideNavigationBar";

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
  const buttonRef = useRef(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border  w-full border-primary-600 rounded-[12px] p-8 bg-zinc-50",
      },
    },
    onUpdate: ({ editor }) => {
      // const html = editor.getHTML();
      const json = editor.getJSON();
      console.log("Content updated", json);
    },
  });

  if (!editor) return null;

  return (
    <section className="h-screen w-screen">
      <div className="grid grid-cols-[1fr_10fr] h-full w-full ">
        <SideNavigationBar />
        <div className="px-[20%] flex flex-col items-center mt-20 ">
          <h2 className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r to-primary-800 from-primary-1000 mb-10">
            Create post
          </h2>
          <MenuBar editor={editor} />
          <RichTextEditor editor={editor} />
          <PrimarySubmitButton
            className="mt-4"
            ref={buttonRef}
            text="Publish"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
