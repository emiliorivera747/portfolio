"use client";
import React, { useRef } from "react";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Components
import RichTextEditor from "@/components/tiptap/RichTextEditor";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      const html = editor.getHTML();
      const json = editor.getJSON();
      console.log("Content updated", json);
    },
  });

  if (!editor) return null;

  return (
    <section className="w-full box-border max-h-screen overflow-y-scroll flex flex-row gap-4 h-full  items-center justify-center">
      <div className="h-full w-[36rem] ">
        <div className="flex flex-col items-center mt-[20%] w-full">
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
    </section>
  );
};

export default Page;
