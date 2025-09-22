"use client";

import { EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/react";

/**
 * The editor allows the user to update and style their code.
 */
const Tiptap = ({ editor }: { editor: Editor | null }) => {
  return (
    <EditorContent
      editor={editor}
      className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border  w-[40rem] border-primary-600 "
    />
  );
};

export default Tiptap;
