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

export type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bulletList"
  | "numberedList"
  | "quote"
  | "code"
  | "image"
  | "checklist";

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  metadata?: {
    url?: string;
    alt?: string;
    language?: string;
    checked?: boolean;
  };
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
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

// types/experience.ts
export interface Experience {
  id?: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
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
