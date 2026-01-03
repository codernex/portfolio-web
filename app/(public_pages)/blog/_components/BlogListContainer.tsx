// app/blog/_components/BlogListContainer.tsx
import { Blog } from "@/types";
import BlogArchiveClient from "./BlogArchiveClient";

export default async function BlogListContainer({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const params = new URLSearchParams();

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value as any);
    });
  }
  console.log("TCL: params", params.toString());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?${params.toString()}`
  );

  const result = await res.json();
  const blogs = (result.data || []) as Blog[];

  return <BlogArchiveClient blogs={blogs} />;
}
