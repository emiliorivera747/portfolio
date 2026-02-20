"use client";

import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

interface SortableBlockItemProps {
  id: string;
  children: ReactNode;
  onRemove: () => void;
}

const SortableBlockItem = ({ id, children, onRemove }: SortableBlockItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
      <button
        type="button"
        onClick={onRemove}
        className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary-400 hover:text-red-500 shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default SortableBlockItem;
