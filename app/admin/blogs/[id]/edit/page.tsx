"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryHeader from "@/components/headers/PrimaryHeader";
import { Form } from "@/components/ui/form";
import FormFieldGenerator from "@/components/form-builder/FormFieldGenerator";
import SecondaryHeader from "@/features/blog-composer/components/headings/SecondaryHeading";
import TextEditorBlock from "@/components/tiptap/TextEditorBlock";
import ImageBlock from "@/features/blog-composer/components/blocks/ImageBlock";
import PostContentSelect from "@/features/blog-composer/components/post-content/PostContentSelect";
import UploadButton from "@/components/form-components/UploadButton";

// Schemas
import {
  formSchema,
  FormSchema,
} from "@/features/blog-composer/schemas/composerSchemas";

// Data
import { fields } from "@/features/blog-composer/data/formFields";

// Types
import { ContentBlock } from "@/features/blogs/types/post";

// Hooks
import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import useUpdatePost from "@/features/blogs/hooks/useUpdatePost";
import useDeletePost from "@/features/blogs/hooks/useDeletePost";

// Context
import { ComposerProvider, useComposerContext } from "@/features/blog-composer/context/ComposerContext";

const EditPostForm = ({ postId }: { postId: string }) => {
  const buttonRef = useRef(null);
  const router = useRouter();
  const { postResponse, isLoadingPost, isErrorPost } = useFetchPostById({ id: postId });
  const { mutateUpdate, isPendingUpdate } = useUpdatePost(postId);
  const { mutateDelete, isPendingDelete } = useDeletePost(postId);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    blocks,
    setBlocks,
    handleFileChange,
  } = useComposerContext();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load post data into the form and blocks when it arrives
  useEffect(() => {
    if (postResponse?.data && !initialized) {
      const post = postResponse.data;

      form.reset({
        title: post.title || "",
        description: post.description || "",
      });

      // Map contentBlocks from the API response to ContentBlock[]
      if (post.contentBlocks && post.contentBlocks.length > 0) {
        const mappedBlocks: ContentBlock[] = post.contentBlocks.map(
          (block: any) => ({
            id: String(block.id),
            contentOrder: block.contentOrder,
            contentType: block.contentType,
            contentData: block.contentData,
            postId: block.postId,
            mediaId: block.mediaId,
            media: block.media || undefined,
          })
        );
        setBlocks(mappedBlocks);
      }

      setInitialized(true);
    }
  }, [postResponse, initialized, form, setBlocks]);

  const onSubmit = useCallback(
    (data: FormSchema) => {
      if (blocks.length === 0) return;

      mutateUpdate({
        title: data.title,
        description: data.description,
        contentBlocks: blocks.map(
          ({ contentOrder, contentData, contentType, media }, index) => ({
            contentOrder: contentOrder ?? index + 1,
            contentType,
            contentData,
            media: media ?? undefined,
          })
        ),
      });
    },
    [blocks, mutateUpdate]
  );

  const renderBlockComponent = (block: ContentBlock) => {
    switch (block.contentType) {
      case "doc":
        return <TextEditorBlock block={block} />;
      case "image":
        return <ImageBlock block={block} />;
    }
  };

  if (isLoadingPost) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse space-y-4 w-[40rem]">
          <div className="h-10 bg-gray-300 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded w-full" />
          <div className="h-8 bg-gray-200 rounded w-full" />
          <div className="h-40 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (isErrorPost) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500 text-lg">Failed to load post.</p>
        <button
          onClick={() => router.push("/admin/blogs")}
          className="text-primary-800 underline"
        >
          Back to blogs
        </button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-[40rem] pt-[4rem]"
      >
        <div className="flex items-center justify-between w-full mb-4">
          <PrimaryHeader title="Edit Post" />
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="w-full mb-4 p-4 border border-red-300 rounded-lg bg-red-50">
            <p className="text-red-800 text-sm mb-3">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => mutateDelete()}
                disabled={isPendingDelete}
                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isPendingDelete ? "Deleting..." : "Yes, delete"}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 text-sm border border-primary-300 rounded-md hover:bg-primary-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
        <SecondaryHeader label="Content" />

        <div className="w-full flex gap-4 flex-col">
          {blocks?.length > 0 &&
            blocks.map((block: ContentBlock) => (
              <div key={block.id}>{renderBlockComponent(block)}</div>
            ))}
        </div>

        <PostContentSelect />
        <PrimarySubmitButton
          className="mt-4"
          ref={buttonRef}
          text={isPendingUpdate ? "Saving..." : "Save Changes"}
        />
      </form>
    </Form>
  );
};

const EditPostPage = () => {
  const params = useParams();
  const postId = params.id as string;

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      <ComposerProvider>
        <div className="h-auto flex items-center justify-center mb-10 mx-[6%] flex-col">
          <EditPostForm postId={postId} />
        </div>
      </ComposerProvider>
    </section>
  );
};

export default EditPostPage;
