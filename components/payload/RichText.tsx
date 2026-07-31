import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

export default function RichText({ data }: { data: DefaultTypedEditorState }) {
  return <PayloadRichText data={data} disableContainer />;
}
