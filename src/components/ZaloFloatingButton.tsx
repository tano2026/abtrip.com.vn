"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Sparkles, Check, Phone, ArrowRight, CornerDownLeft } from "lucide-react";

interface ZaloFloatingButtonProps {
  phone: string;
}

interface Message {
  sender: "agent" | "user";
  text: string;
}

function ZaloFloatingButtonInner({ phone }: ZaloFloatingButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL search parameters extraction
  const type = searchParams.get("type");
  const country = searchParams.get("country");
  const purpose = searchParams.get("purpose");
  const subtype = searchParams.get("subtype");
  const speed = searchParams.get("speed");
  const region = searchParams.get("region");
  const pax = searchParams.get("pax");
  const airport = searchParams.get("airport");
  const fastrackType = searchParams.get("fastrackType");
  const date = searchParams.get("date");
  const flight = searchParams.get("flight");
  const simType = searchParams.get("simType");
  const qty = searchParams.get("qty");
  const destination = searchParams.get("destination");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const rooms = searchParams.get("rooms");

  // Chat window state
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selections, setSelections] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Observe contact form visibility to hide floating button
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout;

    const setupObserver = () => {
      const target = document.getElementById("lien-he");
      if (!target) {
        // Retry in 100ms if not found yet
        timeoutId = setTimeout(setupObserver, 100);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsContactVisible(entry.isIntersecting);
          // Automatically close the chat window if they scroll into the contact form area
          if (entry.isIntersecting) {
            setIsOpen(false);
          }
        },
        {
          root: null,
          threshold: 0.05,
        }
      );

      observer.observe(target);
    };

    setupObserver();

    return () => {
      if (observer) observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Dynamic persona config based on path
  const getPersonaConfig = () => {
    // 1. Visa & Passport page (Du lịch và Tiện ích du lịch -> Vân Anh)
    if (pathname.includes("/visa-ho-chieu") || pathname.includes("/tour") || pathname.includes("/to-chuc-su-kien")) {
      const isPassport = type === "passport" || pathname.includes("/ho-chieu");
      if (isPassport) {
        const subtypeLabel = subtype === "new" ? "Làm mới" : subtype === "renew" ? "Gia hạn" : subtype === "lost" ? "Mất làm lại" : "Làm mới";
        const speedLabel = speed === "normal" ? "Làm bình thường" : speed === "urgent" ? "Làm gấp" : "Làm bình thường";
        const regionLabel = region === "miền bắc" ? "Miền Bắc" : region === "miền trung" ? "Miền Trung" : "Miền Nam";
        
        let welcome = `Dạ em chào anh/chị ạ! Em là **Vân Anh**, trực page hỗ trợ thủ tục **Hộ chiếu trực tuyến** đây ạ. Em thấy mình đang cần hỗ trợ làm hộ chiếu (${subtypeLabel} - ${speedLabel}) ở khu vực ${regionLabel}. Nhắn em hỗ trợ xem hồ sơ nhanh cho mình nhé ạ! 🥰`;
        if (!type && !subtype) {
          welcome = "Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực hỗ trợ thủ tục **Hộ chiếu trực tuyến** của ABTRIP đây ạ. 🥰\n\nKhông biết mình cần làm mới, gia hạn hay làm lại hộ chiếu bị mất thế ạ? Nhắn em hỗ trợ nhanh cho mình nha!";
        }
        
        return {
          name: "Chị Vân Anh",
          role: "Chuyên viên Hộ chiếu",
          initials: "VA",
          avatarBg: "from-purple-400 to-pink-500",
          phone: "0915849016",
          welcome,
          type: "passport",
          steps: [
            {
              question: "Để khai báo trực tuyến nhanh nhất, anh/chị đã kích hoạt tài khoản định danh điện tử VNeID cấp độ 2 chưa ạ?",
              options: [
                { label: "Đã kích hoạt VNeID cấp 2", nextStep: 1, copyVal: "Đã có VNeID cấp 2" },
                { label: "Chưa kích hoạt VNeID cấp 2", nextStep: 1, copyVal: "Chưa kích hoạt VNeID" }
              ]
            },
            {
              question: "Số điện thoại của anh/chị đã đăng ký sim chính chủ bằng số CCCD 12 số (không phải CMND cũ) chưa ạ?",
              options: [
                { label: "Đã đăng ký sim bằng CCCD chính chủ", nextStep: 2, copyVal: "Sim chính chủ CCCD" },
                { label: "Chưa kiểm tra / Chưa trùng khớp", nextStep: 2, copyVal: "Sim chưa chính chủ CCCD" }
              ]
            },
            {
              question: "Dạ em đã rõ thông tin. Để em chuẩn bị ảnh chân dung chuẩn AI và hỗ trợ khai báo trên cổng Dịch vụ công nhanh nhất, anh/chị kết nối Zalo trực tiếp ngay nhé!",
              options: []
            }
          ]
        };
      } else {
        const purposeLabel = purpose === "tourism" ? "Du lịch" : purpose === "study" ? "Du học" : purpose === "visit" ? "Thăm thân" : purpose === "reunion" ? "Đoàn tụ" : "Du lịch";
        const countryLabel = country || "nước ngoài";
        
        let welcome = `Dạ em chào anh/chị ạ! Em là **Vân Anh**, trực hỗ trợ **Visa các nước** đây ạ. Em thấy mình đang tìm hiểu xin Visa đi **${countryLabel}** diện **${purposeLabel}** đúng không ạ? Nhắn em hỗ trợ check nhanh hồ sơ cho mình nha! 🥰`;
        if (!type && !country) {
          welcome = "Dạ em chào anh/chị ạ! Em là **Vân Anh**, chuyên viên hỗ trợ **Visa quốc tế** của ABTRIP. 🥰\n\nKhông biết mình đang quan tâm xin visa đi nước nào và diện du lịch hay du học/thăm thân thế ạ? Nhắn em hỗ trợ check nhanh tỷ lệ đậu cho mình nha!";
        }
        
        return {
          name: "Chị Vân Anh",
          role: "Chuyên gia Thị thực Quốc tế",
          initials: "VA",
          avatarBg: "from-purple-400 to-pink-500",
          phone: "0915849016",
          welcome,
          type: "visa",
          steps: [
            {
              question: "Để đánh giá tỷ lệ đậu visa, anh/chị đã từng đi du lịch nước ngoài (Đông Nam Á hoặc các nước phát triển) chưa ạ?",
              options: [
                { label: "Chưa đi nước ngoài (Hộ chiếu trắng)", nextStep: 1, copyVal: "Hộ chiếu trắng" },
                { label: "Đã đi Đông Nam Á (Thái, Sing...)", nextStep: 1, copyVal: "Đã đi Đông Nam Á" },
                { label: "Đã đi nước phát triển (Mỹ, Âu, Nhật...)", nextStep: 1, copyVal: "Đã đi nước phát triển" }
              ]
            },
            {
              question: "Anh/chị dự kiến ngày khởi hành là khi nào và cần làm diện hồ sơ thường hay làm gấp ạ?",
              options: [
                { label: "Làm thường (đủ thời gian chuẩn bị)", nextStep: 2, copyVal: "Làm thường" },
                { label: "Cần nộp khẩn lấy gấp", nextStep: 2, copyVal: "Làm gấp" }
              ]
            },
            {
              question: "Dạ em đã ghi nhận thông tin. Để cung cấp danh mục hồ sơ cần chuẩn bị chính xác nhất cho diện của mình, em xin kết nối anh/chị qua Zalo tư vấn 1-1 ngay nhé!",
              options: []
            }
          ]
        };
      }
    }
    
    // 2. Airport Services page (Sân bay & Mặt đất -> Kiên)
    if (pathname.includes("/dich-vu-san-bay") || pathname.includes("/dich-vu-mat-dat")) {
      const airportLabel = airport ? `Sân bay ${airport}` : "";
      const dateLabel = date ? ` ngày ${date}` : "";
      
      let welcome = `Dạ em chào anh/chị ạ! Em là **Kiên**, đang trực hỗ trợ dịch vụ **Sân bay & Mặt đất VIP** đây ạ. Em thấy mình đang quan tâm dịch vụ **Fastrack VIP** tại **${airportLabel}**${dateLabel} đúng không ạ? Nhắn em hỗ trợ sắp xếp lịch xe và nhân sự đón mình nhé! 😎`;
      if (!type && !airport) {
        welcome = "Dạ em chào anh/chị ạ! Em là **Kiên**, phụ trách **Dịch vụ Sân bay & Mặt đất VIP** của ABTRIP đây ạ. 😎\n\nKhông biết chuyến bay sắp tới của mình là ngày nào và ở sân bay nào thế ạ? Nhắn em hỗ trợ sắp xếp lịch đón tiễn nhanh nhất cho mình nhé!";
      }
      
      return {
        name: "Anh Kiên",
        role: "Trực Dịch vụ Sân bay VIP",
        initials: "K",
        avatarBg: "from-blue-400 to-indigo-600",
        phone: "0869320320",
        welcome,
        type: "fasttrack",
        steps: [
          {
            question: "Dạ, hành trình sắp tới của mình là ga đến (nhập cảnh) hay ga đi (xuất cảnh) thế ạ?",
            options: [
              { label: "Ga Đến (Đón cửa máy bay - nhập cảnh nhanh)", nextStep: 1, copyVal: "Ga Đến (Nhập cảnh)" },
              { label: "Ga Đi (Làm thủ tục nhanh - phòng chờ VIP)", nextStep: 1, copyVal: "Ga Đi (Xuất cảnh)" }
            ]
          },
          {
            question: "Anh/chị muốn đăng ký gói Tiêu chuẩn (Ưu tiên thủ tục) hay gói VIP Trọn gói kèm đón/tiễn hành lý ạ?",
            options: [
              { label: "Gói Fastrack Tiêu chuẩn", nextStep: 2, copyVal: "Fastrack Tiêu chuẩn" },
              { label: "Gói VIP Trọn gói (Fastrack + Đón/Tiễn hành lý)", nextStep: 2, copyVal: "VIP Trọn gói" }
            ]
          },
          {
            question: "Dạ em đã ghi nhận yêu cầu. Để em kiểm tra lịch nhân sự đón trực tiếp tại cửa máy bay/quầy thủ tục, em xin kết nối Zalo gửi báo giá chi tiết ngay nhé!",
            options: []
          }
        ]
      };
    }

    // 3. SIM Page (Du lịch và Tiện ích du lịch -> Vân Anh)
    if (pathname.includes("/sim")) {
      const countryLabel = country ? ` đi ${country}` : "";
      let welcome = `Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực hỗ trợ đặt **SIM/eSIM du lịch quốc tế** đây ạ. Em thấy mình đang tìm đặt SIM${countryLabel} đúng không ạ? Nhắn em tư vấn gói data phù hợp nhất nhé! 🥰`;
      if (!country) {
        welcome = "Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực hỗ trợ đặt **SIM/eSIM du lịch quốc tế** đây ạ. 🥰\n\nKhông biết mình chuẩn bị đi nước nào thế ạ? Nhắn em tư vấn nhanh các gói cước Data tốc độ cao phù hợp nhất nha!";
      }
      
      return {
        name: "Chị Vân Anh",
        role: "Hỗ trợ Tiện ích & SIM",
        initials: "VA",
        avatarBg: "from-purple-400 to-pink-500",
        phone: "0915849016",
        welcome,
        type: "sim",
        steps: [
          {
            question: "Dạ, điện thoại của mình có hỗ trợ công nghệ eSIM không hay mình muốn mua SIM vật lý thông thường ạ?",
            options: [
              { label: "Sử dụng eSIM (Cài đặt qua mã QR)", nextStep: 1, copyVal: "eSIM QR" },
              { label: "Sử dụng SIM vật lý (Giao nhận tận nhà)", nextStep: 1, copyVal: "SIM vật lý" }
            ]
          },
          {
            question: "Chuyến đi của mình dự kiến kéo dài trong khoảng bao nhiêu ngày ạ?",
            options: [
              { label: "Dưới 7 ngày", nextStep: 2, copyVal: "Dưới 7 ngày" },
              { label: "Từ 7 - 15 ngày", nextStep: 2, copyVal: "Từ 7 - 15 ngày" },
              { label: "Trên 15 ngày", nextStep: 2, copyVal: "Trên 15 ngày" }
            ]
          },
          {
            question: "Dạ em đã nắm rõ nhu cầu của mình. Để em gửi bảng giá các gói Data tốc độ cao không giới hạn và hướng dẫn cài đặt eSIM, em xin kết nối anh/chị qua Zalo hỗ trợ ngay nhé!",
            options: []
          }
        ]
      };
    }

    // 4. Hotel page (Du lịch và Tiện ích du lịch -> Vân Anh)
    if (pathname.includes("/khach-san")) {
      const destLabel = destination ? ` tại ${destination}` : "";
      const datesLabel = (checkin && checkout) ? ` từ ngày ${checkin} đến ${checkout}` : "";
      
      let welcome = `Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực hỗ trợ đặt phòng khách sạn/resort đây ạ. Em thấy mình đang lên kế hoạch đặt phòng**${destLabel}**${datesLabel} đúng không ạ? Nhắn em check nhanh quỹ phòng đại lý giá tốt nhất nhé! 🥰`;
      if (!destination) {
        welcome = "Dạ em chào anh/chị! Em là **Vân Anh**, đang trực hỗ trợ đặt phòng khách sạn/resort cho ABTRIP đây ạ. 🥰\n\nAnh/chị đang dự kiến đi nghỉ dưỡng ở đâu thế ạ? Nhắn em check nhanh quỹ phòng đại lý giá tốt nhất chiết khấu sâu cho mình nhé!";
      }
      
      return {
        name: "Chị Vân Anh",
        role: "Quản lý Phòng & Tour Cao cấp",
        initials: "VA",
        avatarBg: "from-purple-400 to-pink-500",
        phone: "0915849016",
        welcome,
        type: "hotel",
        steps: [
          {
            question: "Dạ, anh/chị đang tìm phòng thuộc phân khúc nào để em lọc quỹ phòng đại lý giá tốt nhất ạ?",
            options: [
              { label: "Khách sạn / Resort 4 - 5 sao cao cấp", nextStep: 1, copyVal: "Resort 4-5 sao" },
              { label: "Khách sạn 3 sao tiện nghi, giá rẻ", nextStep: 1, copyVal: "Khách sạn 3 sao" },
              { label: "Biệt thự Villa / Homestay đoàn riêng", nextStep: 1, copyVal: "Biệt thự Villa" }
            ]
          },
          {
            question: "Đoàn mình đi nghỉ dưỡng gia đình, đi công tác hay đi theo đoàn công ty đông người ạ?",
            options: [
              { label: "Đi du lịch gia đình / Cặp đôi", nextStep: 2, copyVal: "Gia đình/Cặp đôi" },
              { label: "Đi công tác / Hội thảo", nextStep: 2, copyVal: "Công tác/Hội thảo" },
              { label: "Đi đoàn đông (cần thiết kế tour)", nextStep: 2, copyVal: "Đoàn đông người" }
            ]
          },
          {
            question: "Dạ em đã ghi nhận thông tin chặng phòng. Để em gửi hình ảnh thực tế phòng trống kèm báo giá chiết khấu đặc quyền của ABTRIP qua Zalo cho mình nhé!",
            options: []
          }
        ]
      };
    }

    // 5. Flight Page & B2B Page (Vé máy bay -> Tiệp)
    if (pathname.includes("/ve-may-bay")) {
      return {
        name: "Anh Tiệp",
        role: "Trực Page Vé máy bay B2B & Đoàn",
        initials: "T",
        avatarBg: "from-slate-650 to-slate-800",
        phone: "0788320320",
        welcome: "Dạ em chào anh/chị ạ! Em là **Tiệp**, đang trực hỗ trợ đặt **Vé máy bay doanh nghiệp & Vé đoàn** của ABTRIP đây ạ. 😎\n\nAnh/chị đang cần báo giá chặng bay đoàn riêng biệt hay tìm hiểu chính sách hạn mức công nợ doanh nghiệp (TMC) ạ? Nhắn em hỗ trợ tức thì nhé ạ!",
        type: "flight",
        steps: [
          {
            question: "Anh/chị đang cần báo giá cho chặng bay đoàn riêng biệt hay tìm hiểu chính sách hạn mức công nợ doanh nghiệp (TMC) ạ?",
            options: [
              { label: "Đặt vé máy bay đoàn (chiết khấu cao)", nextStep: 1, copyVal: "Đặt vé đoàn" },
              { label: "Tìm hiểu chính sách công nợ TMC", nextStep: 1, copyVal: "Chính sách công nợ B2B" },
              { label: "Tích hợp API cổng dữ liệu vé máy bay", nextStep: 1, copyVal: "Tích hợp API" }
            ]
          },
          {
            question: "Đoàn mình dự kiến bay chặng nội địa hay quốc tế và số lượng hành khách khoảng bao nhiêu người ạ?",
            options: [
              { label: "Nội địa (dưới 20 người)", nextStep: 2, copyVal: "Nội địa < 20 khách" },
              { label: "Nội địa (trên 20 người)", nextStep: 2, copyVal: "Nội địa > 20 khách" },
              { label: "Chặng bay Quốc tế", nextStep: 2, copyVal: "Bay Quốc tế" }
            ]
          },
          {
            question: "Dạ em đã ghi nhận thông tin sơ bộ của đoàn. Để gửi hợp đồng báo giá IATA chiết khấu sâu nhất, em xin kết nối anh/chị trực tiếp qua Zalo xử lý tức thì nhé!",
            options: []
          }
        ]
      };
    }

    // 6. Default general agent (Du lịch và Tiện ích du lịch -> Vân Anh)
    return {
      name: "Chị Vân Anh",
      role: "Hỗ trợ Khách hàng 24/7",
      initials: "VA",
      avatarBg: "from-purple-400 to-pink-500",
      phone: "0788320320",
      welcome: "Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực page hỗ trợ khách hàng của ABTRIP đây ạ. 🥰\n\nKhông biết mình đang quan tâm tìm hiểu dịch vụ Vé máy bay đoàn, Khách sạn, Visa, Hộ chiếu hay SIM quốc tế thế ạ? Nhắn em hỗ trợ nhanh cho mình nha!",
      type: "default",
      steps: [
        {
          question: "Anh/chị đang cần tư vấn nhóm dịch vụ nào của ABTRIP nhất ạ?",
          options: [
            { label: "Dịch vụ làm Visa & Hộ chiếu", nextStep: 1, copyVal: "Visa & Hộ chiếu" },
            { label: "Dịch vụ đặt Vé máy bay & Khách sạn", nextStep: 1, copyVal: "Vé máy bay & Khách sạn" },
            { label: "Dịch vụ Sân bay VIP Fastrack & SIM", nextStep: 1, copyVal: "Fastrack & SIM" }
          ]
        },
        {
          question: "Anh/chị cần tư vấn dịch vụ này theo nhu cầu cá nhân hay cho đại diện cơ quan doanh nghiệp B2B ạ?",
          options: [
            { label: "Tư vấn nhu cầu cá nhân", nextStep: 2, copyVal: "Khách cá nhân" },
            { label: "Báo giá cho doanh nghiệp / tổ chức", nextStep: 2, copyVal: "Khách B2B Doanh nghiệp" }
          ]
        },
        {
          question: "Dạ em đã nắm rõ nhóm nhu cầu. Để chuyên viên thuộc bộ phận chuyên môn hỗ trợ trực tiếp 1-1, em xin kết nối Zalo cho anh/chị ngay nhé!",
          options: []
        }
      ]
    };
  };

  const config = getPersonaConfig();
  const zaloUrl = `https://zalo.me/${config.phone.replace(/\s+/g, "")}`;

  // Scroll to bottom helper
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory, isTyping]);

  // Initial and pathname change logic
  useEffect(() => {
    const hasParams = searchParams.toString().length > 0;
    const initialConfig = getPersonaConfig();
    
    setChatHistory([
      { sender: "agent", text: initialConfig.welcome }
    ]);
    setStep(0);
    setSelections([]);

    if (hasParams) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShowBadge(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Handle choice selection
  const handleSelectOption = (option: { label: string; nextStep: number; copyVal?: string }) => {
    // 1. Add user message
    setChatHistory((prev) => [...prev, { sender: "user", text: option.label }]);
    
    // 2. Save selection for copy summary
    if (option.copyVal) {
      setSelections((prev) => [...prev, option.copyVal as string]);
    }

    // 3. Set typing state
    setIsTyping(true);

    // 4. Advance to next step after simulation
    setTimeout(() => {
      const nextStepIndex = option.nextStep;
      const nextQuestion = config.steps[nextStepIndex].question;
      
      setChatHistory((prev) => [...prev, { sender: "agent", text: nextQuestion }]);
      setStep(nextStepIndex);
      setIsTyping(false);
    }, 900);
  };

  // Build request summary & copy to clipboard on Zalo click
  const handleZaloClick = () => {
    let summary = "";

    if (config.type === "visa") {
      const purposeText = purpose === "study" ? "Du học" : purpose === "visit" ? "Thăm thân" : purpose === "reunion" ? "Đoàn tụ" : "Du lịch";
      summary = `YÊU CẦU TƯ VẤN VISA (ABTRIP):\n` +
                `- Quốc gia cần đến: ${country || "Chưa rõ"}\n` +
                `- Diện thị thực: ${purposeText}\n` +
                `- Khu vực: ${region === "miền bắc" ? "Miền Bắc (Hà Nội)" : region === "miền trung" ? "Miền Trung (Đà Nẵng)" : "Miền Nam (TP. HCM)"}\n` +
                `- Số lượng khách: ${pax || "1"} người\n` +
                `- Lịch sử du lịch: ${selections[0] || "Chưa có thông tin"}\n` +
                `- Mức độ khẩn: ${selections[1] || "Bình thường"}`;
    } else if (config.type === "passport") {
      const subtypeText = subtype === "renew" ? "Gia hạn" : subtype === "lost" ? "Mất làm lại" : "Làm mới";
      summary = `YÊU CẦU LÀM HỘ CHIẾU (ABTRIP):\n` +
                `- Phân loại: ${subtypeText}\n` +
                `- Tốc độ xử lý: ${speed === "urgent" ? "Làm gấp" : "Làm bình thường"}\n` +
                `- Khu vực cư trú: ${region === "miền bắc" ? "Miền Bắc (Hà Nội)" : region === "miền trung" ? "Miền Trung (Đà Nẵng)" : "Miền Nam (TP. HCM)"}\n` +
                `- Số lượng khách: ${pax || "1"} người\n` +
                `- Tài khoản VNeID cấp 2: ${selections[0] || "Chưa rõ"}\n` +
                `- Trạng thái Sim chính chủ: ${selections[1] || "Chưa rõ"}`;
    } else if (config.type === "fasttrack") {
      summary = `YÊU CẦU ĐẶT FASTRACK VIP (ABTRIP):\n` +
                `- Sân bay áp dụng: Sân bay ${airport || "Chưa rõ"}\n` +
                `- Loại đón/tiễn: ${fastrackType === "arrival" ? "Đón VIP (Ga Đến)" : "Tiễn VIP (Ga Đi)"}\n` +
                `- Mã chuyến bay / Ngày: ${flight || "Chưa rõ"} • ${date || "Chưa rõ"}\n` +
                `- Số hành khách: ${pax || "1"} người\n` +
                `- Chặng đón tiễn: ${selections[0] || "Chưa rõ"}\n` +
                `- Hạng mức yêu cầu: ${selections[1] || "Chưa rõ"}`;
    } else if (config.type === "sim") {
      summary = `YÊU CẦU SIM DU LỊCH QUỐC TẾ (ABTRIP):\n` +
                `- Quốc gia cần đi: ${country || "Chưa rõ"}\n` +
                `- Số lượng đặt: ${qty || "1"} SIM\n` +
                `- Loại sim mong muốn: ${selections[0] || "Chưa rõ"}\n` +
                `- Thời lượng chuyến đi: ${selections[1] || "Chưa rõ"}`;
    } else if (config.type === "hotel") {
      summary = `YÊU CẦU ĐẶT PHÒNG KHÁCH SẠN (ABTRIP):\n` +
                `- Địa điểm: ${destination || "Chưa rõ"}\n` +
                `- Thời gian checkin/out: ${checkin || "Chưa rõ"} đến ${checkout || "Chưa rõ"}\n` +
                `- Số phòng: ${rooms || "1"} phòng\n` +
                `- Phân khúc khách sạn: ${selections[0] || "Chưa rõ"}\n` +
                `- Loại hình đoàn khách: ${selections[1] || "Chưa rõ"}`;
    } else if (config.type === "flight") {
      summary = `YÊU CẦU VÉ MÁY BAY DOANH NGHIỆP/ĐOÀN (ABTRIP):\n` +
                `- Loại dịch vụ: ${selections[0] || "Chưa rõ"}\n` +
                `- Chặng bay & Số lượng: ${selections[1] || "Chưa rõ"}`;
    } else {
      summary = `YÊU CẦU TƯ VẤN HỆ SINH THÁI (ABTRIP):\n` +
                `- Nhóm dịch vụ quan tâm: ${selections[0] || "Chưa rõ"}\n` +
                `- Phân loại khách hàng: ${selections[1] || "Chưa rõ"}`;
    }

    try {
      navigator.clipboard.writeText(summary);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <AnimatePresence>
      {!isContactVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none"
        >
          {/* Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="pointer-events-auto bg-slate-900/95 text-white font-bold text-[10px] sm:text-xs rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2 border border-slate-700/50 backdrop-blur-md mb-2 max-w-[280px] text-center"
              >
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                <span>Đã tự động sao chép tóm tắt nhu cầu vào Clipboard!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Speech bubble welcome notification */}
          <AnimatePresence>
            {showBadge && !isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                onClick={() => {
                  setIsOpen(true);
                  setShowBadge(false);
                }}
                className="pointer-events-auto cursor-pointer bg-white text-slate-800 text-[11px] sm:text-xs font-bold px-4 py-3 rounded-2xl rounded-br-none shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-2 select-none hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-all max-w-[260px] animate-bounce"
              >
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping shrink-0" />
                <span>{config.name} đang online. Nhấn để chat tư vấn 1-1!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded chat window */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="pointer-events-auto w-[360px] max-w-[calc(100vw-32px)] h-[500px] max-h-[85vh] bg-white rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden"
              >
                {/* Header section */}
                <div className="bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center font-extrabold text-white text-xs bg-gradient-to-tr ${config.avatarBg} shrink-0 select-none shadow-sm`}>
                        {config.initials}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm leading-tight flex items-center gap-1.5">
                        {config.name} <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      </h4>
                      <p className="text-[10px] text-white/80 font-medium">{config.role}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Message Area */}
                <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70 select-text">
                  {chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2.5 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                    >
                      {msg.sender === "agent" && (
                        <div className={`w-7 h-7 rounded-full border border-slate-200/60 flex items-center justify-center font-extrabold text-white text-[10px] bg-gradient-to-tr ${config.avatarBg} shrink-0 mt-1 select-none`}>
                          {config.initials}
                        </div>
                      )}
                      <div
                        className={`p-3 text-xs sm:text-sm shadow-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-[var(--accent)] text-white rounded-2xl rounded-tr-none"
                            : "bg-white text-slate-800 rounded-2xl rounded-tl-none border border-slate-100"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br/>"),
                        }}
                      />
                    </div>
                  ))}

                  {/* Typing indicator bubble */}
                  {isTyping && (
                    <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                        <div className={`w-7 h-7 rounded-full border border-slate-200/60 flex items-center justify-center font-extrabold text-white text-[10px] bg-gradient-to-tr ${config.avatarBg} shrink-0 select-none`}>
                          {config.initials}
                        </div>
                      <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action / Input Footer */}
                <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                  {config.steps[step]?.options && config.steps[step].options.length > 0 ? (
                    <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                      {config.steps[step].options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(opt)}
                          className="w-full text-left py-2.5 px-3.5 border border-slate-200 bg-white hover:bg-blue-50/30 hover:border-[var(--accent)] hover:text-[var(--accent)] text-[11px] sm:text-xs font-bold rounded-2xl transition-all cursor-pointer text-slate-700 flex items-center justify-between group"
                        >
                          <span>{opt.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3.5 text-center">
                      <a
                        href={zaloUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleZaloClick}
                        className="w-full flex items-center justify-center bg-gradient-to-r from-[#0068ff] to-[#0057d4] text-white font-extrabold text-sm rounded-2xl py-3.5 shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 cursor-pointer pointer-events-auto hover:shadow-xl hover:shadow-blue-500/35"
                      >
                        <svg className="w-5 h-5 fill-current shrink-0 animate-pulse" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 5.8 2 10.5c0 2.8 1.5 5.3 3.9 6.8l-1 3.5c-.1.4.3.7.7.5l4.1-1.8c.8.2 1.6.3 2.3.3 5.5 0 10-3.8 10-8.5S17.52 2 12 2zm-1.8 12.3H8.3v-4.8h1.9v4.8zm3.2 0h-2v-3h2v3zm2.5-2.2h-1.2v2.2h1.2v-2.2z" />
                        </svg>
                        <span>KẾT NỐI ZALO TƯ VẤN NGAY</span>
                      </a>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed px-1">
                        Hệ thống sẽ **tự động sao chép** tóm tắt yêu cầu của bạn. Sang Zalo chỉ cần nhấn **Dán (Ctrl+V)** và gửi cho chúng tôi để được xử lý hồ sơ tức thì.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating button trigger trigger */}
          {!isOpen && (
            <motion.button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setShowBadge(false);
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[var(--accent)] to-[#4291b8] text-white rounded-full shadow-[0_8px_30px_rgba(0,91,150,0.35)] hover:shadow-[0_10px_35px_rgba(0,91,150,0.5)] border border-white/20 transition-all cursor-pointer overflow-visible"
            >
              <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse z-10" />
              <div className={`w-full h-full rounded-full border border-white/20 flex items-center justify-center font-extrabold text-white text-base bg-gradient-to-tr ${config.avatarBg} shrink-0 select-none`}>
                {config.initials}
              </div>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ZaloFloatingButton(props: ZaloFloatingButtonProps) {
  return (
    <Suspense fallback={null}>
      <ZaloFloatingButtonInner {...props} />
    </Suspense>
  );
}
