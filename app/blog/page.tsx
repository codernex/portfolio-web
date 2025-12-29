"use client";

import { useState } from "react";
import { Blog } from "@/types";
import {
  Search,
  ArrowLeft,
  Clock,
  Eye,
  Tag as TagIcon,
  ChevronRight,
  Terminal,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";

// Static Data based on your Blog Interface
const ALL_BLOGS: Blog[] = [
  {
    id: "b1",
    title: "Deep Dive into NestJS Microservices",
    slug: "nestjs-microservices-guide",
    excerpt:
      "Learn how to build scalable distributed systems using NestJS, RabbitMQ, and gRPC.",
    content: "...",
    featuredImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000",
    author: {
      id: "u1",
      name: "Your Name",
      email: "me@example.com",
      role: "admin",
    },
    tags: [{ id: "t1", name: "Backend", slug: "backend", type: "blog" }],
    readingTime: 12,
    views: 1420,
    featured: true,
    status: "published",
    publishedAt: "2024-11-12",
    createdAt: "2024-11-10",
    updatedAt: "2024-11-12",
  },
  {
    id: "b2",
    title: "Mastering Tailwind CSS Grid",
    slug: "tailwind-grid-mastery",
    excerpt:
      "Break free from basic layouts and learn how to build complex, responsive grids with ease.",
    content: "...",
    featuredImage:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031",
    author: {
      id: "u1",
      name: "Your Name",
      email: "me@example.com",
      role: "admin",
    },
    tags: [{ id: "t2", name: "Frontend", slug: "frontend", type: "blog" }],
    readingTime: 6,
    views: 856,
    featured: false,
    status: "published",
    publishedAt: "2024-10-05",
    createdAt: "2024-10-05",
    updatedAt: "2024-10-05",
  },
];

export default function BlogArchive() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = ALL_BLOGS.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Sticky Header with Navbar Fix */}
      <PageHeader breadCrumb="~/entries/blog_posts" />

      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Branding */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Technical Journal
            </h1>
            <p className="text-zinc-500 max-w-xl leading-relaxed">
              Documenting my journey through full-stack development, system
              architecture, and modern web technologies.
            </p>
          </div>

          {/* Search bar styled as a terminal command */}
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="font-mono text-emerald-500 mr-2">$</span>
              <span className="font-mono text-zinc-600">grep</span>
            </div>
            <input
              type="text"
              placeholder="--search-content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/30 border border-zinc-800 rounded-lg py-4 pl-20 pr-4 text-white font-mono focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Blog List */}
          <div className="space-y-12">
            {filteredBlogs.map((post) => (
              <article key={post.id} className="group relative">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Metadata Sidebar */}
                  <div className="md:w-32 shrink-0 font-mono text-[11px] text-zinc-600 space-y-2 pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} MIN READ
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500/60">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()} VIEWS
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-tighter"
                        >
                          [{tag.name}]
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 pt-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
                    >
                      READ_ENTRY <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Visual Separator */}
                <div className="absolute -left-6 top-0 h-full w-[1px] bg-zinc-900 group-hover:bg-emerald-500/30 transition-colors" />
              </article>
            ))}

            {filteredBlogs.length === 0 && (
              <div className="py-20 text-center rounded-lg border border-dashed border-zinc-800">
                <Terminal className="mx-auto h-8 w-8 text-zinc-700 mb-4" />
                <p className="font-mono text-sm text-zinc-600">
                  No entries found for: &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-zinc-900 bg-zinc-950/30">
        <div className="container mx-auto px-6 text-center font-mono text-[10px] text-zinc-700 uppercase tracking-[0.4em]">
          End of Output — System Steady
        </div>
      </footer>
    </main>
  );
}
