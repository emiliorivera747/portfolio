"use client";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  return (
    <section className="mt-12 pt-8 border-t border-primary-200">
      <h2 className="text-2xl font-semibold text-primary-900 mb-6">
        Comments
      </h2>
      <div className="mb-8">
        <CommentForm postId={postId} />
      </div>
      <CommentList postId={postId} />
    </section>
  );
};

export default CommentSection;
