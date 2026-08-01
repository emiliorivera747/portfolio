import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

// Images (upload nodes) are already handled by the default converters — this
// only adds the Code block, styled to match the old blog's code blocks.
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    Code: ({ node }: { node: { fields: unknown } }) => {
      const { code, language } = node.fields as {
        code?: string;
        language?: string;
      };
      if (!code) return null;

      return (
        <div className="mb-4 sm:mb-10 rounded-[12px] overflow-hidden bg-[#1e1e1e]">
          <div className="flex items-center px-4 py-2 bg-[#2d2d2d]">
            <span className="text-xs text-gray-400 font-mono">
              {language ?? "code"}
            </span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[#d4d4d4] text-sm font-mono whitespace-pre">
              {code}
            </code>
          </pre>
        </div>
      );
    },
  },
});

export default function RichText({ data }: { data: DefaultTypedEditorState }) {
  // The `rich-text` class carries list styling from globals.css — Tailwind's
  // preflight strips markers and padding off ul/ol, so bullets authored in
  // the CMS otherwise render as flat, marker-less lines.
  return (
    <div className="rich-text">
      <PayloadRichText data={data} converters={converters} disableContainer />
    </div>
  );
}
