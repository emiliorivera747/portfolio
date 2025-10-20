"use client";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PostContentSelectProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PostContentSelect = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <h1 className="text-lg font-medium text-primary-900 mb-2 mt-4">
        Post Content
      </h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="rounded-[12px] py-4 border w-full h-full flex items-center justify-center hover:bg-primary-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent className="h-[50%] ">
          <DialogHeader>
            <DialogTitle>Select Content</DialogTitle>

            <DialogTrigger>
              <div className="bg-secondary-900 hover:bg-secondary-1000 text-white py-4 rounded-[12px] font-medium my-4">
                Submit
              </div>
            </DialogTrigger>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostContentSelect;
