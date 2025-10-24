"use client";
import React, { useRef, useState } from "react";

//External Lib
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
import PostForm from "@/features/blog-composer/components/post-form/PostForm";

// Zod Schemas
import {
  formSchema,
  FormSchema,
} from "@/features/blog-composer/schemas/composerSchemas";

// Hooks
import useFile from "@/hooks/useFile";
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";
import useBlogEditor from "@/features/blog-composer/hooks/useBlogEditor";

// Data
import { fields } from "@/features/blog-composer/data/formFields";

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const Page = () => {
  const { editor, blogContent } = useBlogEditor();
  const { onSubmit } = useSubmitPost({ editor: editor });

  if (!editor) return null;

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      {/* Form to show editor */}
      <div className="h-auto flex items-center justify-center mb-10 mx-[6%]">
        <PostForm editor={editor} onSubmit={onSubmit} />
      </div>

      {/* Preview of the Post Content */}
      {blogContent && <PostContent blogContent={blogContent} />}
    </section>
  );
};

export default Page;
