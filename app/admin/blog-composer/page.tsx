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
import MenuBar from "@/components/tiptap/MenuBar";
import PrimaryHeader from "@/components/headers/PrimaryHeader";
import TextInput from "@/components/form-components/TextInputV2";
import { Form, FormField } from "@/components/ui/form";
import UploadButton from "@/components/form-components/UploadButton";
import PostContentSelect from "@/features/blog-composer/components/post-content/PostContentSelect";
import FormFieldGenerator from "@/components/form-builder/FormFieldGenerator";

// Zod Schemas
import {
  formSchema,
  FormSchema,
} from "@/features/blog-composer/schemas/composerSchemas";

// Hooks
import useCreatePost from "@/features/blog-composer/hooks/useCreatePost";
import useFile from "@/hooks/useFile";

// Types
import { PostWithRelations } from "@/features/blogs/types/post";

// Data
import { fields } from "@/features/blog-composer/data/formFields";

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
  const [open, setOpen] = useState(false);
  const [contentBlock, setContentBlock] = useState([]);

  const { mutatePost, isPendingPost } = useCreatePost();
  const { handleFileChange, file } = useFile();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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
      setBlogContent(
        DOMPurify.sanitize(html, {
          ADD_TAGS: ["h1", "h2", "h3", "h4", "h5", "h6"],
          ADD_ATTR: ["class", "style"],
        })
      );
    },
  });

  if (!editor) return null;

  const onSubmit = (data: FormSchema): void => {
    const jsonData = editor.getJSON();
    const content_blocks = [
      { content_order: 0, content_type: "paragraph", content_data: jsonData },
    ];
    const post: PostWithRelations = {
      title: data.title,
      content_blocks: content_blocks,
      description: data.description,
    };
    mutatePost(post);
  };

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      <div className="h-auto flex items-center justify-center mb-10 mx-[6%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center  w-[40rem] pt-[4rem]"
          >
            <PrimaryHeader title={"Create Post"} />
            <div className="w-full flex flex-col mb-10">
              <h1 className="text-lg font-medium text-primary-900 mb-2 ">
                Details
              </h1>

              <FormFieldGenerator
                fields={fields.map((field) => ({
                  ...field,
                  control: form.control as any,
                }))}
              />

              <UploadButton
                data-testid="upload-button"
                handleFileChange={handleFileChange}
                open={open}
                setOpen={setOpen}
              />
            </div>

            <PostContentSelect />

            {/* <div className="w-full mb-8">
              <MenuBar editor={editor} />
              <RichTextEditor editor={editor} />
            </div> */}

            <PrimarySubmitButton
              className="mt-4"
              ref={buttonRef}
              text="Publish"
            />
          </form>
        </Form>
      </div>
      {blogContent && (
        <div className="h-screen flex  w-full flex-col mx-20">
          <PrimaryHeader title="Blog Preview" className="text-2xl" />
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogContent || "" }}
          />
        </div>
      )}
    </section>
  );
};

export default Page;
