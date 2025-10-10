import { z } from "zod";

export const titleSchema = z.object({
  title: z.string().max(60, "Email cannot be longer than 60 characters"),
});

export type TitleSchema = z.infer<typeof titleSchema>;
