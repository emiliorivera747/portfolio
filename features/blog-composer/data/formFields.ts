import { Control } from "react-hook-form";
import { FormSchema } from "@/features/blog-composer/schemas/composerSchemas";

export const fields: {
  id: string;
  name: keyof FormSchema;
  placeholder: string;
  type: string;
  control?: Control<FormSchema>;
}[] = [
  {
    id: "title",
    name: "title",
    placeholder: "Title",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    placeholder: "Description",
    type: "text",
  },
];
