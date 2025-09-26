import React from "react";

import { Editor } from "@tiptap/react";
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

const getOptions = (editor: Editor | null) => [
  {
    icon: <Heading1 />,
    name: "heading1",
    clickFn: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    pressed: editor?.isActive("heading", { level: 1 }) ? "is-active" : "",
  },
  {
    icon: <Heading2 />,
    name: "heading2",
    clickFn: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    pressed: editor?.isActive("heading", { level: 2 }) ? "is-active" : "",
  },
  {
    icon: <Heading3 />,
    name: "heading3",
    clickFn: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    pressed: editor?.isActive("heading", { level: 3 }) ? "is-active" : "",
  },
  {
    icon: <Pilcrow />,
    name: "paragraph",
    clickFn: () => editor?.chain().focus().setParagraph().run(),
    pressed: editor?.isActive("paragraph") ? "is-active" : "",
  },
  {
    icon: <Italic />,
    name: "italic",
    clickFn: () => editor?.chain().focus().toggleItalic().run(),
    pressed: editor?.isActive("italic") ? "is-active" : "",
  },
  {
    icon: <Bold />,
    name: "bold",
    clickFn: () => editor?.chain().focus().toggleBold().run(),
    pressed: editor?.isActive("bold") ? "is-active" : "",
  },
  {
    icon: <Strikethrough />,
    name: "strike",
    clickFn: () => editor?.chain().focus().toggleStrike().run(),
    pressed: editor?.isActive("strike") ? "is-active" : "",
  },
  {
    icon: <Highlighter />,
    name: "highlight",
    clickFn: () => editor?.chain().focus().toggleHighlight().run(),
    pressed: editor?.isActive("highlight") ? "is-active" : "",
  },
  {
    icon: <AlignLeft />,
    name: "alignLeft",
    clickFn: () => editor?.chain().focus().setTextAlign("left").run(),
    pressed: editor?.isActive({ textAlign: "left" }) ? "is-active" : "",
  },
  {
    icon: <AlignCenter />,
    name: "alignCenter",
    clickFn: () => editor?.chain().focus().setTextAlign("center").run(),
    pressed: editor?.isActive({ textAlign: "center" }) ? "is-active" : "",
  },
  {
    icon: <AlignRight />,
    name: "alignRight",
    clickFn: () => editor?.chain().focus().setTextAlign("right").run(),
    pressed: editor?.isActive({ textAlign: "right" }) ? "is-active" : "",
  },
  {
    icon: <AlignJustify />,
    name: "alignJustify",
    clickFn: () => editor?.chain().focus().setTextAlign("justify").run(),
    pressed: editor?.isActive({ textAlign: "justify" }) ? "is-active" : "",
  },
];

/**
 *
 * The menu bar is used to make certain changes to the text in the editor
 *
 */
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const options = getOptions(editor);
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group bg-primary-200 py-4 px-4 rounded-[12px] mb-4 w-full">
      <div className="button-group flex justify-between">
        {options.map(({ icon, pressed, clickFn, name }) => {
          return (
            <button key={name} onClick={clickFn} className={pressed}>
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBar;
