"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Clock, 
  Star, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Calendar,
  ChevronDown,
  Info,
  MessageSquare
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ZaloFloatingButton from "@/components/ZaloFloatingButton";

export interface PackageOption {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ServiceDetailBlock {
  title: string;
  description: string;
  image: string;
  bullets: string[];
}

export interface ServiceLandingPageProps {
  id: string;
  category: "airport" | "utility" | "travel" | "ground" | "corporate";
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  badge: string;
  geoTarget: string;
  geoAirports?: string[];
  features: ServiceFeature[];
  details: ServiceDetailBlock[];
  packages?: PackageOption[];
  faqs: FAQItem[];
  customField1Label?: string;
  customField1Placeholder?: string;
  customField2Label?: string;
  customField2Options?: string[];
  customField3Label?: string;
  customField3Options?: string[];
  processSteps?: { step?: string; title: string; description: string }[];
  testimonials?: { author: string; role: string; content: string; avatar?: string }[];
}

interface FieldConfig {
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: string[];
  defaultValue: string;
}

interface ServiceFieldsConfig {
  fields: FieldConfig[];
  submitNoteTemplate: (vals: string[]) => string;
}

const SERVICE_FIELDS_CONFIG: Record<string, ServiceFieldsConfig> = {
  "visa": {
    fields: [
      {
        label: "Quốc Gia Đến",
        type: "select",
        options: ["Hàn Quốc", "Nhật Bản", "Trung Quốc", "Mỹ (USA)", "Úc (Australia)", "Châu Âu (Schengen)", "Đài Loan", "Hồng Kông", "Canada", "Anh Quốc (UK)", "Quốc gia khác..."],
        defaultValue: "Hàn Quốc"
      },
      {
        label: "Mục Đích Xin Visa",
        type: "select",
        options: ["Du lịch", "Du học", "Thăm thân", "Công tác / Thương mại", "Đoàn tụ gia đình", "Khác"],
        defaultValue: "Du lịch"
      },
      {
        label: "Loại Dịch Vụ",
        type: "select",
        options: ["Làm bình thường", "Làm khẩn / làm gấp"],
        defaultValue: "Làm bình thường"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
        defaultValue: "1 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần tư vấn thủ tục xin Visa đi ${vals[0] || "Hàn Quốc"} (Mục đích: ${vals[1] || "Du lịch"}, Loại dịch vụ: ${vals[2] || "Làm bình thường"}) cho ${vals[3] || "1 người"}.`
  },
  "ho-chieu": {
    fields: [
      {
        label: "Yêu Cầu Hộ Chiếu",
        type: "select",
        options: ["Làm mới (Cấp lần đầu)", "Gia hạn / Đổi hộ chiếu mới", "Báo mất hộ chiếu làm lại", "Hộ chiếu cho trẻ em", "Đổi hộ chiếu bị hư hỏng/sai thông tin"],
        defaultValue: "Làm mới (Cấp lần đầu)"
      },
      {
        label: "Loại Dịch Vụ",
        type: "select",
        options: ["Làm bình thường (Cổng DVC)", "Làm khẩn / lấy gấp"],
        defaultValue: "Làm bình thường (Cổng DVC)"
      },
      {
        label: "Tài Khoản VNeID",
        type: "select",
        options: ["Đã có VNeID cấp độ 2", "Chưa có VNeID cấp độ 2", "Cần hỗ trợ đăng ký VNeID"],
        defaultValue: "Đã có VNeID cấp độ 2"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
        defaultValue: "1 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần tư vấn làm hộ chiếu: ${vals[0] || "Làm mới"} (Loại dịch vụ: ${vals[1] || "Làm bình thường"}, Trạng thái VNeID: ${vals[2] || "Đã có VNeID Đ2"}) cho ${vals[3] || "1 người"}.`
  },
  "bao-hiem-du-lich": {
    fields: [
      {
        label: "Quốc Gia / Khu Vực Đi",
        type: "select",
        options: ["Châu Âu (Khối Schengen)", "Châu Á (Nhật, Hàn, Trung...)", "Đông Nam Á (Thái, Sing...)", "Mỹ & Canada", "Toàn cầu / Nước khác"],
        defaultValue: "Châu Âu (Khối Schengen)"
      },
      {
        label: "Hạn Mức Chi Trả",
        type: "select",
        options: ["Mức phổ thông 50,000 EUR (Chuẩn Schengen)", "Mức cơ bản 30,000 USD", "Mức cao cấp 100,000 USD", "Mức đặc biệt khác"],
        defaultValue: "Mức phổ thông 50,000 EUR (Chuẩn Schengen)"
      },
      {
        label: "Thời Gian Chuyến Đi",
        type: "select",
        options: ["Dưới 7 ngày", "8 - 15 ngày", "16 - 30 ngày", "31 - 90 ngày", "Trên 90 ngày"],
        defaultValue: "8 - 15 ngày"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
        defaultValue: "1 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần đặt mua bảo hiểm du lịch quốc tế đi ${vals[0] || "Châu Âu"} (Hạn mức: ${vals[1] || "Mức phổ thông"}, Thời gian: ${vals[2] || "8-15 ngày"}) cho ${vals[3] || "1 người"}.`
  },
  "doi-ngoai-te": {
    fields: [
      {
        label: "Sân Bay Giao Dịch",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Ngoại Tệ Cần Đổi",
        type: "select",
        options: ["Đô la Mỹ (USD)", "Yên Nhật (JPY)", "Won Hàn Quốc (KRW)", "Euro (EUR)", "Bạt Thái (THB)", "Đô la Singapore (SGD)", "Tệ Trung Quốc (CNY)", "Ngoại tệ khác"],
        defaultValue: "Đô la Mỹ (USD)"
      },
      {
        label: "Hình Thức Đổi",
        type: "select",
        options: ["Mua ngoại tệ mang đi", "Bán ngoại tệ lấy VNĐ"],
        defaultValue: "Mua ngoại tệ mang đi"
      },
      {
        label: "Hạn Mức Ước Tính",
        type: "select",
        options: ["Dưới 10 triệu VNĐ", "10 - 50 triệu VNĐ", "50 - 100 triệu VNĐ", "Trên 100 triệu VNĐ"],
        defaultValue: "10 - 50 triệu VNĐ"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi muốn đổi ngoại tệ tại ${vals[0] || "Sân bay Tân Sơn Nhất"} (Loại tiền: ${vals[1] || "USD"}, Hình thức: ${vals[2] || "Mua"}, Số lượng ước tính: ${vals[3] || "10-50tr"}).`
  },
  "thue-wifi": {
    fields: [
      {
        label: "Điểm Nhận/Trả Thiết Bị",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Quốc Gia Đến",
        type: "select",
        options: ["Nhật Bản", "Hàn Quốc", "Đài Loan", "Trung Quốc", "Các nước Đông Nam Á", "Châu Âu (Multicountry)", "Mỹ / Toàn Cầu"],
        defaultValue: "Nhật Bản"
      },
      {
        label: "Số Ngày Thuê",
        type: "select",
        options: ["Dưới 5 ngày", "6 - 10 ngày", "11 - 15 ngày", "Trên 15 ngày"],
        defaultValue: "6 - 10 ngày"
      },
      {
        label: "Số Lượng Thiết Bị",
        type: "select",
        options: ["1 bộ", "2 bộ", "3 - 5 bộ", "Số lượng nhiều hơn"],
        defaultValue: "1 bộ"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần thuê thiết bị Wifi du lịch nhận tại ${vals[0] || "Sân bay Tân Sơn Nhất"} đi quốc gia: ${vals[1] || "Nhật Bản"} (Thời gian thuê: ${vals[2] || "6-10 ngày"}) cho ${vals[3] || "1 bộ"}.`
  },
  "phong-cho-thuong-gia": {
    fields: [
      {
        label: "Điểm Sân Bay",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)", "Sân bay Phú Quốc (PQC)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Nhà Ga Áp Dụng",
        type: "select",
        options: ["Ga Quốc Tế - Khách Đi", "Ga Quốc Nội - Khách Đi"],
        defaultValue: "Ga Quốc Tế - Khách Đi"
      },
      {
        label: "Loại Phòng Chờ",
        type: "select",
        options: ["Phòng chờ hạng Thương gia tiêu chuẩn", "Phòng chờ SASCO / Lotus", "Phòng chờ VIP hãng bay"],
        defaultValue: "Phòng chờ hạng Thương gia tiêu chuẩn"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
        defaultValue: "1 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi muốn đặt phòng chờ thương gia tại ${vals[0] || "Sân bay Tân Sơn Nhất"} (${vals[1] || "Ga đi"}, Loại phòng chờ: ${vals[2] || "Thương gia tiêu chuẩn"}) cho ${vals[3] || "1 khách"}.`
  },
  "fastrack": {
    fields: [
      {
        label: "Điểm Sân Bay",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)", "Sân bay Phú Quốc (PQC)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Nhà Ga & Hành Trình",
        type: "select",
        options: ["Ga Quốc tế - Khách Đến", "Ga Quốc tế - Khách Đi", "Ga Quốc nội - Khách Đến", "Ga Quốc nội - Khách Đi"],
        defaultValue: "Ga Quốc tế - Khách Đến"
      },
      {
        label: "Gói Fastrack",
        type: "select",
        options: ["Fastrack Tiêu Chuẩn (Ưu tiên thủ tục)", "VIP Fastrack (Có xe đón chân thang/hỗ trợ hành lý)"],
        defaultValue: "Fastrack Tiêu Chuẩn (Ưu tiên thủ tục)"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
        defaultValue: "1 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi muốn đặt dịch vụ Fastrack tại ${vals[0] || "Sân bay Tân Sơn Nhất"} (${vals[1] || "Ga Quốc tế Đến"}, Gói dịch vụ: ${vals[2] || "Tiêu chuẩn"}) cho ${vals[3] || "1 khách"}.`
  },
  "fast-check-in": {
    fields: [
      {
        label: "Điểm Sân Bay",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)", "Sân bay Phú Quốc (PQC)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Hành Trình",
        type: "select",
        options: ["Ga Quốc tế - Khách Đi", "Ga Quốc nội - Khách Đi"],
        defaultValue: "Ga Quốc tế - Khách Đi"
      },
      {
        label: "Loại Dịch Vụ",
        type: "select",
        options: ["Hỗ trợ check-in nhanh", "Check-in khẩn sát giờ bay", "Hỗ trợ trọn gói hành lý & thẻ lên tàu"],
        defaultValue: "Hỗ trợ check-in nhanh"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
        defaultValue: "1 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi muốn đặt dịch vụ Check-in nhanh tại ${vals[0] || "Sân bay Tân Sơn Nhất"} (${vals[1] || "Ga Quốc tế"}, Loại hỗ trợ: ${vals[2] || "Check-in nhanh"}) cho ${vals[3] || "1 khách"}.`
  },
  "tour-dat-rieng": {
    fields: [
      {
        label: "Điểm Đến Yêu Cầu",
        type: "text",
        placeholder: "Đà Nẵng, Phú Quốc, Thái Lan, Châu Âu...",
        defaultValue: ""
      },
      {
        label: "Loại Hình Tour",
        type: "select",
        options: ["Tour nghỉ dưỡng cao cấp", "Tour kết hợp Teambuilding/MICE", "Tour khám phá, trải nghiệm", "Tour thiết kế riêng gia đình"],
        defaultValue: "Tour nghỉ dưỡng cao cấp"
      },
      {
        label: "Thời Gian Tour",
        type: "select",
        options: ["3 Ngày 2 Đêm", "4 Ngày 3 Đêm", "5 Ngày 4 Đêm", "Thiết kế theo yêu cầu"],
        defaultValue: "4 Ngày 3 Đêm"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["Đoàn từ 5 - 10 người", "Đoàn từ 10 - 30 người", "Đoàn lớn trên 30 người", "Gia đình dưới 5 người"],
        defaultValue: "Đoàn từ 10 - 30 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi muốn thiết kế tour đặt riêng đi ${vals[0] || "địa điểm yêu cầu"} (Loại hình: ${vals[1] || "Nghỉ dưỡng"}, Thời gian: ${vals[2] || "4N3Đ"}) dành cho ${vals[3] || "Đoàn"}.`
  },
  "tour-ghep": {
    fields: [
      {
        label: "Điểm Đến Cần Tìm",
        type: "select",
        options: ["Tour miền Bắc (Hạ Long, Sapa)", "Tour miền Trung (Đà Nẵng, Huế)", "Tour miền Nam (Phú Quốc, Miền Tây)", "Tour Thái Lan", "Tour Singapore - Malaysia", "Tour Nhật Bản - Hàn Quốc", "Các tuyến tour khác..."],
        defaultValue: "Tour miền Bắc (Hạ Long, Sapa)"
      },
      {
        label: "Thời Gian Dự Kiến",
        type: "select",
        options: ["Tối thứ 5 - Chủ nhật", "Ngày thường trong tuần", "Dịp lễ/Tết dương lịch", "Ngày khởi hành linh hoạt"],
        defaultValue: "Tối thứ 5 - Chủ nhật"
      },
      {
        label: "Yêu Cầu Combo",
        type: "select",
        options: ["Tour trọn gói ăn uống & tham quan", "Combo vé máy bay + khách sạn", "Chỉ mua Land Tour đón tại điểm"],
        defaultValue: "Tour trọn gói ăn uống & tham quan"
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
        defaultValue: "2 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần đăng ký Tour ghép đi ${vals[0] || "miền Bắc"} (Thời gian dự kiến: ${vals[1] || "Cuối tuần"}, Gói dịch vụ: ${vals[2] || "Trọn gói"}) cho ${vals[3] || "2 người"}.`
  },
  "doanh-nghiep": {
    fields: [
      {
        label: "Tên Doanh Nghiệp",
        type: "text",
        placeholder: "Nhập tên công ty/doanh nghiệp...",
        defaultValue: ""
      },
      {
        label: "Ngân Sách/Tần Suất Bay",
        type: "select",
        options: ["Dưới 20 triệu/tháng", "20 - 100 triệu/tháng", "100 - 500 triệu/tháng", "Trên 500 triệu/tháng"],
        defaultValue: "20 - 100 triệu/tháng"
      },
      {
        label: "Nhu Cầu Chính",
        type: "select",
        options: ["Ký hợp đồng định kỳ (hạn mức công nợ)", "Yêu cầu chiết khấu đại lý tốt nhất", "Hỗ trợ kỹ thuật xuất vé 24/7", "Xuất hóa đơn VAT tự động"],
        defaultValue: "Ký hợp đồng định kỳ (hạn mức công nợ)"
      },
      {
        label: "Quy Quy Mô Nhân Viên",
        type: "select",
        options: ["Dưới 50 người", "50 - 200 người", "Trên 200 người"],
        defaultValue: "50 - 200 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Doanh nghiệp ${vals[0] || "(Chưa nhập tên)"} cần tư vấn dịch vụ vé máy bay (Ngân sách: ${vals[1] || "20-100tr"}, Nhu cầu chính: ${vals[2] || "Công nợ"}, Quy mô: ${vals[3] || "50-200 người"}).`
  },
  "tmc": {
    fields: [
      {
        label: "Tên Doanh Nghiệp",
        type: "text",
        placeholder: "Nhập tên doanh nghiệp...",
        defaultValue: ""
      },
      {
        label: "Nhu Cầu Quản Lý",
        type: "select",
        options: ["Tối ưu chi phí công tác", "Hệ thống phê duyệt vé tự động", "Báo cáo tài chính & dữ liệu bay", "Đại diện xử lý hoàn/hủy/đổi vé"],
        defaultValue: "Tối ưu chi phí công tác"
      },
      {
        label: "Lượng Bay Ước Tính",
        type: "select",
        options: ["Dưới 50 chuyến/tháng", "50 - 200 chuyến/tháng", "Trên 200 chuyến/tháng"],
        defaultValue: "50 - 200 chuyến/tháng"
      },
      {
        label: "Quy Mô Nhân Sự",
        type: "select",
        options: ["Dưới 100 nhân viên", "100 - 500 nhân viên", "Trên 500 nhân viên"],
        defaultValue: "100 - 500 nhân viên"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Doanh nghiệp ${vals[0] || "(Chưa nhập tên)"} cần tư vấn giải pháp quản lý lữ hành TMC (Nhu cầu: ${vals[1] || "Tối ưu chi phí"}, Lượng bay: ${vals[2] || "50-200 vé"}, Quy mô: ${vals[3] || "100-500 người"}).`
  },
  "tich-hop-api": {
    fields: [
      {
        label: "Tên Đơn Vị/Đối Tác",
        type: "text",
        placeholder: "Nhập tên công ty/dự án phát triển...",
        defaultValue: ""
      },
      {
        label: "Nhu Cầu Tích Hợp",
        type: "select",
        options: ["Tích hợp API tìm kiếm & đặt vé máy bay", "Đại lý vé máy bay cấp 2 sử dụng API", "Cần hỗ trợ tài liệu & kỹ thuật kết nối", "Hỗ trợ tài khoản sandbox chạy thử"],
        defaultValue: "Tích hợp API tìm kiếm & đặt vé máy bay"
      },
      {
        label: "Lượng Query Dự Kiến/Ngày",
        type: "select",
        options: ["Dưới 1,000 queries/ngày", "1,000 - 10,000 queries/ngày", "Trên 10,000 queries/ngày"],
        defaultValue: "1,000 - 10,000 queries/ngày"
      },
      {
        label: "Đội Ngũ Kỹ Thuật",
        type: "select",
        options: ["Chưa có dev chuyên trách", "Đội ngũ IT dưới 5 người", "Đội ngũ IT trên 5 người"],
        defaultValue: "Đội ngũ IT dưới 5 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Đơn vị ${vals[0] || "(Chưa nhập tên)"} cần tư vấn tích hợp API vé máy bay (Nhu cầu: ${vals[1] || "Tích hợp API"}, Truy vấn: ${vals[2] || "1-10K"}, Đội ngũ IT: ${vals[3] || "dưới 5 người"}).`
  },
  "cap-phep-bay": {
    fields: [
      {
        label: "Loại Hình Chuyến Bay",
        type: "select",
        options: ["Chuyên cơ tư nhân (Private Jet)", "Chuyến bay Charter thương mại", "Bay cứu trợ y tế (MEDEVAC)", "Chuyến bay chở hàng (Cargo)"],
        defaultValue: "Chuyên cơ tư nhân (Private Jet)"
      },
      {
        label: "Loại Giấy Phép Cần Xin",
        type: "select",
        options: ["Giấy phép bay hạ cánh & cất cánh", "Giấy phép bay quá cảnh (Overflight)", "Điều phối Slot cất hạ cánh khẩn", "Nộp kế hoạch bay FPL & theo dõi"],
        defaultValue: "Giấy phép bay hạ cánh & cất cánh"
      },
      {
        label: "Sân Bay Đến Ở Việt Nam",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)", "Sân bay Phú Quốc (PQC)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Yêu Cầu Tiến Độ",
        type: "select",
        options: ["Bình thường (Trực tiếp làm việc)", "Yêu cầu khẩn cấp trong 24-48h", "Hỗ trợ thay đổi lịch bay đột xuất"],
        defaultValue: "Bình thường (Trực tiếp làm việc)"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần tư vấn xin giấy phép bay cho ${vals[0] || "Chuyên cơ"} (Yêu cầu: ${vals[1] || "Hạ cánh"}, Sân bay đến: ${vals[2] || "Tân Sơn Nhất"}, Tiến độ: ${vals[3] || "Bình thường"}).`
  },
  "chuyen-co-thue-chuyen": {
    fields: [
      {
        label: "Dịch Vụ Đi Kèm",
        type: "select",
        options: ["Đón tiễn VIP sát chân thang máy bay", "Thủ tục hải quan phòng VIP riêng biệt", "Sắp xếp xe VIP đỗ sân đỗ", "Cung ứng suất ăn cao cấp & Ramp service"],
        defaultValue: "Đón tiễn VIP sát chân thang máy bay"
      },
      {
        label: "Hạng Máy Bay Cần Thuê",
        type: "select",
        options: ["Máy bay phản lực mini (Light Jet)", "Máy bay tầm trung (Midsize Jet)", "Máy bay tầm xa (Heavy Jet)", "Charter khoang VIP máy bay thương mại"],
        defaultValue: "Máy bay phản lực mini (Light Jet)"
      },
      {
        label: "Hành Trình Bay Quốc Tế",
        type: "text",
        placeholder: "Điểm khởi hành và điểm đến...",
        defaultValue: ""
      },
      {
        label: "Số Lượng Khách",
        type: "select",
        options: ["Dưới 5 người", "5 - 10 người", "10 - 20 người", "Đoàn charter trên 20 người"],
        defaultValue: "Dưới 5 người"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần thuê chuyên cơ VIP (Hành trình: ${vals[2] || "Chưa nhập"}, Dịch vụ đi kèm: ${vals[0] || "Đón chân thang"}, Loại tàu bay: ${vals[1] || "Light Jet"}, Quy mô đoàn: ${vals[3] || "Dưới 5 người"}).`
  },
  "dai-dien-hang": {
    fields: [
      {
        label: "Tên Hãng Hàng Không",
        type: "text",
        placeholder: "Nhập tên hãng hàng không hoặc đối tác...",
        defaultValue: ""
      },
      {
        label: "Dịch Vụ Đại Diện",
        type: "select",
        options: ["Đại diện thủ tục check-in tại quầy", "Hỗ trợ hành khách tại khu vực cách ly", "Đại diện xử lý hành lý thất lạc (LL)", "Giám sát quy trình phục vụ mặt đất (Ramp)"],
        defaultValue: "Đại diện thủ tục check-in tại quầy"
      },
      {
        label: "Sân Bay Triển Khai",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)", "Sân bay Phú Quốc (PQC)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Tần Suất Khai Thác",
        type: "select",
        options: ["Khai thác hàng ngày (Daily)", "Khai thác định kỳ vài chuyến/tuần", "Chuyến bay Charter ad-hoc lẻ"],
        defaultValue: "Khai thác hàng ngày (Daily)"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Hãng hàng không ${vals[0] || "(Chưa nhập)"} cần thuê dịch vụ đại diện tại ${vals[2] || "Tân Sơn Nhất"} (Yêu cầu: ${vals[1] || "Check-in"}, Tần suất: ${vals[3] || "Daily"}).`
  },
  "ho-tro-phi-hanh-doan": {
    fields: [
      {
        label: "Quy Mô Tổ Bay",
        type: "select",
        options: ["Tổ bay chuyên cơ (dưới 5 người)", "Tổ bay thương mại thường lệ (5 - 15 người)", "Đưa đón phi công riêng biệt"],
        defaultValue: "Tổ bay thương mại thường lệ (5 - 15 người)"
      },
      {
        label: "Dịch Vụ Hậu Cần",
        type: "select",
        options: ["Xe đưa đón sân đỗ về khách sạn", "Đặt phòng khách sạn lưu trú (Crew Hotel)", "Hỗ trợ CIQ thông quan ưu tiên cho tổ bay", "Đặt suất ăn dinh dưỡng riêng biệt"],
        defaultValue: "Xe đưa đón sân đỗ về khách sạn"
      },
      {
        label: "Sân Bay Đến",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Thời Gian Lưu Trú",
        type: "select",
        options: ["Quá cảnh trong ngày", "Lưu trú 1 - 2 đêm", "Lưu trú dài ngày hơn"],
        defaultValue: "Lưu trú 1 - 2 đêm"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần sắp xếp hậu cần đưa đón tổ bay tại ${vals[2] || "Tân Sơn Nhất"} (Quy mô: ${vals[0] || "Thường lệ"}, Dịch vụ: ${vals[1] || "Xe đưa đón"}, Lưu trú: ${vals[3] || "1-2 đêm"}).`
  },
  "ky-thuat-san-do": {
    fields: [
      {
        label: "Sản Lượng Nhiên Liệu",
        type: "select",
        options: ["Dưới 5,000 lít / Chuyến", "5,000 - 20,000 lít / Chuyến", "Trên 20,000 lít / Chuyến", "Hỗ trợ theo sản lượng thực tế"],
        defaultValue: "5,000 - 20,000 lít / Chuyến"
      },
      {
        label: "Dòng Máy Bay",
        type: "select",
        options: ["Dòng máy bay phản lực tư nhân (Cessna, Gulfstream...)", "Dòng máy bay thân hẹp (A320, B737...)", "Dòng máy bay thân rộng (A350, B787...)", "Dòng máy bay trực thăng"],
        defaultValue: "Dòng máy bay thân hẹp (A320, B737...)"
      },
      {
        label: "Sân Bay Cần Tiếp Nhiên Liệu",
        type: "select",
        options: ["Sân bay Tân Sơn Nhất (SGN)", "Sân bay Nội Bài (HAN)", "Sân bay Đà Nẵng (DAD)", "Sân bay Cam Ranh (CXR)", "Sân bay Phú Quốc (PQC)"],
        defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
      },
      {
        label: "Tiến Độ Tiếp Nhiên Liệu",
        type: "select",
        options: ["Theo lịch trình bay đăng ký trước", "Cứu trợ khẩn tiếp xăng đột xuất", "Kế hoạch kỹ thuật đặc biệt"],
        defaultValue: "Theo lịch trình bay đăng ký trước"
      }
    ],
    submitNoteTemplate: (vals) =>
      `Tôi cần dịch vụ tra nạp nhiên liệu Jet A-1 cho tàu bay ${vals[1] || "thân hẹp"} tại ${vals[2] || "Tân Sơn Nhất"} (Sản lượng ước tính: ${vals[0] || "5K-20K"}, Tiến độ: ${vals[3] || "Theo lịch trình"}).`
  }
};

function getFallbackConfig(
  category: string,
  customField1Label?: string,
  customField1Placeholder?: string,
  customField2Label?: string,
  customField2Options: string[] = [],
  customField3Label?: string,
  customField3Options: string[] = []
): ServiceFieldsConfig {
  if (category === "airport" || category === "ground") {
    return {
      fields: [
        {
          label: "Điểm Sân Bay",
          type: "select",
          options: [
            "Sân bay Tân Sơn Nhất (SGN)",
            "Sân bay Nội Bài (HAN)",
            "Sân bay Đà Nẵng (DAD)",
            "Sân bay Cam Ranh (CXR)",
            "Sân bay Phú Quốc (PQC)"
          ],
          defaultValue: "Sân bay Tân Sơn Nhất (SGN)"
        },
        {
          label: "Loại Hành Trình",
          type: "select",
          options: [
            "Ga Quốc tế - Khách Đến",
            "Ga Quốc tế - Khách Đi",
            "Ga Quốc nội - Khách Đến",
            "Ga Quốc nội - Khách Đi"
          ],
          defaultValue: "Ga Quốc tế - Khách Đến"
        },
        {
          label: "Số Lượng Khách",
          type: "select",
          options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
          defaultValue: "1 người"
        }
      ],
      submitNoteTemplate: (vals) => 
        `Tôi muốn đặt dịch vụ sân bay tại ${vals[0] || "Tân Sơn Nhất"} (${vals[1] || "Ga Quốc tế Đến"}) cho ${vals[2] || "1"} khách.`
    };
  } else if (category === "utility") {
    return {
      fields: [
        {
          label: "Quốc Gia Đến",
          type: "text",
          placeholder: "Hàn Quốc, Nhật Bản, Mỹ...",
          defaultValue: "Hàn Quốc"
        },
        {
          label: "Phân Loại Hồ Sơ",
          type: "select",
          options: ["Hồ sơ Du lịch", "Hồ sơ Công tác", "Thủ tục Khẩn / Gấp"],
          defaultValue: "Hồ sơ Du lịch"
        },
        {
          label: "Số Lượng Khách",
          type: "select",
          options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
          defaultValue: "1 người"
        }
      ],
      submitNoteTemplate: (vals) =>
        `Tôi cần tư vấn thủ tục đi ${vals[0] || "Hàn Quốc"} (${vals[1] || "Du lịch"}) cho ${vals[2] || "1"} người.`
    };
  } else if (category === "corporate") {
    return {
      fields: [
        {
          label: customField1Label || "Tên Doanh Nghiệp",
          type: "text",
          placeholder: customField1Placeholder || "Nhập tên doanh nghiệp...",
          defaultValue: ""
        },
        {
          label: customField2Label || "Yêu cầu chi tiết",
          type: "select",
          options: customField2Options,
          defaultValue: customField2Options[0] || ""
        },
        {
          label: customField3Label || "Số lượng khách",
          type: "select",
          options: customField3Options,
          defaultValue: customField3Options[0] || "1 người"
        }
      ],
      submitNoteTemplate: (vals) =>
        `Tôi cần tư vấn dịch vụ doanh nghiệp ${vals[0] || "Doanh nghiệp"} (${vals[1] || "Yêu cầu"}), quy mô: ${vals[2] || "Quy mô"}.`
    };
  } else {
    return {
      fields: [
        {
          label: "Điểm Đến Yêu Cầu",
          type: "text",
          placeholder: "Đà Nẵng, Phú Quốc, Thái Lan...",
          defaultValue: ""
        },
        {
          label: "Loại Hình Du Lịch",
          type: "select",
          options: ["Tour trọn gói", "Tour đặt riêng theo yêu cầu", "Dành cho công ty / MICE"],
          defaultValue: "Tour trọn gói"
        },
        {
          label: "Số Lượng Khách",
          type: "select",
          options: ["1 người", "2 người", "3 - 5 người", "Đoàn trên 5 người"],
          defaultValue: "1 người"
        }
      ],
      submitNoteTemplate: (vals) =>
        `Tôi muốn đăng ký đi ${vals[0] || "Điểm đến"} (${vals[1] || "Tour trọn gói"}) cho ${vals[2] || "1"} khách.`
    };
  }
}

export default function ServiceLandingPage({
  id,
  category,
  title,
  subtitle,
  description,
  heroImage,
  badge,
  geoTarget,
  geoAirports = [],
  features,
  details,
  packages = [],
  faqs,
  customField1Label,
  customField1Placeholder,
  customField2Label,
  customField2Options = [],
  customField3Label,
  customField3Options = [],
  processSteps = [],
  testimonials = []
}: ServiceLandingPageProps) {
  const phone = "0788320320";
  const zaloUrl = `https://zalo.me/${phone}`;

  // Form helper state
  const [selectedService, setSelectedService] = useState(title);
  const [initialNote, setInitialNote] = useState("");

  // Get persona config for humanized assistant header
  const getPersona = () => {
    const nameStr = title.toLowerCase();
    
    // 1. Vé máy bay (Flights)
    if (
      nameStr.includes("vé máy bay") || 
      nameStr.includes("ve-may-bay") || 
      nameStr.includes("chặng bay") || 
      nameStr.includes("hàng không") || 
      nameStr.includes("flight") || 
      nameStr.includes("airline")
    ) {
      return {
        name: "Anh Tiệp",
        role: "Trực Page Vé máy bay & Vé đoàn",
        initials: "T",
        avatarBg: "from-slate-650 to-slate-800",
      };
    }
    
    // 2. Các dịch vụ liên quan đến dịch vụ sân bay hoặc mặt đất (Airport / Ground services)
    if (
      nameStr.includes("sân bay") || 
      nameStr.includes("mặt đất") || 
      nameStr.includes("fastrack") || 
      nameStr.includes("đón tiễn") || 
      nameStr.includes("phòng chờ") || 
      nameStr.includes("lounge") || 
      nameStr.includes("ngoại tệ") || 
      nameStr.includes("phi-hanh-doan") || 
      nameStr.includes("chuyen-co") || 
      nameStr.includes("cap-phep-bay") || 
      nameStr.includes("dai-dien") || 
      nameStr.includes("ky-thuat")
    ) {
      return {
        name: "Anh Kiên",
        role: "Trực Dịch vụ Sân bay & Mặt đất VIP",
        initials: "K",
        avatarBg: "from-blue-400 to-indigo-600",
      };
    }
    
    // 3. Du lịch và tiện ích du lịch (Tour, Khách sạn, Visa, Hộ chiếu, SIM...)
    return {
      name: "Chị Vân Anh",
      role: "Trực hỗ trợ Tiện ích & Du lịch",
      initials: "VA",
      avatarBg: "from-purple-400 to-pink-500",
    };
  };

  const persona = getPersona();

  // Get active fields config
  const activeConfig = SERVICE_FIELDS_CONFIG[id] || getFallbackConfig(
    category,
    customField1Label,
    customField1Placeholder,
    customField2Label,
    customField2Options,
    customField3Label,
    customField3Options
  );

  // Initialize field values
  const [fieldValues, setFieldValues] = useState<string[]>(() => 
    activeConfig.fields.map(f => f.defaultValue)
  );

  // Sync field values when routing to another landing page using same template
  useState(() => {
    const config = SERVICE_FIELDS_CONFIG[id] || getFallbackConfig(
      category,
      customField1Label,
      customField1Placeholder,
      customField2Label,
      customField2Options,
      customField3Label,
      customField3Options
    );
    setFieldValues(config.fields.map(f => f.defaultValue));
  });

  // Keep state synchronized with props when they change dynamically
  const [lastId, setLastId] = useState(id);
  if (id !== lastId) {
    setLastId(id);
    const config = SERVICE_FIELDS_CONFIG[id] || getFallbackConfig(
      category,
      customField1Label,
      customField1Placeholder,
      customField2Label,
      customField2Options,
      customField3Label,
      customField3Options
    );
    setFieldValues(config.fields.map(f => f.defaultValue));
  }

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const handleAssistantSubmit = () => {
    const noteText = activeConfig.submitNoteTemplate(fieldValues);
    
    setSelectedService(title);
    setInitialNote(noteText + " Vui lòng liên hệ lại tư vấn và báo giá chi tiết.");
    
    const contactSection = document.getElementById("lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePackageClick = (packageName: string) => {
    setSelectedService(`${title} - ${packageName}`);
    setInitialNote(`Tôi cần tư vấn gói dịch vụ: ${packageName} của dịch vụ ${title}. Vui lòng liên hệ lại hỗ trợ tôi.`);
    
    const contactSection = document.getElementById("lien-he");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* Inject FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-[var(--background)]"></div>
        </div>

        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-2 backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">{badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[1.35rem] sm:text-2xl md:text-[2.2rem] lg:text-5xl font-extrabold text-white leading-snug font-be [text-wrap:balance] hyphens-none"
          >
            {title}
            {subtitle && (
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mt-1.5 text-[1.2rem] sm:text-xl md:text-[1.9rem] lg:text-4xl [text-wrap:balance] hyphens-none leading-snug">
                {subtitle}
              </span>
            )}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {description}
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
              href="#chi-tiet-dich-vu"
              className="inline-flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/25 text-white font-bold text-base rounded-xl px-8 py-4 backdrop-blur-sm transition-all"
            >
              Tìm Hiểu Chi Tiết
            </a>
          </motion.div>
        </div>
      </section>

      {/* GEO Assistant Bar */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="relative shrink-0 select-none">
                  <div className={`w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center font-extrabold text-white text-xs bg-gradient-to-tr ${persona.avatarBg} shrink-0 shadow-sm`}>
                    {persona.initials}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-800 font-be flex items-center gap-1.5">
                    Tư Vấn & Thiết Lập Cùng <span className="text-blue-600 font-extrabold">{persona.name}</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{persona.role} đang online · Phản hồi trong 5 phút</p>
                </div>
              </div>
              
              {geoAirports.length > 0 && (
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mr-1.5">Sân bay áp dụng:</span>
                  {geoAirports.map(ap => (
                    <span key={ap} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {ap}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={`grid grid-cols-1 ${
              activeConfig.fields.length === 4 
                ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" 
                : "md:grid-cols-3 lg:grid-cols-4"
            } gap-4 items-end`}>
              {activeConfig.fields.map((field, index) => {
                const value = fieldValues[index] ?? "";
                const onChange = (val: string) => {
                  setFieldValues(prev => {
                    const next = [...prev];
                    next[index] = val;
                    return next;
                  });
                };

                return (
                  <div key={index} className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{field.label}</label>
                    {field.type === "select" ? (
                      <select 
                        value={value} 
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.placeholder || ""}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    )}
                  </div>
                );
              })}

              <div>
                <button 
                  onClick={handleAssistantSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/10 cursor-pointer h-[46px] whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  Kết Nối Với {persona.name}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Standard Trust Indicators */}
      <section className="py-6 bg-slate-50 border-b border-slate-200/40">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-slate-400 text-xs">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-semibold text-slate-600">Đúng Quy Chuẩn Hàng Không</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="font-semibold text-slate-600">Hỗ Trợ 24/7/365 Khẩn Cấp</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold text-slate-600">Cam Kết Chất Lượng 5 Sao</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 bg-white" id="chi-tiet-dich-vu">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-3">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Lợi Thế Cốt Lõi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-be">Giải Pháp Chuyên Nghiệp Theo Đúng Tiêu Chuẩn</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl hover:bg-white hover:border-blue-500/30 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-115 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 font-be">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Detail Blocks (Visual Content) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-6xl space-y-24">
          {details.map((block, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col lg:flex-row items-center gap-12 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image Block */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                  <img 
                    src={block.image} 
                    alt={block.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-slate-900/10"></div>
                </div>
              </div>

              {/* Text Block */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 font-be leading-tight">
                  {block.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {block.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {block.bullets.map((bullet, bidx) => (
                    <div key={bidx} className="flex items-start text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Process Timeline Section */}
      {processSteps && processSteps.length > 0 && (
        <section className="py-24 relative z-10 bg-slate-50 border-t border-b border-slate-200/60">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16 space-y-2">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Quy Trình Triển Khai</span>
              <h2 className="text-3xl font-bold text-slate-900 font-be">Các Bước Thực Hiện Dịch Vụ</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {processSteps.map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/50 relative shadow-sm hover:shadow-md transition-shadow group">
                  <div className="absolute -top-4 -left-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    {step.step || `0${idx + 1}`}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mt-3 mb-2 font-be">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Packages (Optional) */}
      {packages.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-2">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Bảng Giá Tham Khảo</span>
              <h2 className="text-3xl font-bold text-slate-900 font-be">Gói Dịch Vụ Thiết Kế Tối Ưu</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-${packages.length > 3 ? 3 : packages.length} gap-8 max-w-5xl mx-auto`}>
              {packages.map((pkg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white rounded-3xl p-6 border flex flex-col justify-between relative ${
                    pkg.popular 
                      ? "border-blue-500 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500" 
                      : "border-slate-200 hover:border-blue-500/30"
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Phổ biến nhất
                    </span>
                  )}

                  <div>
                    <div className="mb-4">
                      <h4 className="font-bold text-base text-slate-800 font-be">{pkg.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{pkg.description}</p>
                    </div>

                    <div className="mb-6 pb-6 border-b border-slate-100">
                      <span className="text-2xl font-extrabold text-blue-700 font-be">{pkg.price}</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start text-xs text-slate-600">
                          <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePackageClick(pkg.name)}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      pkg.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700/30 text-slate-700"
                    }`}
                  >
                    Đăng Ký Gói Này
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* SEO FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Giải Đáp Thắc Mắc</span>
            <h2 className="text-3xl font-bold text-slate-900 font-be">Câu Hỏi Thường Gặp (FAQs)</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-sm text-slate-800 hover:text-blue-700 focus:outline-none cursor-pointer gap-4"
                >
                  <span className="font-be">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ${openFaqIdx === idx ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </button>
                
                <AnimatePresence>
                  {openFaqIdx === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Hotline banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-cyan-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-be">Cần Đặt Lịch Dịch Vụ Khẩn Cấp?</h2>
          <p className="text-blue-100/90 max-w-xl mx-auto text-sm font-light">
            Đội ngũ chuyên viên ABTRIP túc trực 24/7 trực tiếp tại các đầu sân bay luôn sẵn sàng hỗ trợ bạn hoàn thành thủ tục đúng thời gian, đúng quy định hàng không.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-blue-700 font-bold text-base rounded-xl px-8 py-4 shadow-xl hover:scale-105 transition-all gap-2"
            >
              Hỗ Trợ Zalo: {phone}
            </a>
            <a 
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-base rounded-xl px-8 py-4 transition-all gap-2"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              Gọi Trực Tiếp: {phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm serviceName={selectedService} initialNote={initialNote} />

      {/* Zalo Button */}
      <ZaloFloatingButton phone={phone} />
    </>
  );
}
