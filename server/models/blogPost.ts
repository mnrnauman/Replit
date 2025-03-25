import { storage } from '../storage';
import type { BlogPost } from '@shared/schema';

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  return storage.getBlogPosts();
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return storage.getBlogPostBySlug(slug);
};
