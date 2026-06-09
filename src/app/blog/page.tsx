"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBlog } from "@/context/BlogContext";
import { BlogPost } from "@/data/blogData";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Mail, 
  BookOpen, 
  ShieldAlert,
  MapPin,
  Bot,
  Check,
  TrendingUp,
  Activity,
  ChevronRight
} from "lucide-react";

const CATEGORY_MAP: Record<string, string> = {
  "all": "Tất cả chủ đề",
  "visa-passport": "Thị thực & Hộ chiếu",
  "airport-vip": "Sân bay VIP",
  "tours-hotels": "Tour & Resort",
  "corporate-b2b": "B2B Doanh nghiệp",
  "travel-guides": "Cẩm nang du lịch",
  "culinary-culture": "Ẩm thực & Văn hóa"
};

const GEO_REGIONS = [
  { id: "all", label: "Toàn cầu", code: "GLO" },
  { id: "vietnam", label: "Sân bay & Hộ chiếu VN", code: "VN" },
  { id: "sea", label: "Đông Nam Á", code: "SEA" },
  { id: "northeast-asia", label: "Nhật & Hàn", code: "NEA" },
  { id: "europe-us", label: "Châu Âu & Mỹ", code: "EUM" }
];

const GEO_MATCHERS: Record<string, (post: BlogPost) => boolean> = {
  all: () => true,
  vietnam: (post) => 
    post.slug.includes("ho-chieu") || 
    post.slug.includes("fastrack") || 
    post.tags.some(t => ["hộ chiếu", "sân bay", "tân sơn nhất", "nội bài", "vinpearl", "sun group"].includes(t.toLowerCase())),
  sea: (post) => 
    post.slug.includes("bangkok") || 
    post.tags.some(t => ["thái lan", "bangkok", "đông nam á"].includes(t.toLowerCase())),
  "northeast-asia": (post) => 
    post.slug.includes("nhat-ban") || 
    post.tags.some(t => ["nhật bản", "hàn quốc", "mùa thu"].includes(t.toLowerCase())),
  "europe-us": (post) => 
    post.slug.includes("schengen") || 
    post.tags.some(t => ["schengen", "visa", "châu âu"].includes(t.toLowerCase()))
};

export default function BlogPage() {
  const { posts } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGeo, setSelectedGeo] = useState<string>("all");
  const [emailSub, setEmailSub] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"articles" | "agents">("articles");

  // Filter posts based on Search, Category, and GEO Region
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    const geoMatcher = GEO_MATCHERS[selectedGeo] || GEO_MATCHERS.all;
    const matchesGeo = geoMatcher(post);
    
    return matchesSearch && matchesCategory && matchesGeo;
  });

  // Featured post (first item in the filtered list)
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  // Popular posts for sidebar
  const popularPosts = posts.slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubSuccess(true);
      setEmailSub("");
      setTimeout(() => setSubSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pt-28 pb-24 font-sans antialiased">
      {/* Premium Minimalist Hero Section */}
      <section className="relative py-14 overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/60 rounded-full px-3 py-1 text-slate-500 text-[10px] font-bold tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>ABTRIP Magazine • Cẩm nang 5 Sao</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none font-be">
              Không gian <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700">Trải Nghiệm & Cẩm Nang</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-light leading-relaxed">
              Cập nhật liên tục các quy trình làm hộ chiếu online VNeID cấp độ 2, thủ tục Visa các nước khó, đặc quyền dịch vụ Fastrack tại SGN, HAN, DAD và giải pháp công tác doanh nghiệp.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 max-w-6xl mt-10">
        
        {/* Modern Clean Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-4 md:p-6 mb-10 space-y-4 md:space-y-5">
          {/* Top Row: Category Tabs & Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Categories scroll area */}
            <div className="flex gap-1.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none whitespace-nowrap scroll-smooth">
              {Object.entries(CATEGORY_MAP).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key);
                    setSelectedGeo("all"); // Reset Geo when changing major category to avoid empty states
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 ${
                    selectedCategory === key
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search bar */}
            <div className="relative w-full lg:w-72">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết, dịch vụ, điểm đến..."
                className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Bottom Row: Geographic GEO Filter */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase flex items-center gap-1.5 mr-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> Điểm đến (GEO):
            </span>
            {GEO_REGIONS.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedGeo(region.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                  selectedGeo === region.id
                    ? "bg-blue-50 border-blue-200 text-blue-700 font-extrabold"
                    : "border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800 bg-white"
                }`}
              >
                <span className="text-[9px] px-1 py-0.5 bg-slate-100 text-slate-500 rounded font-mono font-bold">{region.code}</span>
                <span>{region.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Feed Column (Left) */}
          <div className="lg:col-span-8 space-y-10">
            {filteredPosts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl p-14 text-center border border-slate-200/40 shadow-sm space-y-4"
              >
                <ShieldAlert className="w-12 h-12 text-slate-350 mx-auto" />
                <h3 className="font-bold text-base text-slate-800 font-be">Không tìm thấy bài viết tương thích</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-light leading-relaxed">
                  Hiện tại không có bài viết nào thuộc bộ lọc này. Hãy thử chọn danh mục khác hoặc đặt lại bộ lọc.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedGeo("all");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Đặt lại bộ lọc
                </button>
              </motion.div>
            ) : (
              <>
                {/* Featured Post (Magazine Banner Style) */}
                {featuredPost && (
                  <motion.article 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/30 shadow-[0_10px_35px_rgba(0,0,0,0.02)] group hover:shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      <div className="md:col-span-6 relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                        <img 
                          src={featuredPost.coverImage} 
                          alt={featuredPost.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                        />
                        <span className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                          {CATEGORY_MAP[featuredPost.category]}
                        </span>
                      </div>
                      
                      <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-slate-400 text-[10px] font-bold">
                            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {featuredPost.date}</span>
                            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {featuredPost.readTime}</span>
                          </div>
                          
                          <Link href={`/blog/${featuredPost.slug}`}>
                            <h2 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-be leading-snug cursor-pointer line-clamp-3">
                              {featuredPost.title}
                            </h2>
                          </Link>
                          
                          <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-4">
                            {featuredPost.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                          <div className="flex items-center space-x-2.5">
                            <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-7 h-7 rounded-full object-cover border border-slate-100" />
                            <div>
                              <h4 className="text-[11px] font-bold text-slate-800 leading-none">{featuredPost.author.name}</h4>
                              <span className="text-[9px] text-slate-400 font-medium">{featuredPost.author.role}</span>
                            </div>
                          </div>

                          <Link href={`/blog/${featuredPost.slug}`} className="text-blue-600 hover:text-blue-700 font-bold text-xs inline-flex items-center gap-1 group/btn cursor-pointer">
                            Đọc bài viết <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )}

                {/* Grid Feed Section */}
                {gridPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gridPosts.map((post, idx) => (
                      <motion.article 
                        key={post.slug}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: Math.min(idx * 0.05, 0.2), duration: 0.3 }}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/30 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between group hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition-all duration-300"
                      >
                        <div>
                          <div className="relative h-48 overflow-hidden">
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                            <span className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-md uppercase">
                              {CATEGORY_MAP[post.category]}
                            </span>
                          </div>
                          
                          <div className="p-5 space-y-2.5">
                            <div className="flex items-center space-x-3 text-slate-400 text-[9px] font-bold">
                              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {post.date}</span>
                              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {post.readTime}</span>
                            </div>
                            
                            <Link href={`/blog/${post.slug}`}>
                              <h3 className="text-sm md:text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-be leading-snug cursor-pointer line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>
                            
                            <p className="text-[11px] text-slate-500 font-light leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img src={post.author.avatar} alt={post.author.name} className="w-5 h-5 rounded-full object-cover border border-slate-100" />
                            <span className="text-[10px] font-bold text-slate-700">{post.author.name}</span>
                          </div>
                          
                          <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-700 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer">
                            Chi tiết <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar Column (Right) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Interactive GEO Airport tips Box */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/50 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-be">Quy định Sân bay & Hộ chiếu</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50/40 rounded-2xl border border-blue-100/50 text-[11px] space-y-1">
                  <span className="font-extrabold text-blue-800">Sân bay Tân Sơn Nhất (SGN):</span>
                  <p className="text-slate-600 font-light leading-relaxed">Ga Quốc Tế đang trong quá trình cao điểm. Nên đặt dịch vụ check-in nhanh hoặc VIP Fastrack để hạn chế kẹt làm thủ tục.</p>
                </div>
                <div className="p-3 bg-amber-50/40 rounded-2xl border border-amber-100/50 text-[11px] space-y-1">
                  <span className="font-extrabold text-amber-800">Sân bay Nội Bài (HAN):</span>
                  <p className="text-slate-600 font-light leading-relaxed">Quy định nộp hộ chiếu trực tuyến bắt buộc phải có tài khoản VNeID cấp độ 2 và thông tin sim chính chủ trùng khớp CCCD.</p>
                </div>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/50 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <TrendingUp className="w-4 h-4 text-slate-800" />
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-be">Bài viết đọc nhiều</h3>
              </div>
              
              <div className="space-y-4">
                {popularPosts.map((post, idx) => (
                  <div key={post.slug} className="flex items-start space-x-3 group">
                    <span className="text-xl font-extrabold text-slate-200 leading-none shrink-0 w-5">0{idx + 1}</span>
                    <div className="space-y-1">
                      <Link href={`/blog/${post.slug}`}>
                        <h4 className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2 cursor-pointer">
                          {post.title}
                        </h4>
                      </Link>
                      <span className="text-[9px] text-slate-400 font-semibold">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Control Center Log Banner (Minimized details) */}
            <div className="bg-slate-900 rounded-3xl p-5 text-white relative overflow-hidden shadow-md">
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 bg-blue-500/25 border border-blue-400/30 rounded-lg px-2 py-0.5">
                    <Bot className="w-3.5 h-3.5 text-blue-300" />
                    <span className="text-[9px] font-extrabold uppercase text-blue-200">AI Agents Status</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                
                <p className="text-[10px] text-slate-300 font-light leading-relaxed">
                  Tạp chí ABTRIP được giám sát bởi hệ thống AI Agents: <strong>Hoàng Minh</strong> (SEO), <strong>Mai Phương</strong> (Writer), <strong>Duy Anh</strong> (Editor) & <strong>Thu Trang</strong> (Auditor) đảm bảo quy chuẩn hàng không.
                </p>

                <Link 
                  href="/blog/agents"
                  className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-[10px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                >
                  Vào Cổng Điều Hành AI
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-slate-200/50 shadow-sm space-y-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Mail className="w-4.5 h-4.5" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-slate-800 font-be">Nhận Cẩm Nang & Ưu Đãi</h3>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                  Đăng ký email để nhận thông tin cập nhật mới nhất về các quy định xin visa các nước và đặc quyền tiện ích sân bay VIP.
                </p>
              </div>

              {subSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs p-3 rounded-xl font-medium text-center"
                >
                  Đăng ký thành công! Xin cảm ơn.
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input 
                    type="email" 
                    required
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="Nhập địa chỉ email..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-750 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-450"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Đăng Ký Nhận Tin
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
