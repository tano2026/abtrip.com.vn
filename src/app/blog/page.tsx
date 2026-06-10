"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBlog } from "@/context/BlogContext";
import { BlogPost } from "@/data/blogData";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  MapPin,
  ChevronRight,
  Plane,
  Star,
  Shield,
  Briefcase,
  Globe,
  Hotel,
  Car,
  FileText,
  Hash,
  TrendingUp,
  Sparkles,
  Mail,
  Phone,
} from "lucide-react";

/* ─────────────── constants ─────────────── */

const CATEGORY_MAP: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "visa-passport": {
    label: "Thị thực & Hộ chiếu",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  "airport-vip": {
    label: "Sân bay VIP",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
  },
  "tours-hotels": {
    label: "Tour & Khách sạn",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  "corporate-b2b": {
    label: "B2B Doanh nghiệp",
    color: "text-[#104476]",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  "travel-guides": {
    label: "Cẩm nang du lịch",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  "culinary-culture": {
    label: "Ẩm thực & Văn hóa",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

const GEO_REGIONS = [
  { id: "all", label: "Toàn cầu", code: "GLO" },
  { id: "vietnam", label: "Việt Nam", code: "VN" },
  { id: "sea", label: "Đông Nam Á", code: "SEA" },
  { id: "northeast-asia", label: "Nhật & Hàn", code: "NEA" },
  { id: "europe-us", label: "Châu Âu & Mỹ", code: "EUM" },
];

const GEO_MATCHERS: Record<string, (post: BlogPost) => boolean> = {
  all: () => true,
  vietnam: (post) =>
    post.slug.includes("ho-chieu") ||
    post.slug.includes("fastrack") ||
    post.tags.some((t) =>
      ["hộ chiếu", "sân bay", "tân sơn nhất", "nội bài"].includes(t.toLowerCase())
    ),
  sea: (post) =>
    post.slug.includes("bangkok") ||
    post.tags.some((t) =>
      ["thái lan", "bangkok", "đông nam á"].includes(t.toLowerCase())
    ),
  "northeast-asia": (post) =>
    post.slug.includes("nhat-ban") ||
    post.tags.some((t) =>
      ["nhật bản", "hàn quốc", "mùa thu"].includes(t.toLowerCase())
    ),
  "europe-us": (post) =>
    post.slug.includes("schengen") ||
    post.tags.some((t) => ["schengen", "visa", "châu âu"].includes(t.toLowerCase())),
};

/* ─────────────── service hubs ─────────────── */

const SERVICE_HUBS = [
  {
    id: "ve-may-bay",
    icon: Plane,
    label: "Vé Máy Bay",
    sublabel: "B2B & Tích hợp API",
    href: "/ve-may-bay",
    gradient: "from-[#104476] to-[#1a6fc4]",
    badge: "B2B · B2G",
    topics: ["Vé công tác doanh nghiệp", "Hàng không nội địa & quốc tế", "Tích hợp GDS & API"],
    cat: "corporate-b2b",
  },
  {
    id: "dich-vu-san-bay",
    icon: Star,
    label: "Sân Bay VIP",
    sublabel: "Fastrack · Phòng chờ",
    href: "/dich-vu-san-bay",
    gradient: "from-[#00829A] to-[#00b4d8]",
    badge: "VIP · Premium",
    topics: ["Fastrack thủ tục ưu tiên", "Phòng chờ thương gia", "Đưa đón sân bay hạng sang"],
    cat: "airport-vip",
  },
  {
    id: "visa-ho-chieu",
    icon: Shield,
    label: "Visa & Hộ Chiếu",
    sublabel: "Xử lý toàn bộ hồ sơ",
    href: "/visa-ho-chieu",
    gradient: "from-violet-600 to-purple-700",
    badge: "Khẩn · Đoàn",
    topics: ["Visa Schengen · Anh · Mỹ", "Gia hạn hộ chiếu khẩn", "Visa đoàn công vụ"],
    cat: "visa-passport",
  },
  {
    id: "tour",
    icon: Globe,
    label: "Tour Du Lịch",
    sublabel: "MICE · Incentive · FIT",
    href: "/tour",
    gradient: "from-emerald-600 to-teal-600",
    badge: "Thiết kế riêng",
    topics: ["Tour MICE doanh nghiệp", "Incentive trip cao cấp", "FIT Châu Âu · Nhật · Hàn"],
    cat: "tours-hotels",
  },
  {
    id: "khach-san",
    icon: Hotel,
    label: "Khách Sạn",
    sublabel: "Hợp đồng B2B ưu đãi",
    href: "/khach-san",
    gradient: "from-amber-600 to-orange-600",
    badge: "Corporate Rate",
    topics: ["Hợp đồng khách sạn doanh nghiệp", "Resort & nghỉ dưỡng 5 sao", "Booking nhanh có xuất hóa đơn"],
    cat: "tours-hotels",
  },
  {
    id: "dich-vu-mat-dat",
    icon: Car,
    label: "Dịch Vụ Mặt Đất",
    sublabel: "Xe đưa đón · Sự kiện",
    href: "/dich-vu-mat-dat",
    gradient: "from-slate-600 to-gray-700",
    badge: "24/7",
    topics: ["Xe công vụ VIP đưa đón sân bay", "Tổ chức hội nghị · sự kiện", "SIM du lịch quốc tế"],
    cat: "corporate-b2b",
  },
];

/* ─────────────── components ─────────────── */

function CategoryBadge({ category }: { category: string }) {
  const cfg = CATEGORY_MAP[category] ?? {
    label: category,
    color: "text-gray-600",
    bg: "bg-gray-100",
    border: "border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  );
}

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden h-[360px] md:h-[440px]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <CategoryBadge category={post.category} />
            <h2 className="mt-3 text-xl md:text-2xl font-extrabold text-white leading-snug [text-wrap:balance] group-hover:text-cyan-300 transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-white/70 line-clamp-2">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="ml-auto flex items-center gap-1 text-cyan-300 font-semibold text-xs group-hover:gap-2 transition-all">
                Đọc ngay <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden h-44">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-[14px] leading-snug line-clamp-2 group-hover:text-[#104476] transition-colors flex-1">
            {post.title}
          </h3>
          <p className="mt-2 text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function HorizontalPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-3 items-start py-3 border-b border-gray-100 last:border-0">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#104476] transition-colors">
          {post.title}
        </p>
        <span className="text-[10px] text-gray-400 mt-1 block">{post.readTime} · {post.date}</span>
      </div>
    </Link>
  );
}

/* ─────────────── main page ─────────────── */

export default function BlogPage() {
  const { posts } = useBlog();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeGeo, setActiveGeo] = useState("all");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    let list = [...posts];
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    const geoMatch = GEO_MATCHERS[activeGeo] ?? (() => true);
    list = list.filter(geoMatch);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [posts, activeCategory, activeGeo, search]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);
  const trendingPosts = [...posts].slice(0, 5);

  const allCategories = ["all", ...Object.keys(CATEGORY_MAP)];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-16"
        style={{ background: "linear-gradient(135deg, #0a2e52 0%, #104476 50%, #00829A 100%)" }}
      >
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 mb-5"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
                ABTRIP Knowledge Hub
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight [text-wrap:balance] hyphens-none font-be"
            >
              <span className="block">Cẩm Nang Du Lịch &</span>
              <span className="block text-cyan-300">Hàng Không Doanh Nghiệp</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-base md:text-lg text-white/70 [text-wrap:balance]"
            >
              Hướng dẫn chuyên sâu về vé máy bay B2B, visa, fastrack sân bay, tour MICE, khách sạn doanh nghiệp và tất cả dịch vụ của ABTRIP.
            </motion.p>

            {/* search bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 relative max-w-xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm: visa Schengen, fastrack Nội Bài, vé máy bay B2B..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </motion.div>

            {/* GEO region filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 flex flex-wrap justify-center gap-2"
            >
              {GEO_REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveGeo(r.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all ${
                    activeGeo === r.id
                      ? "bg-white text-[#104476] border-white"
                      : "bg-white/10 text-white/70 border-white/20 hover:bg-white/20"
                  }`}
                >
                  <span className="opacity-60 mr-1">{r.code}</span>
                  {r.label}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" className="block w-full" preserveAspectRatio="none">
            <path d="M0,40 L1440,40 L1440,10 Q720,40 0,10 Z" fill="rgb(249,250,251)" />
          </svg>
        </div>
      </section>

      {/* ── SERVICE TOPIC HUBS ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">
              Khám phá theo dịch vụ
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Nội dung chuyên sâu theo từng mảng dịch vụ của ABTRIP
            </p>
          </div>
          <Link
            href="/dich-vu-san-bay"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#00829A] hover:text-[#104476] transition-colors"
          >
            Xem tất cả dịch vụ <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SERVICE_HUBS.map((hub, i) => {
            const Icon = hub.icon;
            return (
              <motion.div
                key={hub.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link href={hub.href} className="group block">
                  <div className="rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300 h-full">
                    {/* colored top strip */}
                    <div className={`bg-gradient-to-r ${hub.gradient} p-3 flex items-center justify-between`}>
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-[9px] font-bold text-white/80 bg-white/20 rounded-full px-1.5 py-0.5">
                        {hub.badge}
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-[12px] font-extrabold text-gray-800 group-hover:text-[#104476] transition-colors leading-tight">
                        {hub.label}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5 mb-2">{hub.sublabel}</p>
                      <ul className="space-y-1">
                        {hub.topics.map((t) => (
                          <li key={t} className="flex items-start gap-1 text-[10px] text-gray-500">
                            <Hash className="w-2.5 h-2.5 mt-0.5 flex-shrink-0 text-gray-300" />
                            <span className="leading-tight">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CATEGORY FILTER BAR ──────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {allCategories.map((cat) => {
            const isAll = cat === "all";
            const cfg = isAll
              ? null
              : CATEGORY_MAP[cat];
            const label = isAll ? "Tất cả" : cfg!.label;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all whitespace-nowrap ${
                  active
                    ? "bg-[#104476] text-white border-[#104476] shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeGeo}-${search}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* ── left: articles ── */}
            <div className="flex-1 min-w-0">
              {filteredPosts.length === 0 ? (
                <div className="py-20 text-center">
                  <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">Không tìm thấy bài viết phù hợp.</p>
                  <button
                    onClick={() => { setSearch(""); setActiveCategory("all"); setActiveGeo("all"); }}
                    className="mt-3 text-sm text-[#00829A] font-semibold hover:underline"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <>
                  {/* featured post */}
                  {featuredPost && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-[#00829A]" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nổi bật</span>
                      </div>
                      <PostCard post={featuredPost} featured />
                    </div>
                  )}

                  {/* grid */}
                  {gridPosts.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          {search
                            ? `${filteredPosts.length} kết quả`
                            : activeCategory !== "all"
                            ? CATEGORY_MAP[activeCategory]?.label
                            : "Bài viết mới nhất"}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {gridPosts.map((post, i) => (
                          <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.04 }}
                          >
                            <PostCard post={post} />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* ── right: sidebar ── */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
              {/* quick services */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ background: "linear-gradient(135deg, #104476 0%, #00829A 100%)" }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-xs font-extrabold text-white uppercase tracking-wide">
                    Dịch vụ ABTRIP
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {SERVICE_HUBS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.id}
                        href={s.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-700 group-hover:text-[#104476] transition-colors">
                            {s.label}
                          </p>
                          <p className="text-[10px] text-gray-400">{s.sublabel}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#00829A] transition-colors flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* trending posts */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                    Đọc nhiều nhất
                  </span>
                </div>
                <div>
                  {trendingPosts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex gap-3 items-start py-2.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-lg font-black text-gray-100 w-5 flex-shrink-0 leading-none pt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-700 leading-snug line-clamp-2 group-hover:text-[#104476] transition-colors">
                          {post.title}
                        </p>
                        <span className="text-[10px] text-gray-400 mt-0.5 block">{post.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* GEO / location context */}
              <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-xl border border-sky-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-extrabold text-sky-700 uppercase tracking-wide">
                    Sân bay phục vụ
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { code: "HAN", name: "Nội Bài – Hà Nội", flag: "🏙" },
                    { code: "SGN", name: "Tân Sơn Nhất – TP.HCM", flag: "🌆" },
                    { code: "DAD", name: "Đà Nẵng", flag: "🌊" },
                    { code: "CXR", name: "Cam Ranh – Nha Trang", flag: "🏖" },
                    { code: "PQC", name: "Phú Quốc", flag: "🏝" },
                  ].map((ap) => (
                    <div key={ap.code} className="flex items-center gap-2 text-xs">
                      <span>{ap.flag}</span>
                      <span className="font-bold text-sky-800">{ap.code}</span>
                      <span className="text-sky-600 text-[11px]">{ap.name}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/dich-vu-san-bay"
                  className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-900 transition-colors"
                >
                  Xem dịch vụ sân bay <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* contact CTA */}
              <div
                className="rounded-xl p-4 text-white"
                style={{ background: "linear-gradient(135deg, #104476 0%, #00829A 100%)" }}
              >
                <p className="text-xs font-extrabold uppercase tracking-wide text-white/70 mb-1">
                  Cần tư vấn ngay?
                </p>
                <p className="text-sm font-bold leading-snug mb-3">
                  Đội ngũ ABTRIP hỗ trợ 24/7 cho mọi nhu cầu dịch vụ
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:0868320320"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    0868 320 320
                  </a>
                  <a
                    href="https://zalo.me/0868320320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.97 16.528c-.21.568-.997 1.026-1.636 1.136-.44.075-.99.135-2.878-.618-2.417-.96-3.977-3.42-4.099-3.58-.12-.155-.98-1.303-.98-2.487 0-1.185.62-1.77.84-2.01.22-.236.48-.295.64-.295.16 0 .32 0 .46.007.147.007.345-.056.54.41.2.477.679 1.665.74 1.787.06.12.1.262.02.42-.08.155-.12.254-.24.39-.12.136-.252.305-.36.41-.12.116-.245.24-.105.473.14.236.623 1.026 1.34 1.662.92.82 1.695 1.073 1.935 1.19.24.117.38.097.52-.058.14-.156.6-.7.76-.94.16-.237.32-.2.54-.12.22.076 1.4.66 1.64.78.24.118.4.177.46.274.06.1.06.576-.15 1.145z" />
                    </svg>
                    Chat Zalo ABTRIP
                  </a>
                </div>
              </div>

              {/* newsletter */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-[#104476]" />
                  <span className="text-xs font-extrabold text-gray-700">Nhận bản tin hàng tuần</span>
                </div>
                <p className="text-[11px] text-gray-500 mb-3">
                  Cập nhật visa, chính sách bay mới, ưu đãi doanh nghiệp mỗi thứ Hai.
                </p>
                {subscribed ? (
                  <p className="text-xs font-bold text-emerald-600 text-center py-2">
                    ✓ Đăng ký thành công!
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="email@congty.vn"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-1 min-w-0 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#104476]"
                    />
                    <button
                      onClick={() => { if (emailInput) setSubscribed(true); }}
                      className="flex-shrink-0 rounded-lg px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #104476, #00829A)" }}
                    >
                      Đăng ký
                    </button>
                  </div>
                )}
              </div>
            </aside>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── BOTTOM SERVICE CTA STRIP ─────────────────────── */}
      <section
        className="py-12"
        style={{ background: "linear-gradient(135deg, #0a2e52 0%, #104476 60%, #00829A 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Giải pháp dịch vụ toàn diện cho doanh nghiệp
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Từ vé máy bay đến tổ chức sự kiện — ABTRIP lo trọn gói
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICE_HUBS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  className="group flex flex-col items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 p-3 transition-all text-center"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white/90 leading-tight group-hover:text-white">
                    {s.label}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-cyan-300 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
