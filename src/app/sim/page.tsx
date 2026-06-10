"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Wifi, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  CreditCard, 
  Search, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ShieldCheck, 
  Check, 
  Loader2, 
  HelpCircle,
  QrCode,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";
import { esimDestinations, compatibleDevices, eSIMPackage, Destination } from "@/data/esimPackages";

export default function SimLandingPage() {
  // Navigation & Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Asia" | "Europe" | "America" | "Global">("All");
  const [activeTab, setActiveTab] = useState<string>("thailand");
  
  // Device Checker States
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [deviceQuery, setDeviceQuery] = useState("");
  const [checkerResult, setCheckerResult] = useState<{ checked: boolean; compatible: boolean; model?: string } | null>(null);

  // Booking Form States
  const [selectedDest, setSelectedDest] = useState<Destination>(esimDestinations[0]);
  const [selectedPkg, setSelectedPkg] = useState<eSIMPackage>(esimDestinations[0].packages[0]);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"banking" | "momo">("banking");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const orderFormRef = useRef<HTMLDivElement>(null);

  // Filter destinations based on search query and region
  const filteredDestinations = useMemo(() => {
    return esimDestinations.filter((dest) => {
      const matchesSearch = dest.countryName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dest.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === "All" || dest.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // Handle choosing a package -> scroll to order form
  const handleSelectPackage = (dest: Destination, pkg: eSIMPackage) => {
    setSelectedDest(dest);
    setSelectedPkg(pkg);
    
    // Scroll to order form smoothly
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Handle checking compatibility
  const handleCheckDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) {
      alert("Vui lòng chọn hãng điện thoại!");
      return;
    }
    
    const brandDevices = compatibleDevices[selectedBrand as keyof typeof compatibleDevices] || [];
    const found = brandDevices.find((deviceStr) => 
      deviceStr.toLowerCase().includes(deviceQuery.toLowerCase())
    );

    if (found && deviceQuery.trim().length > 1) {
      setCheckerResult({ checked: true, compatible: true, model: found });
    } else if (deviceQuery.trim().length <= 1) {
      // If query is too short, show general brand statement
      setCheckerResult({ checked: true, compatible: true, model: `Hầu hết các dòng ${selectedBrand} đời mới (từ 2020 trở đi) có hỗ trợ eSIM` });
    } else {
      setCheckerResult({ checked: true, compatible: false });
    }
  };

  // Handle booking form submit
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fake API request timeout
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    if (paymentMethod === "banking") {
      setShowQR(true);
    } else {
      setOrderSuccess(true);
    }
  };

  const handleFinishOrder = () => {
    setOrderSuccess(false);
    setShowQR(false);
    setBuyerName("");
    setBuyerEmail("");
    setBuyerPhone("");
    setTravelDate("");
    setQuantity(1);
  };

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "eSIM du lịch là gì và hoạt động như thế nào?",
      a: "eSIM (Embedded SIM) là loại SIM điện tử được tích hợp sẵn trong bảng mạch điện thoại. Khi mua eSIM du lịch ABTRIP, bạn không cần tháo lắp thẻ SIM vật lý. Chúng tôi sẽ gửi một mã QR qua Email/Zalo, bạn chỉ cần quét mã đó để tải gói cước dữ liệu (data) về máy và sử dụng mạng internet ngay khi hạ cánh tại nước ngoài."
    },
    {
      q: "SIM này có hỗ trợ nghe gọi và nhắn tin (SMS) thông thường không?",
      a: "Hầu hết các gói eSIM du lịch quốc tế là gói chuyên dụng cho kết nối mạng dữ liệu (Data-Only) để tối ưu chi phí, do đó không hỗ trợ số điện thoại nghe gọi thông thường. Bạn vẫn có thể sử dụng các ứng dụng như Zalo, Messenger, WhatsApp, Viber để gọi điện và nhắn tin qua Internet hoàn toàn bình thường."
    },
    {
      q: "Khi nào tôi nên cài đặt eSIM vào điện thoại?",
      a: "Thời điểm lý tưởng nhất là cài đặt eSIM trước khi bay 1 ngày hoặc ngay tại sân bay Việt Nam (khi có kết nối Wi-Fi ổn định). Hãy tắt eSIM sau khi cài đặt. Khi đặt chân đến nước ngoài, bạn chỉ cần bật eSIM này lên và kích hoạt tính năng 'Chuyển vùng dữ liệu' (Data Roaming) của eSIM để kết nối mạng."
    },
    {
      q: "Tôi có thể sử dụng song song SIM Việt Nam và eSIM du lịch được không?",
      a: "Được! Điện thoại hỗ trợ eSIM cho phép bạn bật song song cả hai SIM. Bạn hãy cài đặt SIM Việt Nam làm SIM chính để nghe gọi, nhận tin nhắn mã OTP ngân hàng, và chọn eSIM du lịch ABTRIP làm SIM phụ chuyên cung cấp Dữ liệu di động để truy cập internet giá rẻ."
    },
    {
      q: "Làm thế nào để kiểm tra dung lượng data còn lại của eSIM?",
      a: "Đối với hệ điều hành iOS (iPhone), bạn có thể kiểm tra trong phần Cài đặt -> Di động -> Chọn eSIM của bạn để xem lượng dữ liệu đã sử dụng. Ngoài ra, bạn cũng có thể liên hệ bộ phận hỗ trợ khách hàng của ABTRIP qua Zalo để kiểm tra dung lượng còn lại nhanh chóng 24/7."
    }
  ];

  return (
    <div className="pt-20 bg-slate-50 min-h-screen text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0a2540] via-[#0d345a] to-[#005b96] py-20 lg:py-28 text-white overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">Giải Pháp eSIM Tiện Lợi Nhất</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              eSIM Du Lịch Quốc Tế
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-200 mt-1">Kết Nối 200+ Quốc Gia</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Nhận mã QR kích hoạt trong 5 phút qua Email/Zalo. Không cần tháo SIM vật lý, kết nối internet 4G/5G tốc độ cao ngay khi hạ cánh với chi phí tiết kiệm đến 80%.
            </p>

            {/* Quick trust items */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <span className="flex items-center text-xs font-semibold bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2 shrink-0" /> Nhận QR trong 5 phút
              </span>
              <span className="flex items-center text-xs font-semibold bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2 shrink-0" /> Không phí ẩn / Phí chuyển vùng
              </span>
              <span className="flex items-center text-xs font-semibold bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2 shrink-0" /> Hỗ trợ kỹ thuật 24/7
              </span>
            </div>

            {/* Live Search Input */}
            <div className="pt-4 max-w-md mx-auto lg:mx-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Nhập tên quốc gia bạn muốn đến (vd: Nhật Bản, Châu Âu...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-slate-800 rounded-full pl-12 pr-6 py-4 shadow-xl border-2 border-transparent focus:border-cyan-400 focus:outline-none text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Hero Right: Floating Promo Image / Features visual */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[360px] glass-card bg-white/10 border border-white/10 p-6 rounded-3xl shadow-2xl relative"
            >
              {/* Fake Phone screen with QR Code */}
              <div className="bg-[#0b1b2d] rounded-2xl p-4 border border-slate-700 space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>ABTRIP eSIM</span>
                  <span className="flex items-center gap-1"><Wifi className="w-3.5 h-3.5 text-cyan-400" /> 5G Connected</span>
                </div>
                
                <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center">
                  <div className="w-40 h-40 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-200 p-2">
                    <QrCode className="w-full h-full text-slate-800" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold mt-3 uppercase tracking-wider">Quét mã QR để kích hoạt eSIM</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Quốc gia:</span>
                    <span className="font-bold text-white">Toàn Cầu / Châu Á / Châu Âu</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Gói cước:</span>
                    <span className="font-bold text-cyan-300">Data tốc độ cao không giới hạn</span>
                  </div>
                </div>
              </div>
              
              {/* Absolute Badge */}
              <div className="absolute -top-4 -right-4 bg-cyan-500 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg rotate-12 flex flex-col items-center">
                <span>CHỈ TỪ</span>
                <span className="text-base">99k</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TABS & PACKAGES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Gói Cước eSIM Du Lịch Phổ Biến</h2>
          <p className="text-slate-600 max-w-xl mx-auto font-light text-sm sm:text-base">
            Chọn quốc gia bạn sắp đến để xem chi tiết các gói cước dữ liệu tốc độ cao phù hợp nhất.
          </p>
          <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Region filter buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {(["All", "Asia", "Europe", "America", "Global"] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => {
                setSelectedRegion(reg);
                // Set activeTab to the first item matching new filter if any
                const matches = esimDestinations.filter(d => reg === "All" || d.region === reg);
                if (matches.length > 0) {
                  setActiveTab(matches[0].id);
                }
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedRegion === reg
                  ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
                  : "bg-white text-slate-650 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {reg === "All" ? "Tất Cả" : reg === "Asia" ? "Châu Á" : reg === "Europe" ? "Châu Âu" : reg === "America" ? "Mỹ & Canada" : "Toàn Cầu / Châu Úc"}
            </button>
          ))}
        </div>

        {/* Grid layout for selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Destination Left Menu */}
          <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6 text-slate-500 text-sm">
                Không tìm thấy quốc gia phù hợp
              </div>
            ) : (
              filteredDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => {
                    setActiveTab(dest.id);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    activeTab === dest.id
                      ? "bg-white border-[var(--accent)] shadow-md text-[var(--accent)] font-bold"
                      : "bg-white/80 border-slate-200 hover:bg-white text-slate-700 hover:border-slate-350"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <span className="text-sm font-semibold">{dest.countryName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>{dest.packages.length} gói</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Packages Content Right */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {filteredDestinations.map((dest) => {
                if (dest.id !== activeTab) return null;
                
                return (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Destination Banner */}
                    <div className="relative rounded-2xl overflow-hidden h-40 shadow-md">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${dest.image}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 text-white space-y-1">
                        <span className="text-3xl">{dest.flag}</span>
                        <h3 className="text-2xl font-bold">{dest.countryName}</h3>
                        <p className="text-xs text-slate-300 font-light">Nhà mạng đối tác bản địa uy tín nhất tại {dest.countryName}</p>
                      </div>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dest.packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`bg-white rounded-2xl border p-5 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow ${
                            pkg.isPopular ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/10" : "border-slate-200"
                          }`}
                        >
                          {pkg.isPopular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                              Bán Chạy Nhất
                            </span>
                          )}
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm leading-tight">{pkg.name}</h4>
                              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Thời hạn: {pkg.duration} Ngày</p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                              <span className="text-xs text-slate-500 block">Dung lượng:</span>
                              <span className="text-lg font-black text-slate-900">{pkg.data}</span>
                            </div>

                            <ul className="space-y-2 text-xs text-slate-650">
                              {pkg.features.map((feat, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t border-slate-100 pt-4 mt-5 space-y-3">
                            <div className="flex justify-between items-baseline">
                              <span className="text-xs text-slate-500">Giá trọn gói:</span>
                              <span className="text-lg font-extrabold text-[var(--accent)]">{pkg.price.toLocaleString("vi-VN")}₫</span>
                            </div>
                            
                            <button
                              onClick={() => handleSelectPackage(dest, pkg)}
                              className={`w-full py-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                                pkg.isPopular 
                                  ? "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white shadow-lg shadow-[var(--accent)]/15" 
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                              }`}
                            >
                              Chọn gói mua
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION */}
      <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold">Lợi Ích Vượt Trội Của eSIM ABTRIP</h2>
            <p className="text-slate-400 max-w-xl mx-auto font-light text-sm sm:text-base">
              Thay đổi cách bạn kết nối Internet khi đi du lịch nước ngoài với công nghệ SIM thế hệ mới.
            </p>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-cyan-500/35 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Không Tháo SIM Gốc</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Giữ SIM chính Việt Nam trong máy để nhận cuộc gọi quan trọng và mã OTP ngân hàng. Không sợ thất lạc hay làm hỏng thẻ SIM gốc.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-cyan-500/35 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Giao Hàng Siêu Tốc</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Đặt mua online, thanh toán bảo mật và nhận QR code kích hoạt gửi trực tiếp qua Email hoặc Zalo của bạn chỉ trong 5 phút.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-cyan-500/35 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Mạng 4G/5G Bản Địa</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Tự động kết nối trực tiếp với các nhà mạng viễn thông lớn nhất của nước sở tại, đảm bảo tốc độ ổn định và phủ sóng rộng khắp.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-cyan-500/35 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Tiết Kiệm Chi Phí</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Rẻ hơn dịch vụ chuyển vùng dữ liệu (Data Roaming) quốc tế từ 80% - 90%. Không phát sinh thêm bất cứ khoản phí phụ nào khác.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEVICE COMPATIBILITY CHECKER */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 md:p-12 relative overflow-hidden">
            
            {/* Background design */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center mb-8 space-y-2 relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Thiết Bị Của Bạn Có Hỗ Trợ eSIM?</h2>
              <p className="text-slate-500 max-w-lg mx-auto text-xs sm:text-sm font-light">
                Kiểm tra nhanh xem điện thoại của bạn có hỗ trợ công nghệ eSIM hay không bằng công cụ tra cứu dưới đây.
              </p>
            </div>

            <form onSubmit={handleCheckDevice} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end relative z-10">
              {/* Select Brand */}
              <div className="md:col-span-4 space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-bold pl-1">Hãng điện thoại</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setCheckerResult(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-[var(--accent)] focus:bg-white"
                >
                  <option value="">-- Chọn Hãng --</option>
                  <option value="Apple">Apple (iPhone/iPad)</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Google">Google Pixel</option>
                  <option value="Other">Hãng khác (Oppo, Xiaomi...)</option>
                </select>
              </div>

              {/* Enter Model name */}
              <div className="md:col-span-5 space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-bold pl-1">Tên dòng máy (Model)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: iPhone 13, Galaxy S22..."
                  value={deviceQuery}
                  onChange={(e) => {
                    setDeviceQuery(e.target.value);
                    setCheckerResult(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-slate-800 text-xs focus:outline-none focus:border-[var(--accent)] focus:bg-white"
                />
              </div>

              {/* Submit btn */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[var(--accent)] to-[#4291b8] hover:shadow-lg text-white font-bold text-xs rounded-xl py-3.5 transition-all cursor-pointer"
                >
                  Kiểm tra máy
                </button>
              </div>
            </form>

            {/* Results Animation */}
            <AnimatePresence>
              {checkerResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 rounded-xl border flex items-start gap-4 relative z-10"
                  style={{
                    backgroundColor: checkerResult.compatible ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)",
                    borderColor: checkerResult.compatible ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"
                  }}
                >
                  {checkerResult.compatible ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-emerald-900 text-sm">Hỗ trợ eSIM thành công!</h4>
                        <p className="text-xs text-emerald-700 leading-relaxed font-light">
                          {checkerResult.model ? `Thiết bị: "${checkerResult.model}"` : "Thiết bị của bạn"} có hỗ trợ công nghệ eSIM. Bạn có thể an tâm đăng ký mua gói cước của chúng tôi.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Info className="w-8 h-8 text-red-600 shrink-0 mt-1" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-red-900 text-sm">Không tìm thấy hoặc không hỗ trợ</h4>
                        <p className="text-xs text-red-700 leading-relaxed font-light">
                          Chúng tôi không tìm thấy model chính xác trên hoặc thiết bị của bạn không có cấu hình eSIM. Hãy chắc chắn máy của bạn thuộc bản quốc tế (không khóa mạng) và hãy nhấn <a href="tel:0868320320" className="underline font-bold">Hotline: 0868 320 320</a> để chuyên viên kiểm tra chi tiết.
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. STEP BY STEP GUIDE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">4 Bước Kết Nối Internet Đơn Giản</h2>
          <p className="text-slate-600 max-w-xl mx-auto font-light text-sm sm:text-base">
            Quy trình mua sắm và lắp đặt eSIM dễ dàng, hoàn toàn tự động trực tuyến.
          </p>
          <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Timeline Connector Line */}
          <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-0.5 bg-slate-200 z-0"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 group-hover:border-[var(--accent)] group-hover:bg-blue-50 flex items-center justify-center font-bold text-lg text-slate-700 group-hover:text-[var(--accent)] shadow-sm transition-all duration-300">
              01
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Chọn Gói Cước</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] font-light">
              Chọn quốc gia đến và gói dung lượng (data), thời gian (ngày) phù hợp với chuyến đi của bạn.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 group-hover:border-[var(--accent)] group-hover:bg-blue-50 flex items-center justify-center font-bold text-lg text-slate-700 group-hover:text-[var(--accent)] shadow-sm transition-all duration-300">
              02
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Điền Thông Tin</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] font-light">
              Điền thông tin liên hệ và tiến hành thanh toán trực tuyến qua Chuyển khoản hoặc ví Momo.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 group-hover:border-[var(--accent)] group-hover:bg-blue-50 flex items-center justify-center font-bold text-lg text-slate-700 group-hover:text-[var(--accent)] shadow-sm transition-all duration-300">
              03
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Quét Mã QR</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] font-light">
              Check Email hoặc Zalo sau 5 phút để nhận hình ảnh mã QR kích hoạt cùng hướng dẫn cài đặt.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 group-hover:border-[var(--accent)] group-hover:bg-blue-50 flex items-center justify-center font-bold text-lg text-slate-700 group-hover:text-[var(--accent)] shadow-sm transition-all duration-300">
              04
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Sử Dụng Ngay</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] font-light">
              Hạ cánh xuống sân bay nước sở tại, bật eSIM và kích hoạt 'Chuyển vùng dữ liệu' để kết nối Internet.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ORDER FORM & BILLING SECTION */}
      <section ref={orderFormRef} className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold">Đăng Ký Đặt Mua eSIM</h2>
                <p className="text-slate-400 font-light text-xs sm:text-sm">
                  Điền đầy đủ thông tin bên dưới. Mã QR và hướng dẫn chi tiết sẽ được nhân viên chăm sóc khách hàng của ABTRIP gửi cho bạn ngay sau khi xác nhận thanh toán.
                </p>
              </div>

              {orderSuccess ? (
                <div className="bg-slate-800/80 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Đặt Mua eSIM Thành Công!</h3>
                    <p className="text-slate-350 text-xs max-w-md mx-auto leading-relaxed">
                      Yêu cầu mua gói <span className="text-cyan-300 font-semibold">{selectedPkg.name}</span> của quý khách đã được tiếp nhận. Chuyên viên của abtrip.vn sẽ gửi mã QR eSIM cho bạn qua Zalo/Email trong 5-10 phút.
                    </p>
                  </div>
                  <button
                    onClick={handleFinishOrder}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Quay lại mua thêm
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Buyer Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-bold pl-1">Họ và tên người mua *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Buyer Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-bold pl-1">Số điện thoại liên hệ *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          placeholder="09xx xxx xxx (Hỗ trợ Zalo)"
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buyer Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-bold pl-1">Email nhận QR Code eSIM *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        placeholder="ten.cua.ban@gmail.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Travel Date */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-bold pl-1">Ngày khởi hành dự kiến *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="date"
                          required
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 uppercase font-bold pl-1">Số lượng eSIM mua</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="bg-slate-800 border border-slate-700 text-slate-350 hover:text-white px-3 py-2.5 rounded-xl font-black text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-sm font-bold bg-slate-800 border border-slate-700 py-2.5 rounded-xl">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="bg-slate-800 border border-slate-700 text-slate-350 hover:text-white px-3 py-2.5 rounded-xl font-black text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] text-slate-400 uppercase font-bold pl-1 block">Phương thức thanh toán</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("banking")}
                        className={`flex items-center p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          paymentMethod === "banking"
                            ? "bg-slate-800 border-cyan-400 text-white font-bold"
                            : "bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <QrCode className="w-5 h-5 text-cyan-400 mr-2.5 shrink-0" />
                        <div className="text-xs">
                          <span className="block font-bold">Chuyển Khoản Ngân Hàng</span>
                          <span className="text-[10px] text-slate-500">Tạo mã QR chuyển khoản tự động</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("momo")}
                        className={`flex items-center p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          paymentMethod === "momo"
                            ? "bg-slate-800 border-cyan-400 text-white font-bold"
                            : "bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-pink-500 mr-2.5 shrink-0" />
                        <div className="text-xs">
                          <span className="block font-bold">Ví Điện Tử Momo</span>
                          <span className="text-[10px] text-slate-500">Thanh toán ví điện tử nhanh chóng</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm rounded-xl py-3.5 hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer mt-4"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý đăng ký...</>
                    ) : (
                      <>Đặt mua & Nhận báo giá ngay</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Billing Summary Column Right */}
            <div className="lg:col-span-5 bg-slate-800/60 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-lg font-bold border-b border-slate-800 pb-3">Tóm tắt đơn hàng</h3>
              
              <div className="space-y-4 text-xs">
                {/* Destination selected */}
                <div className="flex justify-between">
                  <span className="text-slate-400">Điểm đến:</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <span>{selectedDest.flag}</span>
                    <span>{selectedDest.countryName}</span>
                  </span>
                </div>

                {/* Package selected */}
                <div className="flex justify-between items-start">
                  <span className="text-slate-400">Gói cước eSIM:</span>
                  <div className="text-right">
                    <span className="font-semibold text-white block">{selectedPkg.name}</span>
                    <span className="text-[10px] text-cyan-400">{selectedPkg.data} ({selectedPkg.duration} Ngày)</span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex justify-between">
                  <span className="text-slate-400">Số lượng:</span>
                  <span className="font-semibold text-white">{quantity} eSIM</span>
                </div>

                {/* Total price */}
                <div className="flex justify-between border-t border-slate-800 pt-4 items-baseline">
                  <span className="text-sm text-slate-350">Tổng thanh toán:</span>
                  <span className="text-2xl font-black text-cyan-400">
                    {(selectedPkg.price * quantity).toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>

              {/* Secure Trust info */}
              <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-[10px] text-slate-400 font-light leading-relaxed">
                  <span className="block font-bold text-white mb-0.5">Cam kết bảo mật & Hoàn tiền</span>
                  ABTRIP cam kết hoàn tiền 100% nếu eSIM gặp lỗi kỹ thuật từ hệ thống của chúng tôi và không thể kích hoạt thành công trên máy của quý khách.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Bank QR Modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Header modal */}
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-black text-slate-800">Thanh Toán Chuyển Khoản QR</h3>
                  <p className="text-xs text-slate-500 font-light">Quét mã QR dưới đây để hoàn tất giao dịch tự động</p>
                </div>

                {/* Simulated QR block */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
                  <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-sm relative">
                    <div className="w-48 h-48 flex items-center justify-center">
                      {/* Fake Banking QR */}
                      <QrCode className="w-full h-full text-slate-800" />
                    </div>
                    {/* Small center logo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] text-white font-extrabold text-[8px] px-1.5 py-1 rounded shadow-md border border-white">
                      AB
                    </div>
                  </div>
                  
                  {/* Total price inside modal */}
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Số tiền cần chuyển:</span>
                    <span className="text-2xl font-black text-[var(--accent)]">{(selectedPkg.price * quantity).toLocaleString("vi-VN")}₫</span>
                  </div>
                </div>

                {/* Bank Account Info */}
                <div className="space-y-2 text-xs border-t border-slate-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ngân hàng:</span>
                    <span className="font-bold text-slate-850">Techcombank (TCB)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Số tài khoản:</span>
                    <span className="font-bold text-slate-850">19036578129019</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chủ tài khoản:</span>
                    <span className="font-bold text-slate-850">CONG TY TNHH TM DV HK ABTRIP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nội dung CK:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                      ABTRIP ESIM {buyerPhone || "VIP"}
                    </span>
                  </div>
                </div>

                {/* Confirm actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowQR(false);
                      setOrderSuccess(true);
                    }}
                    className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer text-center"
                  >
                    Xác nhận đã chuyển khoản
                  </button>
                  
                  <button
                    onClick={() => setShowQR(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 7. FAQS SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Câu Hỏi Thường Gặp (FAQs)</h2>
          <p className="text-slate-550 max-w-xl mx-auto font-light text-xs sm:text-sm">
            Giải đáp mọi băn khoăn thắc mắc của bạn về sản phẩm SIM & eSIM du lịch quốc tế của ABTRIP.
          </p>
          <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-sm sm:text-base text-slate-800 focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  {faq.q}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-450 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-450 shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS SECTION */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">Khách Hàng Nói Gề Về Chúng Tôi</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-light text-xs sm:text-sm">
              Đồng hành cùng hàng ngàn du khách Việt Nam trong mọi chuyến hành trình vươn ra thế giới.
            </p>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                  H
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Nguyễn Minh Hoàng</h4>
                  <span className="text-[9px] text-slate-400">Đi du lịch Nhật Bản tháng 5/2026</span>
                </div>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-light italic">
                "Thực sự tiện lợi! Mình mua eSIM của ABTRIP trước khi bay 1 ngày. Sang đến sân bay Narita chỉ cần bật lên là có mạng 4G lướt Google Maps tìm đường tàu ngay lập tức, không cần chen chúc xếp hàng mua sim ở sân bay."
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                  T
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Lê Thu Trang</h4>
                  <span className="text-[9px] text-slate-400">Công tác Pháp & Ý tháng 4/2026</span>
                </div>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-light italic">
                "Mình dùng gói eSIM Châu Âu 15 ngày của ABTRIP đi qua 3 nước Pháp, Đức, Ý mạng vẫn tự động chuyển vùng cực mượt. Có mạng khỏe để liên lạc và làm việc với đối tác mọi lúc mọi nơi."
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Phạm Tiến Phát</h4>
                  <span className="text-[9px] text-slate-400">Du lịch Thái Lan tháng 6/2026</span>
                </div>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-light italic">
                "Mua eSIM của ABTRIP chỉ chưa đầy 100k đi Thái Lan 5 ngày. Nhân viên hỗ trợ nhiệt tình qua Zalo, gửi QR code rất nhanh. Sẽ tiếp tục ủng hộ dịch vụ của công ty trong những chuyến du lịch tiếp theo."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FLOATING CTA / SUPPORT CARD */}
      <section className="bg-[var(--accent)] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">Bạn Cần Hỗ Trợ Tư Vấn Hoặc Thiết Kế Gói Riêng?</h3>
            <p className="text-xs text-slate-200 font-light max-w-xl">
              Hỗ trợ các gói eSIM đoàn số lượng lớn cho công ty lữ hành, sự kiện MICE hoặc các doanh nghiệp có đoàn công tác nước ngoài.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:0868320320"
              className="bg-white hover:bg-slate-50 text-[var(--accent)] font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              Hotline: 0868 320 320
            </a>
            <a
              href="https://zalo.me/0868320320"
              target="_blank"
              rel="noreferrer"
              className="bg-[#0068ff] hover:bg-[#0052cc] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              Liên hệ Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
