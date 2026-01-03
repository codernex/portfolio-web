// app/blog/page.tsx
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import BlogListContainer from "./_components/BlogListContainer";
import { BlogSidebar } from "./_components/BlogSidebar";
import { BlogListSkeleton } from "./_components/BlogListSkeleton";

interface PageProps {
  searchParams: Promise<{ [key: string]: unknown }>;
}

export default async function BlogArchivePage({ searchParams }: PageProps) {
  const queryParams = await searchParams;
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300">
      <PageHeader breadCrumb="~/entries/blog_posts" />

      <section className="px-6 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* MAIN CONTENT (Streaming) */}
            <div className="lg:col-span-8">
              <div className="mb-12">
                <h1 className="text-5xl font-bold text-white mb-4 tracking-tighter">
                  Technical Journal
                </h1>
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                  ./logs/architecture_notes.md
                </p>
              </div>
              <Suspense fallback={<BlogListSkeleton />}>
                <BlogListContainer searchParams={queryParams} />
              </Suspense>
            </div>

            {/* STATIC SIDEBAR (Instant) */}
            <aside className="lg:col-span-4 lg:block">
              <BlogSidebar />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
