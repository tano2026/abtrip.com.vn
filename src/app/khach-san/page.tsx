"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Users, 
  Search, 
  Minus, 
  Plus, 
  Star, 
  Coffee, 
  Wifi, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  Clock, 
  ArrowRight, 
  Building2, 
  Calendar as CalendarIcon, 
  CheckCircle,
  FileText,
  BadgePercent
} from "lucide-react";
import DatePickerWithLunar from "@/components/DatePickerWithLunar";
import ContactForm from "@/components/ContactForm";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

// Hot destinations list
const HOT_DESTINATIONS = [
  { name: "Phú Quốc", sub: "Kiên Giang, Việt Nam", slug: "phu-quoc" },
  { name: "Đà Nẵng", sub: "Thành phố Đà Nẵng, Việt Nam", slug: "da-nang" },
  { name: "Nha Trang", sub: "Khánh Hòa, Việt Nam", slug: "nha-trang" },
  { name: "Đà Lạt", sub: "Lâm Đồng, Việt Nam", slug: "da-lat" },
  { name: "Vũng Tàu", sub: "Bà Rịa - Vũng Tàu, Việt Nam", slug: "vung-tau" },
  { name: "Hà Nội", sub: "Thành phố Hà Nội, Việt Nam", slug: "ha-noi" },
  { name: "Hồ Chí Minh", sub: "Thành phố Hồ Chí Minh, Việt Nam", slug: "ho-chi-minh" }
];

// Sample Hotels Database
const HOTELS_DATA: Record<string, Array<{
  name: string;
  image: string;
  rating: number;
  stars: number;
  location: string;
  originalPrice: number;
  discountPrice: number;
  amenities: string[];
  type: string;
}>> = {
  "phu-quoc": [
    {
      name: "Vinpearl Resort & Spa Phú Quốc",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600",
      rating: 4.8,
      stars: 5,
      location: "Bãi Dài, Phú Quốc",
      originalPrice: 2850000,
      discountPrice: 2150000,
      amenities: ["Bữa sáng miễn phí", "Hồ bơi sát biển", "Free Wifi", "Đưa đón sân bay"],
      type: "Resort nghỉ dưỡng"
    },
    {
      name: "Regent Phú Quốc Luxury Resort",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
      rating: 4.9,
      stars: 5,
      location: "Bãi Trường, Phú Quốc",
      originalPrice: 9800000,
      discountPrice: 8400000,
      amenities: ["Bữa sáng thượng hạng", "Bể bơi vô cực riêng", "Quầy bar tầng thượng", "Dịch vụ Butler VIP"],
      type: "Khách sạn siêu sang"
    }
  ],
  "da-nang": [
    {
      name: "InterContinental Danang Sun Peninsula Resort",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600",
      rating: 4.9,
      stars: 5,
      location: "Bán đảo Sơn Trà, Đà Nẵng",
      originalPrice: 9200000,
      discountPrice: 7850000,
      amenities: ["Bữa sáng sang trọng", "Bãi biển riêng tư", "Free Wifi", "Đặt chỗ phòng chờ VIP Lounge"],
      type: "Khu nghỉ dưỡng di sản"
    },
    {
      name: "Furama Resort Đà Nẵng",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600",
      rating: 4.7,
      stars: 5,
      location: "Bãi biển Mỹ Khê, Đà Nẵng",
      originalPrice: 3200000,
      discountPrice: 2650000,
      amenities: ["Bữa sáng buffet", "Trung tâm ẩm thực ẩm thực Á-Âu", "Free Wifi", "Hồ bơi vô cực"],
      type: "Resort 5 sao truyền thống"
    }
  ],
  "nha-trang": [
    {
      name: "Vinpearl Resort & Spa Nha Trang Bay",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600",
      rating: 4.8,
      stars: 5,
      location: "Đảo Hòn Tre, Nha Trang",
      originalPrice: 2950000,
      discountPrice: 2200000,
      amenities: ["Bữa sáng buffet", "Cáp treo ra đảo miễn phí", "Free Wifi", "Khu vui chơi VinWonders"],
      type: "Resort gia đình"
    }
  ],
  "da-lat": [
    {
      name: "Ana Mandara Villas Dalat Resort & Spa",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600",
      rating: 4.7,
      stars: 5,
      location: "Phường 5, Đà Lạt",
      originalPrice: 2450000,
      discountPrice: 1950000,
      amenities: ["Bữa sáng kiểu Pháp", "Hồ bơi nước ấm", "Biệt thự cổ Pháp biệt lập", "Free Wifi"],
      type: "Resort kiến trúc cổ"
    }
  ]
};

// Default fallback hotels if destination has no database list
const DEFAULT_HOTELS = [
  {
    name: "Mường Thanh Luxury Hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600",
    rating: 4.6,
    stars: 5,
    location: "Trung tâm Thành phố",
    originalPrice: 1650000,
    discountPrice: 1350000,
    amenities: ["Bữa sáng miễn phí", "Hồ bơi ngoài trời", "Free Wifi", "Hỗ trợ xuất hóa đơn VAT"],
    type: "Khách sạn trung tâm"
  },
  {
    name: "Amanoi luxury Resort & Spa",
    image: "https://images.unsplash.com/photo-1544016708-959f99718bfb?q=80&w=600",
    rating: 4.9,
    stars: 5,
    location: "Vịnh Vĩnh Hy, Ninh Thuận",
    originalPrice: 22000000,
    discountPrice: 19500000,
    amenities: ["Bữa sáng thượng hạng", "Bể bơi vô cực riêng biệt", "Dịch vụ Spa & Yoga miễn phí", "Đưa đón VIP riêng"],
    type: "Siêu khu nghỉ dưỡng"
  }
];

export default function HotelPage() {
  const phone = "0788320320";
  const zaloUrl = `https://zalo.me/${phone}`;

  // Form States
  const [destination, setDestination] = useState("Phú Quốc");
  const [selectedSlug, setSelectedSlug] = useState("phu-quoc");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const dayAfterTomorrowStr = dayAfterTomorrow.toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState(tomorrowStr);
  const [checkOutDate, setCheckOutDate] = useState(dayAfterTomorrowStr);

  // Guests & Rooms States
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  // Search Results States
  const [isSearching, setIsSearching] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [resultsHotels, setResultsHotels] = useState<any[]>([]);

  // Selected hotel for booking
  const [selectedHotelBooking, setSelectedHotelBooking] = useState("");
  const [initialNote, setInitialNote] = useState("");

  const destinationRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate nights
  const getNightsCount = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) ? 1 : diffDays;
    } catch {
      return 1;
    }
  };

  const handleDestinationSelect = (destName: string, destSlug: string) => {
    setDestination(destName);
    setSelectedSlug(destSlug);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    const texts = [
      "Đang quét thông tin phòng trống theo thời gian thực...",
      "Đang liên kết hệ thống giá đối tác Vinpearl, Sun Group, Marriott...",
      "Đang áp dụng chiết khấu Corporate tối quyền của ABTRIP...",
      "Sắp xếp danh sách phòng phù hợp nhất..."
    ];

    let currentIdx = 0;
    setLoadingText(texts[currentIdx]);

    const textInterval = setInterval(() => {
      currentIdx++;
      if (currentIdx < texts.length) {
        setLoadingText(texts[currentIdx]);
      }
    }, 600);

    setTimeout(() => {
      clearInterval(textInterval);
      setIsSearching(false);
      setHasSearched(true);
      
      // Load hotels based on selected destination slug
      const found = HOTELS_DATA[selectedSlug];
      setResultsHotels(found || DEFAULT_HOTELS);

      // Scroll to results section
      setTimeout(() => {
        const resultsEl = document.getElementById("search-results");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }, 2400);
  };

  const handleSelectRoom = (hotelName: string, price: number) => {
    setSelectedHotelBooking(hotelName);
    const formatPrice = price.toLocaleString("vi-VN") + "đ/đêm";
    const noteText = `Tôi muốn đăng ký đặt phòng tại: ${hotelName} cho ${rooms} phòng, ${adults} người lớn, ${children} trẻ em. Ngày nhận phòng: ${checkInDate}, ngày trả phòng: ${checkOutDate} (${getNightsCount()} đêm). Dự kiến đơn giá phòng tham khảo: ${formatPrice}.`;
    
    setInitialNote(noteText + " Vui lòng liên hệ hỗ trợ xác nhận tình trạng phòng trống và hoàn tất đặt chỗ giúp tôi.");
    
    setTimeout(() => {
      const contactEl = document.getElementById("lien-he-dat-phong");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString("vi-VN") + " đ";
  };

  return (
    <>
      {/* Search Loading Screen */}
      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white"
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <Building2 className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-sm font-semibold tracking-wider text-blue-200 animate-pulse text-center max-w-xs md:max-w-md px-4">
              {loadingText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Search Form */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-[var(--background)]"></div>
        </div>

        {/* Ambient light orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-6xl space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-blue-500/15 border border-blue-400/30 rounded-full px-4 py-2 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Đối Tác Khách Sạn Toàn Cầu Chiết Khấu Corporate</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight [text-wrap:balance] font-be"
            >
              Đặt Phòng Khách Sạn
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mt-1">
                Giá Đại Lý B2B Tốt Nhất
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Kết nối hơn 500.000 khách sạn & resort 3-5 sao toàn quốc và thế giới. Hỗ trợ đối soát công nợ, xuất hóa đơn VAT điện tử nhanh và dịch vụ hỗ trợ VIP 24/7.
            </motion.p>
          </div>

          {/* Traveloka Style Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100 text-left text-slate-800"
          >
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              {/* Form Title & Indicator */}
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-800 font-be">Tìm kiếm phòng khách sạn trống</h3>
                  <p className="text-xs text-slate-400">Đặt trực tuyến & nhận voucher/code xác nhận ngay lập tức</p>
                </div>
              </div>

              {/* Main Inputs Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* 1. Destination Column */}
                <div ref={destinationRef} className="lg:col-span-4 relative flex flex-col justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl transition-all cursor-pointer">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Thành Phố / Điểm Đến</label>
                  <div 
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="flex items-center space-x-2.5 w-full pt-1"
                  >
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                    <div className="text-left">
                      <span className="text-sm font-bold text-slate-800 block truncate">{destination}</span>
                      <span className="text-[10px] text-slate-400 block truncate">Việt Nam hoặc Quốc tế</span>
                    </div>
                  </div>

                  {/* Suggestions Popover */}
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 top-[105%] bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto p-2.5 space-y-1"
                      >
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3.5 py-1 block">Điểm Đến Hấp Dẫn</span>
                        {HOT_DESTINATIONS.map((dest) => (
                          <div 
                            key={dest.slug}
                            onClick={() => handleDestinationSelect(dest.name, dest.slug)}
                            className="flex items-center space-x-3 px-3.5 py-2.5 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                          >
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <div>
                              <span className="text-xs font-bold text-slate-700 block">{dest.name}</span>
                              <span className="text-[10px] text-slate-400 block">{dest.sub}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Check-in Date Column */}
                <div className="lg:col-span-3 flex flex-col justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <DatePickerWithLunar
                    selectedDate={checkInDate}
                    onChange={(date) => {
                      setCheckInDate(date);
                      // Auto push check-out date to check-in + 1 day if needed
                      if (new Date(date) >= new Date(checkOutDate)) {
                        const newOut = new Date(date);
                        newOut.setDate(newOut.getDate() + 1);
                        setCheckOutDate(newOut.toISOString().split("T")[0]);
                      }
                    }}
                    label="Ngày Nhận Phòng"
                    minDate={tomorrowStr}
                  />
                </div>

                {/* 3. Check-out Date Column */}
                <div className="lg:col-span-3 flex flex-col justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <DatePickerWithLunar
                    selectedDate={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    label={`Ngày Trả Phòng (${getNightsCount()} đêm)`}
                    minDate={checkInDate}
                  />
                </div>

                {/* 4. Guests & Rooms Column */}
                <div ref={guestRef} className="lg:col-span-2 relative flex flex-col justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl transition-all cursor-pointer">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Khách & Phòng</label>
                  <div 
                    onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                    className="flex items-center justify-between w-full pt-1"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Users className="w-5 h-5 text-blue-600 shrink-0" />
                      <div className="text-left">
                        <span className="text-sm font-bold text-slate-800 block truncate">{rooms} phòng, {adults} NL</span>
                        <span className="text-[10px] text-slate-400 block truncate">{children} trẻ em</span>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Guests Dropdown Popover */}
                  <AnimatePresence>
                    {showGuestDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-[105%] w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 p-4 space-y-4"
                      >
                        {/* Rooms count */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-slate-800 text-xs block">Số phòng</span>
                            <span className="text-[10px] text-slate-400 block">Số lượng phòng cần đặt</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              type="button"
                              disabled={rooms <= 1}
                              onClick={() => setRooms(rooms - 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-slate-800 font-bold w-4 text-center select-none text-xs">{rooms}</span>
                            <button 
                              type="button"
                              disabled={rooms >= 8}
                              onClick={() => setRooms(rooms + 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Adults count */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-slate-800 text-xs block">Người lớn</span>
                            <span className="text-[10px] text-slate-400 block">Từ 12 tuổi trở lên</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              type="button"
                              disabled={adults <= 1}
                              onClick={() => setAdults(adults - 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-slate-800 font-bold w-4 text-center select-none text-xs">{adults}</span>
                            <button 
                              type="button"
                              disabled={adults >= 30}
                              onClick={() => setAdults(adults + 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Children count */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-slate-800 text-xs block">Trẻ em</span>
                            <span className="text-[10px] text-slate-400 block">Dưới 12 tuổi</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              type="button"
                              disabled={children <= 0}
                              onClick={() => setChildren(children - 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-slate-800 font-bold w-4 text-center select-none text-xs">{children}</span>
                            <button 
                              type="button"
                              disabled={children >= 10}
                              onClick={() => setChildren(children + 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Confirm Button */}
                        <button
                          type="button"
                          onClick={() => setShowGuestDropdown(false)}
                          className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition-all text-xs cursor-pointer"
                        >
                          Áp Dụng
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Submit Button Row */}
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-4 px-10 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Tìm Kiếm Khách Sạn
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Results Section */}
      <AnimatePresence>
        {hasSearched && (
          <section id="search-results" className="py-24 bg-slate-50 border-t border-b border-slate-200/60 scroll-mt-20">
            <div className="container mx-auto px-4 max-w-5xl space-y-8">
              <div className="text-left border-l-4 border-blue-600 pl-4 space-y-1">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block">Kết Quả Phòng Trống Theo Yêu Cầu</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-be">
                  Khách sạn khả dụng tại {destination} ({checkInDate} - {checkOutDate})
                </h2>
                <p className="text-slate-500 text-xs font-light">Giá cước đã bao gồm chiết khấu đại lý doanh nghiệp của ABTRIP</p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 gap-6">
                {resultsHotels.map((hotel, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all group"
                  >
                    {/* Left: Hotel Image */}
                    <div className="w-full md:w-2/5 relative h-56 md:h-auto overflow-hidden aspect-[4/3] md:aspect-auto">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-slate-950/70 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {hotel.type}
                      </span>
                    </div>

                    {/* Right: Hotel Info */}
                    <div className="w-full md:w-3/5 p-6 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-xl font-bold text-slate-800 font-be group-hover:text-blue-600 transition-colors">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: hotel.stars }).map((_, sidx) => (
                              <Star key={sidx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{hotel.location}</span>
                        </div>

                        {/* Amenities badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {hotel.amenities.map((amenity: string, aidx: number) => (
                            <span 
                              key={aidx} 
                              className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"
                            >
                              {amenity.includes("sáng") ? <Coffee className="w-3 h-3 text-amber-500" /> : <Wifi className="w-3 h-3 text-blue-500" />}
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-slate-100">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 line-through block">{formatCurrency(hotel.originalPrice)} /đêm</span>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="text-2xl font-extrabold text-blue-700 font-be">{formatCurrency(hotel.discountPrice)}</span>
                            <span className="text-slate-400 text-xs">/đêm</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSelectRoom(hotel.name, hotel.discountPrice)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Chọn Phòng & Giữ Chỗ
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Corporate Hotel Services Details */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-3">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Đặc Quyền Doanh Nghiệp B2B</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-be">Tại Sao Nên Đặt Khách Sạn Doanh Nghiệp Qua ABTRIP?</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-3xl hover:bg-white hover:border-blue-500/30 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <BadgePercent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 font-be">Giá Corporate Ưu Đãi</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Cam kết giá phòng Corporate tối ưu được chiết khấu trực tiếp lên đến 15% so với giá bán lẻ công khai trên các ứng dụng OTA thông thường.
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-3xl hover:bg-white hover:border-blue-500/30 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 font-be">Hóa Đơn GTGT Nhanh Chóng</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Hỗ trợ xuất hóa đơn tài chính GTGT hợp lệ trực tiếp từ hệ thống, phục vụ công tác thanh toán công tác phí doanh nghiệp minh bạch.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-8 rounded-3xl hover:bg-white hover:border-blue-500/30 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 font-be">Xác Nhận Giữ Chỗ Tức Thì</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Hệ thống API kết nối trực tiếp với các chuỗi khách sạn toàn cầu, đảm bảo trạng thái đặt giữ chỗ chính xác 100% không lo trượt phòng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals (Voucher độc quyền) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-2">Combo Độc Quyền</span>
              <h2 className="text-3xl font-bold text-slate-900 font-be">Khách Sạn & Resort Đối Tác Hot Nhất</h2>
            </div>
            <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 gap-1.5 shrink-0">
              Xem thêm các ưu đãi khác <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Deal 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600" alt="Vinpearl" className="w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Hot Deal -15%
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-base text-slate-800 font-be">Vinpearl Nha Trang & Phú Quốc</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Áp dụng cho dòng phòng Deluxe/Villa bao gồm ăn sáng buffet và miễn phí vé vui chơi VinWonders.</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded">Ăn sáng buffet</span>
                    <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded">Tặng vé VinWonders</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[9px] text-slate-400 block">Giá từ</span>
                  <span className="font-extrabold text-blue-700 font-be text-base">2.150.000đ /đêm</span>
                </div>
                <button onClick={() => handleSelectRoom("Vinpearl Resort (Gói Deal 15%)", 2150000)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-2.5 px-4 rounded-lg cursor-pointer">
                  Đặt Ngay
                </button>
              </div>
            </div>

            {/* Deal 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600" alt="Sun Group" className="w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Hot Deal -20%
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-base text-slate-800 font-be">Sun Group Luxury Resorts</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Trải nghiệm nghỉ dưỡng đẳng cấp tại Premier Village Phú Quốc, Mercure Bà Nà Hills với giá độc quyền.</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded">Free check-in sớm</span>
                    <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded">Tặng vé cáp treo</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[9px] text-slate-400 block">Giá từ</span>
                  <span className="font-extrabold text-blue-700 font-be text-base">3.450.000đ /đêm</span>
                </div>
                <button onClick={() => handleSelectRoom("Sun Group Resorts (Gói Deal 20%)", 3450000)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-2.5 px-4 rounded-lg cursor-pointer">
                  Đặt Ngay
                </button>
              </div>
            </div>

            {/* Deal 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600" alt="Marriott" className="w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    B2B Corporate
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-base text-slate-800 font-be">Marriott, Sheraton & Accor Hotels</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Bảng giá Corporate dành riêng cho nhân sự công tác tại hệ thống khách sạn trung tâm các thành phố lớn.</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded">Giảm trực tiếp 15%</span>
                    <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded">Hóa đơn GTGT nhanh</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[9px] text-slate-400 block">Giá từ</span>
                  <span className="font-extrabold text-blue-700 font-be text-base">1.850.000đ /đêm</span>
                </div>
                <button onClick={() => handleSelectRoom("Marriott/Accor (Gói B2B Corporate)", 1850000)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-2.5 px-4 rounded-lg cursor-pointer">
                  Đặt Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Partners Badges */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-8">
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest block">Đối Tác Khách Sạn & Chuỗi Nghỉ Dưỡng Liên Kết</span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            <span className="text-slate-500 font-extrabold tracking-wider border border-slate-200 px-4 py-2 rounded-xl bg-slate-50 uppercase text-xs">Vinpearl</span>
            <span className="text-slate-500 font-extrabold tracking-wider border border-slate-200 px-4 py-2 rounded-xl bg-slate-50 uppercase text-xs">Sun Group</span>
            <span className="text-slate-500 font-extrabold tracking-wider border border-slate-200 px-4 py-2 rounded-xl bg-slate-50 uppercase text-xs">Marriott</span>
            <span className="text-slate-500 font-extrabold tracking-wider border border-slate-200 px-4 py-2 rounded-xl bg-slate-50 uppercase text-xs">Sheraton</span>
            <span className="text-slate-500 font-extrabold tracking-wider border border-slate-200 px-4 py-2 rounded-xl bg-slate-50 uppercase text-xs">Accor Group</span>
            <span className="text-slate-500 font-extrabold tracking-wider border border-slate-200 px-4 py-2 rounded-xl bg-slate-50 uppercase text-xs">IHG Hotels</span>
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-24 bg-slate-50 border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Câu Hỏi Thường Gặp</span>
            <h2 className="text-3xl font-bold text-slate-900 font-be">Giải Đáp Thắc Mắc Đặt Phòng</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm p-6 space-y-2">
              <h4 className="font-bold text-sm text-slate-800 font-be">Mức giá phòng đặt qua ABTRIP đã bao gồm ăn sáng và thuế phí chưa?</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Thông thường các gói phòng của ABTRIP cung cấp đều đã bao gồm buffet sáng hàng ngày cho số lượng khách tiêu chuẩn của phòng, thuế giá trị gia tăng (VAT) và phí phục vụ. Các trường hợp gói phòng không bao gồm ăn sáng (RO - Room Only) hoặc có phụ thu sẽ được booker thông báo chi tiết khi báo giá.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm p-6 space-y-2">
              <h4 className="font-bold text-sm text-slate-800 font-be">Làm thế nào để doanh nghiệp của tôi nhận được chính sách giá Corporate?</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Quý doanh nghiệp chỉ cần liên hệ với bộ phận chăm sóc khách hàng của ABTRIP để ký kết Biên bản ghi nhớ hợp tác (MOU). Sau khi hoàn tất ký kết, doanh nghiệp của bạn sẽ được áp dụng bảng giá Corporate ưu đãi chiết khấu trực tiếp lên đến 15% cho tất cả các giao dịch đặt phòng khách sạn.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm p-6 space-y-2">
              <h4 className="font-bold text-sm text-slate-800 font-be">Chính sách hoàn hủy phòng đặt qua ABTRIP được áp dụng như thế nào?</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Chính sách hoàn hủy phòng sẽ tuân thủ nghiêm ngặt theo quy định riêng của từng khách sạn và tùy thuộc vào hạng phòng/gói khuyến mãi quý khách lựa chọn. Các gói phòng giá khuyến mãi đặc biệt thường không được hoàn hủy. Booker của chúng tôi luôn cung cấp rõ ràng chính sách hoàn hủy của phòng trước khi tiến hành thanh toán.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Booking Form */}
      <section id="lien-he-dat-phong" className="scroll-mt-24">
        <ContactForm 
          serviceName={selectedHotelBooking ? `Khách sạn: ${selectedHotelBooking}` : "Đặt Phòng Khách Sạn Toàn Cầu"} 
          initialNote={initialNote} 
        />
      </section>

      {/* Zalo button */}
      <ZaloFloatingButton phone={phone} />
    </>
  );
}
