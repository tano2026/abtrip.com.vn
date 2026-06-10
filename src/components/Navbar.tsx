"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Phone,
  Menu,
  X,
  CheckCircle,
  Zap,
  Wifi,
  Coffee,
  Coins,
  Smartphone,
  FileText,
  Globe,
  Shield,
  Users,
  Map,
  Calendar,
  UserCheck,
  Wrench,
  Heart,
  Plane,
  Hotel,
  ArrowRight,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────── */

const airportServices = [
  { title: "Fast Check-in", desc: "Ưu tiên làm thủ tục nhanh", href: "/dich-vu-san-bay/fast-check-in", icon: CheckCircle, badge: "" },
  { title: "Fastrack", desc: "Đi qua cửa an ninh không chờ", href: "/dich-vu-san-bay/fastrack", icon: Zap, badge: "Hot" },
  { title: "Thuê WiFi", desc: "WiFi pocket 4G tốc độ cao", href: "/dich-vu-san-bay/thue-wifi", icon: Wifi, badge: "" },
  { title: "Phòng chờ Thương gia", desc: "VIP Lounge tại HAN · SGN · DAD", href: "/dich-vu-san-bay/phong-cho-thuong-gia", icon: Coffee, badge: "VIP" },
  { title: "Đổi Ngoại Tệ", desc: "Tỷ giá tốt, không phí ẩn", href: "/dich-vu-san-bay/doi-ngoai-te", icon: Coins, badge: "" },
];

const travelUtilities = [
  { title: "SIM & eSIM Du lịch", desc: "200+ quốc gia, nhận QR 5 phút", href: "/sim", icon: Smartphone, badge: "New" },
  { title: "Visa Quốc Tế", desc: "Mỹ, Schengen, Nhật, Hàn...", href: "/visa-ho-chieu/visa", icon: FileText, badge: "" },
  { title: "Hộ Chiếu Online", desc: "Làm khẩn 1–3 ngày qua VNeID", href: "/visa-ho-chieu/ho-chieu", icon: Globe, badge: "" },
  { title: "Đặt Phòng Khách Sạn", desc: "500.000+ khách sạn, giá B2B", href: "/khach-san", icon: Hotel, badge: "" },
  { title: "Bảo Hiểm Du Lịch", desc: "Schengen & toàn cầu", href: "/visa-ho-chieu/bao-hiem-du-lich", icon: Shield, badge: "" },
];

const travelTourism = [
  { title: "Tour Ghép Đoàn", desc: "Giá tốt, khởi hành định kỳ", href: "/tour/tour-ghep", icon: Users, badge: "" },
  { title: "Tour Đặt Riêng", desc: "Thiết kế theo yêu cầu", href: "/tour/tour-dat-rieng", icon: Map, badge: "" },
  { title: "Tổ Chức Sự Kiện & MICE", desc: "Incentive · Gala · Teambuilding", href: "/to-chuc-su-kien", icon: Calendar, badge: "" },
];

const groundServices = [
  { title: "Đại Diện Hãng Bay", desc: "Thủ tục, passenger handling", href: "/dich-vu-mat-dat/dai-dien-hang", icon: UserCheck, badge: "" },
  { title: "Cấp Phép Bay & Slots", desc: "Xin phép khai thác, slot bay", href: "/dich-vu-mat-dat/cap-phep-bay", icon: FileText, badge: "" },
  { title: "Kỹ Thuật & Ramp Services", desc: "Jet A-1, GPU/ASU, sân đỗ", href: "/dich-vu-mat-dat/ky-thuat-san-do", icon: Wrench, badge: "" },
  { title: "Hỗ Trợ Phi Hành Đoàn", desc: "Crew handling, briefing", href: "/dich-vu-mat-dat/ho-tro-phi-hanh-doan", icon: Heart, badge: "" },
  { title: "Chuyên Cơ & Thuê Chuyến", desc: "Private jet, charter flight", href: "/dich-vu-mat-dat/chuyen-co-thue-chuyen", icon: Plane, badge: "VIP" },
];

/* ─── TYPES ─────────────────────────────────────────────── */
type DropdownItem = { title: string; desc: string; href: string; icon: React.ElementType; badge: string };

/* ─── DROPDOWN PANEL ─────────────────────────────────────── */
function DropdownPanel({ items, cols = 1 }: { items: DropdownItem[]; cols?: 1 | 2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.10)] border border-slate-100 overflow-hidden p-2 ${cols === 2 ? "w-[480px]" : "w-[260px]"}`}
    >
      <div className={`${cols === 2 ? "grid grid-cols-2 gap-0.5" : "space-y-0.5"}`}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.href}
              className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors shrink-0 mt-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-none">{item.title}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full leading-none ${item.badge === "VIP" ? "bg-amber-100 text-amber-600" : item.badge === "Hot" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-600"}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-medium leading-snug block mt-0.5">{item.desc}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── NAV ITEM WITH DROPDOWN ─────────────────────────────── */
function NavDropdown({ label, items, cols }: { label: string; items: DropdownItem[]; cols?: 1 | 2 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`flex items-center gap-0.5 whitespace-nowrap px-3 py-2 rounded-full font-semibold text-[13.5px] transition-all duration-200 cursor-pointer focus:outline-none ${open ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
      </button>
      <AnimatePresence>
        {open && <DropdownPanel items={items} cols={cols} />}
      </AnimatePresence>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[94%] sm:w-[92%] max-w-7xl ${
          mobileOpen
            ? "top-3 bg-white border border-slate-200 shadow-2xl py-3.5 rounded-3xl"
            : isScrolled
            ? "top-3 bg-white/92 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_32px_rgba(16,68,118,0.08)] py-2 rounded-full"
            : "top-5 bg-white/96 backdrop-blur-sm border border-slate-200/50 shadow-[0_12px_40px_rgba(0,0,0,0.05)] py-3.5 rounded-2xl md:rounded-full"
        }`}
      >
        <div className="px-5 md:px-7">
          <div className="flex justify-between items-center h-10">

            {/* ── LOGO ── */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-0 hover:scale-[1.02] transition-transform duration-200 mr-2">
              <span className="text-[28px] font-black tracking-tighter leading-none" style={{ color: "#104476" }}>ab</span>
              <span className="text-[28px] font-black tracking-tighter leading-none" style={{ color: "#00829A" }}>trip</span>
            </Link>

            {/* ── DESKTOP MENU ── */}
            <div className="hidden lg:flex items-center gap-0">
              <Link
                href="/"
                className={`relative whitespace-nowrap px-3 py-2 rounded-full font-semibold text-[13.5px] transition-all duration-200 ${isActive("/") && pathname === "/" ? "text-blue-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
              >
                Trang chủ
                {pathname === "/" && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600"></span>}
              </Link>

              <Link
                href="/ve-may-bay"
                className={`relative whitespace-nowrap px-3 py-2 rounded-full font-semibold text-[13.5px] transition-all duration-200 ${isActive("/ve-may-bay") ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
              >
                Vé máy bay
              </Link>

              <NavDropdown label="Dịch vụ sân bay" items={airportServices} cols={1} />
              <NavDropdown label="Tiện ích du lịch" items={travelUtilities} cols={1} />
              <NavDropdown label="Du lịch" items={travelTourism} cols={1} />
              <NavDropdown label="Dịch vụ mặt đất" items={groundServices} cols={2} />

              <Link
                href="/blog"
                className={`whitespace-nowrap px-3 py-2 rounded-full font-semibold text-[13.5px] transition-all duration-200 ${isActive("/blog") ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
              >
                Blog
              </Link>
            </div>

            {/* ── CTA BUTTONS ── */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Zalo */}
              <a
                href="https://zalo.me/0788320320"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[15px] transition-all hover:border-slate-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4C13 4 4 12.1 4 22.1c0 5.5 2.8 10.4 7.3 13.8l-2 7.3 7.9-3.9c2.2.6 4.5.9 6.8.9 11 0 20-8.1 20-18.1S35 4 24 4z" fill="#0084FF"/>
                  <path d="M16.5 19.5h2v5h-2v-5zm5.5 0h1.9l2.6 3.3V19.5h2v5H26.5l-2.6-3.3v3.3H22v-5z" fill="white"/>
                </svg>
                Zalo
              </a>

              {/* Hotline */}
              <a
                href="tel:0868320320"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-extrabold text-[15px] text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #104476 0%, #00829A 100%)" }}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                0868 320 320
              </a>
            </div>

            {/* ── MOBILE TOGGLE ── */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-4 pt-3 pb-5 mt-2 border-t border-slate-100 max-h-[76vh] overflow-y-auto space-y-0.5">

                {/* Simple links */}
                {[
                  { href: "/", label: "Trang chủ" },
                  { href: "/ve-may-bay", label: "Vé Máy Bay" },
                  { href: "/blog", label: "Blog" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${isActive(href) && (href === "/" ? pathname === "/" : true) ? "text-blue-600 bg-blue-50" : "text-slate-800 hover:bg-slate-50"}`}
                  >
                    {label}
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </Link>
                ))}

                {/* Collapsible sections */}
                {[
                  { key: "airport", label: "Dịch vụ Sân Bay", items: airportServices },
                  { key: "utility", label: "Tiện Ích Du Lịch", items: travelUtilities },
                  { key: "travel", label: "Du Lịch & Tour", items: travelTourism },
                  { key: "ground", label: "Dịch Vụ Mặt Đất", items: groundServices },
                ].map(({ key, label, items }) => (
                  <div key={key}>
                    <button
                      type="button"
                      onClick={() => setMobileSection(mobileSection === key ? null : key)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{label}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileSection === key ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileSection === key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 pl-3 border-l-2 border-blue-100 mt-1 mb-2 space-y-0.5">
                            {items.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={idx}
                                  href={item.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                                >
                                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <div>
                                    <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                                      {item.title}
                                      {item.badge && (
                                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${item.badge === "VIP" ? "bg-amber-100 text-amber-600" : item.badge === "Hot" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-600"}`}>
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-medium">{item.desc}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile CTAs */}
                <div className="pt-3 grid grid-cols-2 gap-2">
                  <a
                    href="https://zalo.me/0788320320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 48 48" fill="none">
                      <path d="M24 4C13 4 4 12.1 4 22.1c0 5.5 2.8 10.4 7.3 13.8l-2 7.3 7.9-3.9c2.2.6 4.5.9 6.8.9 11 0 20-8.1 20-18.1S35 4 24 4z" fill="#0084FF"/>
                      <path d="M16.5 19.5h2v5h-2v-5zm5.5 0h1.9l2.6 3.3V19.5h2v5H26.5l-2.6-3.3v3.3H22v-5z" fill="white"/>
                    </svg>
                    Zalo
                  </a>
                  <a
                    href="tel:0868320320"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm shadow-md"
                    style={{ background: "linear-gradient(135deg, #104476 0%, #00829A 100%)" }}
                  >
                    <Phone className="w-4 h-4" />
                    Gọi ngay
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
