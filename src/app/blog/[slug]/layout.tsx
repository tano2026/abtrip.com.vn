import { Metadata } from "next";
import { initialBlogPosts } from "@/data/blogData";

const BASE_URL = "https://abtrip.vn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = initialBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Bài Viết Không Tồn Tại",
      robots: { index: false, follow: false },
    };
  }

  const pageUrl = `${BASE_URL}/blog/${post.slug}`;
  const plainExcerpt = post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title: post.title,
    description: plainExcerpt,
    keywords: post.tags,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      url: pageUrl,
      siteName: "ABTRIP",
      title: post.title,
      description: plainExcerpt,
      images: [
        {
          url: post.coverImage || "/og-blog.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author.name],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: plainExcerpt,
      images: [post.coverImage || "/og-blog.jpg"],
    },
  };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
