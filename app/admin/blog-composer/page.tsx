"use client";
import React, { useRef, useState } from "react";

//External Lib
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";
import DOMPurify from "dompurify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import RichTextEditor from "@/components/tiptap/RichTextEditor";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import CreatPost from "@/features/blog-composer/components/headings/CreatPost";
import MenuBar from "@/components/tiptap/MenuBar";
import PrimaryHeader from "@/components/headers/PrimaryHeader";
import TextInput from "@/components/form-components/TextInput";

// Zod Scheam
import {
  TitleSchema,
  titleSchema,
} from "@/features/blog-composer/schemas/composerSchemas";

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

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<TitleSchema>({
    resolver: zodResolver(titleSchema),
  });

  const [blogContent, setBlogContent] = useState<string | null>(null);

  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border  w-full border-primary-400 rounded-[12px] p-8 bg-zinc-50",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = renderTipTapJSON(json);
      console.log(json);
      setBlogContent(
        DOMPurify.sanitize(html, {
          ADD_TAGS: ["h1", "h2", "h3", "h4", "h5", "h6"],
          ADD_ATTR: ["class", "style"],
        })
      );
    },
  });

  if (!editor) return null;

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      <div className="h-auto flex items-center justify-center mb-10">
        <form className="flex flex-col items-center  w-[40rem] pt-[4rem]">
          <PrimaryHeader title={"Create Post"} />

          {/* Title */}
          <div
            className="w-full mb-4"
          >
            <TextInput
              type="text"
              id="title"
              placeholder="Title"
              errors={errors}
              register={register}
              fieldName="title"
            />
          </div>

          {/* Text Editor */}
          <div className="w-full mb-8">
            {/* <h1 className="mb-2 text-primary-700 font-light text-sm">Editor</h1> */}
            <MenuBar editor={editor} />
            <RichTextEditor editor={editor} />
          </div>

          {/* Primary Submit Button */}
          <PrimarySubmitButton
            className="mt-4"
            ref={buttonRef}
            text="Publish"
          />
        </form>
      </div>

      <div className="h-screen flex  w-full flex-col">
        <h1 className="text-2xl mb-10">Displays the blog</h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blogContent || "" }}
        />
      </div>
    </section>
  );
};

export default Page;
