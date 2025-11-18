export interface IArticle {
  id?: number;
  title: string;
  description: string;
  coverImage?: string;
  tags: string[];
  tag_list?: string[];
  publishedAt: string;
  devToSlug?: string;
  devToPath?: string;
  devToURL?: string;
  commentsCount?: number;
  publicReactionsCount?: number;
  positiveReactionsCount?: number;
  canonical?: string;
  collectionId?: number;
  readingTime?: number;
  slug: string;
  markdown?: string;
  html?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  type_of: string;
  canonical_url: string;
  slug: string;
  body_markdown: string;
  tags: string[];
  tag_list: string[];
  comments_count: number;
  cover_image: string;
  path: string;
  positive_reactions_count: number;
  public_reactions_count: number;
  published: boolean;
  published_at: string;
  published_timestamp: string;
  url: string;
  readable_publish_date: string;
  collection_id: null | number;
  social_image: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: null | string;
  last_comment_at: string;
  body_html: string;
}

export interface BlogPostProps {
  posts: BlogPost[];
}

// interfaces/interface.ts

export interface ProjectCaseStudy {
  images: string[]          // list of image urls
  longDescription: string   // full case study description
  role?: string             // your role on the project
  responsibilities?: string[]
  challenges?: string[]
  results?: string[]
}

export interface Project {
  id: number
  title: string
  imageLight: string
  blurHash?: string
  site?: string
  description: string
  techStack: string[]
  caseStudy?: ProjectCaseStudy   // new field
}

export interface ProjectProps {
  projects: Project[];
}

interface Skill {
  name: string;
  description: string;
  link: string;
  type: string;
  image: string;
}

export interface SkillProps {
  skills: Skill[];
}
