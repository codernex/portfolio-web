"use client";

import { useState } from "react";
import { Project } from "@/types";
import {
  Github,
  ExternalLink,
  Terminal,
  Search,
  ArrowLeft,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";

// Static Data based on your Project Interface
const ALL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Nexus Dashboard",
    slug: "nexus-dashboard",
    shortDescription:
      "A high-performance trading dashboard with real-time analytics and microservices monitoring.",
    fullDescription: "Longer description here...",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070",
    images: [],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker"],
    tags: [{ id: "t1", name: "Fullstack", slug: "fullstack", type: "project" }],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: true,
    status: "published",
    createdAt: "2024-05-10",
    updatedAt: "2024-05-10",
  },
  {
    id: "2",
    title: "Terminal UI Kit",
    slug: "terminal-ui",
    shortDescription:
      "A headless component library for building developer-focused terminal themed web applications.",
    fullDescription: "Longer description here...",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974",
    images: [],
    technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
    tags: [{ id: "t2", name: "Library", slug: "library", type: "project" }],
    githubUrl: "https://github.com",
    featured: false,
    status: "published",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
  {
    id: "3",
    title: "Postgres Analytics Engine",
    slug: "postgres-analytics",
    shortDescription:
      "Advanced query optimizer and visualizer for complex PostgreSQL databases.",
    fullDescription: "Longer description here...",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000",
    images: [],
    technologies: ["Node.js", "TypeScript", "TypeORM", "D3.js"],
    tags: [{ id: "t3", name: "Backend", slug: "backend", type: "project" }],
    githubUrl: "https://github.com",
    featured: false,
    status: "published",
    createdAt: "2023-11-20",
    updatedAt: "2023-11-20",
  },
];

export default function ProjectsArchive() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = ALL_PROJECTS.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Background Decorative Element */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />

      <PageHeader breadCrumb="~/codernex/portfolio/projects" />

      <section className="relative px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Project Archive
            </h1>
            <p className="text-zinc-500 max-w-2xl">
              {`A collection of systems, tools, and applications I've built. Use
              the search below to filter by technology or name.`}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="grep 'technology' projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono"
            />
          </div>

          {/* Results Count */}
          <div className="mb-6 font-mono text-xs text-zinc-500 flex items-center gap-2">
            <Terminal className="h-3 w-3" />
            <span>Found {filteredProjects.length} matching entities</span>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-emerald-500/30 transition-all duration-300"
              >
                {/* Visual Preview */}
                <div className="w-full md:w-64 h-40 shrink-0 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h2>
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-all"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-all"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed max-w-3xl">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded border border-zinc-800 bg-zinc-950 font-mono text-[10px] text-emerald-500/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-auto pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(project.createdAt).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                      <Layers className="h-3 w-3" />
                      <span>{project.tags[0]?.name || "Uncategorized"}</span>
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="ml-auto flex items-center gap-1 text-xs font-bold text-emerald-500 hover:text-emerald-400 group/btn"
                    >
                      VIEW_DETAILS{" "}
                      <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="py-24 text-center border border-dashed border-zinc-800 rounded-2xl">
                <p className="font-mono text-zinc-500">
                  No projects found matching the criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center">
        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          End of Listing — © {new Date().getFullYear()} codernex
        </p>
      </footer>
    </main>
  );
}
