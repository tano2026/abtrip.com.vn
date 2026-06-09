"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Check, Phone, ArrowRight } from "lucide-react";

interface ContactFormProps {
  serviceName: string;
  initialNote?: string;
}

interface Message {
  sender: "agent" | "user";
  text: string;
}

export default function ContactForm({ serviceName, initialNote = "" }: ContactFormProps) {
  const phone = "0915849016";
  const cleanPhone = phone.replace(/\s+/g, "");
  const zaloUrl = `https://zalo.me/${cleanPhone}`;

  // Get dynamic persona details based on serviceName
  const getPersona = () => {
    const name = serviceName.toLowerCase();
    
    // 1. Vé máy bay (Flights)
    if (
      name.includes("vé máy bay") || 
      name.includes("ve-may-bay") || 
      name.includes("flight") || 
      name.includes("chặng bay")
    ) {
      return {
        name: "Anh Tiệp",
        role: "Trực Page Vé máy bay B2B & Đoàn",
        initials: "T",
        avatarBg: "from-slate-650 to-slate-800",
        welcome: "Dạ em chào anh/chị ạ! Em là **Tiệp**, đang trực hỗ trợ đặt **Vé máy bay doanh nghiệp & Vé đoàn** đây ạ. 😎\n\nKhông biết mình cần báo giá chặng bay nào hay cần tư vấn chính sách công nợ doanh nghiệp thế ạ? Nhắn em hỗ trợ tức thì nhé ạ!",
        quickReplies: [
          "Tư vấn báo giá vé đoàn",
          "Chính sách công nợ TMC",
          "Tích hợp API dữ liệu vé",
          "Yêu cầu báo giá khẩn"
        ]
      };
    }

    // 2. Các dịch vụ liên quan đến sân bay hoặc mặt đất (Airport / Ground services)
    if (
      name.includes("sân bay") || 
      name.includes("san bay") || 
      name.includes("fastrack") || 
      name.includes("check-in") || 
      name.includes("check in") || 
      name.includes("đón tiễn") || 
      name.includes("don tien") || 
      name.includes("phòng chờ") || 
      name.includes("phong cho") || 
      name.includes("lounge") || 
      name.includes("ngoại tệ") || 
      name.includes("ngoai te") || 
      name.includes("mặt đất") || 
      name.includes("mat dat") || 
      name.includes("mat-dat") || 
      name.includes("chuyên cơ") || 
      name.includes("chuyen co") || 
      name.includes("chuyen-co") || 
      name.includes("phi hành đoàn") || 
      name.includes("phi-hanh-doan") || 
      name.includes("phi hanh doan") || 
      name.includes("cấp phép bay") || 
      name.includes("cap phep bay") || 
      name.includes("cap-phep-bay") || 
      name.includes("đại diện") || 
      name.includes("dai dien") || 
      name.includes("kỹ thuật") || 
      name.includes("ky thuat")
    ) {
      return {
        name: "Anh Kiên",
        role: "Trực Dịch vụ Sân bay & Mặt đất VIP",
        initials: "K",
        avatarBg: "from-blue-400 to-indigo-600",
        welcome: "Dạ em chào anh/chị ạ! Em là **Kiên**, đang trực hỗ trợ dịch vụ **Sân bay & Mặt đất VIP** đây ạ. 😎\n\nKhông biết chuyến bay sắp tới của mình là ngày nào và ở sân bay nào thế ạ? Nhắn em hỗ trợ sắp xếp lịch xe và nhân sự đón mình nhé!",
        quickReplies: [
          "Gói đón VIP nhập cảnh nhanh",
          "Gói tiễn VIP kèm phòng chờ thương gia",
          "Báo giá Fastrack sân bay Tân Sơn Nhất/Nội Bài",
          "Dịch vụ hỗ trợ người già/trẻ em bay một mình"
        ]
      };
    }

    // 3. Du lịch và tiện ích du lịch (Tour, Khách sạn, Visa, Hộ chiếu, SIM...)
    if (name.includes("hộ chiếu") || name.includes("passport")) {
      return {
        name: "Chị Vân Anh",
        role: "Trực hỗ trợ Hộ chiếu trực tuyến",
        initials: "VA",
        avatarBg: "from-purple-400 to-pink-500",
        welcome: "Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực hỗ trợ thủ tục **Hộ chiếu trực tuyến** đây ạ. 🥰\n\nKhông biết mình cần làm mới, gia hạn hay bị mất làm lại thế ạ? Nhắn em hỗ trợ xem hồ sơ nhanh cho mình nhé ạ!",
        quickReplies: [
          "Cần làm khẩn lấy gấp",
          "Phí trọn gói hết bao nhiêu?",
          "Hướng dẫn tự khai online",
          "Cần chuyên viên làm hộ từ A-Z"
        ]
      };
    }
    
    if (name.includes("visa") || name.includes("thị thực")) {
      return {
        name: "Chị Vân Anh",
        role: "Trực hỗ trợ Thị thực quốc tế",
        initials: "VA",
        avatarBg: "from-purple-400 to-pink-500",
        welcome: "Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực page hỗ trợ dịch vụ **Visa các nước** đây ạ. 🥰\n\nKhông biết mình đang quan tâm xin visa đi nước nào và diện du lịch hay du học/thăm thân thế ạ? Nhắn em hỗ trợ check nhanh tỷ lệ đậu cho mình nha!",
        quickReplies: [
          "Visa du lịch các nước khó",
          "Cần làm khẩn đi gấp",
          "Phí trọn gói bao nhiêu?",
          "Hồ sơ trắng có đỗ được không?"
        ]
      };
    }
    
    if (name.includes("khách sạn") || name.includes("hotel") || name.includes("phòng")) {
      return {
        name: "Chị Vân Anh",
        role: "Trực hỗ trợ Đặt Phòng & Resort",
        initials: "VA",
        avatarBg: "from-purple-400 to-pink-500",
        welcome: "Dạ em chào anh/chị! Em là **Vân Anh**, đang trực hỗ trợ đặt phòng khách sạn/resort cho ABTRIP đây ạ. 🥰\n\nAnh/chị đang dự kiến đi nghỉ dưỡng ở đâu thế ạ? Nhắn em check nhanh quỹ phòng đại lý giá tốt nhất cho mình nhé!",
        quickReplies: [
          "Check giá Vinpearl Phú Quốc/Nha Trang",
          "Check giá resort 4 - 5 sao sát biển",
          "Báo giá phòng đoàn đông người",
          "Tư vấn voucher nghỉ dưỡng hot"
        ]
      };
    }
    
    if (name.includes("sim") || name.includes("wifi")) {
      return {
        name: "Chị Vân Anh",
        role: "Trực hỗ trợ SIM & eSIM du lịch",
        initials: "VA",
        avatarBg: "from-purple-400 to-pink-500",
        welcome: "Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực hỗ trợ đặt **SIM/eSIM du lịch quốc tế** đây ạ. 🥰\n\nKhông biết mình chuẩn bị đi nước nào thế ạ? Nhắn em tư vấn nhanh các gói cước Data tốc độ cao phù hợp nhất nha!",
        quickReplies: [
          "Gói eSIM nhận mã QR sau 5 phút",
          "SIM vật lý giao tận nhà",
          "Gói Data đi Mỹ / Châu Âu",
          "Gói Data đi Nhật / Hàn"
        ]
      };
    }

    // Mặc định chung cho các dịch vụ du lịch khác
    return {
      name: "Chị Vân Anh",
      role: `Trực hỗ trợ tư vấn ${serviceName}`,
      initials: "VA",
      avatarBg: "from-purple-400 to-pink-500",
      welcome: `Dạ em chào anh/chị ạ! Em là **Vân Anh**, đang trực hỗ trợ mảng **${serviceName}** của ABTRIP đây ạ. 🥰\n\nAnh/chị cần em hỗ trợ giải đáp thông tin chặng dịch vụ hay nhận báo giá đoàn chiết khấu sâu thế ạ? Nhắn em hỗ trợ tức thì nhé ạ!`,
      quickReplies: [
        "Tư vấn báo giá chi tiết",
        "Chính sách chiết khấu/hạn mức",
        "Kết nối Zalo trực tiếp 1-1",
        "Yêu cầu riêng đặc biệt"
      ]
    };
  };

  const persona = getPersona();

  // Chat states
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize chat history on mount or serviceName change
  useEffect(() => {
    setChatHistory([
      { sender: "agent", text: persona.welcome }
    ]);
    setStepCount(0);
  }, [serviceName]);

  // Scroll to bottom helper
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory, isTyping]);

  // Smart client-side humanized responses
  const getHumanizedResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes("giá") || text.includes("phí") || text.includes("tiền") || text.includes("bao nhiêu")) {
      return "Dạ, phí dịch vụ sẽ tùy thuộc vào diện hồ sơ thường hay khẩn và khu vực hỗ trợ của mình nữa á anh/chị. Bình thường phí bên em rất tối ưu, có chính sách chiết khấu cho nhóm nữa ạ. Mình dự định khi nào đi và đi mấy người để em tính toán giá nét nhất cho mình nha?";
    }
    if (text.includes("gấp") || text.includes("khẩn") || text.includes("nhanh") || text.includes("khẩn cấp")) {
      return "Dạ diện khẩn bên em xử lý siêu tốc luôn ạ! Hồ sơ làm nhanh chỉ mất 1-3 ngày làm việc là nhận kết quả rồi ạ. Không biết chặng bay sắp tới của mình là ngày mấy thế ạ, để em check tiến trình xem có kịp chuẩn bị không ạ?";
    }
    if (text.includes("vneid") || text.includes("định danh") || text.includes("cấp 2")) {
      return "Dạ đúng rồi ạ, hiện tại nộp qua cổng DVC bắt buộc phải có tài khoản VNeID cấp độ 2 đã kích hoạt thành công á. App của anh/chị có gặp lỗi đồng bộ số điện thoại chính chủ hay lỗi quét khuôn mặt không? Nói em hỗ trợ kiểm tra nha.";
    }
    if (text.includes("mất") || text.includes("hỏng") || text.includes("rách") || text.includes("mất hộ chiếu")) {
      return "Dạ bị mất hộ chiếu thì trong vòng 48h mình phải làm tờ trình báo mất online trên cổng Dịch vụ công để hủy giá trị hộ chiếu cũ trước đã á anh/chị, tránh trường hợp bị lạm dụng thông tin. Mình đã nộp đơn báo mất chưa ạ để em hướng dẫn mẫu khai?";
    }
    if (text.includes("địa chỉ") || text.includes("ở đâu") || text.includes("văn phòng")) {
      return "Dạ văn phòng chính của ABTRIP nằm ở Hà Nội và TP.HCM ạ. Cơ mà toàn bộ quy trình làm thủ tục bây giờ đều có thể xử lý online từ xa và chuyển phát nhanh tận nhà, anh/chị không cần đi lại nộp trực tiếp đâu cho đỡ mệt ạ. Em lo trọn gói từ A-Z luôn.";
    }
    if (text.includes("esim") || text.includes("sim")) {
      return "Dạ bên em có đủ cả SIM vật lý giao tận nơi lẫn eSIM nhận mã QR kích hoạt sau 5 phút cực kỳ tiện ạ. Mình muốn dùng eSIM hay SIM vật lý thông thường thế ạ? Đi bao nhiêu ngày nhắn em tư vấn gói cước tốc độ cao không giới hạn nha!";
    }
    if (text.includes("vinpearl") || text.includes("phú quốc") || text.includes("nha trang") || text.includes("phòng") || text.includes("resort")) {
      return "Dạ bên em đang là đại lý chiến lược của Vinpearl và Sun Group nên luôn có quỹ phòng giá đặc quyền chiết khấu sâu 20-30% á anh/chị. Mình tính đi nghỉ dưỡng mấy ngày và số lượng thành viên thế nào ạ để em check trống và book liền?";
    }

    return "Dạ em hiểu rồi ạ! Để tiện trao đổi chi tiết, gửi các file tài liệu mẫu (file ảnh, form mẫu khai) cũng như check trực tiếp hồ sơ giúp mình, anh/chị kết nối Zalo với em nha. Chat trên web này thỉnh thoảng bị lỗi load lại trang là trôi mất tin nhắn á. Em đang trực Zalo để gửi file luôn cho mình đây ạ! 🥰";
  };

  // Process sending message
  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // 1. Add user message
    setChatHistory((prev) => [...prev, { sender: "user", text }]);
    setStepCount((prev) => prev + 1);

    // 2. Simulate typing and respond
    setIsTyping(true);
    setTimeout(() => {
      const responseText = getHumanizedResponse(text);
      setChatHistory((prev) => [...prev, { sender: "agent", text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  // Submit from text input
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText("");
  };

  // Handle click on quick reply
  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  // Hand-off to Zalo with clipboard summary copy
  const handleZaloHandOff = () => {
    // Generate chat history transcript
    const transcript = chatHistory
      .map((msg) => `${msg.sender === "agent" ? "Tư vấn viên" : "Khách hàng"}: ${msg.text.replace(/\*\*/g, "")}`)
      .join("\n");

    const summaryText = `TÓM TẮT HỘI THOẠI YÊU CẦU DỊCH VỤ (${serviceName.toUpperCase()}):\n\n` +
                        `${transcript}\n\n` +
                        `-----------------------\n` +
                        `Nguồn: Yêu cầu từ Form trực page ABTRIP.vn`;

    try {
      navigator.clipboard.writeText(summaryText);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/40 border-t border-slate-100" id="lien-he">
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Clipboard copy toast notification */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed bottom-6 right-6 z-50 pointer-events-auto bg-slate-900/95 text-white font-bold text-[10px] sm:text-xs rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2 border border-slate-700/50 backdrop-blur-md max-w-[280px] text-center select-none">
            <Check className="w-4 h-4 text-green-400 shrink-0" />
            <span>Đã tự động sao chép tóm tắt nội dung trao đổi vào bộ nhớ đệm!</span>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <span className="inline-flex items-center space-x-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Tư vấn trực tuyến 24/7</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Trao đổi trực tiếp với <span className="text-gradient-gold">{persona.name}</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-light mt-1">
            Không cần điền biểu mẫu rườm rà. Nhắn tin trực tiếp dưới đây để nhận phản hồi nhanh từ nhân viên trực ban.
          </p>
        </div>

        {/* Embedded Chat Box Container */}
        <div className="bg-white rounded-3xl shadow-[0_15px_45px_rgba(0,91,150,0.1)] border border-slate-150 flex flex-col h-[500px] overflow-hidden">
          {/* Chat Panel Header */}
          <div className="bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center font-extrabold text-white text-xs bg-gradient-to-tr ${persona.avatarBg} shrink-0 select-none`}>
                  {persona.initials}
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm leading-tight flex items-center gap-1.5">
                  {persona.name} <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </h4>
                <p className="text-[10px] text-white/80 font-medium">{persona.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold">
              <Phone className="w-3 h-3 text-green-300 animate-pulse" /> Hotline: {phone}
            </div>
          </div>

          {/* Chat Panel Body (Scrollable Messages) */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 select-text">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {msg.sender === "agent" && (
                    <div className={`w-7 h-7 rounded-full border border-slate-200/60 flex items-center justify-center font-extrabold text-white text-[10px] bg-gradient-to-tr ${persona.avatarBg} shrink-0 mt-1 select-none`}>
                      {persona.initials}
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

            {/* Simulated human typing delay dots */}
            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <div className={`w-7 h-7 rounded-full border border-slate-200/60 flex items-center justify-center font-extrabold text-white text-[10px] bg-gradient-to-tr ${persona.avatarBg} shrink-0 select-none`}>
                  {persona.initials}
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Panel Footer (Input & Quick Replies) */}
          <div className="p-3 bg-white border-t border-slate-100 shrink-0">
            {stepCount < 2 ? (
              <div className="space-y-3">
                {/* Quick replies buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {persona.quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickReply(reply)}
                      className="text-[10px] sm:text-xs bg-slate-50 hover:bg-blue-50/50 text-slate-700 hover:text-[var(--accent)] border border-slate-200 hover:border-[var(--accent)] font-semibold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* Text message input form */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn tại đây..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:border-[var(--accent)] focus:bg-white transition-all placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="bg-[var(--accent)] hover:bg-[#4291b8] text-white p-3 rounded-xl transition-all flex items-center justify-center cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              // Handoff to Zalo directly
              <div className="space-y-3 text-center">
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleZaloHandOff}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-[#0068ff] to-[#0057d4] text-white font-extrabold text-sm rounded-2xl py-3.5 shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 cursor-pointer pointer-events-auto hover:shadow-xl hover:shadow-blue-500/35"
                >
                  <svg className="w-5 h-5 fill-current shrink-0 animate-pulse" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.8 2 10.5c0 2.8 1.5 5.3 3.9 6.8l-1 3.5c-.1.4.3.7.7.5l4.1-1.8c.8.2 1.6.3 2.3.3 5.5 0 10-3.8 10-8.5S17.52 2 12 2zm-1.8 12.3H8.3v-4.8h1.9v4.8zm3.2 0h-2v-3h2v3zm2.5-2.2h-1.2v2.2h1.2v-2.2z" />
                  </svg>
                  <span>MỞ CHAT ZALO TƯ VẤN 1-1 NGAY</span>
                </a>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed px-1">
                  Trợ lý đã **tự động sao chép** tóm tắt cuộc trao đổi. Sang Zalo, bạn chỉ cần nhấn **Dán (Ctrl+V)** và gửi đi để tư vấn viên trực Zalo tiếp tục xử lý hồ sơ tức thì cho mình nhé ạ!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
