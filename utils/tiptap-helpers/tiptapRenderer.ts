import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { JSONContent } from "@tiptap/core";

// Define the extensions array with explicit type
const extensions: any[] = [
  StarterKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export function renderTipTapJSON(json: JSONContent | null): string {
  if (!json || !json.content) return "";
  return generateHTML(json, extensions);
}
