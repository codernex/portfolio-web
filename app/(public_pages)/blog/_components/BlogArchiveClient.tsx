"use client";

import { Blog } from "@/types";
import { Calendar, ChevronRight, Clock, Eye, Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogArchiveClient({ blogs }: { blogs: Blog[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }

    // Update the URL without a full page refresh
    // 'scroll: false' keeps the user's position steady
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchQuery, pathname, router]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      <section className="px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Search bar styled as a terminal command */}
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="font-mono text-emerald-500 mr-2">$</span>
              <span className="font-mono text-zinc-600 italic">
                grep_content
              </span>
            </div>
            <input
              type="text"
              placeholder="--search-payload..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg py-4 pl-40 pr-4 text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
            />
          </div>

          {/* Blog List */}
          <div className="space-y-12">
            {blogs.map((post) => (
              <article key={post.id} className="group relative">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Metadata Sidebar */}
                  <div className="md:w-36 shrink-0 font-mono text-[11px] text-zinc-600 space-y-2 pt-1 border-r border-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-zinc-500" />
                      {post.readingTime} MIN_READ
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500/60">
                      <Eye className="h-3.5 w-3.5" />
                      {post.views.toLocaleString()} HITS
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-[10px] font-mono text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded bg-emerald-500/5 uppercase tracking-tighter"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl italic">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 pt-2 text-xs font-mono font-bold text-zinc-400 hover:text-emerald-500 transition-colors"
                    >
                      EXEC_READ_ENTRY <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {blogs.length === 0 && (
              <div className="py-20 text-center rounded-lg border border-dashed border-zinc-900 bg-zinc-950">
                <Terminal className="mx-auto h-8 w-8 text-zinc-700 mb-4" />
                <p className="font-mono text-sm text-zinc-600 uppercase">
                  Error 404: No entries found matching payload.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-900 bg-zinc-950/30">
        <div className="container mx-auto px-6 text-center font-mono text-[10px] text-zinc-400 uppercase tracking-[0.4em]">
          End of Output — {blogs.length} Records Scanned
        </div>
      </footer>
    </main>
  );
}
