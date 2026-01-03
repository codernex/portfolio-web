import { MetadataRoute } from "next";
import { apiInstance } from "@/lib/axios";
import { Project, Blog } from "@/types";

// Base URL of your production site
const BASE_URL = "https://codernex.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // 1. Fetch dynamic data in parallel
    const [projectsRes, blogsRes] = await Promise.all([
      apiInstance.get<{ data: Project[] }>("/project"), // Update with your actual "get all" endpoint
      apiInstance.get<{ data: Blog[] }>("/blog"),
    ]);

    const projects = projectsRes.data.data || [];
    const blogs = blogsRes.data.data || [];

    // 2. Map Projects to Sitemap format
    const projectEntries = projects.map((project) => ({
      url: `${BASE_URL}/project/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    // 3. Map Blogs to Sitemap format
    const blogEntries = blogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // 4. Static Pages
    const staticPages = ["", "/projects", "/blog", "/contact"].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    }));

    return [...staticPages, ...projectEntries, ...blogEntries];
  } catch (error) {
    console.error("SITEMAP_GENERATION_FAILED:", error);
    // Fallback to static pages if API fails
    return [
      { url: BASE_URL, lastModified: new Date() },
      { url: `${BASE_URL}/projects`, lastModified: new Date() },
      { url: `${BASE_URL}/blog`, lastModified: new Date() },
    ];
  }
}
