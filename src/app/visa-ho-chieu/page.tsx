"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileSearch, Zap, Shield, Check, Landmark, Clock, FileCheck, 
  HelpCircle, ChevronDown, CheckCircle2, FileText, 
  Info, AlertCircle, Sparkles, BookOpen, AlertTriangle
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

export default function VisaPassportPage() {
  const phone = "0915849016";
  const zaloUrl = `https://zalo.me/${phone}`;
  const [subTab, setSubTab] = useState<"visa" | "passport">("visa");

  // FAQs State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const visaServices = [
    {
      country: "Visa Mỹ (Hoa Kỳ) - Diện B1/B2",
      time: "Theo lịch hẹn trống của Lãnh sự quán",
      requirements: "Hộ chiếu còn hạn trên 6 tháng, tờ khai DS-160 trực tuyến, lịch trình chi tiết, chứng minh tài chính, công việc.",
      highlight: "Tư vấn cấu trúc hồ sơ chuẩn, luyện phỏng vấn 1-1 sát thực tế, khắc phục điểm yếu của hộ chiếu trắng hoặc đã từng bị từ chối."
    },
    {
      country: "Visa Khối Schengen (Châu Âu)",
      time: "15 - 25 ngày làm việc",
      requirements: "Hộ chiếu, bảo hiểm du lịch quốc tế tối thiểu 30.000 EUR, xác nhận đặt vé máy bay khứ hồi, booking khách sạn, sao kê tài khoản 3 tháng.",
      highlight: "Tối ưu hóa hành trình di chuyển qua các quốc gia Schengen, đặt lịch hẹn nhanh qua TLSContact / VFSGlobal."
    },
    {
      country: "Visa Úc (Subclass 600) trực tuyến",
      time: "10 - 25 ngày làm việc",
      requirements: "Scan màu bản gốc CCCD, hộ chiếu tất cả các trang, sổ hộ khẩu, HĐLĐ, sao kê lương, sổ tiết kiệm, giấy tờ nhà đất (nếu có).",
      highlight: "Nộp hồ sơ điện tử đồng bộ qua cổng ImmiAccount của Bộ Di trú Úc, hướng dẫn lấy sinh trắc học (biometrics) đúng hẹn."
    },
    {
      country: "Visa Nhật Bản & Hàn Quốc",
      time: "8 - 12 ngày làm việc",
      requirements: "Hộ chiếu gốc, tờ khai dán ảnh 4.5x4.5 (Nhật) hoặc 3.5x4.5 (Hàn), HĐLĐ, đơn xin nghỉ phép, sổ tiết kiệm tối thiểu 100-200 triệu đồng.",
      highlight: "Đại diện nộp hồ sơ nhanh chóng qua các trung tâm ủy thác được chỉ định (JVAC / KVAC), giảm thiểu tối đa việc lên trình diện."
    },
    {
      country: "Visa Canada du lịch & thăm thân",
      time: "20 - 45 ngày làm việc",
      requirements: "Scan toàn bộ hồ sơ cá nhân, tài chính, công việc, tài sản. Hồ sơ nộp trực tuyến và lấy sinh trắc học tại VFS Global.",
      highlight: "Tối ưu thư giải trình (Cover Letter) làm rõ mục đích chuyến đi và cam kết ràng buộc quay trở về Việt Nam."
    },
    {
      country: "Công Văn Nhập Cảnh Việt Nam",
      time: "1 - 3 ngày làm việc (Khẩn cấp 2-4 tiếng)",
      requirements: "Hộ chiếu người nước ngoài còn hạn trên 6 tháng, chi tiết chuyến bay nhập cảnh, bảo lãnh của doanh nghiệp tại Việt Nam.",
      highlight: "Hỗ trợ duyệt duyệt hồ sơ diện du lịch (DL), thương mại (DN), lao động (LĐ). Nhận kết quả nhanh, hỗ trợ dán tem visa tại sân bay."
    }
  ];

  const passportSteps = [
    {
      title: "Bước 1: Chuẩn bị hồ sơ số",
      desc: "Chụp ảnh chân dung 4x6 chuẩn phông trắng (không đeo kính, lộ tai, trán, mặc áo tối màu), chụp rõ nét 2 mặt CCCD và chuẩn bị sẵn thiết bị di động đăng ký chính chủ."
    },
    {
      title: "Bước 2: Truy cập Cổng dịch vụ công",
      desc: "Đăng nhập tài khoản định danh điện tử VNeID cấp độ 2 trên Cổng dịch vụ công Bộ Công an (dichvucong.bocongan.gov.vn), tìm kiếm thủ tục Cấp hộ chiếu phổ thông."
    },
    {
      title: "Bước 3: Khai tờ khai trực tuyến",
      desc: "Điền đầy đủ thông tin nhân thân, tải ảnh chân dung và mặt trước/sau CCCD lên hệ thống. Chọn cơ quan tiếp nhận hồ sơ và phương thức nhận hộ chiếu."
    },
    {
      title: "Bước 4: Đóng lệ phí & Nhận hộ chiếu",
      desc: "Sau khi hồ sơ được phê duyệt, đóng lệ phí trực tuyến qua tài khoản ngân hàng hoặc ví điện tử. Hộ chiếu sẽ được bưu điện giao tận nhà sau 8-10 ngày làm việc."
    }
  ];

  const visaFaqs = [
    {
      q: "Hộ chiếu trắng (chưa từng đi nước ngoài) có xin được visa Schengen/Mỹ không?",
      a: "Hồ chiếu trắng vẫn có thể được cấp visa nếu bạn chứng minh được sự ràng buộc mạnh mẽ tại Việt Nam như: Công việc ổn định lâu năm thu nhập cao, sở hữu tài sản giá trị lớn (nhà đất, ô tô), gia đình ổn định. Chúng tôi khuyên bạn nên đi du lịch trước một số nước Đông Nam Á hoặc Đông Á (Thái Lan, Singapore, Hàn Quốc, Nhật Bản) để tích lũy lịch sử du lịch đẹp trước khi nộp hồ sơ Mỹ hay Châu Âu."
    },
    {
      q: "Tôi làm tự do (Freelancer), không có hợp đồng lao động thì chứng minh công việc thế nào?",
      a: "Đối với Freelancer, bạn có thể chứng minh nguồn thu nhập bằng cách cung cấp: Hợp đồng cộng tác, sao kê tài khoản ngân hàng thể hiện dòng tiền thu nhập hàng tháng từ đối tác, email trao đổi công việc, bảng kê khai sản phẩm/dự án đã hoàn thành, hoặc thuế thu nhập cá nhân tự nguyện (nếu có). Cố vấn của chúng tôi sẽ hỗ trợ thiết lập hồ sơ giải trình chi tiết về công việc tự do của bạn."
    },
    {
      q: "Đã từng bị từ chối Visa một lần thì bao lâu mới được nộp lại?",
      a: "Không có quy định cấm nộp lại ngay. Tuy nhiên, nếu bạn nộp lại quá nhanh mà không có sự cải thiện nào trong hồ sơ, tỷ lệ bị từ chối tiếp sẽ rất cao. Bạn chỉ nên nộp lại khi đã tìm ra nguyên nhân bị từ chối (dựa trên thư từ chối hoặc biên bản phỏng vấn) và đã bổ sung thêm tài liệu thuyết phục để giải quyết triệt để điểm yếu đó."
    },
    {
      q: "Bảo hiểm du lịch quốc tế đi châu Âu (Schengen) cần hạn mức bồi thường bao nhiêu?",
      a: "Theo quy định bắt buộc của khối Schengen, bảo hiểm du lịch phải có hiệu lực cho toàn bộ thời gian lưu trú và trên toàn lãnh thổ Schengen, với hạn mức bồi thường tối thiểu cho các chi phí y tế và hồi hương là 30.000 EUR (khoảng 800 triệu VNĐ). Chúng tôi hỗ trợ đăng ký bảo hiểm chuẩn quốc tế từ các đơn vị uy tín để đính kèm hồ sơ."
    },
    {
      q: "Người nước ngoài nhập cảnh Việt Nam bằng E-visa cần lưu ý những gì?",
      a: "E-visa Việt Nam hiện áp dụng cho công dân tất cả các nước với thời hạn tạm trú lên đến 90 ngày (một lần hoặc nhiều lần nhập cảnh). Khi khai trực tuyến, bắt buộc phải điền chính xác họ tên theo định dạng ICAO trên hộ chiếu, số hộ chiếu và ngày khởi hành dự kiến. Mọi sai sót thông tin dù là nhỏ nhất đều có thể bị từ chối xuất nhập cảnh tại sân bay."
    },
    {
      q: "Visa thăm thân đi Úc/Mỹ cần chuẩn bị thư mời như thế nào?",
      a: "Thư mời cần ghi rõ thông tin người mời tại nước bản xứ (họ tên, địa chỉ, số điện thoại, tình trạng cư trú) và người được mời, mối quan hệ thân nhân, thời gian lưu trú cụ thể, ai là người chi trả chi phí chuyến đi. Đi kèm thư mời cần có bản sao hộ chiếu/thẻ xanh của người mời và bằng chứng về mối quan hệ (giấy khai sinh, ảnh chụp chung, lịch sử tin nhắn)."
    }
  ];

  const passportFaqs = [
    {
      q: "Yêu cầu bắt buộc để tự làm hộ chiếu online là gì?",
      a: "Bạn cần có Căn cước công dân (CCCD) 12 số còn hạn, tài khoản định danh điện tử VNeID cấp độ 2 đã kích hoạt thành công, và một số điện thoại chính chủ đã được đăng ký bằng số CCCD đó tại nhà mạng (để hệ thống gửi mã OTP xác nhận)."
    },
    {
      q: "Tại sao hệ thống báo lỗi 'Thông tin thuê bao không trùng khớp với CCCD'?",
      a: "Lỗi này xảy ra khi thông tin đăng ký sim điện thoại của bạn tại nhà mạng (Viettel, Vina, Mobi...) chưa được cập nhật theo số CCCD mới nhất. Để khắc phục, bạn cần mang CCCD ra cửa hàng giao dịch của nhà mạng để cập nhật thông tin thuê bao chính chủ, sau đó mới tiếp tục khai báo hộ chiếu online."
    },
    {
      q: "Làm hộ chiếu cho trẻ em dưới 14 tuổi online như thế nào?",
      a: "Trẻ em dưới 14 tuổi chưa được cấp tài khoản VNeID riêng biệt. Bố hoặc mẹ (có tài khoản VNeID cấp độ 2) sẽ đứng tên khai hộ trên Cổng dịch vụ công. Cần chuẩn bị: file ảnh chân dung của trẻ, ảnh chụp Giấy khai sinh, và Tờ khai mẫu TK01a có xác nhận của Công an xã/phường nơi thường trú hoặc tạm trú."
    },
    {
      q: "Tôi có thể chụp ảnh hộ chiếu bằng điện thoại tại nhà không?",
      a: "Hoàn toàn được, nhưng ảnh chụp phải tuân thủ nghiêm ngặt quy định: phông nền trắng trơn, mắt nhìn thẳng, không cười, hở rõ trán và tai, không đeo kính, trang phục lịch sự tối màu. Tránh chụp ngược sáng hoặc bị bóng trên mặt. ABTRIP hỗ trợ xử lý và kiểm tra ảnh miễn phí để đảm bảo hệ thống phê duyệt."
    },
    {
      q: "Hộ chiếu bị mất hoặc hư hỏng thì thủ tục làm lại online thế nào?",
      a: "Khi bị mất hộ chiếu, trong vòng 48 giờ bạn cần khai báo mất hộ chiếu online qua Cổng dịch vụ công (Đơn mẫu TK02) để cơ quan chức năng hủy giá trị sử dụng của hộ chiếu cũ. Sau đó, bạn thực hiện thủ tục cấp lại hộ chiếu tương tự như cấp mới, đính kèm file Đơn khai báo mất đã được phê duyệt."
    },
    {
      q: "Thời gian nhận hộ chiếu nhanh nhất khi làm khẩn cấp là bao lâu?",
      a: "Trong các trường hợp cần xuất cảnh khẩn cấp (đi điều trị bệnh tại nước ngoài, người thân mất ở nước ngoài, đi công tác/du học gấp), chúng tôi hỗ trợ xử lý thủ tục hành chính nhanh chóng để nhận hộ chiếu chỉ trong vòng 1 - 3 ngày làm việc trực tiếp tại Cục Quản lý xuất nhập cảnh."
    }
  ];

  const weakProfileTips = [
    {
      title: "Hộ chiếu chưa từng đi du lịch nước ngoài (Passport trắng)",
      solution: "Nên xây dựng lịch sử du lịch thông qua việc đi các nước Đông Nam Á miễn visa (Singapore, Thái Lan) trước, sau đó là các nước Đông Á (Hàn Quốc, Nhật Bản, Đài Loan). Nếu nộp ngay đi Mỹ/Âu, cần bổ sung tài liệu chứng minh sở hữu tài sản cố định lớn tại Việt Nam và công việc có thu nhập đóng thuế rõ ràng."
    },
    {
      title: "Không có hợp đồng lao động / Kinh doanh tự do",
      solution: "Thay vì HĐLĐ thông thường, hãy cung cấp các sao kê tài khoản ngân hàng thể hiện dòng tiền giao dịch đều đặn hàng tháng, hợp đồng dịch vụ/cộng tác viên, giấy tờ chứng nhận nguồn thu nhập thụ động (tiền cho thuê nhà, đất, cổ tức...) và thư giải trình chi tiết về hoạt động tài chính của bản thân."
    },
    {
      title: "Hồ sơ tài chính, số dư tiết kiệm mỏng",
      solution: "Đại sứ quán không chỉ nhìn vào số dư cuối kỳ mà quan trọng là nguồn gốc của dòng tiền. Nên mở sổ tiết kiệm trước thời điểm nộp hồ sơ tối thiểu 3 tháng. Đồng thời cung cấp sao kê tài khoản nhận lương thể hiện thu nhập ổn định để chứng minh khả năng chi trả thực tế."
    }
  ];

  const portalErrorSolutions = [
    {
      issue: "Lỗi kiểm tra ảnh chân dung không đạt yêu cầu AI",
      cause: "Ảnh bị ngược sáng, chất lượng thấp, hoặc không tuân thủ quy tắc lộ tai, trán, bóng đổ.",
      solution: "Sử dụng ảnh chụp từ studio chuyên nghiệp hoặc gửi ảnh thô cho chuyên viên ABTRIP hỗ trợ xử lý tách nền, căn chỉnh tỷ lệ chuẩn AI miễn phí."
    },
    {
      issue: "Lỗi không hiển thị thông tin đóng lệ phí sau khi nộp",
      cause: "Hệ thống dịch vụ công bị quá tải hoặc hồ sơ đang trong quá trình thẩm định của cán bộ tiếp nhận.",
      solution: "Thông thường thời gian duyệt hồ sơ từ 1-3 ngày làm việc. Khi được duyệt, hệ thống sẽ gửi tin nhắn SMS chứa mã thanh toán. Không nên thanh toán qua các link lạ không chính thống."
    },
    {
      issue: "Sai thông tin nơi sinh trên hệ thống",
      cause: "Lỗi cơ sở dữ liệu dân cư chưa đồng bộ hoặc do chọn sai thông tin tỉnh thành khi khai.",
      solution: "Liên hệ công an địa phương để cập nhật thông tin dữ liệu dân cư quốc gia hoặc gửi yêu cầu đính chính đính kèm ảnh CCCD khi nộp trực tuyến."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-100/90 to-[var(--background)]"></div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-amber-50/80 border border-amber-250 rounded-full px-4 py-2 backdrop-blur-sm shadow-sm"
          >
            <Shield className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Cẩm Nang Dịch Vụ - Chuyên Nghiệp & Minh Bạch</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight [text-wrap:balance]"
          >
            Dịch Vụ Visa Quốc Tế & Hỗ Trợ Hộ Chiếu Trực Tuyến
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Cổng thông tin hướng dẫn và hỗ trợ thực hiện hồ sơ xin thị thực các nước, gia hạn visa, duyệt công văn nhập cảnh và làm hộ chiếu online. Giải quyết triệt để các hồ sơ khó, khẩn cấp.
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
              Liên Hệ Hotline Zalo: {phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="py-8 bg-white border-y border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 max-w-xl flex justify-center">
          <div className="bg-slate-100 p-1.5 rounded-full flex w-full border border-slate-200">
            <button
              onClick={() => {
                setSubTab("visa");
                setOpenFaq(null);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-full text-sm font-bold transition-all ${
                subTab === "visa" 
                  ? "bg-white text-[var(--accent)] shadow-md" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Dịch Vụ Visa & Nhập Cảnh</span>
            </button>
            <button
              onClick={() => {
                setSubTab("passport");
                setOpenFaq(null);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-full text-sm font-bold transition-all ${
                subTab === "passport" 
                  ? "bg-white text-[var(--accent)] shadow-md" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Hộ Chiếu Trực Tuyến</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {subTab === "visa" ? (
          <motion.div
            key="visa-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-16 bg-slate-50"
          >
            <div className="container mx-auto px-4 max-w-7xl space-y-16">
              
              {/* Visa Section Intro */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-[var(--accent)] border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Giải Pháp Visa Chuyên Nghiệp</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    Tư Vấn Hồ Sơ Thị Thực & Công Văn Nhập Cảnh Việt Nam
                  </h2>
                  <p className="text-slate-650 leading-relaxed text-sm md:text-base font-light">
                    Mỗi hồ sơ xin visa đi các quốc gia phát triển đều cần được tinh chỉnh để làm nổi bật các yếu tố về sự ràng buộc chặt chẽ tại Việt Nam. ABTRIP hỗ trợ xử lý dịch thuật công chứng, lên lịch trình chi tiết, đặt vé máy bay/khách sạn khớp với hồ sơ và đồng hành cùng quý khách luyện tập phỏng vấn kỹ lưỡng.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Thẩm định hồ sơ đa chiều:</strong> Đánh giá chi tiết khả năng đạt visa và đề xuất bổ sung tài liệu còn thiếu.</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Luyện phỏng vấn chuyên sâu:</strong> Hướng dẫn phong thái, cách trả lời trung thực và thuyết phục.</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Khắc phục hồ sơ yếu:</strong> Tư vấn giải trình tài chính, nghề nghiệp tự do chi tiết và thuyết phục.</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl relative p-6">
                  <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" /> Bộ Tài Liệu
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-6 border-b border-slate-100 pb-3">Hồ sơ xin Visa cơ bản gồm:</h3>
                  <ul className="space-y-4 text-xs md:text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[var(--accent)] text-xs shrink-0 mt-0.5">1</span>
                      <span><strong>Hồ sơ nhân thân:</strong> Hộ chiếu còn hạn trên 6 tháng, căn cước công dân, ảnh thẻ 3.5x4.5 phông trắng.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[var(--accent)] text-xs shrink-0 mt-0.5">2</span>
                      <span><strong>Hồ sơ công việc:</strong> Hợp đồng lao động, quyết định bổ nhiệm, bảng lương 3 tháng gần nhất hoặc Giấy đăng ký kinh doanh.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[var(--accent)] text-xs shrink-0 mt-0.5">3</span>
                      <span><strong>Hồ sơ tài chính & tài sản:</strong> Sổ tiết kiệm tối thiểu 100-200 triệu đồng (mở trước 3 tháng), giấy chứng nhận quyền sử dụng đất, đăng ký xe ô tô.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[var(--accent)] text-xs shrink-0 mt-0.5">4</span>
                      <span><strong>Chi tiết chuyến đi:</strong> Vé máy bay khứ hồi (chưa cần thanh toán), bảo hiểm du lịch quốc tế, lịch trình di chuyển chi tiết từng ngày.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Weak Profile Advisory */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-850 border-l-4 border-l-[var(--accent)] pl-3">Cẩm Nang Giải Pháp Cho Hồ Sơ Yếu</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {weakProfileTips.map((tip, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3 hover:border-amber-500 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 font-bold flex items-center justify-center border border-amber-500/20 text-xs">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-850 text-sm">{tip.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">{tip.solution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Visa Destinations Grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-850 border-l-4 border-l-[var(--accent)] pl-3">Dịch Vụ Visa Theo Thị Trường</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visaServices.map((visa, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <h4 className="font-bold text-slate-900 text-base">{visa.country}</h4>
                          <span className="text-[9px] font-bold bg-blue-50 text-[var(--accent)] border border-blue-200 px-2 py-1 rounded whitespace-nowrap flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3" /> {visa.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-4 leading-relaxed"><strong className="text-slate-800">Điều kiện:</strong> {visa.requirements}</p>
                      </div>
                      <div className="bg-amber-50/50 border border-amber-200/50 p-3 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                        <span><strong>Hỗ trợ ABTRIP:</strong> {visa.highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa FAQs Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-850 border-l-4 border-l-[var(--accent)] pl-3">Hỏi Đáp Chuyên Sâu Về Thủ Tục Visa</h3>
                <div className="space-y-4 max-w-4xl mx-auto">
                  {visaFaqs.map((faq, idx) => (
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
                            className="border-t border-slate-100 bg-slate-50/50"
                          >
                            <p className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="passport-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-16 bg-slate-50"
          >
            <div className="container mx-auto px-4 max-w-7xl space-y-16">
              
              {/* Passport Section Intro */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 text-[var(--accent)] border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Dịch Vụ Hộ Chiếu Online</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    Hướng Dẫn & Hỗ Trợ Thủ Tục Cấp Hộ Chiếu Trực Tuyến
                  </h2>
                  <p className="text-slate-650 leading-relaxed text-sm md:text-base font-light">
                    Hộ chiếu phổ thông (gắn chip hoặc không gắn chip) hiện nay được đăng ký trực tuyến thông qua Cổng dịch vụ công Bộ Công an bằng tài khoản VNeID cấp độ 2. Chúng tôi cung cấp dịch vụ hỗ trợ khai báo từ xa, xử lý ảnh thẻ chuẩn AI, đối soát thông tin dữ liệu dân cư và thanh toán lệ phí trực tuyến nhanh gọn.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Xử lý hồ sơ từ xa:</strong> Không cần xếp hàng tại Phòng Quản lý xuất nhập cảnh, hộ chiếu giao tận nhà.</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Đảm bảo chuẩn ảnh AI:</strong> Cắt ghép chỉnh sửa ảnh chân dung theo đúng quy chuẩn quét sinh trắc học của Bộ Công an.</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Rút ngắn thời gian xử lý:</strong> Hỗ trợ các trường hợp lấy hộ chiếu khẩn đi nước ngoài công tác, chữa bệnh.</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl relative p-6">
                  <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Lưu ý điều kiện
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-6 border-b border-slate-100 pb-3">Hồ sơ bắt buộc cần có:</h3>
                  <ul className="space-y-4 text-xs md:text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Căn cước công dân:</strong> CCCD gắn chip còn hạn sử dụng, thông tin trùng khớp với dữ liệu quốc gia.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Tài khoản VNeID cấp độ 2:</strong> Đã kích hoạt trên ứng dụng điện thoại để đăng nhập Cổng dịch vụ công.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span><strong>Sim điện thoại chính chủ:</strong> Đăng ký bằng số CCCD 12 số để xác thực OTP (không dùng Sim đăng ký bằng số CMND cũ).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Troubleshooting Portal Errors */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-850 border-l-4 border-l-[var(--accent)] pl-3">Lỗi Cổng Dịch Vụ Công & Cách Khắc Phục</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {portalErrorSolutions.map((err, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-red-650 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" /> {err.issue}
                        </h4>
                        <p className="text-xs text-slate-500 mt-2 font-light"><strong>Nguyên nhân:</strong> {err.cause}</p>
                      </div>
                      <div className="bg-blue-50/50 border border-blue-200/50 p-3 rounded-lg text-xs text-blue-800">
                        <strong>Khắc phục:</strong> {err.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by Step Flow */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-850">Quy Trình 4 Bước Khai Báo Hộ Chiếu</h3>
                  <div className="w-16 h-1 bg-[var(--accent)] mx-auto rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {passportSteps.map((step, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative space-y-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-[var(--accent)] font-bold flex items-center justify-center border border-blue-500/20 text-sm">
                        {idx + 1}
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passport Emergency Table */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-850 border-l-4 border-l-[var(--accent)] pl-3">Biểu Phí & Thời Gian Xử Lý Hộ Chiếu</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
                  <table className="w-full text-left text-xs md:text-sm text-slate-650 border-collapse">
                    <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-4 md:p-5">Loại hình hỗ trợ làm hộ chiếu</th>
                        <th className="p-4 md:p-5">Thời gian xử lý</th>
                        <th className="p-4 md:p-5">Hạng mục hồ sơ</th>
                        <th className="p-4 md:p-5">Cách thức nhận</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 md:p-5 font-semibold text-slate-800">Cấp mới / Cấp đổi thông thường (Hộ chiếu có/không gắn chip)</td>
                        <td className="p-4 md:p-5">8 - 10 ngày làm việc</td>
                        <td className="p-4 md:p-5">Hộ chiếu phổ thông mới</td>
                        <td className="p-4 md:p-5">Bưu điện gửi chuyển phát về tận nhà</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 md:p-5 font-semibold text-slate-800">Cấp lại do bị mất hộ chiếu, hộ chiếu bị rách/hỏng</td>
                        <td className="p-4 md:p-5">3 - 5 ngày làm việc</td>
                        <td className="p-4 md:p-5">Đơn TK02 khai báo mất + hồ sơ mới</td>
                        <td className="p-4 md:p-5">Nhận tại Cục Quản lý XNC hoặc bưu điện</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-4 md:p-5 font-semibold text-slate-800">Xử lý nhanh khẩn cấp cho công việc / điều trị bệnh / du học gấp</td>
                        <td className="p-4 md:p-5">1 - 2 ngày làm việc</td>
                        <td className="p-4 md:p-5">Vé máy bay/giấy tờ chứng minh khẩn</td>
                        <td className="p-4 md:p-5">Nhận trực tiếp tại Cục Quản lý XNC Bộ Công an</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Passport FAQs Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-850 border-l-4 border-l-[var(--accent)] pl-3">Hỏi Đáp Chuyên Sâu Hộ Chiếu Trực Tuyến</h3>
                <div className="space-y-4 max-w-4xl mx-auto">
                  {passportFaqs.map((faq, idx) => (
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
                            className="border-t border-slate-100 bg-slate-50/50"
                          >
                            <p className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Zalo banner */}
      <section className="py-16 bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Cần Xử Lý Hồ Sơ Nhanh Hoặc Gặp Lỗi Hệ Thống?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base font-light">
            Nhận tư vấn chi tiết từ cố vấn thị thực chuyên sâu của chúng tôi qua Zalo. Phục vụ 24/7.
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
              Tư Vấn Zalo: {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm serviceName={subTab === "visa" ? "Visa & Nhập Cảnh" : "Hộ Chiếu Trực Tuyến"} />

      {/* Zalo Floating Button */}
      <ZaloFloatingButton phone={phone} />
    </>
  );
}
