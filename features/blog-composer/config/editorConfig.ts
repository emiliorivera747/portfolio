import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

export const editorConfig = {
  immediatelyRender: false,
  content: "",
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl border w-full border-primary-400 rounded-[12px] p-8 bg-zinc-50",
    },
  },
};

export const extensions: any[] = [
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
