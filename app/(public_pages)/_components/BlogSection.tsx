"use client";
import { Blog } from "@/types";
import { Clock, Eye, Terminal } from "lucide-react";

const STATIC_BLOGS: Blog[] = [
  {
    id: "b1",
    title: "Optimizing PostgreSQL for High Concurrency",
    slug: "postgres-optimization",
    excerpt:
      "Deep dive into indexing strategies and connection pooling for scalable NestJS apps.",
    content: "",
    featuredImage: "",
    author: { id: "u1", name: "Admin", email: "admin@dev.com", role: "admin" },
    tags: [],
    readingTime: 8,
    views: 1240,
    featured: true,
    status: "published",
    publishedAt: "2024-05-10",
    createdAt: "2024-05-10",
    updatedAt: "2024-05-10",
  },
  {
    id: "b2",
    title: "Architecture: Why I chose NestJS over Express",
    slug: "nestjs-vs-express",
    excerpt:
      "Exploring dependency injection and modularity in enterprise applications.",
    content: "",
    featuredImage: "",
    author: { id: "u1", name: "Admin", email: "admin@dev.com", role: "admin" },
    tags: [],
    readingTime: 5,
    views: 890,
    featured: false,
    status: "published",
    publishedAt: "2024-04-22",
    createdAt: "2024-04-22",
    updatedAt: "2024-04-22",
  },
];

export default function BlogSection() {
  return (
    <section className="relative border-t border-zinc-800 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-emerald-500">
            <span className="opacity-60">$ </span>cat /var/log/articles.log
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white">
            Recent Articles
          </h2>
        </div>

        <div className="grid gap-4">
          {STATIC_BLOGS.map((post) => (
            <div
              key={post.id}
              className="group flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-950/20 p-5 hover:bg-zinc-900/40 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-500">
                  <span>{post.publishedAt}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readingTime}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {post.views}
                  </span>
                </div>
              </div>
              <Terminal className="h-5 w-5 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
