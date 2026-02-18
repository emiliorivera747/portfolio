"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateComment, useVerifyComment } from "@/features/blogs/hooks/useComments";
import { toast } from "sonner";

const commentSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email("Please enter a valid email"),
  content: z.string().min(1, "Comment cannot be empty").max(2000, "Comment is too long"),
});

const verifySchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type CommentFormData = z.infer<typeof commentSchema>;
type VerifyFormData = z.infer<typeof verifySchema>;

interface CommentFormProps {
  postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const [step, setStep] = useState<"compose" | "verify">("compose");
  const [commentId, setCommentId] = useState<number | null>(null);

  const createComment = useCreateComment(postId);
  const verifyComment = useVerifyComment(postId);

  const composeForm = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: { name: "", email: "", content: "" },
  });

  const verifyForm = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const onSubmitComment = async (data: CommentFormData) => {
    try {
      const result = await createComment.mutateAsync(data);
      setCommentId(result.data.comment_id);
      setStep("verify");
      toast.success("Verification code sent to your email!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit comment");
    }
  };

  const onSubmitCode = async (data: VerifyFormData) => {
    if (!commentId) return;
    try {
      await verifyComment.mutateAsync({
        comment_id: commentId,
        code: data.code,
      });
      toast.success("Comment published!");
      setStep("compose");
      setCommentId(null);
      composeForm.reset();
      verifyForm.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed");
    }
  };

  const handleCancel = () => {
    setStep("compose");
    setCommentId(null);
    verifyForm.reset();
  };

  if (step === "verify") {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
          <p className="text-sm text-primary-700 mb-1 font-medium">
            Check your email
          </p>
          <p className="text-sm text-primary-600">
            We sent a 6-digit verification code to{" "}
            <span className="font-medium">{composeForm.getValues("email")}</span>.
            Enter it below to publish your comment.
          </p>
        </div>
        <form onSubmit={verifyForm.handleSubmit(onSubmitCode)} className="space-y-3">
          <div>
            <Input
              {...verifyForm.register("code")}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="text-center text-lg tracking-[0.3em] font-mono"
              autoFocus
            />
            {verifyForm.formState.errors.code && (
              <p className="text-sm text-red-500 mt-1">
                {verifyForm.formState.errors.code.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={verifyComment.isPending}
              className="flex-1"
            >
              {verifyComment.isPending ? "Verifying..." : "Verify & Publish"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={composeForm.handleSubmit(onSubmitComment)} className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            {...composeForm.register("name")}
            placeholder="Name (optional)"
          />
        </div>
        <div className="flex-1">
          <Input
            {...composeForm.register("email")}
            placeholder="Email *"
            type="email"
          />
          {composeForm.formState.errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {composeForm.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <textarea
          {...composeForm.register("content")}
          placeholder="Write a comment..."
          rows={3}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
        />
        {composeForm.formState.errors.content && (
          <p className="text-sm text-red-500 mt-1">
            {composeForm.formState.errors.content.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={createComment.isPending}
      >
        {createComment.isPending ? "Submitting..." : "Submit Comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
