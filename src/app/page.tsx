"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  Building2,
  Plane,
  Hotel,
  Globe,
  MapPin,
  FileText,
  Wifi,
  Star,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import FlightSearchBox from "@/components/FlightSearchBox";

const portalServices = [
  {
    title: "Vé Máy Bay Doanh Nghiệp (B2B & API)",
    description: "Giải pháp đặt vé B2B, B2G chiết khấu đại lý IATA, tích hợp App ngân hàng, TMC tự động hóa.",
    image: "/corporate-flight-app.png",
    href: "/ve-may-bay",
    badge: "B2B · B2G · API",
    badgeColor: "bg-blue-600",
  },
  {
    title: "Đặt Phòng Khách Sạn Toàn Cầu",
    description: "500.000+ khách sạn và resort cao cấp. Giá Corporate đại lý, chiết khấu tới 25% cho doanh nghiệp.",
    image: "/hotel-checkin.png",
    href: "/khach-san",
    badge: "Corporate Rate",
    badgeColor: "bg-amber-500",
  },
  {
    title: "Visa, Hộ Chiếu & Bảo Hiểm",
    description: "Visa Mỹ, Schengen, Nhật, Hàn trọn gói. Hộ chiếu online khẩn 1–3 ngày. Bảo hiểm Schengen.",
    image: "/travel-utilities.png",
    href: "/visa-ho-chieu",
    badge: "Tỷ lệ đậu 85%+",
    badgeColor: "bg-indigo-600",
  },
  {
    title: "Tour Du Lịch & MICE",
    description: "Tour thiết kế riêng, tour ghép đoàn, Incentive doanh nghiệp, Gala dinner & sự kiện MICE.",
    image: "/teambuilding-beach.png",
    href: "/tour",
    badge: "Private · Incentive",
    badgeColor: "bg-emerald-600",
  },
  {
    title: "Dịch Vụ Sân Bay VIP",
    description: "Fastrack ưu tiên, phòng chờ thương gia, Fast check-in, SIM/WiFi quốc tế tại HAN · SGN · DAD.",
    image: "/fast-track-vip.png",
    href: "/dich-vu-san-bay",
    badge: "VIP · Fastrack",
    badgeColor: "bg-cyan-600",
  },
  {
    title: "Dịch Vụ Mặt Đất Sân Bay",
    description: "Đại diện hãng bay, cấp phép bay & Slots, chuyên cơ thuê chuyến, kỹ thuật sân đỗ Ramp Services.",
    image: "/airport-ground-services.png",
    href: "/dich-vu-mat-dat",
    badge: "B2B · Aviation",
    badgeColor: "bg-slate-700",
  },
];

const trustSignals = [
  { icon: <Award className="w-5 h-5" />, label: "IATA Certified", sub: "Đại lý hàng không cấp 1 chính thức" },
  { icon: <Plane className="w-5 h-5" />, label: "Đại Lý Chính Thức", sub: "Vietnam Airlines · Bamboo · VietJet · Pacific" },
  { icon: <FileText className="w-5 h-5" />, label: "Lữ Hành Quốc Tế", sub: "Giấy phép Bộ VHTTDL cấp" },
  { icon: <Star className="w-5 h-5" />, label: "10+ Năm", sub: "Kinh nghiệm ngành hàng không" },
];

export default function Home() {
  return (
    <>
      {/* ── HERO: Company Overview ── */}
      <section className="relative min-h-[100vh] lg:min-h-[95vh] flex items-center pt-28 pb-16 overflow-x-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/95 via-slate-100/80 to-[var(--background)]"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 max-w-7xl">
          {/* Left: Brand positioning */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center space-x-2 bg-white/50 border border-slate-200 rounded-full px-4 py-2 mb-5 backdrop-blur-md"
            >
              <Shield className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider hidden sm:inline">
                Đối Tác Chiến Lược Của Cơ Quan Nhà Nước & Tập Đoàn
              </span>
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider sm:hidden">
                Đối Tác B2B · B2G Chuyên Nghiệp
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[1.75rem] sm:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-extrabold mb-5 leading-[1.18] tracking-tight text-left"
              style={{ color: "#104476" }}
            >
              <span className="block">Nền Tảng Dịch Vụ</span>
              <span className="block"><span className="text-gradient-gold">Du Lịch & Hàng Không</span></span>
              <span className="block">Toàn Diện Cho Doanh Nghiệp</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-slate-600 mb-7 max-w-xl font-light leading-relaxed text-left"
            >
              Từ vé máy bay, khách sạn, visa, tour đến dịch vụ sân bay VIP và giải pháp hàng không B2B — ABTRIP là đối tác một điểm đến cho mọi nhu cầu di chuyển và lữ hành của tổ chức, doanh nghiệp và cá nhân cao cấp.
            </motion.p>

            {/* Service quick-links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-7 w-full max-w-xl"
            >
              {[
                { icon: <Plane className="w-4 h-4" />, label: "Vé Máy Bay B2B", short: "Vé Máy Bay", href: "/ve-may-bay", color: "text-blue-600" },
                { icon: <Hotel className="w-4 h-4" />, label: "Khách Sạn Corporate", short: "Khách Sạn", href: "/khach-san", color: "text-amber-600" },
                { icon: <FileText className="w-4 h-4" />, label: "Visa & Hộ Chiếu", short: "Visa & HC", href: "/visa-ho-chieu", color: "text-indigo-600" },
                { icon: <MapPin className="w-4 h-4" />, label: "Tour & MICE", short: "Tour & MICE", href: "/tour", color: "text-emerald-600" },
                { icon: <Globe className="w-4 h-4" />, label: "Dịch Vụ Sân Bay VIP", short: "Sân Bay VIP", href: "/dich-vu-san-bay", color: "text-cyan-600" },
                { icon: <Wifi className="w-4 h-4" />, label: "SIM & eSIM Quốc Tế", short: "SIM & eSIM", href: "/sim", color: "text-purple-600" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="flex items-center gap-2 sm:gap-2.5 bg-white/55 border border-slate-200/60 hover:bg-white/80 hover:border-slate-300 px-2.5 sm:px-3.5 py-2.5 rounded-xl backdrop-blur-sm transition-all group"
                >
                  <span className={`${item.color} shrink-0`}>{item.icon}</span>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 truncate">
                    <span className="sm:hidden">{item.short}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 ml-auto shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-start items-center w-full"
            >
              <span className="flex items-center text-xs font-semibold bg-white/50 px-4 py-2.5 rounded-full border border-slate-200 backdrop-blur-md text-slate-600 select-none">
                <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 shrink-0" /> IATA Certified
              </span>
              <Link
                href="/ve-may-bay"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-[#3a86c8] hover:from-blue-700 hover:to-[#2e74b3] text-white font-extrabold text-xs rounded-full px-6 py-2.5 shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                Nhận Báo Giá Vé Đoàn
              </Link>
              <Link
                href="#he-sinh-thai"
                className="inline-flex items-center justify-center bg-white/80 hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-full px-5 py-2.5 transition-all hover:scale-105"
              >
                Xem Dịch Vụ <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Flight Search Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 w-full z-20"
          >
            <FlightSearchBox />
          </motion.div>
        </div>
      </section>

      {/* ── TRUST SIGNALS BAR ── */}
      <section className="border-t border-slate-200 bg-white py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  {t.icon}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 leading-none">{t.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{t.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 SERVICE PORTAL GRID ── */}
      <section id="he-sinh-thai" className="py-24 relative z-10 bg-[var(--background)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-3"
            >
              Hệ sinh thái dịch vụ
            </motion.p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 font-be [text-wrap:balance]">
              6 Trụ Cột Dịch Vụ Của ABTRIP
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm font-light">
              Một đối tác — toàn bộ giải pháp di chuyển, lưu trú, visa, dịch vụ sân bay và hậu cần hàng không chuyên nghiệp.
            </p>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {portalServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link
                  href={service.href}
                  className="group block relative rounded-3xl overflow-hidden h-[380px] border border-white/10 shadow-lg"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-slate-700"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/55 to-transparent"></div>

                  <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col justify-end h-full">
                    <span className={`${service.badgeColor} text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest w-fit mb-3`}>
                      {service.badge}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-be leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-white/65 mb-4 text-xs line-clamp-2 leading-relaxed font-light">
                      {service.description}
                    </p>
                    <div className="flex items-center text-cyan-300 font-semibold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-xs">
                      Khám phá dịch vụ <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ABTRIP ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-3">Tại sao chọn ABTRIP?</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight font-be [text-wrap:balance]">
                Phục vụ các cơ quan nhà nước, tập đoàn & doanh nghiệp lớn
              </h2>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
                Hơn 10 năm phục vụ các tập đoàn lớn, cơ quan nhà nước và tổ chức quốc tế, ABTRIP xây dựng uy tín dựa trên nền tảng công nghệ mạnh, đội ngũ chuyên gia giàu kinh nghiệm và cam kết chất lượng dịch vụ không thỏa hiệp.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Kết nối GDS 400+ hãng bay toàn cầu", sub: "Amadeus, Sabre, Galileo — truy cập thời gian thực" },
                  { title: "Hóa đơn VAT điện tử tự động", sub: "Đáp ứng yêu cầu kế toán cơ quan nhà nước & tập đoàn" },
                  { title: "Hỗ trợ 24/7 — xử lý khẩn cấp", sub: "Đội ngũ chuyên viên trực thường trực, xử lý trong 15 phút" },
                  { title: "Tích hợp App Ngân hàng & Ví điện tử", sub: "MB Bank, SCB, Bản Việt, VNPay, MoMo, ZaloPay" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-500 font-light">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Link href="/ve-may-bay" className="inline-flex items-center bg-[var(--accent)] hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all gap-1.5">
                  Giải Pháp Doanh Nghiệp <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/dich-vu-san-bay" className="inline-flex items-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-all gap-1.5">
                  Dịch Vụ Sân Bay VIP <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Partner section — grouped by category */}
            <div className="space-y-5">
              {[
                {
                  label: "🏛 Cơ quan nhà nước",
                  color: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:border-indigo-300",
                  dot: "bg-indigo-400",
                  items: ["Văn phòng Quốc hội", "Mặt Trận Tổ Quốc", "Bộ Tư Pháp", "Bộ Nội Vụ", "Ngân hàng Nhà nước", "Kiểm toán Nhà nước", "Cục Thuế", "Cục Hải Quan"],
                },
                {
                  label: "🏢 Tập đoàn lớn",
                  color: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300",
                  dot: "bg-emerald-400",
                  items: ["Tập đoàn PVN", "Tập đoàn EVN", "Tập đoàn Viettel", "Tập đoàn VNPT"],
                },
                {
                  label: "🏦 Ngân hàng",
                  color: "bg-violet-50 text-violet-700 border-violet-100 hover:border-violet-300",
                  dot: "bg-violet-400",
                  items: ["Vietinbank", "BIDV", "MB Bank", "Bản Việt"],
                },
                {
                  label: "✈️ Đối tác hãng bay",
                  color: "bg-sky-50 text-sky-700 border-sky-100 hover:border-sky-300",
                  dot: "bg-sky-400",
                  items: ["IATA", "Vietnam Airlines", "Vietjet Air", "Bamboo Airways", "Vietravel Airlines", "Sun Phuquoc Airways"],
                },
              ].map((group, gi) => (
                <div key={gi}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${group.dot} shrink-0`}></span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{group.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((name, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.05 + i * 0.03 }}
                        className={`inline-block px-3 py-1.5 rounded-full border text-[11px] font-bold whitespace-nowrap transition-all cursor-default hover:shadow-sm ${group.color}`}
                      >
                        {name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 border-t border-slate-200 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "400+", label: "Hãng hàng không (GDS)", icon: <Plane className="w-5 h-5" /> },
              { value: "5,000+", label: "Giao dịch / năm", icon: <TrendingUp className="w-5 h-5" /> },
              { value: "300+", label: "Doanh nghiệp & cơ quan", icon: <Users className="w-5 h-5" /> },
              { value: "10+", label: "Năm kinh nghiệm", icon: <Star className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  {stat.icon}
                </div>
                <h4 className="text-4xl md:text-5xl font-extrabold text-[var(--accent)]">{stat.value}</h4>
                <p className="text-slate-500 font-semibold uppercase tracking-wider text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CONTACT STRIP ── */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop')` }}></div>
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">Sẵn sàng hợp tác? Nhận tư vấn miễn phí ngay hôm nay.</h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm font-light">
            Đội ngũ chuyên viên ABTRIP phân tích nhu cầu và đề xuất giải pháp phù hợp nhất trong vòng 30 phút.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:0788320320"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-slate-100 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Gọi ngay: 0788 320 320
            </a>
            <Link
              href="#lien-he"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
            >
              Gửi yêu cầu tư vấn <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
