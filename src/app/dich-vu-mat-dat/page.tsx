"use client";

import { motion } from "framer-motion";
import { Plane, FileText, Users, Wrench, Shield, Clock, Coffee, Fuel, Check, CheckCircle2, Star, Zap } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

export default function GroundHandlingPage() {
  const phone = "0788320320";
  const zaloUrl = `https://zalo.me/${phone}`;

  const services = [
    {
      title: "Xin Phép Bay & Điều Phối Slot (Flight Permits & Slots)",
      description: "Hỗ trợ xin giấy phép bay quá cảnh (Overflight Permit), giấy phép hạ cánh (Landing Permit) cho các chuyến bay chuyên cơ, chuyến bay thuê chuyến (Charter) và điều phối slot khẩn cấp tại các sân bay quốc tế Việt Nam.",
      icon: <FileText className="w-6 h-6" />,
      features: ["Xin phép bay quá cảnh & hạ cánh nhanh", "Điều phối Slot tại SGN, HAN, DAD", "Hỗ trợ nộp Kế hoạch bay (FPL)", "Xử lý thay đổi lịch bay khẩn cấp"]
    },
    {
      title: "Giám Sát & Đại Diện Mặt Đất (Ground Supervision)",
      description: "Đại diện trạm (Station Representation) và giám sát trực tiếp quá trình phục vụ mặt đất tại sân bay, đảm bảo quy trình check-in, cân bằng trọng tải (Load control), bốc xếp hành lý diễn ra đúng giờ và an toàn.",
      icon: <Users className="w-6 h-6" />,
      features: ["Giám sát check-in & làm thủ tục hành khách", "Kiểm soát cân bằng trọng tải chuyến bay", "Giám sát xếp dỡ hành lý & hàng hóa", "Báo cáo chỉ số đúng giờ (OTP) thời gian thực"]
    },
    {
      title: "Hỗ Trợ Phi Hành Đoàn & Chuyên Cơ VIP (Crew & Charter Support)",
      description: "Cung cấp giải pháp trọn gói cho tổ bay và khách chuyên cơ tư nhân (Private Jet): Thủ tục hải quan ưu tiên (Fast Track), xe đón tại chân máy bay, phòng nghỉ tổ bay (Crew Lounge), và hậu cần phi hành đoàn.",
      icon: <Coffee className="w-6 h-6" />,
      features: ["Đón tiễn VIP Fastrack cho khách & phi hành đoàn", "Xe đón tại chân thang máy bay (Apron transport)", "Sắp xếp khách sạn & xe đưa đón tổ bay", "Hỗ trợ gia hạn Visa & giấy phép làm việc cho phi công"]
    },
    {
      title: "Dịch Vụ Kỹ Thuật & Cung Ứng Sân Đỗ (Ramp & Fueling Services)",
      description: "Điều phối các dịch vụ kỹ thuật mặt đất tại sân đỗ bao gồm tiếp nhiên liệu hàng không (Jet A-1), cung cấp suất ăn (Catering), vệ sinh cabin tàu bay và các thiết bị hỗ trợ mặt đất (GPU, ASU, Pushback).",
      icon: <Fuel className="w-6 h-6" />,
      features: ["Liên kết tiếp nhiên liệu hàng không Jet A-1", "Cung cấp suất ăn hàng không cao cấp", "Vệ sinh cabin & xử lý nước thải tàu bay", "Điều phối thiết bị hỗ trợ mặt đất chuyên dụng"]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-[var(--background)]"></div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-blue-50/80 border border-blue-200 rounded-full px-4 py-2 backdrop-blur-sm"
          >
            <Plane className="w-4 h-4 text-[var(--accent)] animate-pulse" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Aviation Ground Handling & Flight Support</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight [text-wrap:balance]"
          >
            Dịch Vụ Mặt Đất Sân Bay
            <span className="block text-gradient-gold mt-1">Hỗ Trợ Điều Hành Bay Chuyên Nghiệp</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Đơn vị đại diện mặt đất và điều hành bay uy tín tại Việt Nam. Chuyên phục vụ kỹ thuật sân đỗ, xin giấy phép bay, tiếp nhiên liệu, và dịch vụ hậu cần phi hành đoàn cho các hãng hàng không quốc tế & chuyên cơ VIP.
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
              Liên Hệ Zalo Điều Hành Bay: {phone}
            </a>
            <a 
              href="#lien-he"
              className="inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-base rounded-xl px-6 py-4 transition-all"
            >
              Gửi Yêu Cầu Báo Giá
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Danh Mục Dịch Vụ Mặt Đất Sân Bay</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 bg-slate-50 border border-slate-200 hover:border-[var(--accent)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-[var(--accent)] mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{srv.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{srv.description}</p>
                </div>
                
                <div className="border-t border-slate-200/80 pt-6 space-y-2.5">
                  {srv.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center text-xs font-semibold text-slate-700">
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

      {/* Qualifications */}
      <section className="py-24 relative z-10 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Năng Lực Điều Hành & Phục Vụ</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Đúng Giờ Tuyệt Đối</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Giám sát quy trình quay vòng tàu bay (Turnaround process) chặt chẽ, tối thiểu hóa nguy cơ chậm giờ bay.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[var(--accent)]">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Phản Ứng Khẩn Cấp</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Xử lý nhanh các yêu cầu xin giấy phép bay, thay đổi hành trình hoặc thời gian cất hạ cánh trong vòng 30 phút.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Tiêu Chuẩn Quốc Tế</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Đội ngũ nhân sự được đào tạo bài bản theo tiêu chuẩn IATA, an toàn hàng không tuyệt đối là ưu tiên số một.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Zalo banner */}
      <section className="py-16 bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Cần Đăng Ký Đại Diện Mặt Đất Hoặc Xin Phép Bay Gấp?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base font-light">
            Liên hệ trực tiếp với bộ phận Điều hành bay 24/7 của chúng tôi qua Zalo để được hỗ trợ nhanh nhất.
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
              Chat Zalo Điều Hành: {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm serviceName="Dịch vụ Mặt đất sân bay" />

      {/* Zalo Floating Button */}
      <ZaloFloatingButton phone={phone} />
    </>
  );
}
