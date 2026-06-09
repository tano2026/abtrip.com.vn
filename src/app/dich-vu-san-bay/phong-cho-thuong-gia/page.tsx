"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Coffee, Utensils, Wifi, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Không Gian Sang Trọng & Yên Tĩnh",
      description: "Tách biệt hoàn toàn khỏi sự ồn ào của sảnh chờ chung. Thiết kế hiện đại mang lại cảm giác thư thái và riêng tư nhất.",
      icon: <Coffee className="w-6 h-6" />
    },
    {
      title: "Buffet & Bar Đồ Uống Không Giới Hạn",
      description: "Thưởng thức ẩm thực Á - Âu nóng hổi phong phú cùng menu đồ uống đa dạng, rượu vang và cà phê cao cấp miễn phí.",
      icon: <Utensils className="w-6 h-6" />
    },
    {
      title: "Tiện Nghi Chăm Sóc Đẳng Cấp",
      description: "Tích hợp khu vực tắm nước nóng tiện nghi, ghế massage toàn thân cao cấp, phòng hút thuốc riêng biệt và wifi tốc độ cao.",
      icon: <Wifi className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Không Gian Thư Giãn Và Tái Tạo Năng Lượng Trước Giờ Bay",
      description: "Trước mỗi hành trình bay, đặc biệt là các chặng bay dài hoặc sau những buổi làm việc căng thẳng, một không gian yên tĩnh để nghỉ ngơi là điều vô cùng cần thiết. Phòng chờ thương gia do ABTRIP liên kết cung cấp một ốc đảo thư thái biệt lập ngay trong lòng sân bay náo nhiệt. Tại đây, quý khách có thể thoải mái thư giãn trên những dãy ghế sofa êm ái, trải nghiệm ghế massage toàn thân chuyên sâu hoặc tập trung xử lý công việc tại khu vực bàn làm việc riêng tư được trang bị đầy đủ thiết bị kết nối.",
      image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000",
      bullets: [
        "Thiết kế sang trọng, tầm nhìn hướng thẳng ra đường băng sân bay",
        "Ghế massage trị liệu giảm đau mỏi cơ thể hiệu quả",
        "Khu vực làm việc yên tĩnh với ổ cắm sạc đa năng",
        "Màn hình hiển thị thông tin bay và loa thông báo cửa ra máy bay"
      ]
    },
    {
      title: "Trải Nghiệm Ẩm Thực Buffet Á - Âu Tươi Ngon Đúng Điệu",
      description: "Hành khách sẽ được trải nghiệm hành trình ẩm thực phong phú với thực đơn buffet đa dạng từ các món ăn truyền thống Việt Nam đến ẩm thực phương Tây hiện đại. Các món ăn luôn được giữ nóng hổi và chế biến liên tục từ nguồn nguyên liệu tươi ngon nhất. Quầy bar phục vụ không giới hạn các loại nước ép trái cây tươi, cà phê pha máy cao cấp, bia lạnh và các dòng rượu vang thượng hạng được tuyển chọn kỹ lưỡng.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000",
      bullets: [
        "Thực đơn nóng sốt đa dạng thay đổi liên tục theo ngày",
        "Quầy bánh ngọt tráng miệng và trái cây tươi phong phú",
        "Đồ uống, nước trái cây, bia và rượu vang phục vụ miễn phí",
        "Có sẵn các phương án món ăn chay dinh dưỡng theo yêu cầu"
      ]
    }
  ];

  const packages = [
    {
      name: "Vé Phòng Chờ Thương Gia Ga Nội Địa",
      price: "Chỉ từ 650.000đ/khách",
      description: "Áp dụng tại phòng chờ thương gia tiêu chuẩn ga đi trong nước (SGN, HAN, DAD...)",
      features: [
        "Thời gian lưu trú tối đa 3 tiếng trước giờ bay",
        "Sử dụng không giới hạn quầy buffet và nước uống",
        "Sử dụng ghế massage toàn thân miễn phí",
        "Hỗ trợ cổng sạc thiết bị và wifi tốc độ cao",
        "Không gian tắm nước nóng tiện nghi đầy đủ đồ dùng cá nhân"
      ],
      popular: false
    },
    {
      name: "Vé Phòng Chờ Thương Gia Ga Quốc Tế",
      price: "Chỉ từ 1.200.000đ/khách",
      description: "Áp dụng tại phòng chờ hạng sang ga đi nước ngoài",
      features: [
        "Thời gian lưu trú tối đa 3 tiếng trước giờ bay",
        "Ẩm thực buffet Á - Âu cao cấp phục vụ không giới hạn",
        "Trải nghiệm quầy bar rượu vang và bia lạnh miễn phí",
        "Không gian làm việc yên tĩnh và riêng tư tối đa",
        "Tiện ích phòng tắm cao cấp và ghế massage hiện đại",
        "Đặc quyền hỗ trợ thông báo giờ ra máy bay riêng biệt"
      ],
      popular: true
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Đăng ký dịch vụ",
      description: "Quý khách chọn sân bay, ga áp dụng (Nội địa/Quốc tế) và ngày giờ bay dự kiến trên website ABTRIP."
    },
    {
      step: "02",
      title: "Nhận E-voucher điện tử",
      description: "Trong vòng 15 phút sau khi xác nhận đặt chỗ, mã vé E-voucher sẽ được gửi trực tiếp qua Zalo hoặc Email của bạn."
    },
    {
      step: "03",
      title: "Xuất trình vé vào cửa",
      description: "Đến sân bay, quý khách di chuyển tới quầy lễ tân phòng chờ thương gia, xuất trình mã E-voucher kèm thẻ lên tàu bay."
    },
    {
      step: "04",
      title: "Thư giãn trước giờ cất cánh",
      description: "Vào phòng chờ, tự do ăn uống buffet, thư giãn nghỉ ngơi và chuẩn bị lên chuyến bay một cách sảng khoái nhất."
    }
  ];

  const testimonials = [
    {
      author: "Anh Đặng Quốc Cường",
      role: "Giám đốc Quản lý Dự án, Techcombank",
      content: "Đặt mua vé phòng chờ qua ABTRIP tiết kiệm hơn nhiều so với mua trực tiếp tại quầy lễ tân của phòng chờ sân bay. Thủ tục nhận mã code rất nhanh, chỉ cần quét mã QR tại quầy đón khách là vào luôn. Không gian yên tĩnh giúp tôi hoàn thành nốt báo cáo trước khi bay."
    },
    {
      author: "Chị Nguyễn Khánh Linh",
      role: "Founder, thương hiệu thời trang L'Aura",
      content: "Đặt phòng chờ ga quốc tế cho cả gia đình trước chuyến bay đi Mỹ là quyết định cực kỳ sáng suốt của tôi. Phòng tắm nước nóng sạch sẽ, có đầy đủ khăn tắm bàn chải, ghế massage xịn giúp bố mẹ tôi đỡ mỏi lưng hẳn trước chặng bay dài 12 tiếng."
    },
    {
      author: "Anh Marcus Vance",
      role: "Khách hàng quốc tế (Đến từ Úc)",
      content: "Very comfortable lounge at SGN airport. Booking through ABTRIP was fast and straightforward. Decent food selection, cold drinks, and good WiFi. Worth every penny to escape the crowded terminal halls."
    }
  ];

  const faqs = [
    {
      question: "Vé phòng chờ thương gia của ABTRIP áp dụng cho những hãng hàng không nào?",
      answer: "Vé phòng chờ thương gia đặt qua ABTRIP là vé dịch vụ độc lập, áp dụng cho tất cả hành khách của mọi hãng hàng không (Vietnam Airlines, Vietjet, Bamboo, Qatar Airways, Singapore Airlines...) bất kể hạng vé bạn mua trên máy bay là hạng phổ thông hay thương gia."
    },
    {
      question: "Tôi có thể ở lại phòng chờ lâu hơn 3 tiếng được không?",
      answer: "Thời gian tiêu chuẩn của một lượt sử dụng phòng chờ thương gia là 3 tiếng trước giờ cất cánh ghi trên vé. Nếu chuyến bay của quý khách bị trễ (delay), ABTRIP sẽ hỗ trợ gia hạn thời gian lưu trú tại phòng chờ tương ứng hoàn toàn miễn phí."
    },
    {
      question: "Trẻ em đi kèm có được miễn phí vé vào phòng chờ không?",
      answer: "Quy định đối với trẻ em tùy thuộc vào từng đầu sân bay. Thông thường, trẻ em dưới 2 tuổi được miễn phí vé vào cửa khi đi kèm người lớn. Trẻ em từ 2 - 11 tuổi được áp dụng mức giá ưu đãi (bằng 50% - 70% giá vé người lớn). Trẻ em từ 12 tuổi trở lên tính phí như người lớn."
    },
    {
      question: "Vé E-voucher phòng chờ có hạn sử dụng trong bao lâu?",
      answer: "E-voucher phòng chờ do ABTRIP cung cấp có thời hạn sử dụng linh hoạt trong vòng 30 ngày kể từ ngày đăng ký dự kiến. Quý khách hoàn toàn có thể thay đổi lịch sử dụng nếu hành trình bay của mình bị thay đổi đột xuất mà không lo mất phí."
    }
  ];

  const config = {
    id: "phong-cho-thuong-gia",
    category: "airport" as const,
    title: "Phòng Chờ Thương Gia Sân Bay",
    subtitle: "Nghỉ Ngơi Sang Trọng - Tiện Nghi Đẳng Cấp 5 Sao",
    description: "Tận hưởng không gian yên tĩnh, riêng tư và tách biệt trước giờ bay. Dịch vụ buffet Á - Âu đa dạng, quầy bar phục vụ nước uống không giới hạn, phòng tắm nước nóng tiện nghi và ghế massage trị liệu thư giãn.",
    heroImage: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=2000&auto=format&fit=crop",
    badge: "Phòng chờ VIP đẳng cấp 5 sao",
    geoTarget: "Đặt vé phòng chờ tại SGN, HAN, DAD, CXR, PQC trọn gói",
    geoAirports: ["SGN", "HAN", "DAD", "CXR", "PQC"],
    features,
    details,
    packages,
    processSteps,
    testimonials,
    faqs
  };

  return <ServiceLandingPage {...config} />;
}
