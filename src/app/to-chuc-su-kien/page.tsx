"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Users, Target, Check, Heart, Shield, Award, Sparkles, 
  HelpCircle, ChevronDown, CheckCircle2, Info, AlertCircle, Clock, Volume2, ShieldAlert
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

export default function EventServicePage() {
  const phone = "0915849016";
  const zaloUrl = `https://zalo.me/${phone}`;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const eventTypes = [
    {
      title: "MICE (Du Lịch Kết Hợp Hội Nghị)",
      description: "Giải pháp tích hợp tối ưu gồm: Đặt vé máy bay đoàn, xe đưa đón chuyên nghiệp, phòng khách sạn lưu trú và phòng hội nghị hội thảo tiêu chuẩn quốc tế trọn gói.",
      icon: <Users className="w-6 h-6" />,
      features: ["Đại lý vé máy bay cấp 1 chính thức", "Đón tiễn VIP Fastrack tại sân bay", "Hệ thống phòng họp 5 sao đối tác", "Tổ chức Gala Dinner & Tiệc tối bùng nổ"]
    },
    {
      title: "Sự Kiện Doanh Nghiệp (Corporate Events)",
      description: "Lên kế hoạch và thực thi trọn gói các sự kiện mang tính dấu ấn: Lễ kỷ niệm thành lập, hội nghị tri ân khách hàng, lễ khánh thành và tiệc cuối năm (Year End Party).",
      icon: <Calendar className="w-6 h-6" />,
      features: ["Ý tưởng thiết kế 3D sân khấu độc bản", "Thi công sân khấu, âm thanh, ánh sáng trọn gói", "Cung ứng nhân sự (MC, PG, Dancer, Ca sĩ)", "Quản trị rủi ro & tổng duyệt kỹ lưỡng (Rehearsal)"]
    },
    {
      title: "Team Building & Đào Tạo Gắn Kết",
      description: "Chương trình huấn luyện ngoài trời hoặc bãi biển với hệ thống game đối kháng, giải mật thư lớn được thiết kế độc quyền nhằm gắn kết tập thể.",
      icon: <Target className="w-6 h-6" />,
      features: ["Kịch bản trò chơi lớn tùy chọn", "Đạo cụ teambuilding đa dạng, quy mô lớn", "MC hoạt náo chuyên nghiệp, tràn đầy năng lượng", "Đội ngũ quay phim, chụp hình (Media) ghi dấu khoảnh khắc"]
    }
  ];

  const executionSteps = [
    {
      title: "Bước 1: Khảo sát & Nhận brief",
      desc: "ABTRIP tiến hành khảo sát thực địa địa điểm, lắng nghe mục tiêu truyền thông, thông điệp sự kiện và ngân sách giới hạn từ phía doanh nghiệp."
    },
    {
      title: "Bước 2: Ý tưởng & Kịch bản sơ bộ",
      desc: "Lên ý tưởng chủ đạo (Concept), thiết kế demo sân khấu 3D và viết kịch bản khung kèm theo bảng phân bổ ngân sách chi tiết."
    },
    {
      title: "Bước 3: Sản xuất & Thiết lập thiết bị",
      desc: "Sản xuất các ấn phẩm truyền thông sự kiện, thi công lắp đặt hệ thống âm thanh, ánh sáng, màn hình LED và chạy thử kỹ thuật (Soundcheck)."
    },
    {
      title: "Bước 4: Điều phối & Vận hành sự kiện",
      desc: "Điều phối chương trình trực tiếp theo kịch bản tổng, giám sát chặt chẽ timeline và xử lý linh hoạt mọi sự cố phát sinh tại hiện trường."
    }
  ];

  const budgetTips = [
    {
      title: "Tích hợp trọn gói vé máy bay, lưu trú & sự kiện",
      desc: "Bí quyết tiết kiệm lên tới 20% ngân sách là sử dụng giải pháp MICE tích hợp của ABTRIP. Chúng tôi kết hợp năng lực đại lý vé máy bay cấp 1 và hệ thống liên kết resort để mang lại chi phí tối ưu nhất cho doanh nghiệp."
    },
    {
      title: "Sử dụng nhân sự & nhà cung cấp thiết bị nội địa",
      desc: "Thay vì vận chuyển trang thiết bị cồng kềnh xuyên tỉnh, ABTRIP kết nối với các đối tác âm thanh ánh sáng uy tín ngay tại địa phương tổ chức (Đà Nẵng, Nha Trang, Phú Quốc) để cắt giảm hoàn toàn chi phí vận chuyển."
    },
    {
      title: "Thời gian chuẩn bị lý tưởng cho sảnh tiệc lớn",
      desc: "Đối với các sự kiện quy mô từ 200 khách trở lên, doanh nghiệp nên chốt địa điểm trước từ 2 - 4 tháng. Đặt sảnh sớm giúp bạn có nhiều lựa chọn về không gian đẹp và tránh phí phụ thu giờ cao điểm của khách sạn."
    }
  ];

  const eventFaqs = [
    {
      q: "Thời gian tối thiểu để chuẩn bị và tổ chức một sự kiện là bao lâu?",
      a: "Đối với sự kiện nhỏ dưới 100 khách (Teambuilding bãi biển hoặc Gala đơn giản), thời gian chuẩn bị tối thiểu là 2 - 3 tuần. Với các sự kiện quy mô lớn trên 200 khách kết hợp hội thảo MICE và thiết kế sân khấu 3D phức tạp, doanh nghiệp nên bắt đầu làm việc với chúng tôi trước từ 1 - 2 tháng để đảm bảo chất lượng vận hành tốt nhất."
    },
    {
      q: "ABTRIP có phương án phòng ngừa rủi ro thời tiết xấu cho sự kiện ngoài trời không?",
      a: "Có. Mọi sự kiện ngoài trời (Teambuilding bãi biển, Gala ngoài trời) đều được chúng tôi xây dựng kèm theo phương án dự phòng (Plan B). Chúng tôi sẽ thỏa thuận trước với khách sạn đối tác để dự phòng sẵn sảnh tiệc trong nhà (Ballroom) có sức chứa tương đương để sẵn sàng dịch chuyển toàn bộ chương trình và thiết bị âm thanh ánh sáng vào trong nếu có mưa bão đột xuất."
    },
    {
      q: "Hệ thống âm thanh ánh sáng và thiết bị của ABTRIP có đạt chuẩn không?",
      a: "Chúng tôi chỉ sử dụng các thiết bị âm thanh, ánh sáng nhập khẩu từ các thương hiệu uy tín (như JBL, Shure, Martin...) và màn hình LED P3/P4 độ nét cao. Đội ngũ kỹ thuật viên âm thanh ánh sáng của ABTRIP sẽ túc trực 100% thời gian sự kiện để điều phối trực tiếp."
    },
    {
      q: "Doanh nghiệp có được tham gia chạy thử chương trình (Rehearsal) trước giờ G không?",
      a: "Bắt buộc. ABTRIP luôn bố trí thời gian chạy thử chương trình và chạy khớp kỹ thuật âm thanh, ánh sáng, màn hình LED (Rehearsal) cùng MC, ban nhạc và các đại biểu phát biểu trước giờ sự kiện diễn ra tối thiểu từ 2 - 4 tiếng để đảm bảo không xảy ra sai sót nào khi sự kiện chính thức bắt đầu."
    },
    {
      q: "Chi phí tổ chức sự kiện có phát sinh gì ngoài hợp đồng đã ký không?",
      a: "ABTRIP cam kết cung cấp bảng dự toán chi tiết từng hạng mục rõ ràng trước khi ký hợp đồng. Mọi chi phí đều được chốt cố định. Chi phí phát sinh chỉ xảy ra khi có yêu cầu thêm hạng mục mới hoặc tăng số lượng khách đột xuất từ phía doanh nghiệp và sẽ được ký phụ lục hợp đồng minh bạch."
    },
    {
      q: "Quy trình thanh toán và thủ tục quyết toán hợp đồng như thế nào?",
      a: "Thanh toán thường chia làm 3 đợt: Đợt 1 đặt cọc 30% - 50% ngay sau khi ký hợp đồng, Đợt 2 thanh toán 30% - 40% trước khi sự kiện diễn ra 7 ngày để hoàn tất công tác sản xuất, Đợt 3 quyết toán phần còn lại sau khi sự kiện kết thúc kèm theo biên bản thanh lý và hóa đơn VAT hợp pháp."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-100/90 to-[var(--background)]"></div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-purple-50/80 border border-purple-200 rounded-full px-4 py-2 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Giải Pháp Sự Kiện & MICE Chuyên Nghiệp</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight [text-wrap:balance]"
          >
            Tổ Chức Sự Kiện & MICE Trọn Gói
            <span className="block text-gradient-gold mt-1">Kiến Tạo Khoảnh Khắc Đột Phá</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Chúng tôi hiện thực hóa ý tưởng của bạn thành các chương trình hội thảo cấp cao, Year End Party, Gala Dinner và Team Building bùng nổ. Tích hợp giải pháp lữ hành và sự kiện khép kín tối ưu ngân sách.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a 
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#0068ff] hover:bg-[#0057d4] text-white font-bold text-base rounded-xl px-6 py-4 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 5.8 2 10.5c0 2.8 1.5 5.3 3.9 6.8l-1 3.5c-.1.4.3.7.7.5l4.1-1.8c.8.2 1.6.3 2.3.3 5.5 0 10-3.8 10-8.5S17.52 2 12 2zm-1.8 12.3H8.3v-4.8h1.9v4.8zm3.2 0h-2v-3h2v3zm2.5-2.2h-1.2v2.2h1.2v-2.2z" />
              </svg>
              Yêu Cầu Báo Giá Sự Kiện Zalo: {phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Danh Mục Dịch Vụ Sự Kiện & MICE</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 bg-slate-50 border border-slate-200 hover:border-[var(--accent)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                    {event.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{event.title}</h3>
                  <p className="text-sm text-slate-655 leading-relaxed mb-6">{event.description}</p>
                </div>
                
                <div className="border-t border-slate-200/80 pt-6 space-y-2.5">
                  {event.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center text-xs font-semibold text-slate-750">
                      <Check className="w-4 h-4 text-green-600 mr-2.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Execution Process */}
      <section className="py-24 relative z-10 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quy Trình Vận Hành Chuẩn 4 Bước</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {executionSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative space-y-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 font-bold flex items-center justify-center border border-purple-500/20 text-sm">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MICE Budget Optimization */}
      <section className="py-24 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mẹo Tối Ưu Chi Phí Sự Kiện & MICE</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {budgetTips.map((tip, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-[var(--accent)] transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--accent)] shrink-0" /> {tip.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light mt-3">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-24 relative z-10 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Giá Trị Cốt Lõi Vận Hành Từ ABTRIP</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-green-600">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Chuyên Nghiệp & Sáng Tạo</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Luôn cập nhật những ý tưởng thiết kế, kịch bản độc quyền, và thiết kế sân khấu 3D mang đậm bản sắc riêng của doanh nghiệp.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[var(--accent)]">
                <Volume2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Trang Thiết Bị Hiện Đại</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Sử dụng hệ thống âm thanh, ánh sáng, màn hình LED cao cấp từ các hãng lớn, đảm bảo hiệu ứng trình diễn tối ưu.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Quản Trị Rủi Ro Chặt Chẽ</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Quy trình tổng duyệt (Rehearsal) nghiêm ngặt trước sự kiện, có sẵn kịch bản dự phòng cho các yếu tố thời tiết và kỹ thuật.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-850">Hỏi Đáp Thường Gặp Về Tổ Chức Sự Kiện & MICE</h3>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-2"></div>
          </div>
          <div className="space-y-4">
            {eventFaqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-[var(--accent)] transition-colors gap-3"
                >
                  <span className="text-sm md:text-base flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-200 bg-white"
                    >
                      <p className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Zalo banner */}
      <section className="py-16 bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Doanh Nghiệp Của Bạn Sắp Diễn Ra Sự Kiện Quan Trọng?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base font-light">
            Nhận ngay kịch bản ý tưởng sự kiện chi tiết cùng dự toán chi phí tối ưu qua Zalo chỉ sau 1 giờ.
          </p>
          <div>
            <a 
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[var(--accent)] font-bold text-base md:text-lg rounded-xl px-8 py-4 shadow-2xl hover:scale-105 transition-all gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 5.8 2 10.5c0 2.8 1.5 5.3 3.9 6.8l-1 3.5c-.1.4.3.7.7.5l4.1-1.8c.8.2 1.6.3 2.3.3 5.5 0 10-3.8 10-8.5S17.52 2 12 2zm-1.8 12.3H8.3v-4.8h1.9v4.8zm3.2 0h-2v-3h2v3zm2.5-2.2h-1.2v2.2h1.2v-2.2z" />
              </svg>
              Tư Vấn Zalo Sự Kiện: {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm serviceName="Tổ chức sự kiện" />

      {/* Zalo Floating Button */}
      <ZaloFloatingButton phone={phone} />
    </>
  );
}
