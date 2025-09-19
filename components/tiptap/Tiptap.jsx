"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/**
 * The editor allows the user to update and style their code.
 */
const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  return (
    <EditorContent
      editor={editor}
      className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border rounded-[12px] p-4 w-[40rem] border-primary-600 "
    />
  );
};

export default Tiptap;
