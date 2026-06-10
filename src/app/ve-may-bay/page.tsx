"use client";

import { motion } from "framer-motion";
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Clock,
  CreditCard,
  TrendingDown,
  ArrowRight,
  Building2,
  Landmark,
  Zap,
  LayoutGrid,
  PhoneCall,
  FileText,
  RefreshCw,
  Cpu,
  Users,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FlightSearchBox from "@/components/FlightSearchBox";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

const phone = "0788320320";

const benefits = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "GDS 400+ Hãng Bay",
    desc: "Amadeus, Sabre, Galileo — truy cập thời gian thực, xuất vé điện tử tức thì.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Tiết Kiệm 15–25%",
    desc: "Hợp đồng chiết khấu trực tiếp với hãng bay. Mức giá Corporate ưu đãi dài hạn.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Hạn Mức & Hóa Đơn VAT",
    desc: "Cấp hạn mức tín dụng linh hoạt. Xuất hóa đơn GTGT điện tử tự động.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Hỗ Trợ 24/7",
    desc: "Chuyên viên trực thường trực, xử lý đổi/hủy vé khẩn trong 15 phút.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
];

const b2bFeatures = [
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    title: "B2B Portal",
    desc: "Cổng đặt vé online riêng cho doanh nghiệp. Quản lý chính sách công tác, phê duyệt đa cấp, dashboard chi tiêu theo phòng ban.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "API Integration",
    desc: "REST API và XML/JSON theo chuẩn IATA NDC, kết nối trực tiếp vào ERP/HRMS/HRM của doanh nghiệp.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Travel Desk Outsource",
    desc: "Dịch vụ Travel Desk thuê ngoài: chuyên viên ABTRIP làm việc tại văn phòng khách hàng, xử lý toàn bộ yêu cầu đặt vé, khách sạn.",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "TMC Automation",
    desc: "Hệ thống quản lý công tác TMC tích hợp phê duyệt, báo cáo, hóa đơn VAT tự động — tiết kiệm 60% thời gian hành chính.",
  },
];

const bankApps = [
  { name: "MB Bank", color: "bg-purple-700", textColor: "text-white" },
  { name: "SCB", color: "bg-blue-700", textColor: "text-white" },
  { name: "Bản Việt", color: "bg-emerald-700", textColor: "text-white" },
  { name: "VTCpay", color: "bg-red-600", textColor: "text-white" },
  { name: "Epay", color: "bg-orange-500", textColor: "text-white" },
  { name: "Itel", color: "bg-pink-600", textColor: "text-white" },
  { name: "Appota", color: "bg-indigo-600", textColor: "text-white" },
  { name: "Gate.vn", color: "bg-teal-600", textColor: "text-white" },
];

const govFeatures = [
  { icon: <FileText className="w-5 h-5" />, title: "Hóa đơn VAT & thanh toán chuyển khoản", desc: "Đáp ứng 100% quy trình tài chính cơ quan nhà nước và đơn vị sự nghiệp công lập." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Tuân thủ quy định Chính phủ", desc: "Tích hợp hệ thống báo cáo theo thông tư 40/2021 và quy định mua sắm công." },
  { icon: <Landmark className="w-5 h-5" />, title: "Hợp đồng khung & đấu thầu", desc: "Kinh nghiệm tư vấn hồ sơ đấu thầu cung cấp vé máy bay cho cơ quan Nhà nước." },
  { icon: <PhoneCall className="w-5 h-5" />, title: "Chuyên viên phụ trách riêng", desc: "Một Account Manager cố định, hỗ trợ từ đặt vé đến hoàn tất quyết toán." },
];

export default function FlightPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[100vh] lg:min-h-[95vh] flex items-center pt-28 pb-16 overflow-x-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-blue-950/75 to-[var(--background)]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 max-w-7xl">
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5 backdrop-blur-md"
            >
              <Building2 className="w-4 h-4 text-cyan-300" />
              <span className="text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                Đại Lý IATA Cấp 1 · B2B · B2G · API
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[1.6rem] sm:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-extrabold text-white mb-5 leading-[1.18] tracking-tight text-left"
            >
              <span className="block">Giải Pháp Vé Máy Bay</span>
              <span className="block"><span className="text-cyan-300">B2B · B2G</span> & Tích Hợp</span>
              <span className="block">App Ngân Hàng</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-white/70 mb-7 max-w-xl font-light leading-relaxed text-left"
            >
              Cung cấp vé máy bay giá đại lý cho doanh nghiệp, tập đoàn và cơ quan Nhà nước. Tích hợp API/GDS, hệ thống TMC quản lý công tác tự động, bán vé embedded trên app ngân hàng & ví điện tử.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-start"
            >
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-lg"
              >
                <PhoneCall className="w-4 h-4" /> Gọi Tư Vấn: 0788 320 320
              </a>
              <a
                href="#lien-he"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all backdrop-blur-sm"
              >
                Nhận Báo Giá Doanh Nghiệp <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Key stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/15 w-full max-w-xl"
            >
              {[
                { v: "400+", l: "Hãng bay (GDS)" },
                { v: "300+", l: "Doanh nghiệp & cơ quan" },
                { v: "24/7", l: "Hỗ trợ khẩn cấp" },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-2xl font-extrabold text-cyan-300">{s.v}</p>
                  <p className="text-white/55 text-[10px] font-medium mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

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

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-2">Lợi ích đại lý</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-be">Tại Sao Doanh Nghiệp Chọn ABTRIP?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 rounded-2xl border ${b.color}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white shadow-sm">
                  {b.icon}
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm mb-2">{b.title}</h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 PILLARS: B2B Corporate ── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-3">Doanh nghiệp (B2B)</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight font-be [text-wrap:balance]">
                Giải Pháp Quản Lý Công Tác <br className="hidden md:block"/>Toàn Diện Cho Doanh Nghiệp
              </h2>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
                Từ portal đặt vé B2B, tích hợp API vào hệ thống ERP, Travel Desk thuê ngoài đến hệ thống TMC tự động hóa — ABTRIP tối ưu toàn bộ quy trình công tác của doanh nghiệp bạn.
              </p>
              <div className="space-y-5">
                {b2bFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">{f.icon}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 mb-0.5">{f.title}</p>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[480px] shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-slate-900/40"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
                  <p className="text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">Hệ thống TMC</p>
                  <p className="text-lg font-extrabold leading-tight mb-1">Tiết kiệm 60% thời gian hành chính công tác</p>
                  <p className="text-white/60 text-xs font-light">Phê duyệt → Đặt vé → Báo cáo → VAT — tự động hoàn toàn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2G: Cơ quan Nhà nước ── */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden h-[420px] shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-blue-950/50"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-2">Chính phủ (B2G)</p>
                  <p className="text-lg font-extrabold leading-tight mb-1">Đối tác cung cấp vé cho Cơ quan Nhà nước</p>
                  <p className="text-white/60 text-xs font-light">Đấu thầu, hợp đồng khung, VAT đầy đủ theo quy định</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">Cơ quan nhà nước (B2G)</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight font-be [text-wrap:balance]">
                Giải Pháp Vé Máy Bay <br className="hidden md:block"/>Cho Cơ Quan & Đơn Vị Nhà Nước
              </h2>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
                Hiểu rõ quy trình tài chính và đấu thầu đặc thù của khối cơ quan nhà nước, ABTRIP cung cấp dịch vụ vé máy bay đáp ứng đầy đủ yêu cầu pháp lý, kế toán và báo cáo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {govFeatures.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-amber-50 border border-amber-100 rounded-xl p-4"
                  >
                    <div className="text-amber-600 mb-2">{f.icon}</div>
                    <p className="text-sm font-bold text-slate-800 mb-1">{f.title}</p>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── API / BANKING APP INTEGRATION ── */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Công nghệ tích hợp</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight font-be">
                Bán Vé Máy Bay Embedded<br className="hidden md:block"/>
                <span className="text-cyan-300">Trên App Ngân Hàng & Ví Điện Tử</span>
              </h2>
              <p className="text-white/65 text-sm font-light leading-relaxed mb-8">
                ABTRIP cung cấp white-label flight booking module tích hợp trực tiếp vào ứng dụng ngân hàng và ví điện tử thông qua API chuẩn REST/NDC. Người dùng của ngân hàng đối tác có thể đặt vé, thanh toán và nhận e-ticket ngay trong một ứng dụng.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Zap className="w-4 h-4" />, text: "REST API & XML NDC theo chuẩn IATA" },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Bảo mật OAuth 2.0, mã hóa end-to-end" },
                  { icon: <RefreshCw className="w-4 h-4" />, text: "SLA 99.9% uptime, response < 800ms" },
                  { icon: <FileText className="w-4 h-4" />, text: "E-ticket & hóa đơn VAT điện tử tự động" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">{item.icon}</div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-sm px-6 py-3 rounded-xl transition-all"
              >
                Tư Vấn Tích Hợp API <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-6">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-center">Đối tác hiện tại & hệ sinh thái</p>
              <div className="grid grid-cols-4 gap-3">
                {bankApps.map((app, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`${app.color} ${app.textColor} rounded-2xl h-16 flex items-center justify-center font-extrabold text-sm shadow-lg`}
                  >
                    {app.name}
                  </motion.div>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">Ghi chú tích hợp</p>
                <p className="text-white/65 text-xs font-light leading-relaxed">
                  MB Bank, SCB, Bản Việt là đối tác tích hợp chính thức. VTCpay, Epay, Itel, Appota, Gate.vn hỗ trợ thanh toán qua cổng chuyển hướng. Liên hệ để biết lộ trình tích hợp sâu hơn cho từng nền tảng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABTRIP BTM PORTAL ── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-3">Nền tảng quản lý</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-be">ABTRIP BTM — Business Travel Management</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm font-light mt-3">
              Hệ thống quản lý công tác doanh nghiệp tích hợp từ đặt vé, khách sạn, phê duyệt đến báo cáo chi tiêu tự động.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <LayoutGrid className="w-6 h-6" />, title: "B2B Portal", desc: "Cổng đặt vé riêng cho doanh nghiệp, quản lý chính sách đi lại.", color: "text-blue-600 bg-blue-50" },
              { icon: <Cpu className="w-6 h-6" />, title: "API & GDS", desc: "Kết nối trực tiếp vào GDS và ERP/SAP của doanh nghiệp.", color: "text-indigo-600 bg-indigo-50" },
              { icon: <Users className="w-6 h-6" />, title: "Travel Desk", desc: "Chuyên viên ABTRIP làm việc trực tiếp tại văn phòng khách hàng.", color: "text-emerald-600 bg-emerald-50" },
              { icon: <FileText className="w-6 h-6" />, title: "Corporate Tour", desc: "Kết hợp vé máy bay, khách sạn, xe đưa đón trong một gói công tác.", color: "text-amber-600 bg-amber-50" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm mb-2 group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ZALO ── */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-xl font-extrabold mb-3">Nhận Báo Giá Vé Đoàn & Giá Corporate Ngay Hôm Nay</h3>
          <p className="text-white/70 text-sm mb-6 font-light">Gửi yêu cầu qua Zalo — phản hồi trong 15 phút, báo giá trong 1 giờ làm việc.</p>
          <a
            href={`https://zalo.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg"
          >
            Chat Zalo Với Chuyên Viên Tiệp <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="lien-he" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-2">Liên hệ hợp tác</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-be">Đăng Ký Tư Vấn Giải Pháp Doanh Nghiệp</h2>
            <p className="text-slate-500 text-sm font-light mt-3 max-w-md mx-auto">Chuyên viên ABTRIP phân tích nhu cầu và đề xuất gói dịch vụ phù hợp nhất trong 30 phút.</p>
          </div>
          <ContactForm serviceName="Vé Máy Bay Doanh Nghiệp" />
        </div>
      </section>

      <ZaloFloatingButton phone={phone} />
    </>
  );
}
