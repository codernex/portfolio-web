import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiInstance } from "@/lib/axios";
import { Project } from "@/types";
import ProjectDetailContent from "./ProjectDetailContent";
import ProjectDetailSkeleton from "./loading";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectFetcher slug={slug} />
    </Suspense>
  );
}

async function ProjectFetcher({ slug }: { slug: string }) {
  const res = await apiInstance.get<{ data: Project }>(`/project/${slug}`);
  const project = res.data.data;

  if (!project) return notFound();

  return <ProjectDetailContent project={project} />;
}
