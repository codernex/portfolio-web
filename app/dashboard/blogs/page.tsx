import { BlogListTable } from "@/components/dashboard/blogs/BlogListTable";
import { CreateBlogModal } from "@/components/dashboard/blogs/CreateBlogModal";
import { Blog } from "@/types";
import { Terminal, Plus } from "lucide-react";

export default async function Page() {
  // Fetching from your NestJS API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
    cache: "no-store", // Ensure fresh data for the admin panel
  });

  const result = await response.json();
  const blogs = (result.data || []) as Blog[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-emerald-500 text-sm mb-1">
            <Terminal size={14} />
            <span>sudo ls ./content/blogs</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Blog Management
          </h1>
        </div>

        {/* The Modal Trigger Component */}
        <CreateBlogModal />
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">
        <BlogListTable initialData={blogs} />
      </div>
    </div>
  );
}
