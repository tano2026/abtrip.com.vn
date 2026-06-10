"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, Users, Map, Check, Heart, Shield, Star, Globe, 
  HelpCircle, ChevronDown, CheckCircle2, Award, Calendar, Info, 
  Copy, ArrowRight, AlertTriangle, ShieldAlert, Sparkles, CheckCircle
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

export default function TourServicePage() {
  const phone = "0915849016";
  const zaloUrl = `https://zalo.me/${phone}`;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Configurator states
  const [selectedDest, setSelectedDest] = useState("phu-quoc");
  const [selectedGroup, setSelectedGroup] = useState("family");
  const [selectedStandard, setSelectedStandard] = useState("luxury");
  const [selectedDuration, setSelectedDuration] = useState("4d3n");
  const [copied, setCopied] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const destinations = [
    { id: "phu-quoc", label: "Phú Quốc" },
    { id: "tay-bac", label: "Đông Tây Bắc" },
    { id: "mientrung", label: "Miền Trung" },
    { id: "nhat-han", label: "Nhật - Hàn" },
    { id: "europe-us", label: "Châu Âu / Mỹ" }
  ];

  const groupSizes = [
    { id: "family", label: "Gia đình (<10 người)" },
    { id: "small-group", label: "Đoàn vừa (10-30 người)" },
    { id: "big-group", label: "Đoàn lớn (>30 người)" }
  ];

  const standards = [
    { id: "budget", label: "Tiết kiệm (3★)" },
    { id: "premium", label: "Cao cấp (4★)" },
    { id: "luxury", label: "Sang trọng (5★)" }
  ];

  const durations = [
    { id: "2d1n", label: "2N1Đ" },
    { id: "3d2n", label: "3N2Đ" },
    { id: "4d3n", label: "4N3Đ" },
    { id: "5d4n", label: "5N4Đ" },
    { id: "longer", label: "Trên 5 ngày" }
  ];

  const getConfigSummary = () => {
    const destObj = destinations.find(d => d.id === selectedDest);
    const groupObj = groupSizes.find(g => g.id === selectedGroup);
    const stdObj = standards.find(s => s.id === selectedStandard);
    const durObj = durations.find(du => du.id === selectedDuration);

    return `Tôi muốn thiết kế tour đi ${destObj?.label || selectedDest}, số lượng: ${groupObj?.label || selectedGroup}, tiêu chuẩn: ${stdObj?.label || selectedStandard}, thời gian: ${durObj?.label || selectedDuration}. Nhờ ABTRIP tư vấn chương trình & báo giá giúp!`;
  };

  const handleCopyAndGoToZalo = () => {
    const text = getConfigSummary();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.open(zaloUrl, "_blank");
    }, 1500);
  };

  const tourCategories = [
    {
      title: "Incentive Tours (Du Lịch Khen Thưởng)",
      description: "Chương trình tour được thiết kế chuyên biệt cho các cơ quan, doanh nghiệp nhằm kết hợp nghỉ dưỡng, khen thưởng nhân viên xuất sắc và xây dựng văn hóa đội ngũ.",
      icon: <Users className="w-6 h-6" />,
      highlights: ["Lên ý tưởng độc đáo thể hiện bản sắc doanh nghiệp", "Kịch bản Team Building bãi biển hấp dẫn", "Tổ chức Gala Dinner trọn gói, chuyên nghiệp", "Hỗ trợ đặt phòng khách sạn, resort 5 sao toàn quốc"]
    },
    {
      title: "Tour Quốc Tế Tuyển Chọn (Luxury Travel)",
      description: "Những hành trình du lịch nước ngoài trọn gói đẳng cấp. Khám phá châu Âu cổ kính, Nhật Bản/Hàn Quốc rực rỡ sắc màu, hay thiên đường Maldives lãng mạn.",
      icon: <Globe className="w-6 h-6" />,
      highlights: ["Vé máy bay khứ hồi giờ bay đẹp, hãng lớn", "Khách sạn trung tâm tiện lợi di chuyển", "Hướng dẫn viên giàu kinh nghiệm đi suốt tuyến", "Ẩm thực bản địa kết hợp nhà hàng Việt Nam tinh tế"]
    },
    {
      title: "Du Lịch Gia Đình Thiết Kế Riêng (Free & Easy)",
      description: "Kỳ nghỉ dưỡng cá nhân hóa hoàn toàn cho gia đình bạn. Tự do lựa chọn thời gian khởi hành, địa điểm tham quan và nhịp độ chuyến đi theo ý muốn.",
      icon: <Heart className="w-6 h-6" />,
      highlights: ["Lịch trình linh hoạt, không gò bó theo đoàn đông", "Xe hơi đưa đón riêng biệt suốt hành trình", "Hỗ trợ đặt phòng villa cao cấp có hồ bơi riêng", "Cung cấp cẩm nang ăn uống, vui chơi bản địa"]
    }
  ];

  const designSteps = [
    {
      title: "Bước 1: Khảo sát nhu cầu",
      desc: "ABTRIP tiếp nhận thông tin về số lượng khách, độ tuổi trung bình, ngân sách dự kiến, sở thích ẩm thực và điểm đến mong muốn của đoàn."
    },
    {
      title: "Bước 2: Lên kịch bản & Báo giá",
      desc: "Trong vòng 24 - 48 giờ, chúng tôi gửi 2 phương án lịch trình chi tiết kèm dự toán ngân sách tối ưu để quý khách lựa chọn."
    },
    {
      title: "Bước 3: Tinh chỉnh & Ký kết",
      desc: "Điều chỉnh lịch trình, khách sạn, thực đơn ăn uống theo thói quen sinh hoạt và sức khỏe của đoàn cho đến khi hoàn hảo nhất."
    },
    {
      title: "Bước 4: Vận hành chuyên nghiệp",
      desc: "Điều hành viên theo sát lịch trình từ xa, kết hợp với hướng dẫn viên chuyên nghiệp đồng hành trực tiếp cùng đoàn trong suốt chuyến đi."
    }
  ];

  const comparisons = [
    {
      feature: "Lịch trình chuyến đi",
      mass: "Cố định, dập khuôn, đi vội vàng từ 5-7 điểm/ngày để kịp tiến độ, mệt mỏi.",
      bespoke: "Cá nhân hóa theo sức khỏe và sở thích của đoàn. Tự do thay đổi nhịp độ, nghỉ ngơi linh hoạt."
    },
    {
      feature: "Phương tiện đưa đón",
      mass: "Xe khách 45 chỗ ghép đông người, đón trả nhiều điểm gây mất nhiều thời gian.",
      bespoke: "Xe đời mới riêng biệt (Limousine, Sedona, xe du lịch riêng) đưa đón tận nhà, phục vụ 24/7."
    },
    {
      feature: "Ăn uống & Ẩm thực",
      mass: "Đặt suất ăn cố định tại các nhà hàng đại trà chuyên phục vụ đoàn đông, đồ ăn nguội lạnh.",
      bespoke: "Thực đơn tự chọn phong phú. Thưởng thức đặc sản địa phương tại nhà hàng chuẩn vị hoặc BBQ bãi biển."
    },
    {
      feature: "Hoạt động mua sắm",
      mass: "Bắt buộc dừng chân tại các điểm mua sắm thương mại để tài xế/HDV ăn chia hoa hồng.",
      bespoke: "Nói KHÔNG với điểm mua sắm cưỡng ép. Hoàn toàn tập trung vào trải nghiệm khám phá và thư giãn."
    },
    {
      feature: "Đội ngũ phục vụ",
      mass: "Một hướng dẫn viên quản lý đoàn 40-50 khách ghép, khó bao quát chu đáo.",
      bespoke: "Hướng dẫn viên tận tâm chăm sóc riêng cho đoàn. Chuyên viên theo sát lộ trình hỗ trợ tức thì."
    }
  ];

  const hotDestinations = [
    {
      title: "Phú Quốc - Kỳ Nghỉ Vàng & Gala Team Building bãi biển",
      duration: "4 Ngày 3 Đêm",
      type: "MICE & Doanh Nghiệp",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=600&auto=format&fit=crop",
      highlights: [
        "Lưu trú tại Resort 5 sao Novotel / Pullman đẳng cấp",
        "Kịch bản Team bãi biển gắn kết đội ngũ cực mạnh",
        "Đêm Gala Dinner sang trọng, âm thanh ánh sáng hiện đại",
        "Thưởng thức hải sản Hàm Ninh và ẩm thực chợ đêm đặc sắc"
      ],
      price: "3.490.000 ₫",
      rating: "4.9",
      reviewsCount: "142 đánh giá",
      priceHint: "Thích hợp đoàn từ 20 khách"
    },
    {
      title: "Đông Tây Bắc - Bản Hùng Ca Mây Ngàn & Mùa Lúa Chín",
      duration: "3 Ngày 2 Đêm",
      type: "Trải Nghiệm Khám Phá",
      image: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?q=80&w=600&auto=format&fit=crop",
      highlights: [
        "Hành trình săn mây Tà Xùa, ngắm ruộng bậc thang Mù Cang Chải",
        "Trải nghiệm bản sắc văn hóa độc đáo của đồng bào Thái, H'Mông",
        "Khách sạn trung tâm Sapa / Homestay view ruộng lúa cực đẹp",
        "Thực đơn đặc sản lẩu cá hồi, gà đồi, nướng ngói Tây Bắc"
      ],
      price: "2.390.000 ₫",
      rating: "4.8",
      reviewsCount: "96 đánh giá",
      priceHint: "Xe riêng đưa đón toàn tuyến từ Hà Nội"
    },
    {
      title: "Hành Trình Di Sản Miền Trung - Đà Nẵng - Hội An - Huế",
      duration: "4 Ngày 3 Đêm",
      type: "Gia Đình & Đoàn Đông",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
      highlights: [
        "Vui chơi trọn gói tại Bà Nà Hills và check-in cầu Vàng",
        "Thả đèn hoa đăng lung linh tại phố cổ Hội An cổ kính về đêm",
        "Tham quan Đại Nội Huế, nghe ca Huế trên sông Hương",
        "Thực đơn buffet 50 món Việt kết hợp ẩm thực Cung đình"
      ],
      price: "3.890.000 ₫",
      rating: "4.9",
      reviewsCount: "118 đánh giá",
      priceHint: "Lịch trình thư thả cho người già & trẻ nhỏ"
    },
    {
      title: "Nhật Bản / Hàn Quốc Mùa Lá Đỏ - Hoa Anh Đào",
      duration: "5 Ngày 4 Đêm",
      type: "Nước Ngoài Luxury",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
      highlights: [
        "Khách sạn 4-5 sao trung tâm Tokyo / Seoul thuận tiện",
        "Hỗ trợ trọn gói thủ tục hồ sơ Visa tỷ lệ đậu cao",
        "Bay hãng hàng không quốc gia Vietnam Airlines / Asiana giờ đẹp",
        "Khám phá ẩm thực thịt nướng Hàn Quốc / Sushi Sashimi Nhật Bản"
      ],
      price: "24.900.000 ₫",
      rating: "4.9",
      reviewsCount: "85 đánh giá",
      priceHint: "Gồm bảo hiểm du lịch quốc tế VIP"
    }
  ];

  const testimonials = [
    {
      name: "Chị Minh Thư",
      role: "Trưởng phòng Nhân sự - FPT Software",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      text: "ABTRIP đã đồng hành cùng chúng tôi trong chuyến đi Phú Quốc 200 khách. Kịch bản Team Building vô cùng sáng tạo, đêm Gala Dinner diễn ra trọn vẹn và không hề có chi phí phát sinh ngoài hợp đồng. Cực kỳ hài lòng!",
      stars: 5
    },
    {
      name: "Anh Tuấn Anh",
      role: "Giám đốc vận hành - HPG Group",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
      text: "Chúng tôi đã chọn dòng tour VIP đi Đông Tây Bắc cho ban điều hành. Xe Sedona đời mới lái êm, hướng dẫn viên am hiểu lịch sử sâu sắc và xử lý các tình huống thay đổi lịch trình do thời tiết rất linh hoạt.",
      stars: 5
    },
    {
      name: "Gia đình chị Khánh Vân",
      role: "Khách hàng cá nhân - Hà Nội",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      text: "Kỳ nghỉ Free & Easy tại Nha Trang cực kỳ thoải mái. Lịch trình được thiết kế thong thả, các bữa ăn hải sản tươi ngon, rất phù hợp với nhà có cả em bé nhỏ và ông bà lớn tuổi.",
      stars: 5
    }
  ];

  const planningTips = [
    {
      title: "Bí quyết tối ưu hóa ngân sách đoàn đông",
      desc: "Để tối ưu từ 15% - 25% chi phí, doanh nghiệp nên lên kế hoạch trước từ 3 - 6 tháng nhằm giữ được quỹ vé máy bay giờ đẹp giá tốt và phòng resort 5 sao tốt nhất. Tránh đặt sát ngày đi hoặc vào các dịp cao điểm lễ Tết nếu ngân sách có hạn."
    },
    {
      title: "Lựa chọn điểm đến Team Building bãi biển theo mùa",
      desc: "Từ tháng 3 - tháng 8 là thời điểm lý tưởng cho các bãi biển miền Trung và miền Bắc (Đà Nẵng, Nha Trang, Sầm Sơn, Hạ Long). Từ tháng 11 - tháng 2 năm sau, Phú Quốc và Côn Đảo là sự lựa chọn hoàn hảo nhất với sóng êm và biển xanh."
    },
    {
      title: "Lưu ý thiết thực về thực đơn ăn uống của đoàn đông",
      desc: "Khi lên thực đơn, ban tổ chức cần khảo sát trước danh sách những thành viên ăn chay, dị ứng hải sản hoặc trẻ em để yêu cầu nhà hàng chuẩn bị các phần ăn riêng biệt, đảm bảo sức khỏe và trải nghiệm ẩm thực trọn vẹn cho cả đoàn."
    }
  ];

  const tourFaqs = [
    {
      q: "Chi phí đặt cọc và chính sách hoàn hủy tour đoàn doanh nghiệp như thế nào?",
      a: "Thông thường, sau khi ký hợp đồng, quý doanh nghiệp sẽ đặt cọc từ 30% - 50% chi phí để ABTRIP tiến hành giữ chỗ vé máy bay và đặt cọc dịch vụ khách sạn/nhà hàng. Phần còn lại sẽ thanh toán trước khi khởi hành từ 7 - 10 ngày. Chính sách hoàn hủy sẽ được thỏa thuận rõ ràng trong hợp đồng dựa trên quy định hủy dịch vụ của hãng hàng không và khách sạn đối tác."
    },
    {
      q: "Đoàn của chúng tôi có người lớn tuổi và trẻ em, lịch trình có quá dày không?",
      a: "Tất cả các tour thiết kế riêng của ABTRIP đều được cân chỉnh tốc độ phù hợp. Chúng tôi sẽ hạn chế tối đa các chặng di chuyển đường bộ quá dài, ưu tiên các điểm tham quan nhẹ nhàng, bố trí thời gian nghỉ trưa dài hơn và chuẩn bị thực đơn phù hợp cho cả trẻ nhỏ và người cao tuổi."
    },
    {
      q: "Hướng dẫn viên (HDV) đi theo đoàn có năng lực như thế nào?",
      a: "Đội ngũ HDV của ABTRIP đều là những nhân sự có thẻ hành nghề quốc tế/nội địa hợp pháp, giàu kinh nghiệm thực tế, am hiểu sâu sắc lịch sử văn hóa bản địa, nhiệt tình, có kỹ năng sơ cứu y tế cơ bản và xử lý tình huống phát sinh chuyên nghiệp."
    },
    {
      q: "Thực đơn ăn uống trong tour bao gồm những gì? Chúng tôi tự chọn được không?",
      a: "Thực đơn sẽ được thiết kế kết hợp giữa các món ăn đặc sản địa phương nổi tiếng và các bữa ăn tiêu chuẩn hợp khẩu vị người Việt. Quý khách hoàn toàn có thể tự chọn thực đơn hoặc yêu cầu nâng cấp bữa ăn lên buffet, tiệc BBQ bãi biển theo nhu cầu của đoàn."
    },
    {
      q: "Nếu gặp thời tiết xấu hoặc thiên tai đột xuất, tour sẽ được xử lý thế nào?",
      a: "ABTRIP luôn xây dựng phương án dự phòng (Plan B) cho mọi lịch trình. Trong trường hợp thời tiết xấu (bão, lũ lụt, cấm tàu bay/tàu thủy), chúng tôi sẽ chủ động làm việc với hãng bay và khách sạn để bảo lưu hoặc hoãn hủy dịch vụ giảm thiểu thiệt hại tài chính tối đa cho khách hàng, đồng thời chuyển hướng sang các điểm tham quan thay thế trong nhà an toàn."
    },
    {
      q: "ABTRIP có hỗ trợ doanh nghiệp làm các thủ tục xuất hóa đơn tài chính và chứng từ thuế không?",
      a: "Có. Chúng tôi cung cấp đầy đủ hóa đơn giá trị gia tăng (VAT) hợp pháp cho các dịch vụ lữ hành, vận chuyển, ăn uống và hội họp. Đồng thời hỗ trợ soạn thảo hợp đồng, biên bản thanh lý và các chứng từ quyết toán tài chính rõ ràng theo quy chuẩn kế toán của doanh nghiệp."
    },
    {
      q: "Đối với tour nước ngoài, ABTRIP có hỗ trợ làm Visa không?",
      a: "Có. ABTRIP hỗ trợ xử lý trọn gói Visa cho khách đặt tour nước ngoài. Đội ngũ chuyên viên của chúng tôi sẽ hướng dẫn chuẩn bị hồ sơ, dịch thuật công chứng, tối ưu hóa các điểm yếu trong hồ sơ tài chính/công việc và nộp hồ sơ xin visa để đảm bảo kết quả tốt nhất."
    },
    {
      q: "Chi phí tour trọn gói đã bao gồm những gì và có phát sinh thêm gì ngoài hợp đồng không?",
      a: "Chi phí báo giá trọn gói thông thường đã bao gồm: vé máy bay, xe đưa đón theo chương trình, phòng khách sạn/resort, các bữa ăn chính, vé vào cổng tham quan, hướng dẫn viên, bảo hiểm du lịch và nước uống đóng chai hàng ngày. Chúng tôi minh bạch mọi chi phí và không phát sinh bất kỳ khoản ẩn nào ngoài các dịch vụ quý khách chủ động yêu cầu nâng cấp thêm."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-100/90 to-[var(--background)]"></div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-emerald-50/80 border border-emerald-200 rounded-full px-4 py-2 backdrop-blur-sm shadow-sm"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Lữ Hành Thiết Kế Độc Bản</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight [text-wrap:balance]"
          >
            Tour Du Lịch Thiết Kế Riêng
            <span className="block text-gradient-gold mt-1">Hành Trình Trải Nghiệm Đỉnh Cao</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Chúng tôi không bán các tour đại trà dập khuôn. ABTRIP kiến tạo những lịch trình cá nhân hóa hoàn toàn cho cơ quan, doanh nghiệp và gia đình bạn, tối ưu chi phí dựa trên hệ thống đối tác khách sạn 5 sao rộng khắp.
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
              Tư Vấn Thiết Kế Tour Zalo: {phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="bg-amber-500/10 border-y border-amber-500/20 py-3.5 relative z-10">
        <div className="container mx-auto px-4 text-center flex items-center justify-center gap-2 flex-wrap text-slate-800 text-xs font-semibold">
          <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">Khuyến Mãi Hè</span>
          <span>
            Ưu đãi ngay <strong className="text-amber-600 font-bold">10% gói Team Building & Gala Dinner</strong> cho doanh nghiệp đặt lịch trình trước 60 ngày!
          </span>
          <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#0068ff] hover:underline flex items-center gap-0.5 ml-1">
            Nhận ưu đãi qua Zalo <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Các Giải Pháp Lữ Hành Cho Mọi Nhu Cầu</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tourCategories.map((tour, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 bg-slate-50 border border-slate-200 hover:border-[var(--accent)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    {tour.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{tour.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{tour.description}</p>
                </div>
                
                <div className="border-t border-slate-200/80 pt-6 space-y-2.5">
                  {tour.highlights.map((feat, fidx) => (
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

      {/* Interactive Tour Planner (Tự thiết kế tour sơ bộ) */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">Tính năng độc quyền</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Tự Lập Lịch Trình Sơ Bộ</h2>
            <p className="text-slate-600 text-sm mt-2">Chọn nhanh các thông số để phác thảo ý tưởng tour mong muốn của đoàn</p>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 md:p-8 space-y-6">
            
            {/* 1. Điểm đến */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Map className="w-4 h-4 text-[var(--accent)]" /> 1. Bạn muốn đi đâu?
              </label>
              <div className="flex flex-wrap gap-2">
                {destinations.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDest(d.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedDest === d.id 
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/10" 
                        : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Quy mô đoàn */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[var(--accent)]" /> 2. Số lượng thành viên dự kiến?
              </label>
              <div className="flex flex-wrap gap-2">
                {groupSizes.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGroup(g.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedGroup === g.id 
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md" 
                        : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tiêu chuẩn khách sạn */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[var(--accent)]" /> 3. Tiêu chuẩn dịch vụ mong muốn?
              </label>
              <div className="flex flex-wrap gap-2">
                {standards.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStandard(s.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedStandard === s.id 
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md" 
                        : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Thời gian */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[var(--accent)]" /> 4. Thời gian hành trình dự kiến?
              </label>
              <div className="flex flex-wrap gap-2">
                {durations.map(du => (
                  <button
                    key={du.id}
                    onClick={() => setSelectedDuration(du.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedDuration === du.id 
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-md" 
                        : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                    }`}
                  >
                    {du.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tóm tắt lựa chọn & CTA */}
            <div className="border-t border-slate-200 pt-6 mt-6 bg-slate-50 p-5 rounded-xl border border-dashed border-slate-300/80">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Tóm tắt cấu hình tour của bạn:
              </h4>
              <p className="text-xs text-slate-650 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200">
                "{getConfigSummary()}"
              </p>

              <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyAndGoToZalo}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0068ff] hover:bg-[#0057d4] text-white font-bold text-xs md:text-sm py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/10 cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.8 2 10.5c0 2.8 1.5 5.3 3.9 6.8l-1 3.5c-.1.4.3.7.7.5l4.1-1.8c.8.2 1.6.3 2.3.3 5.5 0 10-3.8 10-8.5S17.52 2 12 2zm-1.8 12.3H8.3v-4.8h1.9v4.8zm3.2 0h-2v-3h2v3zm2.5-2.2h-1.2v2.2h1.2v-2.2z" />
                  </svg>
                  Gửi Cấu Hình Nhận Báo Giá Zalo
                </button>
                <div className="text-[10px] text-slate-500 flex items-center gap-1 text-center sm:text-left">
                  <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" /> Hệ thống sẽ sao chép tóm tắt và mở Zalo, bạn chỉ cần dán (Paste) để gửi đi.
                </div>
              </div>

              {/* Success Alert Toast */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-2 bg-green-500/10 border border-green-500/20 text-green-700 text-xs rounded-lg flex items-center gap-1.5 justify-center font-medium"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0 text-green-600" />
                    Đã sao chép yêu cầu! Đang chuyển hướng Zalo...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section (Bespoke vs Mass) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">Sự khác biệt làm nên đẳng cấp</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Tour Thiết Kế Riêng vs Tour Đại Trà</h2>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-lg">
            <table className="w-full text-left border-collapse bg-white min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-700 uppercase tracking-wider w-1/4">Đặc điểm dịch vụ</th>
                  <th className="p-4 text-xs font-bold text-red-600 uppercase tracking-wider w-3/8 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-500" /> Tour đại trà thông thường
                  </th>
                  <th className="p-4 text-xs font-bold text-emerald-600 uppercase tracking-wider w-3/8">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" /> Tour thiết kế riêng ABTRIP
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-xs md:text-sm">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/55 transition-colors">
                    <td className="p-4 font-bold text-slate-800 border-r border-slate-200">{row.feature}</td>
                    <td className="p-4 text-slate-500 border-r border-slate-200 pl-6 relative">
                      <span className="absolute left-1.5 top-[18px] text-red-500 font-bold">✕</span>
                      {row.mass}
                    </td>
                    <td className="p-4 text-slate-800 font-medium pl-6 relative bg-emerald-500/[0.02]">
                      <span className="absolute left-1.5 top-[18px] text-green-600 font-bold">✓</span>
                      {row.bespoke}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Featured Hot Destinations */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">Gợi ý hành trình hot</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Các Tuyến Điểm Đặc Sắc & Lịch Trình Mẫu</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hotDestinations.map((dest, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Dest Image */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img 
                      src={dest.image} 
                      alt={dest.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {dest.type}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-lg">
                      {dest.duration}
                    </div>
                  </div>

                  {/* Dest Details */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {dest.title}
                    </h3>
                    
                    {/* Stars Rating & Price Display */}
                    <div className="flex items-center justify-between border-y border-slate-100 py-2.5">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{dest.rating}</span>
                        <span className="text-slate-400 font-normal">({dest.reviewsCount})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-normal leading-none">Giá chỉ từ</span>
                        <span className="text-base font-extrabold text-amber-600 leading-none">{dest.price}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2.5 pt-2">
                      {dest.highlights.map((h, hidx) => (
                        <div key={hidx} className="flex items-start text-xs text-slate-655">
                          <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
                  <span className="text-[10px] text-slate-500 font-medium italic">
                    {dest.priceHint}
                  </span>
                  <a 
                    href={`https://zalo.me/${phone}?text=Tư vấn giúp tôi tour ${dest.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white border border-slate-200 hover:border-[#0068ff] hover:text-[#0068ff] text-slate-700 font-bold text-xs rounded-lg px-4 py-2.5 transition-colors gap-1.5"
                  >
                    Nhận Báo Giá Zalo <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Grid */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">Đánh giá từ khách hàng</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Những Lữ Khách Nói Về Chúng Tôi</h2>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-800 text-xs truncate">{t.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Design Process */}
      <section className="py-20 relative z-10 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quy Trình Thiết Kế Lịch Trình Độc Bản</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {designSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 font-bold flex items-center justify-center border border-emerald-500/20 text-sm">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Handbook for Corporates */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cẩm Nang Lập Kế Hoạch Cho Doanh Nghiệp</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {planningTips.map((tip, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-[var(--accent)] transition-colors">
                <div>
                  <h4 className="font-bold text-slate-850 text-sm flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--accent)] shrink-0" /> {tip.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light mt-3">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABTRIP Advantages */}
      <section className="py-20 relative z-10 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Đặc Quyền Dành Riêng Cho Khách Hàng</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-green-600">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Đối Tác Khách Sạn VIP</h4>
              <p className="text-xs text-slate-655 leading-relaxed">Hợp tác trực tiếp với các hệ thống khách sạn, resort 5 sao lớn nhất Việt Nam mang lại mức chiết khấu phòng tốt nhất.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[var(--accent)]">
                <Map className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Cá Nhân Hóa Tối Đa</h4>
              <p className="text-xs text-slate-655 leading-relaxed">Hành trình linh hoạt, tinh chỉnh theo yêu cầu ẩm thực, văn hóa và sức khỏe của từng thành viên trong đoàn.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto text-purple-600">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-850 text-lg">Bảo Hiểm Du Lịch Hạn Mức Cao</h4>
              <p className="text-xs text-slate-655 leading-relaxed">Mỗi khách hàng được trang bị gói bảo hiểm du lịch quốc tế/nội địa toàn diện từ các đơn vị uy tín.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-855">Hỏi Đáp Thường Gặp Về Tour & Lữ Hành</h3>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-2"></div>
          </div>
          <div className="space-y-4">
            {tourFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
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
          <h2 className="text-3xl md:text-4xl font-extrabold">Bạn Đang Tìm Kiếm Ý Tưởng Lịch Trình Cho Kỳ Nghỉ?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base font-light">
            Nhận ngay kịch bản tour phác thảo chi tiết cùng báo giá sơ bộ qua Zalo chỉ sau 30 phút.
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
              Chat Zalo Du Lịch: {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm serviceName="Tour Du Lịch Cao Cấp" />

      {/* Zalo Floating Button */}
      <ZaloFloatingButton phone={phone} />
    </>
  );
}
