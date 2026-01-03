"use client";

import BlockEditor from "@/components/editor/BlockEditor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ContentBlock } from "@/types";
import { Loader2, Plus, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateBlogModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ContentBlock[]>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = useSession();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      slug: (formData.get("title") as string).toLowerCase().replace(/ /g, "-"),
      content: content, // From TipTap
      status: "published",
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${data?.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsOpen(false);
        router.refresh(); // Refresh the Server Component data
      }
    } catch (error) {
      console.error("Failed to deploy blog", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold">
          <Plus className="mr-2 h-4 w-4" /> NEW_POST.EXE
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-6xl bg-zinc-950 border-zinc-800 text-zinc-100 max-h-[90vh] overflow-y-scroll overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="font-mono text-emerald-500 flex items-center gap-2">
            <Plus size={18} /> INITIALIZE_NEW_BLOG_ENTRY
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase">
              Entry_Title
            </label>
            <Input
              name="title"
              required
              placeholder="How I optimized NestJS performance..."
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase">
              Body_Content (MDX_SUPPORTED)
            </label>
            <div className="rounded-md border border-zinc-800 overflow-hidden">
              <BlockEditor
                onChange={(html) => setContent(html)}
                initialContent={[]}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-900 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white"
            >
              Abort
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 text-black hover:bg-emerald-400 min-w-[140px]"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : (
                <Save className="mr-2" size={16} />
              )}
              {loading ? "COMMITTING..." : "PUBLISH_LIVE"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
