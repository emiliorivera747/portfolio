"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, RefreshCw } from "lucide-react";

type BlockType = "doc" | "image" | "iframe" | "code";

interface SortableBlockItemProps {
  id: string;
  children: ReactNode;
  onRemove: () => void;
  onChangeType?: (newType: BlockType) => void;
  currentType?: BlockType;
}

const TYPE_OPTIONS: { type: BlockType; label: string; path: string }[] = [
  {
    type: "doc",
    label: "Text",
    path: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
  },
  {
    type: "image",
    label: "Image",
    path: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
  },
  {
    type: "iframe",
    label: "Embed",
    path: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z",
  },
  {
    type: "code",
    label: "Code",
    path: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 15",
  },
];

const SortableBlockItem = ({
  id,
  children,
  onRemove,
  onChangeType,
  currentType,
}: SortableBlockItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showTypeMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowTypeMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showTypeMenu]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group flex items-start gap-2 rounded-lg border ${
        isDragging ? "border-primary-400 bg-primary-50" : "border-transparent"
      }`}
    >
      <button
        type="button"
        className="mt-2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity text-primary-400 hover:text-primary-600 shrink-0"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>

      <div className="flex-1 min-w-0">{children}</div>

      <div className="flex flex-col gap-1 mt-2 shrink-0">
        {onChangeType && (
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setShowTypeMenu((v) => !v)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-400 hover:text-primary-600"
              title="Change block type"
            >
              <RefreshCw size={16} />
            </button>

            {showTypeMenu && (
              <div className="absolute right-0 top-6 z-50 bg-white border border-primary-200 rounded-lg shadow-lg py-1 w-32">
                {TYPE_OPTIONS.filter((o) => o.type !== currentType).map(
                  ({ type, label, path }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        onChangeType(type);
                        setShowTypeMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary-800 hover:bg-primary-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 shrink-0"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                      </svg>
                      {label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-400 hover:text-red-500"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default SortableBlockItem;
