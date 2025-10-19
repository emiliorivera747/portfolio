import { z } from "zod";

export const formSchema = z.object({
  title: z.string().max(100, "Title cannot be longer than 100 characters"),
  description: z.string().max(100, "Description cannot be longer than 100 characters"),
});

export type FormSchema = z.infer<typeof formSchema>;
