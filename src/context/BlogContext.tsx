"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BlogPost, initialBlogPosts } from "@/data/blogData";

interface BlogContextType {
  posts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("abtrip_blog_posts");
      if (stored) {
        const parsed = JSON.parse(stored) as BlogPost[];
        const merged = [...parsed];
        initialBlogPosts.forEach((initPost) => {
          if (!merged.some((p) => p.slug === initPost.slug)) {
            merged.push(initPost);
          }
        });
        setPosts(merged);
      }
    } catch (e) {
      console.error("Error reading blog posts from localStorage", e);
    }
  }, []);

  const addBlogPost = (post: BlogPost) => {
    setPosts((prev) => {
      const filtered = prev.filter((p) => p.slug !== post.slug);
      const updated = [post, ...filtered];
      try {
        localStorage.setItem("abtrip_blog_posts", JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving blog posts to localStorage", e);
      }
      return updated;
    });
  };

  const getPostBySlug = (slug: string) => {
    return posts.find((p) => p.slug === slug);
  };

  return (
    <BlogContext.Provider value={{ posts, addBlogPost, getPostBySlug }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
