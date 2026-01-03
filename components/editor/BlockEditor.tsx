// components/editor/BlockEditor.tsx
"use client";

import { BlockType, ContentBlock } from "@/types";
import {
  CheckSquare,
  Code,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  List,
  ListOrdered,
  Plus,
  Quote,
  Trash2,
  Type,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

interface BlockEditorProps {
  initialContent?: ContentBlock[];
  onChange?: (blocks: ContentBlock[]) => void;
  placeholder?: string;
}

/* -------------------------------- Utils -------------------------------- */

function generateId() {
  return v4();
}

function placeCaretAtEnd(el: HTMLElement) {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

/* ------------------------------ Main Editor ------------------------------ */

export default function BlockEditor({
  initialContent = [],
  onChange,
  placeholder = "Start typing or press '/' for commands...",
}: BlockEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(() => {
    if (initialContent.length > 0) return initialContent;
    return [{ id: generateId(), type: "paragraph", content: "" }];
  });

  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [draggedId, setDraggedId] = useState<string | null>(null);

  useEffect(() => {
    onChange?.(blocks);
  }, [blocks]);

  /* ------------------------------ Block Ops ------------------------------ */

  const addBlock = (afterId: string, type: BlockType = "paragraph") => {
    const index = blocks.findIndex((b) => b.id === afterId);
    const newBlock: ContentBlock = {
      id: generateId(),
      type,
      content: "",
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks);
    setShowMenu(false);

    setTimeout(() => {
      const el = document.getElementById(`block-${newBlock.id}`);
      if (el) placeCaretAtEnd(el);
    }, 50);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBlock = (id: string) => {
    if (blocks.length === 1) {
      // Don't delete the last block, just clear it
      setBlocks([{ id: generateId(), type: "paragraph", content: "" }]);
      return;
    }

    const index = blocks.findIndex((b) => b.id === id);
    const newBlocks = blocks.filter((b) => b.id !== id);
    setBlocks(newBlocks);

    setTimeout(() => {
      if (index > 0) {
        const prevBlock = newBlocks[index - 1];
        const el = document.getElementById(`block-${prevBlock.id}`);
        if (el) placeCaretAtEnd(el);
      }
    }, 50);
  };

  /* ---------------------------- Keyboard Logic ---------------------------- */

  const handleKeyDown = (
    e: React.KeyboardEvent,
    block: ContentBlock,
    index: number
  ) => {
    // ESC
    if (e.key === "Escape") {
      setShowMenu(false);
      return;
    }

    // Slash command
    if (e.key === "/" && block.content === "") {
      e.preventDefault();
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setMenuPos({ x: rect.left, y: rect.bottom });
      setFocusedId(block.id);
      setShowMenu(true);
      return;
    }

    // Enter - create new paragraph
    if (e.key === "Enter" && !e.shiftKey) {
      if (block.type === "code") return; // Allow newlines in code blocks
      e.preventDefault();
      addBlock(block.id);
      return;
    }

    // Backspace on empty block
    if (e.key === "Backspace" && block.content === "" && blocks.length > 1) {
      e.preventDefault();
      deleteBlock(block.id);
      return;
    }

    // Arrow Up
    if (e.key === "ArrowUp" && index > 0) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      if (range && range.startOffset === 0) {
        e.preventDefault();
        const el = document.getElementById(`block-${blocks[index - 1].id}`);
        if (el) placeCaretAtEnd(el);
      }
    }

    // Arrow Down
    if (e.key === "ArrowDown" && index < blocks.length - 1) {
      const selection = window.getSelection();
      const element = e.target as HTMLElement;
      const textLength = element.textContent?.length || 0;
      const range = selection?.getRangeAt(0);
      if (range && range.startOffset === textLength) {
        e.preventDefault();
        const el = document.getElementById(`block-${blocks[index + 1].id}`);
        if (el) {
          el.focus();
          const newRange = document.createRange();
          newRange.setStart(el.firstChild || el, 0);
          newRange.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(newRange);
        }
      }
    }
  };

  /* ------------------------------ Block Menu ------------------------------ */

  const blockTypes = [
    { type: "paragraph" as BlockType, label: "Text", icon: Type },
    { type: "heading1" as BlockType, label: "Heading 1", icon: Heading1 },
    { type: "heading2" as BlockType, label: "Heading 2", icon: Heading2 },
    { type: "heading3" as BlockType, label: "Heading 3", icon: Heading3 },
    { type: "bulletList" as BlockType, label: "Bullet List", icon: List },
    {
      type: "numberedList" as BlockType,
      label: "Numbered List",
      icon: ListOrdered,
    },
    { type: "quote" as BlockType, label: "Quote", icon: Quote },
    { type: "code" as BlockType, label: "Code", icon: Code },
    { type: "image" as BlockType, label: "Image", icon: ImageIcon },
    { type: "checklist" as BlockType, label: "Checklist", icon: CheckSquare },
  ];

  /* ------------------------------- Drag & Drop ------------------------------ */

  const handleDragStart = (blockId: string) => {
    setDraggedId(blockId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = blocks.findIndex((b) => b.id === draggedId);
    const targetIndex = blocks.findIndex((b) => b.id === targetId);

    if (draggedIndex === targetIndex) return;

    const newBlocks = [...blocks];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlock);
    setBlocks(newBlocks);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  /* ------------------------------- Rendering ------------------------------ */

  return (
    <div className="relative min-h-[400px] rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
      {/* Editor Header */}
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-zinc-600">content-editor.tsx</span>
        </div>
        <span className="font-mono text-xs text-zinc-600">
          {blocks.length} {blocks.length === 1 ? "block" : "blocks"}
        </span>
      </div>

      {/* Blocks */}
      <div className="space-y-2">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={`group relative ${
              draggedId === block.id ? "opacity-50" : ""
            }`}
            draggable
            onDragStart={() => handleDragStart(block.id)}
            onDragOver={(e) => handleDragOver(e, block.id)}
            onDragEnd={handleDragEnd}
          >
            {/* Left Controls */}
            <div className="absolute -left-12 top-0 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                className="cursor-grab rounded p-1 hover:bg-zinc-800 active:cursor-grabbing"
                title="Drag to reorder"
              >
                <GripVertical className="h-4 w-4 text-zinc-600" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById(`block-${block.id}`);
                  if (!el) return;
                  const rect = el.getBoundingClientRect();
                  setMenuPos({ x: rect.left, y: rect.bottom });
                  setFocusedId(block.id);
                  setShowMenu(true);
                }}
                className="rounded p-1 hover:bg-zinc-800"
                title="Add block"
              >
                <Plus className="h-4 w-4 text-zinc-600" />
              </button>
            </div>

            {/* Block Content */}
            <BlockContent
              block={block}
              index={index}
              placeholder={index === 0 ? placeholder : ""}
              onFocus={() => setFocusedId(block.id)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onUpdate={(updates) => updateBlock(block.id, updates)}
            />

            {/* Delete Button */}
            <button
              onClick={() => deleteBlock(block.id)}
              className="absolute -right-10 top-0 rounded p-1 opacity-0 transition-opacity hover:bg-zinc-800 group-hover:opacity-100"
              title="Delete block"
            >
              <Trash2 className="h-4 w-4 text-zinc-600 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* Slash Menu */}
      {showMenu && focusedId && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div
            className="fixed z-50 w-64 rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl"
            style={{ left: menuPos.x, top: menuPos.y + 8 }}
          >
            <div className="p-2">
              <div className="mb-2 px-2 py-1 font-mono text-xs uppercase text-zinc-500">
                BLOCKS
              </div>
              <div className="space-y-1">
                {blockTypes.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => {
                      const currentBlock = blocks.find(
                        (b) => b.id === focusedId
                      );
                      if (currentBlock?.content === "") {
                        updateBlock(focusedId, { type: option.type });
                      } else {
                        addBlock(focusedId, option.type);
                      }
                      setShowMenu(false);
                      setTimeout(() => {
                        const el = document.getElementById(
                          `block-${focusedId}`
                        );
                        if (el) placeCaretAtEnd(el);
                      }, 50);
                    }}
                    className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
                  >
                    <option.icon className="h-4 w-4 text-emerald-500" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------ BlockContent ----------------------------- */

function BlockContent({
  block,
  index,
  placeholder,
  onUpdate,
  onKeyDown,
  onFocus,
}: {
  block: ContentBlock;
  index: number;
  placeholder?: string;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
}) {
  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const content = e.currentTarget.textContent || "";

    // Save cursor position
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const startOffset = range?.startOffset || 0;
    const startContainer = range?.startContainer;

    onUpdate({ content });

    // Restore cursor position after React re-render
    requestAnimationFrame(() => {
      if (startContainer && selection) {
        try {
          const newRange = document.createRange();
          newRange.setStart(startContainer, startOffset);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (e) {
          // If the node is no longer valid, place cursor at end
          const el = document.getElementById(`block-${block.id}`);
          if (el) placeCaretAtEnd(el);
        }
      }
    });
  };

  const commonProps = {
    id: `block-${block.id}`,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: handleInput,
    onKeyDown,
    onFocus,
    "data-placeholder": placeholder,
    className:
      "w-full outline-none bg-transparent text-zinc-300 empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600",
  };

  switch (block.type) {
    case "heading1":
      return (
        <h1
          {...commonProps}
          className={`${commonProps.className} text-4xl font-bold text-white`}
        >
          {block.content}
        </h1>
      );

    case "heading2":
      return (
        <h2
          {...commonProps}
          className={`${commonProps.className} text-3xl font-bold text-white`}
        >
          {block.content}
        </h2>
      );

    case "heading3":
      return (
        <h3
          {...commonProps}
          className={`${commonProps.className} text-2xl font-bold text-white`}
        >
          {block.content}
        </h3>
      );

    case "quote":
      return (
        <blockquote
          {...commonProps}
          className={`${commonProps.className} border-l-4 border-emerald-500 pl-4 italic text-zinc-400`}
        >
          {block.content}
        </blockquote>
      );

    case "code":
      return (
        <pre
          {...commonProps}
          className="min-h-[60px] rounded-lg bg-zinc-950 p-4 font-mono text-sm text-emerald-400 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600"
        >
          {block.content}
        </pre>
      );

    case "bulletList":
      return (
        <div className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <div
            {...commonProps}
            className={`${commonProps.className} min-h-[1.5rem] flex-1`}
          >
            {block.content}
          </div>
        </div>
      );

    case "numberedList":
      return (
        <div className="flex items-start gap-3">
          <span className="font-mono text-sm text-emerald-500">
            {index + 1}.
          </span>
          <div
            {...commonProps}
            className={`${commonProps.className} min-h-[1.5rem] flex-1`}
          >
            {block.content}
          </div>
        </div>
      );

    case "checklist":
      return (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={block.metadata?.checked || false}
            onChange={(e) =>
              onUpdate({
                metadata: { ...block.metadata, checked: e.target.checked },
              })
            }
            className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-2 focus:ring-emerald-500"
          />
          <div
            {...commonProps}
            className={`${commonProps.className} min-h-[1.5rem] flex-1 ${
              block.metadata?.checked ? "line-through opacity-50" : ""
            }`}
          >
            {block.content}
          </div>
        </div>
      );

    case "image":
      return (
        <ImageBlock
          block={block}
          onUpdate={onUpdate}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
      );

    default:
      return (
        <p
          {...commonProps}
          className={`${commonProps.className} min-h-[1.5rem]`}
        >
          {block.content}
        </p>
      );
  }
}

/* ------------------------------ Image Block ----------------------------- */

function ImageBlock({
  block,
  onUpdate,
  onFocus,
  onKeyDown,
}: {
  block: ContentBlock;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local URL for preview
    const localUrl = URL.createObjectURL(file);
    onUpdate({
      metadata: { ...block.metadata, url: localUrl },
      content: file.name,
    });

    // TODO: Upload to your server/cloud storage here
    // const uploadedUrl = await uploadImage(file);
    // onUpdate({ metadata: { ...block.metadata, url: uploadedUrl } });
  };

  return (
    <div className="space-y-2" onFocus={onFocus}>
      {!block.metadata?.url ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={block.metadata?.url || ""}
            onChange={(e) =>
              onUpdate({
                metadata: { ...block.metadata, url: e.target.value },
              })
            }
            onKeyDown={onKeyDown}
            placeholder="Paste image URL or click upload..."
            className="flex-1 rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            <Upload className="h-4 w-4" />
            Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="group relative">
          <img
            src={block.metadata.url}
            alt={block.content || ""}
            className="w-full rounded-lg border border-zinc-800"
          />
          <input
            type="text"
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            onKeyDown={onKeyDown}
            placeholder="Add caption..."
            className="mt-2 w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-400 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
          />
          <button
            onClick={() => onUpdate({ metadata: { url: "" }, content: "" })}
            className="absolute right-2 top-2 rounded bg-zinc-900/90 p-2 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}
