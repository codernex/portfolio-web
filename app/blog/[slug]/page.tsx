"use client";

import { Blog } from "@/types";
import {
  ArrowLeft,
  Clock,
  Eye,
  Share2,
  Bookmark,
  ChevronRight,
  Terminal,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";

// This would typically come from your NestJS API
const STATIC_BLOG_DATA: Blog = {
  id: "b1",
  title: "Optimizing Performance: A 140% Lighthouse Improvement Story",
  slug: "optimizing-performance-lighthouse",
  excerpt:
    "How I took a legacy SSR application and optimized Core Web Vitals to hit 95+ scores.",
  content: `
    <h2>The Challenge</h2>
    <p>In my recent role at EWWFL, I was tasked with modernizing a payment system architecture that was suffering from significant latency[cite: 14, 34]. The initial Lighthouse performance scores were hovering around 45.</p>
    
    <h2>The Strategy</h2>
    <p>Using a combination of <strong>Next.js caching strategies</strong> and converting key components to <strong>Server-Side Rendering (SSR)</strong>, we began to see immediate improvements[cite: 37]. By optimizing RTK Query data fetching and implementing Redis-based caching at the backend, we reduced server response times significantly[cite: 15, 35].</p>
    
    <h2>Results</h2>
    <p>The outcome was a 140% increase in performance metrics, achieving a consistent score of 95+ across all devices. This directly correlated to a 30% increase in checkout completion rates via our abandoned cart recovery system[cite: 43, 75].</p>
  `,
  featuredImage:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
  author: {
    id: "u1",
    name: "Borhan Uddin",
    email: "borhan.dev@gmail.com",
    role: "admin",
  }, // Data sourced from resume
  tags: [
    { id: "t1", name: "Performance", slug: "performance", type: "blog" },
    { id: "t2", name: "Next.js", slug: "nextjs", type: "blog" },
  ],
  readingTime: 8,
  views: 1240,
  featured: true,
  status: "published",
  publishedAt: "2025-12-29",
  createdAt: "2025-12-29",
  updatedAt: "2025-12-29",
};

export default function BlogDetailPage() {
  const post = STATIC_BLOG_DATA;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Sticky Top Header */}
      <header className="sticky top-16 z-40 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
        <div className="container mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="group flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            <span>cd ..</span>
          </Link>
          <div className="flex items-center gap-4 text-zinc-600">
            <Share2 className="h-4 w-4 cursor-pointer hover:text-emerald-500 transition-colors" />
            <Bookmark className="h-4 w-4 cursor-pointer hover:text-emerald-500 transition-colors" />
          </div>
        </div>
      </header>

      <article className="container mx-auto max-w-4xl px-6 py-16">
        {/* Header Section */}
        <header className="mb-12 space-y-6">
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="font-mono text-[10px] text-emerald-500 bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-widest"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-zinc-900 font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <UserIcon className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-zinc-300">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTime} MIN READ</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-3.5 w-3.5" />
              <span>{post.views} VIEWS</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="mb-12 aspect-video w-full overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/50">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-full w-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div
              className="prose prose-invert prose-emerald max-w-none 
                prose-headings:text-white prose-headings:font-bold
                prose-p:text-zinc-400 prose-p:leading-relaxed
                prose-strong:text-emerald-500 prose-code:text-emerald-300
                prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Right Sidebar: Command Palette */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-6">
              <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-4 uppercase tracking-widest border-b border-zinc-800 pb-2">
                  <Terminal size={12} /> Related_Commands
                </div>
                <div className="space-y-3">
                  <Link
                    href="/projects"
                    className="group flex items-center justify-between text-sm hover:text-emerald-400 transition-colors"
                  >
                    <span className="font-mono text-zinc-500 text-xs">
                      view_projects.sh
                    </span>
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  <Link
                    href="/contact"
                    className="group flex items-center justify-between text-sm hover:text-emerald-400 transition-colors"
                  >
                    <span className="font-mono text-zinc-500 text-xs">
                      init_contact.pkg
                    </span>
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-6">
                <h4 className="text-white font-bold text-sm mb-4">
                  Newsletter
                </h4>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed italic">
                  Subscribe to receive system-wide updates on backend
                  architecture.
                </p>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="guest@domain.com"
                    className="w-full bg-zinc-950 border border-zinc-800 p-2 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button className="w-full bg-emerald-500 text-black font-mono text-[10px] font-bold py-2 hover:bg-emerald-400 transition-colors">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-zinc-900 bg-zinc-950/30 text-center">
        <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-[0.4em]">
          End of Document — Verification Successful
        </div>
      </footer>
    </main>
  );
}
