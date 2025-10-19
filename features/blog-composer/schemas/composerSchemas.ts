import { z } from "zod";

export const formSchema = z.object({
  title: z.string().max(60, "Email cannot be longer than 60 characters"),
  description: z.string().max(60, "Email cannot be longer than 60 characters"),
});

export type FormSchema = z.infer<typeof formSchema>;
