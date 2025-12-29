"use client";
import { Project } from "@/types";
import { ExternalLink, Github, Folder, Zap } from "lucide-react";

const STATIC_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Nexus Dashboard",
    slug: "nexus-dashboard",
    shortDescription:
      "A real-time monitoring system for microservices with built-in log aggregation.",
    fullDescription: "",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070",
    images: [],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    tags: [{ id: "t1", name: "Fullstack", slug: "fullstack", type: "project" }],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: true,
    status: "published",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Terminal UI Kit",
    slug: "terminal-ui",
    shortDescription:
      "A headless component library for building terminal-themed web applications.",
    fullDescription: "",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974",
    images: [],
    technologies: ["React", "TailwindCSS", "Framer Motion"],
    tags: [{ id: "t2", name: "UI/UX", slug: "ui-ux", type: "project" }],
    githubUrl: "https://github.com",
    featured: false,
    status: "published",
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15",
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative border-t border-zinc-800 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-sm text-emerald-500">
            <span className="opacity-60">$ </span>ls ./projects --featured
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white">Selected Works</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {STATIC_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden border-b border-zinc-800">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-black font-bold">
                    <Zap className="h-3 w-3" /> FEATURED
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mb-4 text-zinc-400 text-sm line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[11px] text-emerald-500 font-mono italic"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
