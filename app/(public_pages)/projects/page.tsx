import { Project, PaginatedResponse } from "@/types";
import ProjectsArchiveClient from "./ProjectsArchiveClient";
import { apiInstance } from "@/lib/axios";

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
