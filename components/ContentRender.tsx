"use client";

import { ContentBlock } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { v4 } from "uuid";

interface ContentRendererProps {
  blocks?: ContentBlock[];
  htmlContent?: string;
  className?: string;
}

export default function ContentRenderer({
  blocks,
  htmlContent,
  className = "",
}: ContentRendererProps) {
  // If blocks are provided, render them
  if (blocks && blocks.length > 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </div>
    );
  }

  // If HTML content is provided, parse and render it
  if (htmlContent) {
    return (
      <div
        className={`prose prose-invert prose-emerald max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  return null;
}

// Block Renderer Component
function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading1":
      return (
        <h1 className="text-4xl font-bold text-white tracking-tight">
          {block.content}
        </h1>
      );

    case "heading2":
      return (
        <h2 className="text-3xl font-bold text-white tracking-tight mt-12 mb-4 flex items-center gap-3">
          <span className="h-8 w-1 bg-emerald-500 rounded-full" />
          {block.content}
        </h2>
      );

    case "heading3":
      return (
        <h3 className="text-2xl font-bold text-white tracking-tight mt-8 mb-3">
          {block.content}
        </h3>
      );

    case "paragraph":
      return (
        <p className="text-zinc-400 leading-relaxed text-lg">{block.content}</p>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 my-6 italic text-zinc-400 bg-emerald-500/5 rounded-r">
          <p className="text-lg">{block.content}</p>
        </blockquote>
      );

    case "code":
      return (
        <div className="my-6 rounded-lg border border-zinc-800 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-xs text-zinc-600">
              {block.metadata?.language || "code"}
            </span>
          </div>
          <SyntaxHighlighter
            language={block.metadata?.language || "javascript"}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1.5rem",
              background: "#0a0a0a",
              fontSize: "0.875rem",
            }}
          >
            {block.content}
          </SyntaxHighlighter>
        </div>
      );

    case "bulletList":
      return (
        <div className="flex items-start gap-3 my-2">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <p className="flex-1 text-zinc-400 leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "numberedList":
      return (
        <div className="flex items-start gap-3 my-2">
          <span className="mt-0.5 font-mono text-sm text-emerald-500">•</span>
          <p className="flex-1 text-zinc-400 leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "checklist":
      return (
        <div className="flex items-start gap-3 my-2">
          <input
            type="checkbox"
            checked={block.metadata?.checked || false}
            disabled
            className="mt-1.5 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500"
          />
          <p
            className={`flex-1 text-zinc-400 leading-relaxed ${
              block.metadata?.checked ? "line-through opacity-50" : ""
            }`}
          >
            {block.content}
          </p>
        </div>
      );

    case "image":
      return (
        <figure className="my-8">
          <img
            src={block.metadata?.url || ""}
            alt={block.metadata?.alt || block.content}
            className="w-full rounded-lg border border-zinc-800"
          />
          {block.content && (
            <figcaption className="mt-2 text-center text-sm text-zinc-500">
              {block.content}
            </figcaption>
          )}
        </figure>
      );

    default:
      return <p className="text-zinc-400 leading-relaxed">{block.content}</p>;
  }
}

// Helper function to convert HTML to blocks (for backward compatibility)
export function htmlToBlocks(html: string): ContentBlock[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: ContentBlock[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      const content = element.textContent || "";

      switch (tagName) {
        case "h1":
          blocks.push({ type: "heading1", content, id: v4() });
          break;
        case "h2":
          blocks.push({ type: "heading2", content, id: v4() });
          break;
        case "h3":
          blocks.push({ type: "heading3", content, id: v4() });
          break;
        case "p":
          blocks.push({ type: "paragraph", content, id: v4() });
          break;
        case "blockquote":
          blocks.push({ type: "quote", content, id: v4() });
          break;
        case "pre":
          const code = element.querySelector("code");
          blocks.push({
            type: "code",
            content: code?.textContent || content,
            id: v4(),
          });
          break;
        case "ul":
          element.querySelectorAll("li").forEach((li) => {
            blocks.push({
              type: "bulletList",
              content: li.textContent || "",
              id: v4(),
            });
          });
          break;
        case "ol":
          element.querySelectorAll("li").forEach((li) => {
            blocks.push({
              type: "numberedList",
              content: li.textContent || "",
              id: v4(),
            });
          });
          break;
        case "img":
          blocks.push({
            type: "image",
            content: element.getAttribute("alt") || "",
            metadata: {
              url: element.getAttribute("src") || "",
              alt: element.getAttribute("alt") || "",
            },
            id: v4(),
          });
          break;
      }
    }
  });

  return blocks;
}
