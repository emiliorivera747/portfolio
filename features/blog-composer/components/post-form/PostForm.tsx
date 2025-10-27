"use client";
import React, { useState, useRef } from "react";

// External Lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryHeader from "@/components/headers/PrimaryHeader";
import { Form, FormField } from "@/components/ui/form";
import UploadButton from "@/components/form-components/UploadButton";
import PostContentSelect from "@/features/blog-composer/components/post-content/PostContentSelect";
import FormFieldGenerator from "@/components/form-builder/FormFieldGenerator";
import SecondaryHeader from "@/features/blog-composer/components/headings/SecondaryHeading";
import PostContent from "@/features/blog-composer/components/post-content/PostContent";
import MenuBar from "@/components/tiptap/MenuBar";
import RichTextEditor from "@/components/tiptap/RichTextEditor";
import EditorWithMenu from "@/components/tiptap/EditorWithMenu";
import TextEditorBlock from "@/components/tiptap/TextEditorBlock";

// Zod Schemas
import {
  formSchema,
  FormSchema,
} from "@/features/blog-composer/schemas/composerSchemas";

// Hooks
import useFile from "@/hooks/useFile";

// Data
import { fields } from "@/features/blog-composer/data/formFields";

// Types
import { Editor } from "@tiptap/react";
import { ContentBlock } from "@/features/blogs/types/post";

interface PostFormProps {
  onSubmit: (data: FormSchema) => void;
  contentBlocks: ContentBlock[];
  currentBlockId?: string;
  handleEnterEditMode: (blockId: string) => void;
  addBlock: (block: ContentBlock) => void;
}

const PostForm = ({
  onSubmit,
  contentBlocks,
  currentBlockId,
  handleEnterEditMode,
  addBlock,
}: PostFormProps) => {
  const buttonRef = useRef(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { handleFileChange, file } = useFile();
  const [open, setOpen] = useState(false);

  const renderBlockComponent = (block: ContentBlock) => {
    switch (block.content_type) {
      case "doc":
        return (
          <TextEditorBlock
            block={block}
            isEditing={block.id === currentBlockId}
            onEnterEditMode={handleEnterEditMode}
            onUpdate={() => {}}
          />
        );
    }
  };

  return (
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
        <PostContentSelect addBlock={addBlock} />
        <div className="w-full flex gap-4 flex-col">
          {contentBlocks.map((block) => {
            return <div key={block.id}>{renderBlockComponent(block)}</div>;
          })}
        </div>

        <PrimarySubmitButton className="mt-4" ref={buttonRef} text="Publish" />
      </form>
    </Form>
  );
};

export default PostForm;
