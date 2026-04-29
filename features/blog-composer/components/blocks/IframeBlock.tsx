"use client";
import { useState } from "react";
import { ContentBlock } from "@/features/blogs/types/post";
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

const IframeBlock = ({ block }: { block: ContentBlock }) => {
  const { updateBlock, getId, setCurrentBlock, blocks } = useComposerContext();
  const [inputValue, setInputValue] = useState<string>(
    block.contentData?.src ?? ""
  );

  const isEditing = getId() === block.id;
  const src: string = block.contentData?.src ?? "";

  const handleActivate = () => {
    const current = blocks.find((b) => b.id === block.id);
    setCurrentBlock(current ?? null);
  };

  const handleBlur = () => {
    updateBlock(block.id, { contentData: { src: inputValue } });
  };

  return (
    <div className="w-full rounded-[12px] py-4">
      {isEditing ? (
        <div className="flex flex-col gap-3 border border-primary-300 rounded-[12px] p-4">
          <input
            autoFocus
            type="url"
            placeholder="Paste embed URL (e.g. https://codesandbox.io/embed/...)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            className="w-full rounded-md border border-primary-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-primary-500"
          />
          {inputValue && (
            <iframe
              src={inputValue}
              className="w-full rounded-[8px]"
              style={{ height: 500, border: 0 }}
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          )}
        </div>
      ) : (
        <div
          onClick={handleActivate}
          className="w-full hover:border hover:border-primary-500 border border-transparent rounded-[12px] cursor-pointer overflow-hidden"
        >
          {src ? (
            <iframe
              src={src}
              className="w-full rounded-[8px] pointer-events-none"
              style={{ height: 500, border: 0 }}
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          ) : (
            <p className="text-gray-400 text-sm py-4 px-2">
              Click to add embed URL...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default IframeBlock;
