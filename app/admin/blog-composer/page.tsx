"use client";
import React, { useRef, useState } from "react";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Components
import RichTextEditor from "@/components/tiptap/RichTextEditor";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";

// Removed unused import BackToButton
import MenuBar from "@/components/tiptap/MenuBar";

const extensions: any[] = [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "mb-6",
      },
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,
];

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const Page = () => {
  const buttonRef = useRef(null);
  const [blog, setState] = useState(null);

  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border  w-full border-primary-600 rounded-[12px] p-8 bg-zinc-50",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      console.log("Content updated", json);
    },
  });

  if (!editor) return null;

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      <div className="h-auto flex items-center justify-center mb-10">
        <div className="flex flex-col items-center  w-[40rem] pt-[4rem]">
          <h2 className="font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r to-primary-800 from-primary-900 mb-4">
            Create post
          </h2>

          <div className="flex flex-col items-start w-full mb-10">
            <label
              htmlFor="title"
              className="mb-2  text-primary-900 font-semibold"
            >
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              id="title"
              className="py-4 px-4 w-full bg-zinc-50 rounded-[12px] border border-primary-600"
            />
          </div>

          <div className="w-full">
            <h1 className="mb-4 font-semibold ">Content</h1>
            <MenuBar editor={editor} />
            <RichTextEditor editor={editor} />
          </div>

          <PrimarySubmitButton
            className="mt-4"
            ref={buttonRef}
            text="Publish"
          />
        </div>
      </div>

      <div className="h-screen flex bg-yellow-300 w-full">
        <h1>Displays the blog</h1>
      </div>
    </section>
  );
};

export default Page;
