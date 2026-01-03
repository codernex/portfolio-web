// app/blog/_components/BlogListContainer.tsx
import { apiInstance } from "@/lib/axios";
import { Blog, PaginatedResponse } from "@/types";
import BlogArchiveClient from "./BlogArchiveClient";

export default async function BlogListContainer({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const params = new URLSearchParams();

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value as string);
    });
  }
  console.log("TCL: params", params.toString());

  const res = await apiInstance.get<PaginatedResponse<Blog>>(
    `/blog?${params.toString()}`
  );

  const result = res.data;

  return (
    <BlogArchiveClient
      initialBlogs={result.data.items}
      meta={result.data.meta}
    />
  );
}
