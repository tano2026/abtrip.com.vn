"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useBlog } from "@/context/BlogContext";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Tag,
  Sparkles,
  ShieldCheck,
  PlaneTakeoff,
  Hotel,
  Building2,
  ChevronRight,
  Share2,
  Link2,
  Check,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Reading progress bar component
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, pct));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Table of Contents parser
function parseHeadings(html: string) {
  const matches = [...html.matchAll(/<h([23])[^>]*>(.*?)<\/h\2>/gi)];
  return matches.map((m, i) => ({
    id: `heading-${i}`,
    level: parseInt(m[1]),
    text: m[2].replace(/<[^>]+>/g, ""),
  }));
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { posts, getPostBySlug } = useBlog();
  const [copied, setCopied] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const post = getPostBySlug(slug);

  // Related posts: same category first, then fill with others
  const relatedPosts = post
    ? [
        ...posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2),
        ...posts.filter((p) => p.category !== post.category && p.slug !== post.slug).slice(0, 1),
      ].slice(0, 3)
    : [];

  const headings = post ? parseHeadings(post.content) : [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50/50 pt-36 pb-24 text-center">
        <div className="container mx-auto px-4 max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-slate-800 font-be">Không tìm thấy bài viết</h1>
          <p className="text-sm text-slate-500">
            Bài viết quý khách yêu cầu có thể đã bị xóa hoặc đường dẫn không chính xác.
          </p>
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = {
    "visa-passport": "Thị thực & Hộ tịch",
    "airport-vip": "Dịch vụ Sân bay VIP",
    "tours-hotels": "Tour & Khách sạn",
    "corporate-b2b": "Doanh nghiệp B2B",
    "travel-guides": "Cẩm nang & Điểm đến",
    "culinary-culture": "Ẩm thực & Văn hóa",
  }[post.category] || post.category;

  const renderCTA = () => {
    const ctaMap: Record<string, { gradient: string; border: string; icon: React.ReactNode; iconBg: string; title: string; body: string; href: string; btnClass: string; btnText: string }> = {
      "visa-passport": {
        gradient: "from-slate-900 to-blue-950",
        border: "border-blue-500/20",
        icon: <ShieldCheck className="w-5 h-5" />,
        iconBg: "bg-blue-600/20 border-blue-500/30 text-blue-400",
        title: "Đặt Dịch Vụ Visa & Hộ Chiếu Trực Tuyến",
        body: "Cần hỗ trợ làm hồ sơ visa các nước, khai báo hộ chiếu trực tuyến khẩn hoặc mua bảo hiểm du lịch Schengen? ABTRIP xử lý hồ sơ chuẩn xác và tối ưu thời gian.",
        href: "/visa-ho-chieu",
        btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
        btnText: "Đặt Dịch Vụ Ngay",
      },
      "airport-vip": {
        gradient: "from-slate-900 to-cyan-950",
        border: "border-cyan-500/20",
        icon: <PlaneTakeoff className="w-5 h-5" />,
        iconBg: "bg-cyan-600/20 border-cyan-500/30 text-cyan-400",
        title: "Trải Nghiệm Dịch Vụ Sân Bay VIP",
        body: "Tiết kiệm thời gian xếp hàng mệt mỏi tại cổng thông quan. Fastrack, phòng chờ thương gia sang trọng và dịch vụ tiện ích tại Tân Sơn Nhất & Nội Bài.",
        href: "/dich-vu-san-bay",
        btnClass: "bg-cyan-600 hover:bg-cyan-700 text-white",
        btnText: "Đặt Dịch Vụ Fastrack",
      },
      "tours-hotels": {
        gradient: "from-slate-900 to-amber-950",
        border: "border-amber-500/20",
        icon: <Hotel className="w-5 h-5" />,
        iconBg: "bg-amber-600/20 border-amber-500/30 text-amber-400",
        title: "Giữ Chỗ Nghỉ Dưỡng Giá Đại Lý Corporate",
        body: "Đặt trước voucher và phòng Vinpearl Resort, Sun Group Hotel chiết khấu hấp dẫn lên tới 25% trực tiếp qua đại lý chiến lược cấp 1 ABTRIP.",
        href: "/khach-san",
        btnClass: "bg-amber-600 hover:bg-amber-700 text-slate-950",
        btnText: "Tra Cứu Khách Sạn",
      },
      "corporate-b2b": {
        gradient: "from-slate-900 to-blue-950",
        border: "border-blue-500/20",
        icon: <Building2 className="w-5 h-5" />,
        iconBg: "bg-blue-600/20 border-blue-500/30 text-blue-400",
        title: "Giải Pháp Công Tác Doanh Nghiệp",
        body: "Tối ưu ngân sách công tác phí, cấp hạn mức tín dụng định kỳ và tự động hóa quy trình đặt vé máy bay/khách sạn với nền tảng TMC chuyên sâu của ABTRIP.",
        href: "/ve-may-bay/doanh-nghiep",
        btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
        btnText: "Nhận Hồ Sơ Doanh Nghiệp",
      },
    };

    const cfg = ctaMap[post.category] || {
      gradient: "from-slate-900 to-emerald-950",
      border: "border-emerald-500/20",
      icon: <Sparkles className="w-5 h-5" />,
      iconBg: "bg-emerald-600/20 border-emerald-500/30 text-emerald-400",
      title: "Lên Kế Hoạch Du Lịch & Nghỉ Dưỡng",
      body: "Khám phá điểm đến kỳ thú, đặt tour lữ hành hoặc giữ chỗ khách sạn 5 sao giá đại lý. Chuyên viên ABTRIP thiết kế chuyến đi hoàn hảo cho bạn.",
      href: "/khach-san",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
      btnText: "Tra Cứu Dịch Vụ Ngay",
    };

    return (
      <div className={`bg-gradient-to-br ${cfg.gradient} rounded-3xl p-6 text-white border ${cfg.border} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full blur-2xl bg-white"></div>
        <div className="relative z-10 space-y-4">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cfg.iconBg}`}>
            {cfg.icon}
          </div>
          <h3 className="font-bold text-base font-be">{cfg.title}</h3>
          <p className="text-xs text-slate-300 font-light leading-relaxed">{cfg.body}</p>
          <Link
            href={cfg.href}
            className={`inline-flex items-center font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer ${cfg.btnClass}`}
          >
            {cfg.btnText} <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen bg-slate-50/50 pb-24">

        {/* Hero Cover Image */}
        <div className="relative w-full h-[50vh] min-h-[320px] max-h-[520px] overflow-hidden bg-slate-200">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          {/* Category + breadcrumb overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto max-w-7xl">
              <div className="flex items-center gap-2 text-xs text-white/70 mb-3 font-medium">
                <Link href="/" className="hover:text-white">Trang chủ</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/blog" className="hover:text-white">Blog</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/90 truncate max-w-xs">{post.title}</span>
              </div>
              <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider mb-3">
                {categoryLabel}
              </span>
              <h1 className="text-white text-2xl md:text-4xl font-extrabold font-be leading-tight max-w-3xl drop-shadow-md">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Article Column */}
            <div className="lg:col-span-8 space-y-6">

              {/* Meta bar */}
              <div className="bg-white rounded-2xl border border-slate-200/60 px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                    {post.author.name}
                  </span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime}</span>
                </div>
                {/* Share buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> Chia sẻ:
                  </span>
                  <button
                    onClick={handleFacebookShare}
                    className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    title="Chia sẻ Facebook"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${copied ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    title="Sao chép đường dẫn"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Excerpt/lead */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">
                <p className="text-sm text-slate-600 italic font-light leading-relaxed border-l-2 border-blue-400 pl-4">
                  {post.excerpt}
                </p>
              </div>

              {/* Table of Contents */}
              {headings.length > 2 && (
                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2 font-bold text-sm text-slate-800">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      Mục lục bài viết
                    </span>
                    {tocOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {tocOpen && (
                    <div className="px-5 pb-4 border-t border-slate-100">
                      <ol className="mt-3 space-y-1.5">
                        {headings.map((h, i) => (
                          <li key={i} style={{ paddingLeft: h.level === 3 ? "1.25rem" : "0" }}>
                            <span className="text-xs text-slate-600 leading-relaxed hover:text-blue-600 cursor-default flex items-start gap-2">
                              <span className="text-blue-500 font-bold shrink-0 mt-0.5">
                                {h.level === 2 ? `${i + 1}.` : "→"}
                              </span>
                              {h.text}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* Article Body */}
              <div
                ref={contentRef}
                className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm
                  prose max-w-none text-slate-700 text-sm leading-relaxed
                  [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:font-be [&>h2]:border-b [&>h2]:border-slate-100 [&>h2]:pb-2
                  [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-7 [&>h3]:mb-3 [&>h3]:font-be
                  [&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-slate-800 [&>h4]:mt-5 [&>h4]:mb-2 [&>h4]:font-be
                  [&>p]:text-slate-600 [&>p]:text-sm [&>p]:leading-[1.85] [&>p]:mb-5
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-sm [&>ul]:text-slate-600 [&>ul]:mb-5
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:text-sm [&>ol]:text-slate-600 [&>ol]:mb-5
                  [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50/60 [&>blockquote]:px-5 [&>blockquote]:py-3 [&>blockquote]:rounded-r-2xl [&>blockquote]:italic [&>blockquote]:text-slate-700 [&>blockquote]:my-6 [&>blockquote]:text-sm
                  [&_strong]:font-semibold [&_strong]:text-slate-800
                  [&_em]:text-slate-500"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Từ khoá liên quan</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-50 text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors cursor-default"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm flex gap-5 items-start">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-800 font-be">{post.author.name}</h4>
                    <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wide">Tác giả</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{post.author.role}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Bài viết được thẩm định và phê duyệt chất lượng thông tin bởi hội đồng chuyên viên xuất nhập cảnh & lữ hành cao cấp ABTRIP – đơn vị có hơn 10 năm kinh nghiệm trong ngành hàng không và du lịch tại Việt Nam.
                  </p>
                </div>
              </div>

              {/* Share bottom bar */}
              <div className="bg-slate-900 rounded-2xl p-5 flex items-center justify-between gap-4">
                <p className="text-sm text-white font-semibold">Thấy bài viết hữu ích? Hãy chia sẻ với bạn bè!</p>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleFacebookShare}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center gap-1.5 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer ${copied ? "bg-emerald-500 text-white" : "bg-slate-700 hover:bg-slate-600 text-white"}`}
                  >
                    {copied ? <><Check className="w-3.5 h-3.5" /> Đã sao chép!</> : <><Link2 className="w-3.5 h-3.5" /> Sao chép link</>}
                  </button>
                </div>
              </div>

              {/* Back nav */}
              <div className="flex items-center justify-between">
                <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách cẩm nang
                </Link>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">

              {/* Author Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm text-center space-y-3 sticky top-28">
                <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm text-slate-800 font-be leading-none">{post.author.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{post.author.role}</span>
                </div>
                <div className="w-12 h-0.5 bg-blue-600 mx-auto rounded-full"></div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                  Chuyên viên tư vấn cao cấp được thẩm định bởi hội đồng chuyên gia ABTRIP.
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <p className="text-base font-extrabold text-slate-800 font-be">10+</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Năm kinh nghiệm</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <p className="text-base font-extrabold text-blue-600 font-be">5★</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Đánh giá</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              {renderCTA()}

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider font-be pb-3 border-b border-slate-100">
                    Bài viết liên quan
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relPost) => (
                      <Link
                        key={relPost.slug}
                        href={`/blog/${relPost.slug}`}
                        className="group flex gap-3 items-start cursor-pointer"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <img
                            src={relPost.coverImage}
                            alt={relPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors leading-snug line-clamp-3">
                            {relPost.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[9px] text-slate-400 font-semibold">
                            <Calendar className="w-3 h-3" /> {relPost.date}
                            <span>·</span>
                            <Clock className="w-3 h-3" /> {relPost.readTime}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/blog" className="flex items-center justify-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors pt-2 border-t border-slate-100 cursor-pointer">
                    Xem tất cả bài viết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white space-y-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-sm font-be">Nhận Cẩm Nang Du Lịch Mới Nhất</h3>
                <p className="text-xs text-blue-100 font-light leading-relaxed">
                  Đăng ký để nhận ngay hướng dẫn visa, mẹo sân bay và ưu đãi độc quyền từ ABTRIP.
                </p>
                <a
                  href="mailto:info@abtrip.vn?subject=Đăng ký nhận bản tin ABTRIP"
                  className="block text-center bg-white text-blue-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Đăng Ký Miễn Phí
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
