"use client";

import ServiceLandingPage from "@/components/ServiceLandingPage";
import { Users, Tag, Compass, ShieldCheck, Clock, Star } from "lucide-react";

export default function Page() {
  const features = [
    {
      title: "Lịch Khởi Hành Cố Định",
      description: "Các tuyến tour ghép khởi hành định kỳ hàng tuần, hàng tháng ổn định, cam kết thực hiện đúng lịch trình khai thác.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Tối Ưu Hóa Chi Phí Du Lịch",
      description: "Hưởng mức giá siêu ưu đãi nhờ tối ưu hóa quy mô đoàn, nhận chiết khấu sỉ từ hệ thống đối tác nhà hàng và khách sạn lớn.",
      icon: <Tag className="w-6 h-6" />
    },
    {
      title: "Dịch Vụ Trọn Gói Chất Lượng",
      description: "Trọn gói vé máy bay, khách sạn lưu trú tiện nghi, các bữa ăn đặc sản địa phương, vé tham quan và hướng dẫn viên suốt tuyến.",
      icon: <Compass className="w-6 h-6" />
    }
  ];

  const details = [
    {
      title: "Giải Pháp Du Lịch Tiết Kiệm - Gặp Gỡ Bạn Đồng Hành Mới",
      description: "Tour ghép đoàn (Joined Group Tour) của ABTRIP là sự lựa chọn hoàn hảo dành cho các nhóm khách nhỏ, gia đình ít người hoặc những bạn trẻ đi du lịch một mình muốn khám phá các điểm đến hấp dẫn với mức chi phí tối ưu nhất. Thay vì phải chi trả toàn bộ chi phí xe đưa đón, hướng dẫn viên riêng đắt đỏ, việc ghép đoàn giúp chia sẻ chi phí vận hành, mang lại mức giá tour vô cùng kinh tế mà vẫn bảo đảm đầy đủ các quyền lợi dịch vụ tiêu chuẩn chất lượng cao.",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000",
      bullets: [
        "Tiết kiệm đến 40% chi phí so với việc đi tour thiết kế riêng",
        "Lịch khởi hành đều đặn, cam kết không hủy đoàn giờ chót",
        "Có cơ hội giao lưu, kết nối với những người bạn đồng hành mới",
        "Lịch trình tham quan được nghiên cứu kỹ lưỡng, tối ưu thời gian"
      ]
    },
    {
      title: "Tiêu Chuẩn Lưu Trú Tiện Nghi & Hướng Dẫn Viên Tận Tâm",
      description: "Mặc dù là tour ghép đoàn tiết kiệm, ABTRIP vẫn đặt chất lượng dịch vụ phục vụ hành khách lên hàng đầu. Khách hàng sẽ được bố trí lưu trú nghỉ ngơi tại hệ thống khách sạn từ 3 - 4 sao nằm tại trung tâm các điểm đến, thuận tiện cho việc mua sắm và khám phá ẩm thực đêm. Hướng dẫn viên suốt chặng bay và chặng bộ là những chuyên viên giàu kinh nghiệm, nhiệt tình và am hiểu văn hóa sâu sắc.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
      bullets: [
        "Khách sạn 3 - 4 sao tiện nghi, đầy đủ bữa ăn sáng buffet",
        "Xe du lịch đời mới đưa đón êm ái, bác tài vui tính lịch sự",
        "Hướng dẫn viên thuyết minh sinh động, chăm sóc đoàn chu đáo",
        "Đã bao gồm bảo hiểm du lịch trọn gói mức bồi thường cao"
      ]
    }
  ];

  const packages = [
    {
      name: "Tuyến Tour Ghép Trong Nước (Nội Địa)",
      price: "Chỉ từ 1.800.000đ/khách",
      description: "Khám phá các điểm đến hot nhất Việt Nam: Hạ Long, Sapa, Đà Nẵng, Phú Quốc...",
      features: [
        "Xe du lịch đời mới đưa đón khứ hồi theo lịch trình",
        "Lưu trú khách sạn 3 sao trung tâm tiện nghi (2 - 3 đêm)",
        "Ăn uống trọn gói các bữa ăn đặc sản địa phương theo chương trình",
        "Vé vào cửa tham quan các điểm du lịch chính trong tour",
        "Hướng dẫn viên tiếng Việt chu đáo phục vụ suốt tuyến"
      ],
      popular: true
    },
    {
      name: "Tuyến Tour Ghép Quốc Tế (Outbound)",
      price: "Chỉ từ 6.500.000đ/khách",
      description: "Hành trình đi nước ngoài trọn gói: Thái Lan, Singapore, Nhật Bản, Hàn Quốc...",
      features: [
        "Vé máy bay khứ hồi bao gồm hành lý ký gửi tiêu chuẩn",
        "Khách sạn lưu trú 3 - 4 sao chuẩn quốc tế trung tâm",
        "Thủ tục xin Visa hoặc khai báo nhập cảnh trọn gói",
        "Vé tham quan các địa danh nổi tiếng theo lịch trình",
        "Trưởng đoàn Việt Nam đi kèm hỗ trợ suốt hành trình bay và đi lại"
      ],
      popular: false
    },
    {
      name: "Combo Du Lịch Tự Do (Free & Easy)",
      price: "Chỉ từ 2.200.000đ/khách",
      description: "Dành cho khách thích tự do khám phá, tự lên lịch trình tham quan",
      features: [
        "Vé máy bay khứ hồi của các hãng hàng không uy tín",
        "Phòng khách sạn trung tâm sạch sẽ, tiện nghi (2 Đêm)",
        "Bữa ăn sáng buffet miễn phí tại khách sạn",
        "Hỗ trợ tư vấn thông tin du lịch và đặt vé vui chơi giá rẻ",
        "Tự do di chuyển và khám phá theo sở thích riêng biệt"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Chọn lịch khởi hành",
      description: "Khách hàng lựa chọn tuyến du lịch mong muốn và xem danh sách các ngày khởi hành cố định hàng tuần trên web."
    },
    {
      step: "02",
      title: "Đăng ký & Đặt cọc",
      description: "Cung cấp thông tin cá nhân và thực hiện đặt cọc giữ chỗ trực tuyến để ABTRIP tiến hành khóa vé máy bay và phòng khách sạn."
    },
    {
      step: "03",
      title: "Nhận thông tin trước đi",
      description: "Trước ngày đi 2 - 3 ngày, ABTRIP gửi thông tin họp đoàn, cẩm nang chuẩn bị hành lý và số điện thoại hướng dẫn viên."
    },
    {
      step: "04",
      title: "Khởi hành & Trải nghiệm",
      description: "Tập trung tại điểm hẹn sân bay hoặc điểm đón trung tâm, gặp gỡ hướng dẫn viên và bắt đầu chuyến du lịch đầy niềm vui."
    }
  ];

  const testimonials = [
    {
      author: "Chị Hoàng Khánh Vy",
      role: "Nhân viên văn phòng, Techcombank",
      content: "Mình vừa đi tour ghép Thái Lan 5 ngày 4 đêm của ABTRIP về, thực sự rất vui! Tour đi trọn gói từ vé máy bay, ăn uống đến khách sạn 4 sao ngay gần Pratunam mua sắm cực tiện. Hướng dẫn viên siêu dễ thương và nhiệt tình chụp ảnh hộ. Mức giá quá rẻ so với tự túc."
    },
    {
      author: "Anh Bùi Tiến Dũng",
      role: "Khách hàng tự do (Hải Phòng)",
      content: "Tôi đi tour ghép miền Tây cuối tuần của ABTRIP một mình để xả stress. Ghép đoàn cùng mọi người rất vui vẻ, không khí đầm ấm. Các bữa ăn ngon, hướng dẫn viên chu đáo và xe chạy rất êm. Sẽ tiếp tục ủng hộ các tuyến tour tiếp theo."
    },
    {
      author: "Chị Marie Nguyen",
      role: "Hành khách Việt kiều Úc",
      content: "Tôi đặt tour ghép Hạ Long - Sapa của ABTRIP cho bố mẹ tôi về nước chơi. Bố mẹ khen hướng dẫn viên nói năng lịch sự, chăm sóc người lớn tuổi rất kỹ lưỡng và khách sạn nghỉ ngơi sạch sẽ, đồ ăn hợp khẩu vị."
    }
  ];

  const faqs = [
    {
      question: "Tour ghép đoàn có cam kết chắc chắn khởi hành không hay phải chờ đủ số lượng khách?",
      answer: "Các tuyến tour ghép của ABTRIP đều có lịch khởi hành cố định. Đối với các tuyến tour nội địa và Đông Nam Á phổ biến, chúng tôi cam kết khởi hành 100% theo đúng lịch trình kể cả với nhóm khách nhỏ. Đối với các tuyến cần xin Visa (như Nhật, Hàn, Châu Âu), trường hợp đoàn không đủ số lượng tối thiểu để khởi hành (thường là 15 khách), ABTRIP sẽ thông báo trước ngày khởi hành ít nhất 14 ngày và hỗ trợ chuyển ngày khởi hành mới hoặc hoàn lại 100% tiền cọc."
    },
    {
      question: "Tôi đi du lịch một mình thì chính sách phòng nghỉ khách sạn thế nào?",
      answer: "Giá tour ghép tiêu chuẩn được tính trên cơ sở 2 khách nghỉ chung 1 phòng đôi. Trường hợp quý khách đi du lịch một mình, ABTRIP sẽ hỗ trợ ghép phòng nghỉ chung với một khách đồng hành cùng giới tính trong đoàn. Nếu quý khách muốn ở phòng riêng biệt để đảm bảo sự riêng tư, vui lòng đóng thêm khoản phụ thu phòng đơn (Single Supplement) theo quy định của khách sạn."
    },
    {
      question: "Giá tour ghép của ABTRIP đã bao gồm toàn bộ chi phí chưa, có phát sinh chi phí ẩn không?",
      answer: "Giá tour ghép của ABTRIP là giá trọn gói được niêm yết công khai, đã bao gồm: vé máy bay, khách sạn, các bữa ăn chính theo chương trình, vé tham quan và hướng dẫn viên. Các khoản không bao gồm thường là: chi phí tiêu dùng cá nhân (giặt ủi, điện thoại, nước uống ngoài thực đơn), tiền tip cho hướng dẫn viên/tài xế (đối với tour quốc tế) và thuế VAT."
    },
    {
      question: "Tôi có thể đăng ký tour ghép sát ngày khởi hành được không?",
      answer: "Điều này phụ thuộc vào tình trạng vé máy bay và phòng khách sạn còn trống. Đối với các tuyến tour trong nước, bạn có thể đăng ký trước ngày khởi hành từ 3 - 5 ngày. Đối với các tuyến cần làm thủ tục Visa đi nước ngoài, quý khách bắt buộc phải đăng ký trước tối thiểu từ 3 - 6 tuần để kịp thời hoàn thiện hồ sơ xin cấp thị thực."
    }
  ];

  const config = {
    id: "tour-ghep",
    category: "travel" as const,
    title: "Tour Du Lịch Ghép Đoàn Trực Tuyến",
    subtitle: "Khởi Hành Định Kỳ - Tiết Kiệm Chi Phí - Dịch Vụ Tiêu Chuẩn",
    description: "Giải pháp du lịch kinh tế chất lượng cao. Khởi hành định kỳ hàng tuần hàng tháng, kết nối những người bạn đồng hành mới, trọn gói dịch vụ lưu trú khách sạn 3 - 4 sao tiện nghi và hướng dẫn viên suốt tuyến tận tình.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    badge: "Khởi hành định kỳ hàng tuần",
    geoTarget: "Khởi hành từ Hà Nội, TP.HCM, Đà Nẵng đi các tuyến trong và ngoài nước",
    geoAirports: [],
    features,
    details,
    packages,
    processSteps,
    testimonials,
    faqs
  };

  return <ServiceLandingPage {...config} />;
}
