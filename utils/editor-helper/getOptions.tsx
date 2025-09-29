import {
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
} from "lucide-react";
import { Editor } from "@tiptap/react";

export const getOptions = (editor: Editor | null) => [
  {
    icon: <Heading1 />,
    name: "heading1",
    clickFn: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    pressed: editor?.isActive("heading", { level: 1 }),
  },
  {
    icon: <Heading2 />,
    name: "heading2",
    clickFn: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    pressed: editor?.isActive("heading", { level: 2 }),
  },
  {
    icon: <Heading3 />,
    name: "heading3",
    clickFn: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    pressed: editor?.isActive("heading", { level: 3 }),
  },
  {
    icon: <Pilcrow />,
    name: "paragraph",
    clickFn: () => editor?.chain().focus().setParagraph().run(),
    pressed: editor?.isActive("paragraph"),
  },
  {
    icon: <Italic />,
    name: "italic",
    clickFn: () => editor?.chain().focus().toggleItalic().run(),
    pressed: editor?.isActive("italic"),
  },
  {
    icon: <Bold />,
    name: "bold",
    clickFn: () => editor?.chain().focus().toggleBold().run(),
    pressed: editor?.isActive("bold"),
  },
  {
    icon: <Strikethrough />,
    name: "strike",
    clickFn: () => editor?.chain().focus().toggleStrike().run(),
    pressed: editor?.isActive("strike"),
  },
  {
    icon: <Highlighter />,
    name: "highlight",
    clickFn: () => editor?.chain().focus().toggleHighlight().run(),
    pressed: editor?.isActive("highlight"),
  },
  {
    icon: <AlignLeft />,
    name: "alignLeft",
    clickFn: () => editor?.chain().focus().setTextAlign("left").run(),
    pressed: editor?.isActive({ textAlign: "left" }),
  },
  {
    icon: <AlignCenter />,
    name: "alignCenter",
    clickFn: () => editor?.chain().focus().setTextAlign("center").run(),
    pressed: editor?.isActive({ textAlign: "center" }),
  },
  {
    icon: <AlignRight className="bu"/>,
    name: "alignRight",
    clickFn: () => editor?.chain().focus().setTextAlign("right").run(),
    pressed: editor?.isActive({ textAlign: "right" }),
  },
  {
    icon: <AlignJustify />,
    name: "alignJustify",
    clickFn: () => editor?.chain().focus().setTextAlign("justify").run(),
    pressed: editor?.isActive({ textAlign: "justify" }),
  },
];
