"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useBlog } from "@/context/BlogContext";
import { BlogPost } from "@/data/blogData";
import { 
  Sparkles, 
  Play, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  TrendingUp, 
  User, 
  Search, 
  Eye,
  Terminal,
  Activity,
  Cpu
} from "lucide-react";

interface Agent {
  name: string;
  role: string;
  avatar: string;
  status: "idle" | "working" | "done";
}

interface KeywordIdea {
  id: string;
  keyword: string;
  volume: string;
  category: "visa-passport" | "airport-vip" | "tours-hotels" | "corporate-b2b" | "travel-guides" | "culinary-culture";
  geo: string;
  postData: Omit<BlogPost, "date" | "readTime" | "category">;
}

const KEYWORD_IDEAS: KeywordIdea[] = [
  {
    id: "passport-child",
    keyword: "Hộ chiếu online cho trẻ em dưới 14 tuổi",
    volume: "18,600 lượt/tháng",
    category: "visa-passport",
    geo: "Toàn quốc",
    postData: {
      slug: "ho-chieu-online-cho-tre-em-duoi-14-tuoi",
      title: "Hướng Dẫn Thủ Tục Làm Hộ Chiếu Online Cho Trẻ Em Dưới 14 Tuổi Mới Nhất 2026",
      excerpt: "Quy trình khai tờ khai xuất nhập cảnh trực tuyến và chuẩn bị hồ sơ làm hộ chiếu phổ thông cho trẻ em dưới 14 tuổi qua tài khoản dịch vụ công của cha mẹ.",
      content: `
        <h2>Thủ tục làm hộ chiếu trực tuyến cho trẻ em dưới 14 tuổi</h2>
        <p>Theo quy định mới nhất của Cục Quản lý xuất nhập cảnh, cha mẹ hoặc người giám hộ hợp pháp hoàn toàn có thể sử dụng tài khoản Dịch vụ công quốc gia hoặc tài khoản VNeID cấp độ 2 của mình để nộp hồ sơ xin cấp hộ chiếu trực tuyến cho trẻ em dưới 14 tuổi mà không cần đưa trẻ đến trực tiếp cơ quan công an.</p>
        
        <h3>1. Các hồ sơ chuẩn bị (Số hóa)</h3>
        <ul>
          <li><strong>Tờ khai mẫu TK01a:</strong> Có xác nhận của Công an xã, phường, thị trấn nơi trẻ thường trú hoặc tạm trú, đóng dấu giáp lai lên ảnh của trẻ.</li>
          <li><strong>Ảnh chân dung của trẻ:</strong> Định dạng 4x6, nền trắng, chụp rõ mặt lộ tai không đeo kính.</li>
          <li><strong>Giấy khai sinh:</strong> File chụp bản chính hoặc bản sao công chứng hợp lệ.</li>
          <li><strong>CCCD/Hộ chiếu của cha mẹ:</strong> Người thực hiện khai báo trên cổng dịch vụ công.</li>
        </ul>

        <h3>2. Các bước khai báo trực tuyến</h3>
        <p>Cha mẹ đăng nhập Cổng dịch vụ công Bộ Công an bằng tài khoản VNeID cấp 2 của mình, tìm dịch vụ "Cấp hộ chiếu phổ thông", chọn trường hợp nộp hồ sơ cho **"Trẻ em dưới 14 tuổi"** và điền đầy đủ các thông tin cá nhân của trẻ dựa trên giấy khai sinh, tải lên các tài liệu số hóa đã chuẩn bị và thanh toán lệ phí 200.000đ sau khi hồ sơ được duyệt thành công.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200",
      tags: ["Hộ Chiếu Trẻ Em", "Làm Hộ Chiếu Online", "VNeID", "ABTRIP"],
      author: {
        name: "Chị Minh Thư",
        role: "Trưởng phòng Hộ tịch & Thị thực",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150"
      }
    }
  },
  {
    id: "lounge-sgn-domestic",
    keyword: "Phòng chờ thương gia Tân Sơn Nhất ga quốc nội",
    volume: "12,400 lượt/tháng",
    category: "airport-vip",
    geo: "Sân bay Tân Sơn Nhất (SGN)",
    postData: {
      slug: "phong-cho-thuong-gia-tan-son-nhat-ga-quoc-noi",
      title: "Đánh Giá Chi Tiết Các Phòng Chờ Thương Gia Tại Ga Quốc Nội Tân Sơn Nhất (SGN)",
      excerpt: "Khám phá không gian ẩm thực, tiện ích thư giãn và cách đặt vé phòng chờ Lotus Lounge, Le Saigonnais ga quốc nội Tân Sơn Nhất với giá ưu đãi Corporate cực tốt.",
      content: `
        <h2>Khám phá các phòng chờ VIP ga Quốc nội Tân Sơn Nhất</h2>
        <p>Đối với chặng bay quốc nội xuất phát từ Sân bay Tân Sơn Nhất (SGN), hành khách có nhu cầu nghỉ ngơi trước chuyến bay có thể trải nghiệm các phòng chờ hạng thương gia đẳng cấp:</p>
        
        <h3>1. Phòng chờ Le Saigonnais (Ga quốc nội)</h3>
        <p>Phòng chờ mang đậm phong cách văn hóa Sài Gòn xưa với thiết kế tinh tế, không gian yên tĩnh tách biệt hoàn toàn với sự ồn ào của sảnh chờ chung ga đi quốc nội. Tại đây phục vụ buffet ẩm thực đậm đà bản sắc Nam Bộ, bia tươi lạnh, quầy bar cafe pha phin và đầy đủ ghế massage thư giãn.</p>

        <h3>2. Phòng chờ Lotus Lounge (VNA)</h3>
        <p>Dành riêng cho hội viên Bông Sen Vàng và hành khách bay hạng thương gia của Vietnam Airlines. Thiết kế hiện đại với tone màu vàng xanh chủ đạo, thực đơn đa dạng và view ngắm trọn vẹn đường băng cất hạ cánh sân bay Tân Sơn Nhất.</p>
        
        <p>Quý khách không cần mua vé bay hạng thương gia vẫn có thể đặt **Mã Code vào cửa phòng chờ VIP** trực tiếp qua ứng dụng đặt dịch vụ sân bay của ABTRIP với mức giá ưu đãi Corporate rẻ hơn 20% so với mua trực tiếp tại quầy check-in phòng chờ.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
      tags: ["Phòng Chờ Thương Gia", "Tân Sơn Nhất", "Lotus Lounge", "Le Saigonnais", "ABTRIP"],
      author: {
        name: "Anh Hoàng Nam",
        role: "Trưởng bộ phận Dịch vụ Hàng không",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
      }
    }
  },
  {
    id: "tour-ha-long-sapa",
    keyword: "Tour ghép miền Bắc Hạ Long Sapa giá rẻ",
    volume: "15,800 lượt/tháng",
    category: "tours-hotels",
    geo: "Hạ Long, Sapa, Hà Nội",
    postData: {
      slug: "kinh-nghiem-tour-ghep-mien-bac-ha-long-sapa",
      title: "Cẩm Nang Đi Tour Ghép Miền Bắc: Khám Phá Kỳ Quan Vịnh Hạ Long & Sapa Sương Mù",
      excerpt: "Kinh nghiệm du lịch ghép đoàn tiết kiệm chi phí, lịch trình chi tiết và bảng giá dịch vụ combo trọn gói nghỉ dưỡng du thuyền Hạ Long kết hợp cáp treo Fansipan.",
      content: `
        <h2>Tour ghép miền Bắc - Lựa chọn du lịch tối ưu tài chính</h2>
        <p>Các tuyến du lịch miền Bắc kết nối Thủ đô Hà Nội - Di sản thiên nhiên thế giới Vịnh Hạ Long - Thị trấn sương mù Sapa luôn là cung đường vàng đối với du khách miền Nam và khách quốc tế. Việc lựa chọn hình thức **Tour ghép đoàn** sẽ giúp bạn tiết kiệm đến 40% chi phí vận chuyển xe và hướng dẫn viên so với đi tour riêng.</p>
        
        <h3>1. Lịch trình vàng 5 Ngày 4 Đêm</h3>
        <p>Lịch trình được thiết kế khoa học: Ngày 1 - Khám phá phố cổ Hà Nội; Ngày 2 & 3 - Di chuyển đi Hạ Long nghỉ dưỡng trên du thuyền 4 sao cao cấp; Ngày 4 & 5 - Đi xe Limousine lên Sapa chinh phục đỉnh Fansipan bằng cáp treo và tham quan Bản Cát Cát.</p>

        <h3>2. Những dịch vụ đã bao gồm trong tour ghép ABTRIP</h3>
        <p>Đăng ký tour ghép cùng ABTRIP, bạn được an tâm tuyệt đối với dịch vụ trọn gói chất lượng cao: Xe limousine khứ hồi đời mới, phòng nghỉ du thuyền vịnh Hạ Long, khách sạn 4 sao trung tâm Sapa, ăn uống theo chương trình đặc sản địa phương và bảo hiểm du lịch suốt hành trình.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200",
      tags: ["Tour Ghép Miền Bắc", "Vịnh Hạ Long", "Sapa", "Du Thuyền Hạ Long", "ABTRIP"],
      author: {
        name: "Chị Khánh Vy",
        role: "Quản lý Phòng & Tour Cao cấp",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
      }
    }
  },
  {
    id: "vat-corporate",
    keyword: "Xuất hóa đơn VAT vé máy bay doanh nghiệp",
    volume: "9,200 lượt/tháng",
    category: "corporate-b2b",
    geo: "Doanh nghiệp toàn quốc",
    postData: {
      slug: "xuat-hoa-don-vat-ve-may-bay-tu-dong-doanh-nghiep",
      title: "Giải Pháp Xuất Hóa Đơn VAT Vé Máy Bay Tự Động Định Kỳ Cho Doanh Nghiệp B2B",
      excerpt: "Làm thế nào để bộ phận kế toán giải quyết triệt để vấn đề thu thập, đối soát hóa đơn vé máy bay công tác lẻ tẻ? Khám phá giải pháp xuất hóa đơn gộp tự động của ABTRIP.",
      content: `
        <h2>Tối ưu hóa đối soát hóa đơn VAT vé máy bay</h2>
        <p>Đối với phòng kế toán doanh nghiệp, việc phải tiếp nhận hàng chục hóa đơn điện tử vé máy bay từ nhiều hãng hàng không khác nhau (Vietnam Airlines, Vietjet, Bamboo) do nhân viên đi công tác gửi về mỗi tháng là một cực hình hành chính. Các hóa đơn thường dễ bị thất lạc, khai sai mã số thuế hoặc trễ hạn khai thuế VAT.</p>
        
        <h3>Giải pháp xuất hóa đơn gộp tự động B2B tại ABTRIP</h3>
        <p>Khi ký hợp đồng đại lý Corporate với ABTRIP, toàn bộ các chặng bay phát sinh trong tháng của tất cả nhân viên sẽ được gộp chung vào một bảng đối soát định kỳ. ABTRIP sẽ **xuất một hóa đơn VAT tổng hợp duy nhất** ghi nhận đầy đủ chi phí hợp lệ của doanh nghiệp, giúp rút ngắn thời gian đối soát kế toán xuống còn vài phút và đảm bảo 100% hóa đơn hợp lệ trước cơ quan Thuế.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
      tags: ["Hóa Đơn VAT Vé Máy Bay", "Kế Toán Doanh Nghiệp", "Corporate B2B", "ABTRIP"],
      author: {
        name: "Anh Quốc Đạt",
        role: "Trưởng nhóm Khách hàng Doanh nghiệp B2B",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150"
      }
    }
  }
];

export default function AgentsPage() {
  const { addBlogPost, posts } = useBlog();
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>(KEYWORD_IDEAS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<Array<{ sender: string; avatar: string; role: string; message: string; delay: number }>>([]);
  const [generatedPost, setGeneratedPost] = useState<BlogPost | null>(null);

  const activeKeywordObj = KEYWORD_IDEAS.find(k => k.id === selectedKeywordId) || KEYWORD_IDEAS[0];

  // AI Agents definition
  const [agents, setAgents] = useState<Agent[]>([
    { name: "Anh Hoàng Minh", role: "SEO Strategist", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150", status: "idle" },
    { name: "Chị Mai Phương", role: "Content Writer", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150", status: "idle" },
    { name: "Em Duy Anh", role: "Visual Editor", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150", status: "idle" },
    { name: "Chị Thu Trang", role: "SEO Auditor & Publisher", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150", status: "idle" }
  ]);

  const runAgentWorkflow = () => {
    if (isProcessing) return;
    
    // Check if post already exists in context to prevent duplicates
    const checkSlug = activeKeywordObj.postData.slug;
    if (posts.some(p => p.slug === checkSlug)) {
      alert("Bài viết với chủ đề này đã tồn tại trên trang Blog. Vui lòng chọn chủ đề khác!");
      return;
    }

    setIsProcessing(true);
    setCurrentStep(1);
    setLogs([]);
    setGeneratedPost(null);

    // Reset agents status
    setAgents(prev => prev.map(a => ({ ...a, status: "idle" })));

    // Simulating sequence of agents communicating
    const script = [
      {
        step: 1,
        agentIdx: 0,
        message: `Phân tích từ khóa "${activeKeywordObj.keyword}" cho thấy xu hướng tìm kiếm đang tăng mạnh (Volume: ${activeKeywordObj.volume}). Tôi đã thiết lập định hướng SEO cho khu vực mục tiêu: ${activeKeywordObj.geo}. Gửi cấu trúc dàn ý bài viết chuẩn SEO cho bộ phận Content.`,
        duration: 2000
      },
      {
        step: 2,
        agentIdx: 1,
        message: `Đã nhận dàn ý từ Anh Minh. Bắt đầu viết nội dung bài viết: "${activeKeywordObj.postData.title}"... Đang tự động chèn các từ khóa SEO mục tiêu mật độ 1.8%, lồng ghép khéo léo dịch vụ tư vấn hàng đầu của ABTRIP giúp giải quyết bài toán của khách hàng. Bài viết nháp đã hoàn tất!`,
        duration: 2500
      },
      {
        step: 3,
        agentIdx: 2,
        message: `Bản nháp rất tuyệt chị Phương ơi! Em đã thực hiện tìm kiếm ảnh Unsplash chất lượng cao tương thích làm ảnh bìa bìa đại diện, đồng thời tối ưu hóa các thẻ tiêu đề H2/H3 và gắn thẻ mô tả alt cho hình ảnh để bot Google quét dữ liệu tốt nhất.`,
        duration: 2000
      },
      {
        step: 4,
        agentIdx: 3,
        message: `Đang chạy bộ kiểm duyệt SEO tự động: Mật độ từ khóa đạt chuẩn; Thẻ mô tả (meta description) có chứa từ khóa chính; Kiểm tra định dạng HTML hoàn toàn chính xác. Báo cáo: Bài viết đã được XUẤT BẢN THÀNH CÔNG lên hệ thống ABTRIP Magazine!`,
        duration: 2000
      }
    ];

    let accumulatedTime = 0;

    script.forEach((item, index) => {
      setTimeout(() => {
        // Update active agent status
        setAgents(prev => {
          const next = [...prev];
          next.forEach((a, i) => {
            if (i === item.agentIdx) next[i].status = "working";
            else if (i < item.agentIdx) next[i].status = "done";
          });
          return next;
        });

        // Add log entry
        const currentAgent = agents[item.agentIdx];
        setLogs(prev => [...prev, {
          sender: currentAgent.name,
          avatar: currentAgent.avatar,
          role: currentAgent.role,
          message: item.message,
          delay: item.duration
        }]);

        setCurrentStep(item.step);

        // Final step actions
        if (index === script.length - 1) {
          setTimeout(() => {
            setAgents(prev => prev.map(a => ({ ...a, status: "done" })));
            
            // Generate full BlogPost object
            const today = new Date();
            const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
            
            const newPost: BlogPost = {
              ...activeKeywordObj.postData,
              category: activeKeywordObj.category,
              date: formattedDate,
              readTime: "5 phút đọc"
            };

            addBlogPost(newPost);
            setGeneratedPost(newPost);
            setIsProcessing(false);
          }, item.duration);
        }

      }, accumulatedTime);

      accumulatedTime += item.duration + 800; // adding gap between messages
    });

  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-24">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        
        {/* Breadcrumbs & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 font-semibold">AI Agents Controller</span>
          </div>

          <Link href="/blog" className="inline-flex items-center text-slate-600 hover:text-blue-600 text-xs font-bold transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm self-start md:self-auto">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại trang tin tức
          </Link>
        </div>

        {/* Page Title Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-3 py-1">
              <Cpu className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Hệ thống AI Agents tự động hóa</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-be">Trung Tâm Điều Hành AI Blog Operators</h1>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Lựa chọn từ khóa xu hướng do SEO Strategist đề xuất, kích hoạt quy trình robot AI cộng tác chéo để sản xuất, biên tập và phân phối bài viết chuẩn SEO/GEO tự động lên trang tạp chí ABTRIP.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
            <div className="relative">
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="block w-3 h-3 rounded-full bg-emerald-500"></span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase leading-none block">Hệ thống</span>
              <span className="text-xs font-bold text-slate-700">Đang hoạt động 24/7</span>
            </div>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Keywords Selection & Process Control */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Keywords Selector Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-be">Từ khóa đề xuất thị hành</h3>
              </div>
              
              <div className="space-y-3">
                {KEYWORD_IDEAS.map(idea => (
                  <button
                    key={idea.id}
                    disabled={isProcessing}
                    onClick={() => setSelectedKeywordId(idea.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer group ${
                      selectedKeywordId === idea.id
                        ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500"
                        : "border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                    } ${isProcessing ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <span className={`text-[11px] font-bold transition-colors line-clamp-2 ${
                        selectedKeywordId === idea.id ? "text-blue-700" : "text-slate-700 group-hover:text-slate-900"
                      }`}>
                        {idea.keyword}
                      </span>
                    </div>

                    <div className="flex items-center justify-between w-full pt-3 mt-3 border-t border-slate-100/50 text-[9px] font-bold text-slate-400">
                      <span>Vol: <span className="text-slate-600">{idea.volume}</span></span>
                      <span>GEO: <span className="text-slate-600">{idea.geo}</span></span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Start Button */}
              <button
                disabled={isProcessing}
                onClick={runAgentWorkflow}
                className={`w-full py-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                  isProcessing
                    ? "bg-slate-400 shadow-none cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-102 active:scale-98 shadow-blue-500/10"
                }`}
              >
                <Play className="w-4 h-4 fill-white" />
                KÍCH HOẠT QUY TRÌNH VIẾT BÀI
              </button>
            </div>

            {/* AI Agents Panel */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <Activity className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-be">Danh sách AI Agents trực ban</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {agents.map((agent, idx) => (
                  <div 
                    key={agent.name} 
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center space-y-2 transition-all ${
                      agent.status === "working"
                        ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500 scale-102"
                        : agent.status === "done"
                        ? "border-emerald-300 bg-emerald-50/20"
                        : "border-slate-100 bg-slate-50/50"
                    }`}
                  >
                    <div className="relative">
                      <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                      <span className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                        agent.status === "working"
                          ? "bg-blue-500 animate-pulse"
                          : agent.status === "done"
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }`}></span>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-800 leading-tight">{agent.name}</h4>
                      <p className="text-[8px] text-slate-400 font-medium">{agent.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: Terminal activity & Output log */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Simulation Terminal */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[400px]">
              {/* Terminal Header */}
              <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span>abtrip-agents-orchestrator.log</span>
                </div>
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 flex-grow overflow-y-auto font-mono text-[11px] text-slate-300 space-y-4">
                {logs.length === 0 && !isProcessing && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-3 font-sans py-12">
                    <Cpu className="w-8 h-8 text-slate-700" />
                    <p className="max-w-xs text-xs">
                      Hệ thống đang chờ lệnh... Chọn một chủ đề gợi ý bên trái và nhấn nút kích hoạt để xem các Agent làm việc.
                    </p>
                  </div>
                )}

                {logs.map((log, idx) => (
                  <div key={idx} className="space-y-1.5 border-l-2 border-slate-800 pl-4 py-0.5">
                    <div className="flex items-center space-x-2">
                      <img src={log.avatar} alt={log.sender} className="w-5 h-5 rounded-full object-cover border border-slate-800" />
                      <span className="text-blue-400 font-bold">{log.sender}</span>
                      <span className="text-slate-600">({log.role})</span>
                      <span className="text-slate-500">[{log.delay}ms]</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-7">{log.message}</p>
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex items-center space-x-2 text-blue-400 animate-pulse pl-4">
                    <span>&gt;_</span>
                    <span>Đang xử lý bước tiếp theo...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Generated Post Output Card */}
            {generatedPost && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 shadow-sm space-y-6"
              >
                <div className="flex items-center space-x-3 text-emerald-700">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm font-be">XUẤT BẢN THÀNH CÔNG!</h3>
                    <p className="text-[10px] text-emerald-600 font-medium">Bài viết mới đã được cập nhật trực tiếp lên luồng dữ liệu trang chủ Blog.</p>
                  </div>
                </div>

                {/* Published Post Preview */}
                <div className="bg-white rounded-2xl border border-slate-200/50 p-4 flex gap-4 items-center shadow-sm">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img src={generatedPost.coverImage} alt={generatedPost.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1.5 flex-grow">
                    <span className="bg-slate-100 text-slate-600 text-[8px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {generatedPost.category === "visa-passport" && "Thị thực & Hộ tịch"}
                      {generatedPost.category === "airport-vip" && "Dịch vụ Sân bay VIP"}
                      {generatedPost.category === "tours-hotels" && "Tour & Khách sạn"}
                      {generatedPost.category === "corporate-b2b" && "Doanh nghiệp B2B"}
                      {generatedPost.category === "travel-guides" && "Cẩm nang & Điểm đến"}
                      {generatedPost.category === "culinary-culture" && "Ẩm thực & Văn hóa"}
                    </span>
                    <h4 className="font-bold text-xs text-slate-800 line-clamp-1 leading-snug font-be">{generatedPost.title}</h4>
                    <p className="text-[10px] text-slate-400 font-light line-clamp-2 leading-relaxed">{generatedPost.excerpt}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[9px] text-slate-400 font-bold">{generatedPost.date}</span>
                      <Link href={`/blog/${generatedPost.slug}`} className="text-blue-600 hover:text-blue-700 font-bold text-[10px] inline-flex items-center gap-0.5 cursor-pointer">
                        Đọc bài viết <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link 
                    href={`/blog/${generatedPost.slug}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer inline-flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-2" /> Đọc bài viết chi tiết
                  </Link>
                  <Link 
                    href="/blog"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer inline-flex items-center"
                  >
                    Xem trên dòng thời gian Blog
                  </Link>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

// Chevron icon helper
function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
