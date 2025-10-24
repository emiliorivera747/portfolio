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
import SecondaryHeader from "@/features/blog-composer/components/headings/SecondaryHeading";
import PostContent from "@/features/blog-composer/components/post-content/PostContent";

// Zod Schemas
import {
  formSchema,
  FormSchema,
} from "@/features/blog-composer/schemas/composerSchemas";

// Hooks
import useCreatePost from "@/features/blog-composer/hooks/useCreatePost";
import useFile from "@/hooks/useFile";
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";

// Data
import { fields } from "@/features/blog-composer/data/formFields";

// Config
import { editorConfig } from "@/features/blog-composer/config/editorConfig";

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

  const { handleFileChange, file } = useFile();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [blogContent, setBlogContent] = useState<string | null>(null);

  const editor = useEditor({
    ...editorConfig,
    extensions: extensions,
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
  const { onSubmit } = useSubmitPost({ editor: editor });

  if (!editor) return null;

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
              <SecondaryHeader label="Details" />
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

      {/* Preview of the Post Content */}
      {blogContent && <PostContent blogContent={blogContent} />}
    </section>
  );
};

export default Page;
