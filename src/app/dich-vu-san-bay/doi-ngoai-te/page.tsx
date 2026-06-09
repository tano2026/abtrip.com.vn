"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Coins, Banknote, ShieldCheck, Sparkles, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Hỗ Trợ 30+ Ngoại Tệ Phổ Biến",
      description: "Thu đổi đa dạng các loại ngoại tệ như USD, EUR, JPY, KRW, SGD, THB, AUD, CAD, CNY, HKD... đáp ứng mọi điểm đến trên thế giới.",
      icon: <Coins className="w-6 h-6" />
    },
    {
      title: "Ưu Thế Tỷ Giá Cạnh Tranh",
      description: "Hệ thống cập nhật tỷ giá liên tục theo thời gian thực, cam kết tỷ giá tốt tiệm cận thị trường tự do, ưu đãi đặc biệt khi đặt lịch trước.",
      icon: <Banknote className="w-6 h-6" />
    },
    {
      title: "Giao Dịch An Toàn & Bảo Mật",
      description: "Quy trình giao dịch nhanh chóng, kín đáo tại quầy đối tác hoặc sảnh VIP, có đầy đủ hóa đơn biên lai chứng từ chứng minh nguồn gốc rõ ràng.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Giải Pháp Đổi Ngoại Tệ Tiện Lợi Ngay Tại Sân Bay",
      description: "Không còn cảnh phải xếp hàng chờ đợi mệt mỏi tại các chi nhánh ngân hàng trong giờ hành chính hay lo sợ rủi ro pháp lý khi đổi tiền tự do tại các tiệm vàng ngoài phố. ABTRIP mang đến giải pháp giao dịch ngoại tệ an toàn, nhanh chóng trực tiếp tại sảnh ga đi của các sân bay quốc tế lớn. Quý khách chỉ cần lên lịch hẹn trước, chuyên viên của chúng tôi sẽ chuẩn bị sẵn sàng và hỗ trợ giao nhận tiền mặt tận nơi chỉ trong 5 - 10 phút trước giờ bay.",
      image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=1000",
      bullets: [
        "Tiết kiệm 100% thời gian đi lại trước chuyến bay",
        "Giao nhận nhanh chóng, kín đáo tại điểm hẹn",
        "Cam kết 100% tiền thật, hoàn tiền gấp 10 nếu có lỗi",
        "Hỗ trợ đầy đủ chứng từ khai báo hải quan khi cần"
      ]
    },
    {
      title: "Cung Cấp Mệnh Giá Tiền Nhỏ Tiện Lợi Chi Tiêu",
      description: "Hành khách khi đặt chân đến nước bạn thường gặp nhiều bất tiện khi chi trả các khoản phí nhỏ như tiền taxi, tàu điện, nước uống, hoặc tiền boa (tip) vì hầu hết các quầy đổi tiền chỉ cấp tiền mệnh giá lớn. Thấu hiểu điều này, ABTRIP hỗ trợ chia sẵn các tập ngoại tệ có mệnh giá nhỏ lẻ, giúp bạn dễ dàng chi tiêu ngay khi vừa hạ cánh mà không gặp bất kỳ trở ngại nào.",
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1000",
      bullets: [
        "Cơ cấu mệnh giá tiền linh hoạt theo yêu cầu khách",
        "Tiền mặt sạch đẹp, không rách nát, dễ chi tiêu",
        "Hỗ trợ đổi ngược lại VNĐ tỷ giá tốt khi về nước",
        "Tư vấn hạn mức mang ngoại tệ xuất cảnh miễn phí"
      ]
    }
  ];

  const packages = [
    {
      name: "Gói Giao Dịch Phổ Thông",
      price: "Tỷ giá niêm yết tốt nhất",
      description: "Áp dụng cho khách hàng cá nhân có nhu cầu đổi dưới 1.000 USD (hoặc tương đương)",
      features: [
        "Áp dụng tỷ giá niêm yết ưu đãi trong ngày",
        "Nhận tiền mặt trực tiếp tại quầy đối tác sân bay",
        "Cung cấp biên lai giao dịch đầy đủ",
        "Hỗ trợ đổi mệnh giá nhỏ cơ bản"
      ],
      popular: false
    },
    {
      name: "Gói Gói VIP Corporate / Đại Lượng",
      price: "Tỷ giá sỉ chiết khấu cao",
      description: "Dành cho khách hàng VIP hoặc doanh nghiệp đổi từ 1.000 USD trở lên",
      features: [
        "Hưởng mức tỷ giá sỉ đặc biệt cạnh tranh hơn",
        "Chuyên viên hỗ trợ giao tiền tận tay tại sảnh chờ VIP",
        "Tự do lựa chọn cơ cấu mệnh giá tiền nhỏ chi tiết",
        "Đặc quyền mua lại ngoại tệ thừa tỷ giá gốc khi về nước",
        "Ưu tiên hỗ trợ chuẩn bị giấy tờ hải quan (nếu cần)"
      ],
      popular: true
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Đặt lịch & Chốt tỷ giá",
      description: "Chọn loại ngoại tệ, lượng tiền cần đổi và thời gian bay. Hệ thống ghi nhận và khóa tỷ giá ưu đãi tại thời điểm đăng ký."
    },
    {
      step: "02",
      title: "Xác nhận lịch hẹn",
      description: "Chuyên viên ABTRIP liên hệ xác nhận điểm hẹn cụ thể tại ga đi sân bay và cơ cấu mệnh giá tiền khách yêu cầu."
    },
    {
      step: "03",
      title: "Giao nhận tại sân bay",
      description: "Đến giờ hẹn, nhân viên gặp khách trực tiếp tại sảnh để thực hiện bàn giao, kiểm đếm tiền mặt và ký nhận biên lai an toàn."
    },
    {
      step: "04",
      title: "Hỗ trợ chiều về",
      description: "Sau khi kết thúc chuyến đi, quý khách có thể liên hệ ABTRIP để bán lại lượng ngoại tệ thừa với tỷ giá ưu tiên đặc quyền."
    }
  ];

  const testimonials = [
    {
      author: "Chị Nguyễn Mai Hương",
      role: "Trưởng phòng Thu mua, VPBank",
      content: "Dịch vụ đổi tiền của ABTRIP thực sự là cứu cánh. Mình đi công tác Nhật gấp không kịp đi đổi tiền ở ngân hàng hay tiệm vàng. Chỉ cần đặt trước qua app, ra tới sảnh Nội Bài là có nhân viên đưa tiền tận nơi, tiền mới đẹp, tỷ giá lại rất sòng phẳng."
    },
    {
      author: "Anh David Nguyen",
      role: "Khách hàng Việt kiều Mỹ",
      content: "Mỗi lần về nước ăn Tết, tôi đều hẹn đổi tiền qua ABTRIP tại sảnh đến Tân Sơn Nhất. Giao dịch nhanh, an toàn, nhân viên phục vụ lịch sự và luôn có sẵn các mệnh giá nhỏ để tôi lì xì và đi xe."
    },
    {
      author: "Anh Lê Hoàng Nam",
      role: "Giám đốc điều hành, Nam Minh Logistics",
      content: "Doanh nghiệp chúng tôi thường xuyên cử nhân viên đi công tác nước ngoài. Sử dụng dịch vụ đổi ngoại tệ trọn gói của ABTRIP giúp kế toán công ty tiết kiệm rất nhiều thời gian làm thủ tục tại ngân hàng."
    }
  ];

  const faqs = [
    {
      question: "Hạn mức tối đa được mang ngoại tệ mặt ra nước ngoài không cần khai báo là bao nhiêu?",
      answer: "Theo quy định hiện hành của Ngân hàng Nhà nước Việt Nam, hành khách khi xuất cảnh mang theo ngoại tệ tiền mặt có giá trị trên 5.000 USD (hoặc các loại ngoại tệ khác có giá trị tương đương) hoặc trên 15 triệu VNĐ tiền mặt thì bắt buộc phải thực hiện khai báo hải quan sân bay."
    },
    {
      question: "Đặt lịch trước bao lâu thì được hỗ trợ chuẩn bị tiền tốt nhất?",
      answer: "Để đảm bảo có sẵn đầy đủ lượng tiền mặt và các mệnh giá nhỏ lẻ theo yêu cầu, quý khách nên đặt trước ít nhất 2 - 3 tiếng trước giờ bay. Đối với các loại ngoại tệ hiếm (như CHF, SEK, NZD...), vui lòng đặt trước từ 12 - 24 tiếng."
    },
    {
      question: "Tỷ giá chốt lúc đặt lịch trực tuyến có bị thay đổi khi nhận tiền thực tế không?",
      answer: "Không. ABTRIP cam kết áp dụng chính sách giữ nguyên tỷ giá đã chốt tại thời điểm quý khách đặt lịch thành công, bảo vệ khách hàng trước các biến động tăng giá ngoại tệ sát giờ bay."
    },
    {
      question: "Giao dịch đổi tiền mặt tại sân bay có hợp pháp và an toàn không?",
      answer: "Hoàn toàn hợp pháp. ABTRIP liên kết trực tiếp với các tổ chức tín dụng và đại lý thu đổi ngoại tệ được cấp phép chính thức bởi Ngân hàng Nhà nước tại các đầu sân bay. Mọi giao dịch đều đi kèm biên lai pháp lý đầy đủ, bảo mật thông tin tuyệt đối."
    }
  ];

  const config = {
    id: "doi-ngoai-te",
    category: "airport" as const,
    title: "Thu Đổi Ngoại Tệ Sân Bay",
    subtitle: "Tỷ Giá Cạnh Tranh - Giao Dịch An Toàn & Minh Bạch",
    description: "Địa chỉ uy tín hỗ trợ hành khách thu đổi hơn 30 loại ngoại tệ phổ biến trực tiếp tại quầy dịch vụ sân bay. Cam kết tỷ giá tốt sát thị trường tự do, giao dịch nhanh chóng và an toàn tuyệt đối.",
    heroImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2000&auto=format&fit=crop",
    badge: "Tỷ giá tốt sát thị trường",
    geoTarget: "Giao dịch trực tiếp tại quầy ga đi / ga đến: SGN, HAN, DAD",
    geoAirports: ["SGN", "HAN", "DAD"],
    features,
    details,
    packages,
    processSteps,
    testimonials,
    faqs
  };

  return <ServiceLandingPage {...config} />;
}
