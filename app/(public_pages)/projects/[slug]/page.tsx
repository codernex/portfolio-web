import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiInstance } from "@/lib/axios";
import { Project } from "@/types";
import ProjectDetailContent from "./ProjectDetailContent";
import ProjectDetailSkeleton from "./loading";
import { Metadata } from "next";

type PageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectFromAPI(slug); // Your API call

  return {
    title: `${project.title} | Codernex Project`,
    description: project.shortDescription,
    keywords: project.technologies,
    openGraph: {
      images: [project.thumbnailUrl],
      description: project.shortDescription,
    },
    manifest: "/site.webmanifest",
  };
}

export default async function ProjectPage({ params }: PageParams) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectFetcher slug={slug} />
    </Suspense>
  );
}

async function ProjectFetcher({ slug }: { slug: string }) {
  const project = await fetchProjectFromAPI(slug);
  if (!project) return notFound();

  return <ProjectDetailContent project={project} />;
}

const fetchProjectFromAPI = async (slug: string) => {
  const res = await apiInstance.get<{ data: Project }>(`/project/${slug}`);
  return res.data.data;
};
