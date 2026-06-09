"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, HelpCircle, Building2, Zap, Shield, ArrowRight, Phone } from "lucide-react";

const pricingTiers = [
  {
    name: "SME Portal",
    price: "Miễn phí",
    period: "trọn đời",
    description: "Giải pháp đặt dịch vụ nhanh gọn cho doanh nghiệp vừa và nhỏ.",
    features: [
      "Đặt vé máy bay & phòng khách sạn B2B",
      "Chiết khấu đại lý trực tiếp từ IATA",
      "Hệ thống quản lý đặt chỗ cơ bản",
      "Xuất hóa đơn VAT tự động điện tử",
      "Hỗ trợ qua Tổng đài & Email 8/5"
    ],
    cta: "Đăng Ký Ngay",
    href: "/#lien-he",
    popular: false,
    icon: Building2,
    gradient: "from-slate-50 to-slate-100 border-slate-200"
  },
  {
    name: "Corporate TMC",
    price: "1,500,000 ₫",
    period: "/ tháng",
    description: "Tối ưu hóa ngân sách và số hóa quy trình công tác cho doanh nghiệp.",
    features: [
      "Đầy đủ tính năng gói SME Portal",
      "Hạn mức công nợ & chu kỳ thanh toán linh hoạt",
      "Thiết lập hạn mức chi tiêu (Travel Policy)",
      "Phê duyệt chuyến đi đa cấp trên dashboard",
      "Báo cáo chi tiết chi tiêu thời gian thực",
      "Chuyên viên chăm sóc riêng 24/7"
    ],
    cta: "Yêu Cầu Demo giải pháp",
    href: "/#lien-he",
    popular: true,
    icon: Zap,
    gradient: "from-blue-50 to-indigo-50 border-blue-200 shadow-blue-500/5"
  },
  {
    name: "Enterprise API",
    price: "Liên hệ",
    period: "",
    description: "Giải pháp White-Label và tích hợp API sâu vào hệ thống nội bộ.",
    features: [
      "Đầy đủ tính năng gói Corporate TMC",
      "Cung cấp cổng API & SDK White-Label",
      "Tích hợp hệ thống ERP doanh nghiệp (SAP, Oracle)",
      "Tùy chỉnh giao diện theo thương hiệu riêng",
      "Hệ thống bảo mật tối đa (mã hóa AES-256)",
      "Đội ngũ kỹ thuật hỗ trợ tích hợp riêng"
    ],
    cta: "Liên Hệ Hợp Tác",
    href: "/#lien-he",
    popular: false,
    icon: Shield,
    gradient: "from-slate-900 to-slate-800 border-slate-800 text-white"
  }
];

const retailServices = [
  {
    name: "Dịch Vụ VIP Fastrack Đón Tiễn",
    price: "từ 450,000 ₫",
    unit: "khách",
    description: "Lối đi ưu tiên VIP nhập cảnh/xuất cảnh nhanh chóng tại Tân Sơn Nhất, Nội Bài, Đà Nẵng.",
    href: "/dich-vu-san-bay"
  },
  {
    name: "Phòng Chờ Thương Gia (VIP Lounge)",
    price: "từ 650,000 ₫",
    unit: "khách",
    description: "Không gian sang trọng thư giãn, buffet ẩm thực phong phú trước giờ cất cánh.",
    href: "/dich-vu-san-bay"
  },
  {
    name: "SIM & eSIM Du Lịch Quốc Tế",
    price: "từ 150,000 ₫",
    unit: "bộ",
    description: "Kết nối data 4G/5G tốc độ cao không giới hạn tại hơn 150 quốc gia toàn cầu.",
    href: "/sim"
  },
  {
    name: "Dịch Vụ Làm Visa & Hộ Chiếu Trọn Gói",
    price: "từ 900,000 ₫",
    unit: "khách",
    description: "Hỗ trợ chuẩn bị hồ sơ visa chuyên nghiệp, tư vấn hồ sơ kỹ lưỡng để tối ưu tỷ lệ được chấp thuận.",
    href: "/visa-ho-chieu"
  }
];

const faqs = [
  {
    q: "Doanh nghiệp đăng ký tài khoản SME Portal có mất chi phí duy trì không?",
    a: "Dạ hoàn toàn không. Tài khoản SME Portal của ABTRIP được miễn phí khởi tạo và duy trì trọn đời. Doanh nghiệp chỉ thanh toán đúng chi phí vé máy bay hoặc khách sạn thực tế sử dụng với giá chiết khấu đại lý trực tiếp."
  },
  {
    q: "Hạn mức công nợ của gói Corporate TMC hoạt động thế nào?",
    a: "Dựa vào quy mô và hồ sơ năng lực của doanh nghiệp, ABTRIP sẽ cấp một hạn mức công nợ tuần/tháng (ví dụ từ 50 - 500 triệu đồng). Doanh nghiệp có thể đặt dịch vụ trước và đối soát thanh toán định kỳ vào cuối kỳ."
  },
  {
    q: "ABTRIP có xuất hóa đơn điện tử tự động cho từng chuyến đi không?",
    a: "Có ạ. Hệ thống của ABTRIP tự động đồng bộ và xuất hóa đơn điện tử VAT (hóa đơn hàng không, lưu trú) gửi trực tiếp về email kế toán của doanh nghiệp ngay sau khi hoàn thành đặt chỗ, giúp việc đối soát cực kỳ thuận tiện."
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-24">
      {/* Page Header */}
      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden mb-12">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
            <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">Bảng Giá Công Khai & Minh Bạch</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-be">Giải Pháp & <span className="text-gradient-gold">Bảng Giá Dịch Vụ</span></h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Chúng tôi cung cấp các gói giải pháp doanh nghiệp linh hoạt cùng bảng giá dịch vụ tiện ích sân bay cạnh tranh hàng đầu thị trường.
          </p>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-be">Gói Giải Pháp Quản Lý Công Tác Doanh Nghiệp</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Chọn gói dịch vụ phù hợp nhất với quy mô và quy trình vận hành của đơn vị bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          {pricingTiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card p-8 rounded-3xl border flex flex-col justify-between hover:scale-[1.01] transition-all relative ${tier.gradient} ${
                  tier.popular ? "shadow-xl border-blue-400" : "shadow-sm border-slate-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white font-extrabold text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Khuyên dùng
                  </span>
                )}
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      tier.name === "Enterprise API" ? "bg-white/10 text-cyan-300" : "bg-blue-500/10 text-[var(--accent)]"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`text-lg font-bold font-be ${tier.name === "Enterprise API" ? "text-white" : "text-slate-800"}`}>
                      {tier.name}
                    </h3>
                  </div>

                  <p className={`text-xs ${tier.name === "Enterprise API" ? "text-slate-300" : "text-slate-500"}`}>
                    {tier.description}
                  </p>

                  <div className="border-t border-slate-200/50 pt-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold font-be ${tier.name === "Enterprise API" ? "text-white" : "text-slate-900"}`}>
                      {tier.price}
                    </span>
                    <span className={`text-xs ${tier.name === "Enterprise API" ? "text-slate-400" : "text-slate-500"}`}>
                      {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs gap-2 leading-relaxed">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.name === "Enterprise API" ? "text-cyan-400" : "text-emerald-600"}`} />
                        <span className={tier.name === "Enterprise API" ? "text-slate-200" : "text-slate-655"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-slate-200/50 mt-6">
                  <Link
                    href={tier.href}
                    className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-[#3a86c8] text-white hover:opacity-95 shadow-md shadow-blue-500/15"
                        : tier.name === "Enterprise API"
                        ? "bg-white text-slate-950 hover:bg-slate-50"
                        : "bg-slate-100 hover:bg-slate-250 text-slate-800"
                    }`}
                  >
                    {tier.cta} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Retail Services Price Table */}
        <div className="bg-white rounded-3xl border border-slate-200/70 p-6 md:p-10 shadow-sm mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 font-be">Bảng Giá Dịch Vụ Lẻ Tiện Ích Sân Bay</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">Khung giá niêm yết tham khảo (chưa áp dụng chiết khấu doanh nghiệp)</p>
          </div>

          <div className="space-y-4">
            {retailServices.map((service, idx) => (
              <div 
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-slate-100 bg-slate-50/30 hover:bg-slate-50 rounded-2xl transition-colors gap-3"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-800 font-be">{service.name}</h3>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed max-w-lg">{service.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-none border-slate-100 pt-3 sm:pt-0">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[var(--accent)] font-be block">{service.price}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">/ {service.unit}</span>
                  </div>
                  <Link 
                    href={service.href} 
                    className="inline-flex items-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-[10px] rounded-xl px-4 py-2 transition-all"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-6 text-xs text-amber-800 leading-relaxed font-medium">
            * <strong>Ghi chú:</strong> Giá dịch vụ trên có thể thay đổi tùy thuộc vào thời gian (lễ tết, đêm muộn), sân bay áp dụng cụ thể hoặc số lượng thành viên trong đoàn. Hãy liên hệ với chúng tôi để nhận bảng báo giá nét nhất cho yêu cầu của bạn.
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 font-be">Giải Đáp Thắc Mắc (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-start gap-2 leading-snug mb-2 font-be">
                  <HelpCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-500 pl-6 leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
