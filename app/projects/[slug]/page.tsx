"use client";

import { Project } from "@/types";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  ChevronRight,
  Layout,
} from "lucide-react";
import Link from "next/link";

// Static data based on your "Amani Forged" project from your resume [cite: 69]
const PROJECT_DATA: Project = {
  id: "p1",
  title: "Amani Forged E-commerce",
  slug: "amani-forged",
  shortDescription:
    "High-performance e-commerce platform with specialized financing integrations.",
  fullDescription: `
    Led the modernization of this platform's architecture to solve critical latency issues[cite: 34]. 
    The project involved a complete migration of payment systems to Stripe and financing APIs like Snap Finance[cite: 34, 72].
    
    Key technical challenges included:
    - Implementing a fraud-resistant checkout system with pre-payment validation.
    - Automating image synchronization pipelines between Google Drive and AWS S3[cite: 36, 74].
    - Developing a session-based abandoned cart recovery system that increased conversion by 30%[cite: 43, 75].
  `,
  thumbnailUrl:
    "https://images.unsplash.com/photo-1610484826917-0f101a7bf7f4?q=80&w=2070",
  images: [
    "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
  ],
  technologies: [
    "Next.js",
    "TypeScript",
    "TypeORM",
    "Redis",
    "AWS S3",
    "Stripe",
  ],
  tags: [{ id: "t1", name: "Full-stack", slug: "full-stack", type: "project" }],
  liveUrl: "https://amaniforged.com",
  githubUrl: "https://github.com/codernex",
  featured: true,
  status: "published",
  createdAt: "2025-01-20",
  updatedAt: "2025-12-29",
};

export default function ProjectDetailPage() {
  const project = PROJECT_DATA;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Sticky Header */}
      <header className="sticky top-16 z-40 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/projects"
            className="group flex items-center gap-2 font-mono text-sm text-zinc-500 hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>cd ../projects</span>
          </Link>
          <div className="hidden sm:block font-mono text-[10px] text-zinc-600 uppercase">
            Project_ID: {project.id} {"// Status"}: {project.status}
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10 text-emerald-500">
                  <Terminal size={14} />
                </span>
                <span className="font-mono text-xs text-emerald-500 uppercase tracking-widest">
                  Initialization Successful
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed italic border-l-2 border-emerald-500/30 pl-6">
                {project.shortDescription}
              </p>
            </div>

            {/* Performance Metric Card (Special highlight from resume ) */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Performance Optimization Milestone
                </h3>
                <p className="text-sm text-zinc-400">
                  Improved Lighthouse scores from 45 to 95+ (140%
                  increase)[cite: 41, 71].
                </p>
              </div>
            </div>

            {/* Project Gallery */}
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg overflow-hidden border border-zinc-900 bg-zinc-900/50"
                >
                  <img
                    src={img}
                    alt="Project detail"
                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Full Technical Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Cpu className="text-emerald-500" size={20} />{" "}
                System_Architecture
              </h2>
              <div className="prose prose-invert prose-emerald max-w-none text-zinc-400 whitespace-pre-line leading-relaxed">
                {project.fullDescription}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-32 space-y-6">
              {/* Technical Stack Card */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">
                  Tech_Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-emerald-500/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Card */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">
                  Access_Points
                </h3>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="flex items-center justify-between group p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500 hover:text-black transition-all"
                  >
                    <span className="font-mono text-sm font-bold">
                      LIVE_DEMO
                    </span>
                    <ExternalLink size={18} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="flex items-center justify-between group p-3 rounded-lg border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-all"
                  >
                    <span className="font-mono text-sm">SOURCE_CODE</span>
                    <Github size={18} />
                  </a>
                )}
              </div>

              {/* Security/Validation Check */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-center gap-3">
                <ShieldCheck className="text-emerald-500/50" size={24} />
                <div className="font-mono text-[10px] text-zinc-600 leading-tight">
                  <p>SECURE_AUTH: YES</p>
                  <p>FRAUD_VALIDATION: ACTIVE </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-900 text-center">
        <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-[0.4em]">
          End of Project Manifest
        </div>
      </footer>
    </main>
  );
}
