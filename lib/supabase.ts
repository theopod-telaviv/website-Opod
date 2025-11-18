import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ljzzccjrxialnmbypvox.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqenpjY2pyeGlhbG5tYnlwdm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDM0MDAsImV4cCI6MjA3NjA3OTQwMH0.QSTq3A3c4zoRy33MdzwjuBHhFVN_avrZK1Vp37x96_I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string;
  title_he: string;
  excerpt_fr: string;
  excerpt_en: string;
  excerpt_he: string;
  content_fr: string;
  content_en: string;
  content_he: string;
  cover_image: string;
  meta_description_fr: string | null;
  meta_description_en: string | null;
  meta_description_he: string | null;
  keywords: string[];
  author: string;
  category: string;
  tags: string[];
  reading_time: number;
  views: number;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
  display_order: number;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

export async function incrementViews(slug: string): Promise<void> {
  const post = await getBlogPost(slug);
  if (!post) return;

  await supabase
    .from('blog_posts')
    .update({ views: post.views + 1 })
    .eq('slug', slug);
}
