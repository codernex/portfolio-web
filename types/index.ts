export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnailUrl: string;
  images: string[];
  technologies: string[];
  tags: Tag[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: User;
  tags: Tag[];
  readingTime: number;
  views: number;
  featured: boolean;
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  logo?: string;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  type: "project" | "blog" | "both";
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}
