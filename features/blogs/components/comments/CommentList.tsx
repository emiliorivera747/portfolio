"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useFetchComments } from "@/features/blogs/hooks/useComments";
import { CommentResponse } from "@/features/blogs/types/post";

interface CommentListProps {
  postId: string;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const CommentList = ({ postId }: CommentListProps) => {
  const { commentsResponse, isLoadingComments } = useFetchComments(postId);
  const comments: CommentResponse[] = commentsResponse?.data ?? [];

  if (isLoadingComments) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="h-4 bg-primary-100 rounded w-1/3" />
            <div className="h-3 bg-primary-100 rounded w-full" />
            <div className="h-3 bg-primary-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="text-primary-500 text-sm italic">
        No comments yet. Be the first to share your thoughts!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-b border-primary-100 pb-4 last:border-0"
        >
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12">
              <AvatarFallback>
                {(comment.name || comment.email)[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="h-full  flex items-center">
              <span className="text-sm font-medium text-primary-800">
                {comment.name || "Anonymous"}
              </span>
              <span className="text-xs text-primary-700 ml-2 font-light">
                {comment.email}
              </span>
            </div>
            <span className="text-xs text-primary-700 ml-auto font-light">
              {timeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="text-[1rem] text-primary-800 pl-14 whitespace-pre-wrap font-extralight">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
