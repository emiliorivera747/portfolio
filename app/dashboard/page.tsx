"use client";
import React, { useRef } from "react";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Components
import RichTextEditor from "@/components/tiptap/RichTextEditor";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";

// Removed unused import BackToButton
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
    <section className="w-full box-border max-h-screen overflow-y-scroll flex flex-row gap-4 h-full">
      <div className=" h-full w-full px-[15%]">
        <div className="flex flex-col items-center mt-[3.5rem] w-full">
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
