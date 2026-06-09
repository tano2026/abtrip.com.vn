"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { UserCheck, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Xe Đưa Đón Tổ Bay Chuyên Dụng",
      description: "Hệ thống xe du lịch đời mới sang trọng, có đăng ký thẻ ra vào sân đỗ máy bay, đưa đón phi hành đoàn trực tiếp từ chân thang máy bay về khách sạn lưu trú.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Lưu Trú Khách Sạn 4 - 5 Sao",
      description: "Hợp tác với mạng lưới khách sạn lớn gần sân bay, cung cấp không gian nghỉ ngơi yên tĩnh tối đa, cách âm hoàn hảo giúp tổ bay phục hồi thể lực nhanh chóng.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Thủ Tục CIQ Ưu Tiên Nhanh Chóng",
      description: "Chuyên viên hỗ trợ làm thủ tục thông quan Hải quan, Biên phòng, An ninh (CIQ) luồng ưu tiên riêng biệt cho phi công và tiếp viên hàng không.",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Giải Pháp Hậu Cần Tổ Bay Chuyên Nghiệp & Khép Kín",
      description: "Sau những giờ bay căng thẳng và mệt mỏi, sự nghỉ ngơi chu đáo là yếu tố sống còn giúp phi hành đoàn duy trì trạng thái tỉnh táo tốt nhất cho các chặng bay tiếp theo. Dịch vụ hậu cần phi hành đoàn (Crew Support & Logistics) của ABTRIP mang đến quy trình phục vụ khép kín từ lúc tàu bay chạm bánh xuống đường băng. Chúng tôi điều phối phương tiện đưa đón riêng biệt tại sân đỗ, hỗ trợ thủ tục kiểm soát biên phòng CIQ ưu tiên nhanh chóng và sắp xếp các khách sạn lưu trú đạt chuẩn hàng không quốc tế.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
      bullets: [
        "Đón tiễn tổ bay sát chân thang máy bay an toàn",
        "Thủ tục thông quan CIQ ưu tiên trong vòng 5 - 10 phút",
        "Hỗ trợ khai báo y tế và tờ khai hải quan tổ bay trọn gói",
        "Đội ngũ điều phối viên túc trực hỗ trợ 24/7/365 tại sân bay"
      ]
    },
    {
      title: "Quản Lý Lưu Trú Khách Sạn (Crew Hotel) & Ẩm Thực Tối Ưu",
      description: "ABTRIP liên kết chặt chẽ với hệ thống khách sạn đạt chuẩn 4-5 sao sát sân bay hoặc tại trung tâm thành phố. Các phòng lưu trú được thiết kế biệt lập, đảm bảo yên tĩnh tối đa để tổ bay có giấc ngủ sâu không bị làm phiền. Đồng thời, chúng tôi cung cấp các suất ăn dinh dưỡng phục vụ linh hoạt theo giờ bay riêng biệt của phi hành đoàn, cùng dịch vụ giặt ủi đồng phục khẩn cấp lấy nhanh.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
      bullets: [
        "Hợp đồng giá Corporate ưu đãi đặc quyền cho hãng bay",
        "Quy trình check-in/check-out ưu tiên nhanh chóng cho đoàn bay",
        "Suất ăn dinh dưỡng đa dạng theo thực đơn tự chọn của phi công",
        "Dịch vụ giặt là đồng phục phi hành đoàn lấy nhanh trong ngày"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói Hậu Cần Cơ Bản (Basic Crew Support)",
      price: "Báo giá theo quy mô tổ bay",
      description: "Hỗ trợ các thủ tục sân bay và vận chuyển đưa đón cơ bản",
      features: [
        "Đón tiếp tổ bay trực tiếp tại cửa ống lồng/chân thang",
        "Thực hiện thủ tục CIQ ưu tiên cho phi công & tiếp viên",
        "Xe đưa đón chuyên dụng từ sân đỗ về khách sạn",
        "Hỗ trợ thủ tục check-in nhanh tại khách sạn lưu trú",
        "Đường dây nóng hỗ trợ khẩn cấp 24/7"
      ],
      popular: false
    },
    {
      name: "Gói Chăm Sóc Trọn Gói (Full Crew Care)",
      price: "Báo giá theo lượt chuyến bay / tháng",
      description: "Giải pháp hậu cần và lưu trú khép kín trọn gói cao cấp",
      features: [
        "Hỗ trợ thủ tục CIQ ưu tiên luồng VIP nhanh gọn",
        "Xe limousine sang trọng đưa đón tổ bay suốt hành trình",
        "Đặt phòng khách sạn lưu trú 4-5 sao gần sân bay",
        "Cung cấp 3 suất ăn dinh dưỡng hàng ngày thiết kế riêng",
        "Giặt ủi đồng phục phi hành đoàn lấy khẩn trong 4 tiếng",
        "Hỗ trợ y tế và bảo hiểm tổ bay tại Việt Nam"
      ],
      popular: true
    },
    {
      name: "Gói Hỗ Trợ Đột Xuất (Diverted Flight Care)",
      price: "Báo giá khẩn cấp theo tình huống thực tế",
      description: "Hỗ trợ khẩn khi chuyến bay phải hạ cánh khẩn cấp ngoài lịch trình",
      features: [
        "Kích hoạt đội phản ứng nhanh hỗ trợ tại sân bay trong 30 phút",
        "Sắp xếp phương tiện đưa đón khẩn cấp cho cả tổ bay và hành khách",
        "Đặt phòng khách sạn lưu trú khẩn cấp không giới hạn số lượng",
        "Hỗ trợ thủ tục xin thị thực quá cảnh tạm thời (Transit Visa) cho đoàn",
        "Phối hợp cùng hãng bay lên kế hoạch cất cánh thay thế"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Đăng ký thông tin tổ bay",
      description: "Hãng hàng không gửi danh sách tổ bay (Crew List), lịch bay chi tiết và các yêu cầu đặc biệt về lưu trú/ăn uống."
    },
    {
      step: "02",
      title: "Chuẩn bị hậu cần",
      description: "ABTRIP đặt trước phòng khách sạn đạt chuẩn, điều phối xe đưa đón có giấy phép sân đỗ và nộp danh sách CIQ lên biên phòng."
    },
    {
      step: "03",
      title: "Đón tiếp tại sân bay",
      description: "Đón tổ bay ngay khi hạ cánh, hộ tống đi luồng ưu tiên làm hải quan nhập cảnh và đưa ra xe chuyên dụng về khách sạn."
    },
    {
      step: "04",
      title: "Đưa trở lại chuyến bay",
      description: "Xe đón tổ bay tại khách sạn đúng giờ, đưa ra sân bay và hỗ trợ thủ tục xuất cảnh ưu tiên để chuẩn bị chặng bay mới."
    }
  ];

  const testimonials = [
    {
      author: "Capt. Thomas Anderson",
      role: "Cơ trưởng, hãng Private Air Services (Mỹ)",
      content: "Outstanding crew support services in Hanoi and Saigon. The transportation was extremely punctual, the hotel arranged by ABTRIP was exceptionally quiet and comfortable for resting, and the airport immigration clearance was incredibly fast. Thanks for taking such good care of our crew!"
    },
    {
      author: "Chị Lê Thị Thu Trang",
      role: "Trưởng phòng Hậu cần, Cambodia Angkor Air",
      content: "Chúng tôi đánh giá rất cao dịch vụ hậu cần tổ bay của ABTRIP. Phương tiện đưa đón chuyên nghiệp, hệ thống khách sạn liên kết chất lượng rất tốt, đặc biệt các bạn xử lý cực kỳ linh hoạt các trường hợp chuyến bay bị delay hoặc phải hạ cánh khẩn cấp do thời tiết xấu."
    },
    {
      author: "Mr. Jung Ho-seok",
      role: "Crew Operations Coordinator, Korea Charter Airlines",
      content: "Brilliant team! They managed to arrange hotel rooms and premium shuttle buses for our crew of 15 within a 1-hour notice after our flight was diverted to Danang. They saved our operation from a major scheduling disaster."
    }
  ];

  const faqs = [
    {
      question: "Quy trình làm thủ tục hải quan an ninh (CIQ) cho tổ bay có điểm gì khác biệt so với hành khách?",
      answer: "Phi hành đoàn được đi qua Lối đi ưu tiên riêng biệt dành cho Tổ bay (Crew Lane) tại khu vực kiểm soát biên phòng và an ninh hàng không. Nhân viên ABTRIP sẽ hỗ trợ chuẩn bị trước Tờ khai tổ bay (General Declaration) và hộ tống tổ bay hoàn thành nhanh thủ tục thông quan trong vòng 5 - 10 phút, tránh việc xếp hàng chung với hành khách thường."
    },
    {
      question: "Các khách sạn đối tác lưu trú của ABTRIP có đáp ứng tiêu chuẩn khắt khe của ngành hàng không không?",
      answer: "Có. Các khách sạn đối tác (Crew Hotel) do ABTRIP liên kết đều đạt tiêu chuẩn từ 4 - 5 sao quốc tế, nằm trong bán kính dưới 15 phút di chuyển từ sân bay. Các phòng lưu trú dành cho phi công được bố trí ở khu vực yên tĩnh, cách âm đạt chuẩn tiếng ồn hàng không, có rèm cản sáng tuyệt đối và dịch vụ dọn phòng linh hoạt theo giờ ngủ của phi công."
    },
    {
      question: "Nếu chuyến bay bị chuyển hướng hạ cánh khẩn cấp (Diverted Flight), ABTRIP hỗ trợ thế nào?",
      answer: "Chúng tôi cung cấp dịch vụ túc trực khẩn cấp 24/7/365. Khi nhận được thông báo chuyến bay chuyển hướng hạ cánh khẩn cấp đến Việt Nam, bộ phận phản ứng nhanh của ABTRIP tại sân bay hạ cánh sẽ lập tức chuẩn bị xe đưa đón, liên hệ khách sạn đặt phòng khẩn cấp và làm việc với Biên phòng sân bay để xin giấy phép quá cảnh tạm thời cho tổ bay và hành khách đi kèm."
    },
    {
      question: "Dịch vụ đưa đón tổ bay tại sân đỗ có được thực hiện bằng xe riêng không?",
      answer: "Có. Tùy thuộc vào quy định an toàn sân đỗ của từng cảng hàng không, chúng tôi sẽ điều phối xe đưa đón chuyên dụng (như xe Cobus hoặc xe Toyota Coaster VIP có giấy phép hoạt động tại sân đỗ - Airside Permit) đón tổ bay ngay sát chân thang máy bay và đưa thẳng về nhà ga VIP hoặc sảnh ra xe ngoài."
    }
  ];

  const config = {
    id: "ho-tro-phi-hanh-doan",
    category: "ground" as const,
    title: "Hỗ Trợ Phi Hành Đoàn & Logistics",
    subtitle: "Dịch Vụ Hậu Cần Chu Đáo - An Toàn & Chuẩn Hàng Không",
    description: "Giải pháp hậu cần trọn gói dành cho phi hành đoàn của các hãng hàng không quốc tế. Xe đưa đón chuyên dụng tại sân đỗ, thủ tục CIQ ưu tiên nhanh chóng, lưu trú khách sạn 4 - 5 sao yên tĩnh và suất ăn dinh dưỡng chất lượng.",
    heroImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000&auto=format&fit=crop",
    badge: "Hậu cần phi hành đoàn trọn gói",
    geoTarget: "Triển khai dịch vụ hậu cần tại cảng hàng không SGN, HAN, DAD, CXR",
    geoAirports: ["SGN", "HAN", "DAD", "CXR"],
    features,
    details,
    packages,
    processSteps,
    testimonials,
    faqs
  };

  return <ServiceLandingPage {...config} />;
}
