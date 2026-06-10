"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBlog } from "@/context/BlogContext";
import { BlogPost } from "@/data/blogData";
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Camera,
  Utensils,
  Landmark,
  Lightbulb,
  Plane,
  Star,
  ChevronRight,
  Calendar,
  Globe,
  Heart,
  BookOpen,
  Phone,
} from "lucide-react";

/* ─────────────── destination data ─────────────── */

const REGIONS = [
  { id: "all", label: "Tất cả", emoji: "🌍" },
  { id: "sea", label: "Đông Nam Á", emoji: "🌴" },
  { id: "northeast-asia", label: "Nhật & Hàn", emoji: "🗾" },
  { id: "europe", label: "Châu Âu", emoji: "🏰" },
  { id: "americas", label: "Mỹ & Úc", emoji: "🗽" },
  { id: "vietnam", label: "Trong nước", emoji: "🇻🇳" },
];

const TOPIC_HUBS = [
  {
    id: "destination",
    icon: Compass,
    label: "Điểm Đến",
    desc: "Review chi tiết các điểm đến nổi bật trên thế giới",
    color: "from-sky-500 to-blue-600",
    lightBg: "bg-sky-50",
    textColor: "text-sky-700",
    borderColor: "border-sky-200",
    tags: ["Nhật Bản", "Hàn Quốc", "Pháp", "Ý", "Thái Lan"],
  },
  {
    id: "food",
    icon: Utensils,
    label: "Ẩm Thực",
    desc: "Món ngon không thể bỏ lỡ khi đến mỗi vùng đất",
    color: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    tags: ["Sushi Nhật", "Đồ ăn đường phố", "Fine Dining", "Ẩm thực VN"],
  },
  {
    id: "culture",
    icon: Landmark,
    label: "Văn Hóa & Lễ Hội",
    desc: "Phong tục tập quán, lễ hội, nghệ thuật địa phương",
    color: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    textColor: "text-violet-700",
    borderColor: "border-violet-200",
    tags: ["Lễ hội ánh sáng", "Trà đạo", "Carnaval", "Tết Nguyên Đán"],
  },
  {
    id: "tips",
    icon: Lightbulb,
    label: "Mẹo & Kinh Nghiệm",
    desc: "Bí kíp du lịch tiết kiệm, an toàn và thú vị hơn",
    color: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    tags: ["Visa tự túc", "Đặt vé giá rẻ", "Hành lý xách tay", "SIM du lịch"],
  },
];

const FEATURED_DESTINATIONS = [
  {
    name: "Nhật Bản",
    tagline: "Đất nước mặt trời mọc",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1200&auto=format&fit=crop",
    tags: ["Mùa hoa anh đào", "Tokyo · Kyoto · Osaka"],
    region: "northeast-asia",
    badge: "🔥 Hot",
    badgeColor: "bg-rose-500",
    desc: "Từ đường phố Tokyo hiện đại đến cố đô Kyoto cổ kính — Nhật Bản luôn là điểm đến trong mơ của người Việt.",
    href: "/blog/du-lich-nhat-ban",
  },
  {
    name: "Pháp · Paris",
    tagline: "Kinh đô ánh sáng",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    tags: ["Visa Schengen", "Tháp Eiffel · Versailles"],
    region: "europe",
    badge: "✈️ Visa",
    badgeColor: "bg-blue-600",
    desc: "Paris — nơi thời trang, nghệ thuật và ẩm thực giao thoa. Hướng dẫn visa Schengen & lịch trình 7 ngày.",
    href: "/blog/kinh-nghiem-xin-visa-schengen",
  },
  {
    name: "Thái Lan",
    tagline: "Đất nước Chùa Vàng",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
    tags: ["Bay thẳng 1.5h", "Bangkok · Phuket · Chiang Mai"],
    region: "sea",
    badge: "🌴 Gần",
    badgeColor: "bg-emerald-600",
    desc: "Gần, rẻ, đẹp và ngon — Thái Lan là lựa chọn hoàn hảo cho kỳ nghỉ ngắn ngày hoặc MICE doanh nghiệp.",
    href: "/tour",
  },
];

const DESTINATION_GRID = [
  {
    name: "Hàn Quốc",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    tagline: "Seoul · Jeju · Busan",
    region: "northeast-asia",
    emoji: "🇰🇷",
  },
  {
    name: "Ý - Italy",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop",
    tagline: "Rome · Venice · Milan",
    region: "europe",
    emoji: "🇮🇹",
  },
  {
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
    tagline: "Đảo quốc sư tử",
    region: "sea",
    emoji: "🇸🇬",
  },
  {
    name: "Phú Quốc",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800&auto=format&fit=crop",
    tagline: "Đảo Ngọc Việt Nam",
    region: "vietnam",
    emoji: "🏝",
  },
  {
    name: "Thụy Sĩ",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    tagline: "Alps · Zurich · Geneva",
    region: "europe",
    emoji: "🇨🇭",
  },
  {
    name: "Đà Nẵng",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800&auto=format&fit=crop",
    tagline: "Biển Mỹ Khê · Bà Nà",
    region: "vietnam",
    emoji: "🌊",
  },
];

const TRAVEL_TIPS = [
  { icon: "📋", tip: "Làm visa Schengen sớm ít nhất 8 tuần trước chuyến đi" },
  { icon: "💺", tip: "Đặt vé máy bay thứ 3 hoặc thứ 4 thường rẻ hơn 20-30%" },
  { icon: "📱", tip: "SIM eSIM quốc tế — nhận QR code, kích hoạt trước khi lên máy bay" },
  { icon: "🏨", tip: "Khách sạn gần trung tâm thành phố tiết kiệm chi phí di chuyển đáng kể" },
  { icon: "🛂", tip: "Fastrack sân bay — tiết kiệm 45-60 phút thủ tục, đặc biệt mùa cao điểm" },
  { icon: "💳", tip: "Mang theo thẻ Visa/Mastercard quốc tế — không dùng tiền mặt tại Châu Âu" },
];

/* ─────────────── sub-components ─────────────── */

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden h-44">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-[13px] leading-snug line-clamp-2 group-hover:text-[#104476] transition-colors flex-1">
            {post.title}
          </h3>
          <p className="mt-2 text-[11px] text-gray-500 line-clamp-2">{post.excerpt}</p>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────── main page ─────────────── */

export default function KhamPhaPage() {
  const { posts } = useBlog();
  const [activeRegion, setActiveRegion] = useState("all");
  const [activeTopic, setActiveTopic] = useState("all");
  const [search, setSearch] = useState("");

  // filter to travel-related posts
  const travelPosts = useMemo(() => {
    const relevant = posts.filter((p) =>
      ["travel-guides", "culinary-culture", "tours-hotels", "visa-passport"].includes(p.category)
    );
    let list = [...relevant];
    if (activeRegion !== "all") {
      const regionMatchers: Record<string, (p: BlogPost) => boolean> = {
        sea: (p) => p.tags.some((t) => ["thái lan", "bangkok", "đông nam á", "singapore"].includes(t.toLowerCase())),
        "northeast-asia": (p) => p.tags.some((t) => ["nhật bản", "hàn quốc", "tokyo", "seoul"].includes(t.toLowerCase())),
        europe: (p) => p.tags.some((t) => ["schengen", "châu âu", "paris", "rome"].includes(t.toLowerCase())),
        vietnam: (p) => p.tags.some((t) => ["việt nam", "hà nội", "hội an", "phú quốc", "đà nẵng"].includes(t.toLowerCase())),
        americas: (p) => p.tags.some((t) => ["mỹ", "úc", "new york"].includes(t.toLowerCase())),
      };
      const matcher = regionMatchers[activeRegion];
      if (matcher) list = list.filter(matcher);
    }
    if (activeTopic !== "all") {
      const topicMap: Record<string, BlogPost["category"][]> = {
        destination: ["travel-guides", "tours-hotels"],
        food: ["culinary-culture"],
        culture: ["culinary-culture"],
        tips: ["travel-guides", "visa-passport"],
      };
      const cats = topicMap[activeTopic];
      if (cats) list = list.filter((p) => cats.includes(p.category));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [posts, activeRegion, activeTopic, search]);

  const featuredPost = travelPosts[0];
  const restPosts = travelPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-[520px] flex items-end overflow-hidden">
        {/* background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop"
            alt="Khám phá thế giới cùng ABTRIP"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-14 pt-36 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-1.5 mb-4"
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs font-semibold text-white/90 uppercase tracking-wide">ABTRIP · Travel Magazine</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight hyphens-none font-be"
            >
              <span className="block">Khám Phá</span>
              <span className="block text-amber-300">Thế Giới</span>
              <span className="block">Cùng ABTRIP</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-base md:text-lg text-white/75 [text-wrap:balance] max-w-lg"
            >
              Điểm đến nổi bật, ẩm thực địa phương, văn hóa & lễ hội, mẹo du lịch từ đội ngũ chuyên gia ABTRIP — cho mọi hành trình từ ngắn ngày đến vòng quanh thế giới.
            </motion.p>

            {/* search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 relative max-w-md"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm điểm đến, ẩm thực, mẹo du lịch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REGION TABS ─────────────────────────────────── */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRegion(r.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  activeRegion === r.id
                    ? "bg-amber-400 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{r.emoji}</span>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* ── TOPIC HUBS ──────────────────────────────────── */}
        {activeRegion === "all" && activeTopic === "all" && !search && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-gray-900">Khám phá theo chủ đề</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {TOPIC_HUBS.map((hub, i) => {
                const Icon = hub.icon;
                return (
                  <motion.button
                    key={hub.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setActiveTopic(hub.id)}
                    className={`text-left rounded-xl border p-4 hover:shadow-md transition-all ${hub.lightBg} ${hub.borderColor} group`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${hub.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <p className={`text-sm font-extrabold ${hub.textColor} mb-1`}>{hub.label}</p>
                    <p className="text-[11px] text-gray-500 leading-snug mb-3">{hub.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {hub.tags.slice(0, 3).map((t) => (
                        <span key={t} className={`text-[9px] font-semibold ${hub.textColor} ${hub.lightBg} border ${hub.borderColor} rounded-full px-2 py-0.5`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        )}

        {/* topic filter pills (when a topic is selected) */}
        {activeTopic !== "all" && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Chủ đề:</span>
            {["all", ...TOPIC_HUBS.map((h) => h.id)].map((t) => {
              const hub = TOPIC_HUBS.find((h) => h.id === t);
              return (
                <button
                  key={t}
                  onClick={() => setActiveTopic(t)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all ${
                    activeTopic === t
                      ? "bg-amber-400 text-white border-amber-400"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {t === "all" ? "Tất cả" : hub?.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">

            {/* FEATURED DESTINATIONS (homepage only) */}
            {activeRegion === "all" && activeTopic === "all" && !search && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wide">Điểm đến nổi bật</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {FEATURED_DESTINATIONS.map((dest, i) => (
                    <motion.div
                      key={dest.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Link href={dest.href} className="group block">
                        <div className="relative rounded-2xl overflow-hidden h-64">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          {/* badge */}
                          <div className={`absolute top-3 left-3 ${dest.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                            {dest.badge}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white font-extrabold text-lg leading-tight">{dest.name}</p>
                            <p className="text-white/70 text-xs">{dest.tagline}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {dest.tags.map((t) => (
                                <span key={t} className="bg-white/15 text-white/90 text-[10px] font-semibold rounded-full px-2 py-0.5">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 px-1">
                          <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-700 transition-colors">
                            {dest.desc}
                          </p>
                          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#00829A] group-hover:gap-2 transition-all">
                            Khám phá <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* DESTINATION GRID (homepage only) */}
            {activeRegion === "all" && activeTopic === "all" && !search && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-[#104476]" />
                  <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wide">Điểm đến phổ biến</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DESTINATION_GRID.map((dest, i) => (
                    <motion.button
                      key={dest.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setActiveRegion(dest.region)}
                      className="group relative rounded-xl overflow-hidden h-28 text-left"
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                      <div className="absolute bottom-0 left-0 p-3">
                        <p className="text-white font-bold text-sm">{dest.emoji} {dest.name}</p>
                        <p className="text-white/60 text-[10px]">{dest.tagline}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>
            )}

            {/* ARTICLES */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wide">
                    {search
                      ? `${travelPosts.length} kết quả tìm kiếm`
                      : activeTopic !== "all"
                      ? `${TOPIC_HUBS.find((h) => h.id === activeTopic)?.label}`
                      : activeRegion !== "all"
                      ? `Bài viết · ${REGIONS.find((r) => r.id === activeRegion)?.label}`
                      : "Bài viết mới nhất"}
                  </h2>
                </div>
                {(activeTopic !== "all" || activeRegion !== "all" || search) && (
                  <button
                    onClick={() => { setActiveTopic("all"); setActiveRegion("all"); setSearch(""); }}
                    className="text-xs text-[#00829A] font-semibold hover:underline"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeRegion}-${activeTopic}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {travelPosts.length === 0 ? (
                    <div className="py-16 text-center">
                      <Compass className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">Chưa có bài viết cho bộ lọc này.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {travelPosts.map((post, i) => (
                        <motion.div
                          key={post.slug}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <PostCard post={post} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </section>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-5">
            {/* quick tips */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wide">Mẹo du lịch nhanh</span>
              </div>
              <div className="space-y-2.5">
                {TRAVEL_TIPS.map((tip, i) => (
                  <div key={i} className="flex gap-2 text-xs text-amber-900">
                    <span className="flex-shrink-0">{tip.icon}</span>
                    <span className="leading-snug">{tip.tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* regions quick nav */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#00829A]" />
                <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">Theo vùng</span>
              </div>
              <div className="space-y-1">
                {REGIONS.filter((r) => r.id !== "all").map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRegion(r.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeRegion === r.id
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{r.emoji}</span>
                    {r.label}
                    <ChevronRight className="w-3 h-3 ml-auto text-gray-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* tour CTA */}
            <div className="rounded-xl overflow-hidden border border-gray-100">
              <div
                className="px-4 py-3"
                style={{ background: "linear-gradient(135deg, #104476 0%, #00829A 100%)" }}
              >
                <p className="text-xs font-extrabold text-white uppercase tracking-wide">Đặt tour ngay</p>
              </div>
              <div className="bg-white p-4 space-y-2">
                {[
                  { label: "🗾 Tour Nhật Bản", sub: "Khởi hành hàng tuần", href: "/tour" },
                  { label: "🌴 Tour Đông Nam Á", sub: "MICE · FIT · Ghép đoàn", href: "/tour" },
                  { label: "🏰 Tour Châu Âu", sub: "Visa Schengen trọn gói", href: "/tour" },
                  { label: "🎪 Tour MICE", sub: "Incentive · Teambuilding", href: "/to-chuc-su-kien" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-50 group transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                      <p className="text-[10px] text-gray-400">{item.sub}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#00829A] flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* visa reminder */}
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
              <p className="text-xs font-extrabold text-violet-700 mb-2">🛂 Cần xin visa?</p>
              <p className="text-[11px] text-violet-600 leading-snug mb-3">
                ABTRIP hỗ trợ visa Schengen, Nhật Bản, Hàn Quốc, Anh, Mỹ & 30+ quốc gia khác. Tỷ lệ đậu 98%.
              </p>
              <Link
                href="/visa-ho-chieu"
                className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 transition-colors"
              >
                Xem dịch vụ visa <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* contact */}
            <div
              className="rounded-xl p-4 text-white"
              style={{ background: "linear-gradient(135deg, #104476 0%, #00829A 100%)" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-wide text-white/70 mb-1">Tư vấn miễn phí</p>
              <p className="text-sm font-bold leading-snug mb-3">
                Lên kế hoạch hành trình hoàn hảo cùng chuyên gia ABTRIP
              </p>
              <a
                href="tel:0868320320"
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                0868 320 320
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ── BOTTOM INSPIRATION STRIP ────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
              Hành trình của bạn bắt đầu tại đây
            </h2>
            <p className="text-sm text-gray-500 mt-1">Từ vé máy bay đến trọn gói tour — ABTRIP lo từ A đến Z</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Plane, label: "Vé Máy Bay", sub: "B2B & tích hợp API", href: "/ve-may-bay", color: "from-[#104476] to-[#1a6fc4]" },
              { icon: Star, label: "Sân Bay VIP", sub: "Fastrack · Phòng chờ", href: "/dich-vu-san-bay", color: "from-[#00829A] to-[#00b4d8]" },
              { icon: Globe, label: "Tour Du Lịch", sub: "MICE · FIT · Đặt riêng", href: "/tour", color: "from-emerald-600 to-teal-600" },
              { icon: Heart, label: "Visa & Hộ Chiếu", sub: "98% tỷ lệ đậu", href: "/visa-ho-chieu", color: "from-violet-600 to-purple-700" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  className="group flex flex-col items-center gap-2 rounded-xl bg-white border border-gray-100 hover:shadow-md hover:border-gray-200 p-5 transition-all text-center"
                >
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-[#104476] transition-colors">{s.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-[#00829A] transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
