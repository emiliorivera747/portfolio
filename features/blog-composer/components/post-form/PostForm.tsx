"use client";
import { useState, useRef } from "react";

// External Lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryHeader from "@/components/titles/PrimaryHeader";
import { Form } from "@/components/ui/form";
import UploadButton from "@/components/form-components/UploadButton";
import PostContentSelect from "@/features/blog-composer/components/post-content/PostContentSelect";
import FormFieldGenerator from "@/components/form-builder/FormFieldGenerator";
import SecondaryHeader from "@/features/blog-composer/components/headings/SecondaryHeading";
import TextEditorBlock from "@/components/tiptap/TextEditorBlock";
import ImageBlock from "@/features/blog-composer/components/blocks/ImageBlock";
import SortableBlockItem from "@/features/blog-composer/components/blocks/SortableBlockItem";

// Zod Schemas
import {
  formSchema,
  FormSchema,
} from "@/features/blog-composer/schemas/composerSchemas";

// Data
import { fields } from "@/features/blog-composer/data/formFields";

// Types
import { ContentBlock } from "@/features/blogs/types/post";

// Context
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

/**
 *
 * Form for Post Composer
 *
 */
const PostForm = () => {
  const buttonRef = useRef(null);

  const { onSubmit, blocks, handleFileChange, moveBlock, removeBlock } =
    useComposerContext();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      moveBlock(oldIndex, newIndex);
    }
  };

  const renderBlockComponent = (block: ContentBlock) => {
    switch (block.contentType) {
      case "doc":
        return <TextEditorBlock block={block} />;
      case "image":
        return <ImageBlock block={block} />;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
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
        <SecondaryHeader label="Content" />

        {/* Renders the blocks with drag-and-drop reordering */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="w-full flex gap-4 flex-col">
              {blocks?.length > 0 &&
                blocks.map((block: ContentBlock) => (
                  <SortableBlockItem
                    key={block.id}
                    id={block.id}
                    onRemove={() => removeBlock(block.id)}
                  >
                    {renderBlockComponent(block)}
                  </SortableBlockItem>
                ))}
            </div>
          </SortableContext>
        </DndContext>
        {/* Allows you to select the content type */}
        <PostContentSelect />
        <PrimarySubmitButton className="mt-4" ref={buttonRef} text="Publish" />
      </form>
    </Form>
  );
};

export default PostForm;
