import { Project, PaginatedResponse } from "@/types";
import ProjectsArchiveClient from "./ProjectsArchiveClient";
import { apiInstance } from "@/lib/axios";

export const metadata = {
  title: "Engineering Projects | Codernex (Borhan Uddin)",
  description:
    "Explore a collection of high-performance technical projects, including e-commerce engines, microservices, and system architectures built with NestJS, Next.js, and AWS.",
  keywords: [
    "Software Portfolio",
    "NestJS Projects",
    "Next.js Case Studies",
    "Full-Stack Engineering Work",
    "System Design Examples",
    "Scalable Web Applications",
  ],
  openGraph: {
    title: "Technical Case Studies | Borhan Uddin",
    description:
      "Deep dives into engineering solutions and architectural patterns.",
    url: "https://codernex.dev/projects",
    images: [{ url: "/og-projects.jpg", width: 1200, height: 630 }], // Specialized OG image for projects
  },
};

export default async function ProjectsArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page = "1", search = "" } = await searchParams;

  const res = await apiInstance.get<PaginatedResponse<Project>>(
    `${process.env.NEXT_PUBLIC_API_URL}/project?page=${page}&limit=6&search=${search}`
  );

  const initialData = res.data; // { items: Project[], meta: PaginationMeta }

  return <ProjectsArchiveClient initialData={initialData.data} />;
}
