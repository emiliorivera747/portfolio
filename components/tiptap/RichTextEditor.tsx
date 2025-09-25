"use client";

import { EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/react";

/**
 * The editor allows the user to update and style their code.
 */
const RichTextEditor = ({ editor }: { editor: Editor | null }) => {
  return <EditorContent editor={editor} />;
};

export default RichTextEditor;
