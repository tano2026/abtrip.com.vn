"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Clock, 
  UserCheck, 
  Star, 
  Sparkles, 
  Ticket, 
  Wifi, 
  Banknote, 
  Coffee, 
  Plane, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Info,
  Calendar,
  ChevronRight
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

export default function AirportServicePage() {
  const phone = "0788320320";
  const zaloUrl = `https://zalo.me/${phone}`;

  // State for Booking Assistant
  const [assistantService, setAssistantService] = useState("Mua Vé Giờ Chót & Xử Lý Sự Cố Khẩn");
  const [assistantAirport, setAssistantAirport] = useState("Sân bay Tân Sơn Nhất (SGN)");
  const [assistantFlightType, setAssistantFlightType] = useState("Ga Quốc tế - Khách Đến");
  const [assistantGuests, setAssistantGuests] = useState("1 khách");
  
  // State for ContactForm connection
  const [selectedService, setSelectedService] = useState("Dịch Vụ Sân Bay VIP");
  const [initialNote, setInitialNote] = useState("");

  const services = [
    {
      title: "Mua Vé Giờ Chót & Xử Lý Sự Cố Khẩn",
      badge: "Hỗ trợ 24/7",
      description: "Địa chỉ uy tín hỗ trợ mua vé máy bay giờ chót sát giờ khởi hành của các hãng hàng không, xử lý nhanh trễ chuyến và các thủ tục khẩn cấp theo đúng quy định.",
      icon: <Ticket className="w-6 h-6 text-blue-600" />,
      features: [
        "Mua vé máy bay sát giờ khởi hành (từ 1h - 3h trước giờ bay)",
        "Đổi chuyến bay, đổi ngày giờ bay, đổi tên hành khách khẩn cấp",
        "Hỗ trợ tìm chuyến bay thay thế phù hợp khi hành khách bị trễ chuyến (miss flight)",
        "Tư vấn quy trình và hướng dẫn làm các thủ tục hàng không khẩn cấp đúng quy định"
      ],
      ctaText: "Mua Vé / Xử Lý Vé Gấp"
    },
    {
      title: "Gói Dịch Vụ Ưu Tiên Thủ Tục (VIP Fastrack)",
      badge: "Tiết kiệm thời gian",
      description: "Hạn chế tối đa thời gian xếp hàng chờ đợi tại sân bay với dịch vụ hỗ trợ làm thủ tục hàng không ưu tiên, check-in nhanh chóng và chuyên nghiệp.",
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      features: [
        "Hỗ trợ làm thủ tục check-in nhanh tại quầy ưu tiên của hãng bay",
        "Rút ngắn thời gian xếp hàng thông qua luồng làm thủ tục hàng không ưu tiên",
        "Nhân viên đón tiếp, hướng dẫn chu đáo suốt quá trình làm thủ tục",
        "Hỗ trợ các bước ký gửi hành lý nhanh chóng, an toàn"
      ],
      ctaText: "Đăng Ký Thủ Tục Ưu Tiên"
    },
    {
      title: "Phòng Chờ Thương Gia (VIP Lounge)",
      badge: "Đẳng cấp 5 sao",
      description: "Tận hưởng không gian nghỉ ngơi yên tĩnh, riêng tư và sang trọng bậc nhất trước chuyến bay với đầy đủ ẩm thực buffet cùng dịch vụ chăm sóc cao cấp.",
      icon: <Coffee className="w-6 h-6 text-amber-600" />,
      features: [
        "Không gian sang trọng, yên tĩnh, tách biệt hoàn toàn với sự ồn ào",
        "Buffet ẩm thực Á - Âu phong phú và quầy bar đồ uống miễn phí",
        "Ghế massage thư giãn, phòng tắm tiện nghi riêng biệt và wifi tốc độ cao",
        "Nhân viên hỗ trợ theo dõi thông tin chuyến bay, đảm bảo giờ ra cửa máy bay"
      ],
      ctaText: "Đặt Phòng Chờ VIP"
    },
    {
      title: "SIM Du Lịch Quốc Tế & Bộ Phát WiFi",
      badge: "Kết nối toàn cầu",
      description: "Kết nối Internet tốc độ cao không giới hạn dung lượng toàn cầu với eSIM, SIM vật lý hoặc bộ phát WiFi di động nhận trực tiếp tại quầy sân bay.",
      icon: <Wifi className="w-6 h-6 text-purple-600" />,
      features: [
        "eSIM thế mới kích hoạt trực tuyến tức thì qua mã QR trong 1 phút",
        "SIM vật lý đa quốc gia sẵn sàng sử dụng ngay khi hạ cánh, nhận tại sân bay",
        "Cho thuê bộ phát WiFi di động pin khỏe, kết nối đồng thời nhiều thiết bị",
        "Phủ sóng mạng 4G/5G tốc độ cao ổn định trên 150+ quốc gia"
      ],
      ctaText: "Xem Bảng Giá SIM/WiFi"
    },
    {
      title: "Dịch Vụ Thu Đổi Ngoại Tệ",
      badge: "Tỷ giá tốt nhất",
      description: "Địa chỉ thu đổi ngoại tệ an toàn, minh bạch, tỷ giá tốt cạnh tranh sát thị trường tự do trực tiếp tại các quầy dịch vụ ở sân bay.",
      icon: <Banknote className="w-6 h-6 text-teal-600" />,
      features: [
        "Tỷ giá cạnh tranh cao, cập nhật theo thời gian thực sát thị trường",
        "Hỗ trợ thu đổi hơn 30+ loại ngoại tệ phổ biến trên thế giới",
        "Thủ tục thu đổi nhanh chóng, an toàn tuyệt đối, có hóa đơn rõ ràng",
        "Đặt lịch hẹn trước giúp đảm bảo lượng tiền mặt đủ theo yêu cầu riêng"
      ],
      ctaText: "Liên Hệ Nhận Báo Tỷ Giá"
    }
  ];

  const handleAssistantSubmit = () => {
    setSelectedService(assistantService);
    setInitialNote(`Tôi cần đặt dịch vụ: ${assistantService} tại ${assistantAirport} (${assistantFlightType}) cho ${assistantGuests}. Vui lòng liên hệ lại tư vấn và báo giá chi tiết.`);
    
    const contactSection = document.getElementById("lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setInitialNote(`Tôi muốn đăng ký tư vấn về dịch vụ: ${serviceTitle}. Vui lòng liên hệ lại hướng dẫn thủ tục cho tôi.`);
    
    const contactSection = document.getElementById("lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-[var(--background)]"></div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-2 backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Trải Nghiệm Dịch Vụ Sân Bay VIP 5 Sao</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight [text-wrap:balance] font-be"
          >
            Dịch Vụ Sân Bay VIP Trọn Gói
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mt-1">
              Đẳng Cấp - Nhanh Chóng - Đúng Quy Định
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Địa chỉ uy tín hỗ trợ mua vé giờ chót, dịch vụ làm thủ tục ưu tiên Fastrack chuyên nghiệp, phòng chờ thương gia sang trọng, SIM du lịch quốc tế và dịch vụ thu đổi ngoại tệ an toàn tại sân bay.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <a 
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl px-8 py-4 shadow-lg shadow-blue-500/30 hover:scale-105 transition-all gap-2"
            >
              Đặt Dịch Vụ Qua Zalo: {phone}
            </a>
            <a 
              href="#danh-sach-dich-vu"
              className="inline-flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/25 text-white font-bold text-base rounded-xl px-8 py-4 backdrop-blur-sm transition-all"
            >
              Khám Phá Dịch Vụ
            </a>
          </motion.div>
        </div>
      </section>

      {/* Booking Assistant Section */}
      <section className="relative z-20 -mt-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100"
          >
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-800 font-be">Trợ Lý Đăng Ký Dịch Vụ Sân Bay</h3>
                <p className="text-xs text-slate-500">Thiết lập nhanh lộ trình để nhận tư vấn giải pháp tối ưu từ chuyên viên ABTRIP</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Form inputs */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">1. Dịch vụ cần đặt</label>
                  <select 
                    value={assistantService}
                    onChange={(e) => setAssistantService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  >
                    <option value="Mua Vé Giờ Chót & Xử Lý Sự Cố Khẩn">Mua Vé Giờ Chót & Xử Lý Sự Cố Khẩn</option>
                    <option value="Gói Dịch Vụ Ưu Tiên Thủ Tục (VIP Fastrack)">Gói Dịch Vụ Ưu Tiên Thủ Tục (VIP Fastrack)</option>
                    <option value="Phòng Chờ Thương Gia (VIP Lounge)">Phòng Chờ Thương Gia (VIP Lounge)</option>
                    <option value="SIM Du Lịch Quốc Tế & Bộ Phát WiFi">SIM Du Lịch Quốc Tế & Bộ Phát WiFi</option>
                    <option value="Dịch Vụ Thu Đổi Ngoại Tệ">Dịch Vụ Thu Đổi Ngoại Tệ</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">2. Sân bay áp dụng</label>
                  <select 
                    value={assistantAirport}
                    onChange={(e) => setAssistantAirport(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  >
                    <option value="Sân bay Tân Sơn Nhất (SGN) - TP.HCM">Sân bay Tân Sơn Nhất (SGN) - TP.HCM</option>
                    <option value="Sân bay Nội Bài (HAN) - Hà Nội">Sân bay Nội Bài (HAN) - Hà Nội</option>
                    <option value="Sân bay Đà Nẵng (DAD) - Đà Nẵng">Sân bay Đà Nẵng (DAD) - Đà Nẵng</option>
                    <option value="Sân bay Cam Ranh (CXR) - Nha Trang">Sân bay Cam Ranh (CXR) - Nha Trang</option>
                    <option value="Sân bay Phú Quốc (PQC) - Kiên Giang">Sân bay Phú Quốc (PQC) - Kiên Giang</option>
                    <option value="Sân bay khác">Sân bay khác</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">3. Phân loại hành trình</label>
                  <select 
                    value={assistantFlightType}
                    onChange={(e) => setAssistantFlightType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  >
                    <option value="Ga Quốc tế - Khách Đến (Arrival)">Ga Quốc tế - Khách Đến (Arrival)</option>
                    <option value="Ga Quốc tế - Khách Đi (Departure)">Ga Quốc tế - Khách Đi (Departure)</option>
                    <option value="Ga Quốc nội - Khách Đến (Arrival)">Ga Quốc nội - Khách Đến (Arrival)</option>
                    <option value="Ga Quốc nội - Khách Đi (Departure)">Ga Quốc nội - Khách Đi (Departure)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">4. Số lượng khách</label>
                  <select 
                    value={assistantGuests}
                    onChange={(e) => setAssistantGuests(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  >
                    <option value="1 khách">1 khách</option>
                    <option value="2 khách">2 khách</option>
                    <option value="3 - 5 khách">3 - 5 khách</option>
                    <option value="Đoàn trên 5 khách">Đoàn trên 5 khách</option>
                  </select>
                </div>
              </div>

              {/* Summary panel */}
              <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Yêu cầu đề xuất
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">Thông tin gói đặt của bạn</h4>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p className="flex justify-between border-b border-slate-200/50 pb-1.5">
                      <span className="font-medium text-slate-500">Dịch vụ:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[160px]">{assistantService.replace(/VIP\s|Gói\sDịch\svụ\s|Dịch\svụ\s/gi, "")}</span>
                    </p>
                    <p className="flex justify-between border-b border-slate-200/50 pb-1.5">
                      <span className="font-medium text-slate-500">Điểm áp dụng:</span>
                      <span className="font-bold text-slate-800">{assistantAirport.split(" - ")[0].replace("Sân bay ", "")}</span>
                    </p>
                    <p className="flex justify-between border-b border-slate-200/50 pb-1.5">
                      <span className="font-medium text-slate-500">Loại hành trình:</span>
                      <span className="font-bold text-slate-800">{assistantFlightType.split(" (")[0]}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium text-slate-500">Số hành khách:</span>
                      <span className="font-bold text-slate-800">{assistantGuests}</span>
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleAssistantSubmit}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Yêu Cầu Tư Vấn Ngay
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 relative z-10 bg-white" id="danh-sach-dich-vu">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-3">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Danh Mục Tiện Ích</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-be">Các Giải Pháp Tiện Ích Sân Bay Đẳng Cấp</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Đồng hành toàn diện trên hành trình bay của bạn, cung cấp các giải pháp chuyên nghiệp, uy tín và đúng quy chuẩn tại các sân bay lớn.
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 bg-slate-50/50 border border-slate-200/80 hover:border-blue-500/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {srv.icon}
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 rounded-full px-2.5 py-1">
                      {srv.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors font-be">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="border-t border-slate-200/60 pt-4 space-y-2.5">
                    {srv.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleServiceClick(srv.title)}
                    className="w-full mt-2 inline-flex items-center justify-center bg-white border border-slate-200 hover:border-blue-500/30 hover:bg-blue-50 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all gap-1 cursor-pointer"
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Process timeline */}
      <section className="py-24 relative z-10 bg-slate-50 border-t border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Quy Trình Chuẩn Hóa</span>
            <h2 className="text-3xl font-bold text-slate-900 font-be">4 Bước Phục Vụ Nhanh Chóng & Chuyên Nghiệp</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 relative shadow-sm">
              <div className="absolute -top-4 -left-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                01
              </div>
              <h4 className="font-bold text-slate-800 text-sm mt-2 mb-2 font-be">Đăng ký thông tin</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Chọn loại tiện ích, cập nhật lịch trình bay và số lượng hành khách tương ứng.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 relative shadow-sm">
              <div className="absolute -top-4 -left-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                02
              </div>
              <h4 className="font-bold text-slate-800 text-sm mt-2 mb-2 font-be">Tư vấn & báo giá</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Chuyên viên ABTRIP tiếp nhận thông tin, tư vấn phương án tối ưu và báo giá nhanh trong 15 phút.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 relative shadow-sm">
              <div className="absolute -top-4 -left-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                03
              </div>
              <h4 className="font-bold text-slate-800 text-sm mt-2 mb-2 font-be">Đón & hỗ trợ tại quầy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Đội ngũ phục vụ tại sân bay đón quý khách trực tiếp tại quầy hoặc ga quy định theo đúng quy chuẩn.</p>
            </div>
            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 relative shadow-sm">
              <div className="absolute -top-4 -left-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                04
              </div>
              <h4 className="font-bold text-slate-800 text-sm mt-2 mb-2 font-be">Tận hưởng chuyến đi</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Quý khách hoàn thành mọi dịch vụ thủ tục một cách thư thái nhất và bắt đầu hành trình của mình.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ABTRIP Services? */}
      <section className="py-24 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Độ Tin Cậy Cao</span>
            <h2 className="text-3xl font-bold text-slate-900 font-be">Cam Kết Chất Lượng Dịch Vụ Từ ABTRIP</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-base font-be">Đảm Bảo Thời Gian</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Quy trình chuyên nghiệp, nhanh gọn, tiết kiệm tối đa thời gian chờ đợi cho hành khách bận rộn.</p>
            </div>
            <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-base font-be">Uy Tín & Đúng Quy Định</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Hoạt động tuân thủ nghiêm ngặt các quy định về an toàn hàng không và xuất nhập cảnh.</p>
            </div>
            <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
                <UserCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-base font-be">Nhân Viên Chuyên Nghiệp</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Đội ngũ điều phối tận tình, am hiểu nghiệp vụ sân bay, đồng hành hỗ trợ chu đáo từ điểm đến/đi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Call Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-cyan-600 text-white relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute inset-0 bg-blue-800/20 backdrop-blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-be">Yêu Cầu Xử Lý Vé Gấp Hoặc Thủ Tục VIP?</h2>
          <p className="text-blue-100/90 max-w-xl mx-auto text-sm font-light">
            Liên hệ trực tiếp qua số hotline khẩn của chúng tôi. Chuyên viên túc trực 24/7 sẵn sàng giải đáp và xử lý các vấn đề khẩn cấp theo đúng quy định.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-blue-700 font-bold text-base rounded-xl px-8 py-4 shadow-xl hover:scale-105 transition-all gap-2"
            >
              Tư Vấn Zalo Khẩn: {phone}
            </a>
            <a 
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-base rounded-xl px-8 py-4 transition-all gap-2"
            >
              <Phone className="w-4 h-4" />
              Gọi Trực Tiếp: {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form with connected states */}
      <ContactForm serviceName={selectedService} initialNote={initialNote} />

      {/* Zalo Floating Button */}
      <ZaloFloatingButton phone={phone} />
    </>
  );
}
