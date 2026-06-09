export interface eSIMPackage {
  id: string;
  name: string;
  data: string;
  duration: number; // in days
  price: number; // in VND
  features: string[];
  isPopular?: boolean;
}

export interface Destination {
  id: string;
  countryName: string;
  flag: string; // Emoji flag
  region: "Asia" | "Europe" | "America" | "Global";
  image: string; // Unsplash image
  packages: eSIMPackage[];
}

export const esimDestinations: Destination[] = [
  {
    id: "thailand",
    countryName: "Thái Lan",
    flag: "🇹🇭",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "th-5d-5gb",
        name: "Thái Lan 5 Ngày 5GB",
        data: "1GB / Ngày",
        duration: 5,
        price: 99000,
        features: ["Nhà mạng: AIS / TrueMove", "Tốc độ: 4G/5G", "Kích hoạt: Quét mã QR", "Hết dung lượng: Giảm tốc độ 128kbps"],
        isPopular: true
      },
      {
        id: "th-7d-unlimited",
        name: "Thái Lan 7 Ngày Unlimited",
        data: "Không giới hạn",
        duration: 7,
        price: 189000,
        features: ["Nhà mạng: AIS", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Tự động khi kết nối mạng", "Tặng kèm 15 phút gọi nội địa"],
        isPopular: true
      },
      {
        id: "th-10d-15gb",
        name: "Thái Lan 10 Ngày 15GB",
        data: "1.5GB / Ngày",
        duration: 10,
        price: 159000,
        features: ["Nhà mạng: TrueMove", "Tốc độ: 4G/5G", "Kích hoạt: Quét mã QR", "Miễn phí nhận cuộc gọi/SMS"],
      }
    ]
  },
  {
    id: "japan",
    countryName: "Nhật Bản",
    flag: "🇯🇵",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "jp-5d-5gb",
        name: "Nhật Bản 5 Ngày 5GB",
        data: "1GB / Ngày",
        duration: 5,
        price: 195000,
        features: ["Nhà mạng: Softbank / Docomo", "Tốc độ: 4G LTE cực mạnh", "Kích hoạt: Quét mã QR", "Không hỗ trợ nghe gọi"],
      },
      {
        id: "jp-7d-14gb",
        name: "Nhật Bản 7 Ngày 14GB",
        data: "2GB / Ngày",
        duration: 7,
        price: 279000,
        features: ["Nhà mạng: Docomo / KDDI", "Tốc độ: 4G/5G", "Kích hoạt: Quét mã QR", "Hỗ trợ chia sẻ Wi-Fi (Tethering)"],
        isPopular: true
      },
      {
        id: "jp-10d-unlimited",
        name: "Nhật Bản 10 Ngày Unlimited",
        data: "Không giới hạn",
        duration: 10,
        price: 489000,
        features: ["Nhà mạng: Softbank", "Tốc độ: 4G LTE tốc độ cao", "Kích hoạt: Quét mã QR", "Hết dung lượng: Giảm tốc độ"],
      }
    ]
  },
  {
    id: "korea",
    countryName: "Hàn Quốc",
    flag: "🇰🇷",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1538669715515-5c37043b717e?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "kr-5d-5gb",
        name: "Hàn Quốc 5 Ngày 5GB",
        data: "1GB / Ngày",
        duration: 5,
        price: 169000,
        features: ["Nhà mạng: SK Telecom", "Tốc độ: 4G/5G cực đỉnh", "Kích hoạt: Quét mã QR", "Không giới hạn dung lượng phụ"],
      },
      {
        id: "kr-7d-unlimited",
        name: "Hàn Quốc 7 Ngày Unlimited",
        data: "Không giới hạn",
        duration: 7,
        price: 329000,
        features: ["Nhà mạng: KT Corporation", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Tự động kết nối", "Hỗ trợ nhận SMS quốc tế"],
        isPopular: true
      },
      {
        id: "kr-10d-10gb",
        name: "Hàn Quốc 10 Ngày 10GB",
        data: "1GB / Ngày",
        duration: 10,
        price: 249000,
        features: ["Nhà mạng: SK Telecom", "Tốc độ: 4G/5G", "Kích hoạt: Quét mã QR", "Hỗ trợ phát Hotspot"],
      }
    ]
  },
  {
    id: "singapore",
    countryName: "Singapore",
    flag: "🇸🇬",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "sg-5d-5gb",
        name: "Singapore 5 Ngày 5GB",
        data: "1GB / Ngày",
        duration: 5,
        price: 145000,
        features: ["Nhà mạng: Singtel", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Quét mã QR", "Hỗ trợ chia sẻ mạng"],
      },
      {
        id: "sg-my-7d-7gb",
        name: "Liên Tuyến Sing - Mã 7 Ngày",
        data: "1GB / Ngày",
        duration: 7,
        price: 239000,
        features: ["Nhà mạng: Singtel / Maxis", "Tự động chuyển mạng khi qua biên giới", "Tốc độ: 4G LTE cực tốt", "Kích hoạt: Quét mã QR"],
        isPopular: true
      }
    ]
  },
  {
    id: "china",
    countryName: "Trung Quốc",
    flag: "🇨🇳",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "cn-5d-5gb",
        name: "Trung Quốc 5 Ngày Vượt Tường Lửa",
        data: "1GB / Ngày",
        duration: 5,
        price: 185000,
        features: ["Nhà mạng: China Unicom", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Quét mã QR", "Tích hợp sẵn VPN (Facebook, Google, Zalo...)"],
        isPopular: true
      },
      {
        id: "cn-7d-14gb",
        name: "Trung Quốc 7 Ngày Vượt Tường Lửa",
        data: "2GB / Ngày",
        duration: 7,
        price: 265000,
        features: ["Nhà mạng: China Mobile", "Tốc độ: 4G/5G", "Kích hoạt: Quét mã QR", "Sử dụng mạng xã hội không giới hạn"],
      }
    ]
  },
  {
    id: "europe",
    countryName: "Châu Âu (30+ nước)",
    flag: "🇪🇺",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1473984848342-00118a015765?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "eu-10d-10gb",
        name: "Châu Âu 10 Ngày 10GB",
        data: "10GB Tổng dung lượng",
        duration: 10,
        price: 349000,
        features: ["Phủ sóng: 32 nước Châu Âu", "Nhà mạng: Orange / Vodafone", "Tốc độ: 4G LTE mạng khỏe", "Kích hoạt: Quét mã QR"],
      },
      {
        id: "eu-15d-30gb",
        name: "Châu Âu 15 Ngày 30GB",
        data: "2GB / Ngày",
        duration: 15,
        price: 499000,
        features: ["Phủ sóng: 32 nước Châu Âu", "Nhà mạng: Vodafone", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Quét mã QR", "Hỗ trợ phát Hotspot tốt"],
        isPopular: true
      },
      {
        id: "eu-30d-unlimited",
        name: "Châu Âu 30 Ngày Unlimited",
        data: "Không giới hạn",
        duration: 30,
        price: 899000,
        features: ["Phủ sóng: Toàn bộ Châu Âu", "Nhà mạng: Deutsche Telekom", "Tốc độ: 4G/5G", "Kích hoạt: Quét mã QR", "Sử dụng thả ga không lo giới hạn"],
      }
    ]
  },
  {
    id: "usa",
    countryName: "Mỹ (USA)",
    flag: "🇺🇸",
    region: "America",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "us-7d-unlimited",
        name: "Mỹ 7 Ngày Không Giới Hạn",
        data: "Không giới hạn",
        duration: 7,
        price: 389000,
        features: ["Nhà mạng: T-Mobile / AT&T", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Quét mã QR", "Gọi & Nhắn tin nội địa Mỹ miễn phí"],
        isPopular: true
      },
      {
        id: "us-15d-unlimited",
        name: "Mỹ 15 Ngày Không Giới Hạn",
        data: "Không giới hạn",
        duration: 15,
        price: 549000,
        features: ["Nhà mạng: T-Mobile", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Quét mã QR", "Không giới hạn dung lượng tốc độ cao"],
      },
      {
        id: "us-30d-unlimited",
        name: "Mỹ 30 Ngày Không Giới Hạn",
        data: "Không giới hạn",
        duration: 30,
        price: 899000,
        features: ["Nhà mạng: T-Mobile / AT&T", "Tốc độ: 4G/5G cực mạnh", "Kích hoạt: Quét mã QR", "Có sẵn số điện thoại Mỹ nhận tin nhắn"],
      }
    ]
  },
  {
    id: "australia",
    countryName: "Úc (Australia)",
    flag: "🇦🇺",
    region: "Global",
    image: "https://images.unsplash.com/photo-1523482596112-99d944c3959b?q=80&w=600&auto=format&fit=crop",
    packages: [
      {
        id: "au-7d-7gb",
        name: "Úc 7 Ngày 7GB",
        data: "1GB / Ngày",
        duration: 7,
        price: 249000,
        features: ["Nhà mạng: Optus / Telstra", "Tốc độ: 4G LTE phủ rộng", "Kích hoạt: Quét mã QR", "Hỗ trợ chia sẻ Wi-Fi"],
      },
      {
        id: "au-15d-unlimited",
        name: "Úc 15 Ngày Unlimited",
        data: "Không giới hạn",
        duration: 15,
        price: 489000,
        features: ["Nhà mạng: Telstra", "Tốc độ: 4G/5G tốc độ cao", "Kích hoạt: Quét mã QR", "Tự động kết nối trạm mạng tốt nhất"],
        isPopular: true
      }
    ]
  }
];

export const compatibleDevices = {
  Apple: [
    "iPhone 15, 15 Plus, 15 Pro, 15 Pro Max",
    "iPhone 14, 14 Plus, 14 Pro, 14 Pro Max",
    "iPhone 13, 13 mini, 13 Pro, 13 Pro Max",
    "iPhone 12, 12 mini, 12 Pro, 12 Pro Max",
    "iPhone 11, 11 Pro, 11 Pro Max",
    "iPhone XS, XS Max, XR",
    "iPhone SE (2020), SE (2022)",
    "iPad Pro (11-inch) (1st gen trở lên)",
    "iPad Pro (12.9-inch) (3rd gen trở lên)",
    "iPad Air (3rd gen trở lên)",
    "iPad (7th gen trở lên)",
    "iPad mini (5th gen trở lên)"
  ],
  Samsung: [
    "Galaxy S24, S24+, S24 Ultra",
    "Galaxy S23, S23+, S23 Ultra, S23 FE",
    "Galaxy S22, S22+, S22 Ultra",
    "Galaxy S21, S21+, S21 Ultra 5G",
    "Galaxy S20, S20+, S20 Ultra",
    "Galaxy Z Fold5, Z Flip5",
    "Galaxy Z Fold4, Z Flip4",
    "Galaxy Z Fold3, Z Flip3",
    "Galaxy Z Fold2, Z Flip 5G, Z Flip",
    "Galaxy Note 20, Note 20 Ultra"
  ],
  Google: [
    "Pixel 8, 8 Pro",
    "Pixel 7, 7a, 7 Pro",
    "Pixel 6, 6a, 6 Pro",
    "Pixel 5, 5a",
    "Pixel 4, 4a, 4 XL",
    "Pixel 3, 3a, 3 XL"
  ],
  Other: [
    "Oppo Find X5, Find X5 Pro",
    "Oppo Find X3 Pro",
    "Oppo Reno 8 Pro 5G",
    "Xiaomi 13, 13 Pro, 13 Lite",
    "Xiaomi 12T Pro",
    "Huawei P40, P40 Pro",
    "Huawei Mate 40 Pro",
    "Sony Xperia 1 V, 5 V",
    "Sony Xperia 1 IV, 10 IV"
  ]
};
