import React from "react";

import { getOptions } from "@/utils/editor-helper/getOptions";
import { Editor } from "@tiptap/react";

// Components
import { Toggle } from "@/components/ui/toggle";

/**
 *
 * The menu bar is used to make certain changes to the text in the editor
 *
 */
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const options = getOptions(editor);

  if (!editor) return null;

  return (
    <div className="control-group bg-primary-100 py-2 px-4 rounded-[12px] mb-4 w-full">
      <div className="button-group flex justify-between">
        {options.map(({ icon, pressed, clickFn, name }) => {
          return (
            <Toggle
              key={name}
              pressed={pressed}
              onPressedChange={clickFn}
              className={
                pressed ? "bg-accent text-accent-foreground font-bold" : ""
              }
            >
              {icon}
            </Toggle>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBar;
