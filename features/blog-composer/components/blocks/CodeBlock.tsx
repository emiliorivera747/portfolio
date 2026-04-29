"use client";
import { useState } from "react";
import { ContentBlock } from "@/features/blogs/types/post";
import { useComposerContext } from "@/features/blog-composer/context/ComposerContext";

const LANGUAGES = [
  "javascript", "typescript", "jsx", "tsx", "python",
  "bash", "sql", "json", "html", "css", "rust", "go",
];

const CodeBlock = ({ block }: { block: ContentBlock }) => {
  const { updateBlock, getId, setCurrentBlock, blocks } = useComposerContext();
  const [code, setCode] = useState<string>(block.contentData?.code ?? "");
  const [language, setLanguage] = useState<string>(
    block.contentData?.language ?? "javascript"
  );

  const isEditing = getId() === block.id;

  const handleActivate = () => {
    const current = blocks.find((b) => b.id === block.id);
    setCurrentBlock(current ?? null);
  };

  const handleBlur = () => {
    updateBlock(block.id, { contentData: { code, language } });
  };

  return (
    <div className="w-full rounded-[12px] py-4">
      {isEditing ? (
        <div className="flex flex-col gap-3 border border-primary-300 rounded-[12px] p-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onBlur={handleBlur}
            className="w-40 rounded-md border border-primary-300 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <textarea
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onBlur={handleBlur}
            placeholder="Paste or type your code here..."
            rows={12}
            spellCheck={false}
            className="w-full font-mono text-sm rounded-md border border-primary-300 bg-[#1e1e1e] text-[#d4d4d4] px-4 py-3 outline-none focus:border-primary-500 resize-y"
          />
        </div>
      ) : (
        <div
          onClick={handleActivate}
          className="w-full hover:border hover:border-primary-500 border border-transparent rounded-[12px] cursor-pointer overflow-hidden"
        >
          {code ? (
            <div className="bg-[#1e1e1e] rounded-[12px] overflow-hidden">
              <div className="flex items-center px-4 py-2 bg-[#2d2d2d]">
                <span className="text-xs text-gray-400 font-mono">{language}</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-[#d4d4d4] text-sm font-mono whitespace-pre">
                  {code}
                </code>
              </pre>
            </div>
          ) : (
            <p className="text-gray-400 text-sm py-4 px-2">
              Click to add code...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
