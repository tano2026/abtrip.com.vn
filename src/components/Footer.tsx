import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f2c59] border-t border-white/10 pt-16 pb-8 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold tracking-tighter">
              <span style={{ color: "#5a8fc4" }}>ab</span><span style={{ color: "#4ab8cc" }}>trip</span>
            </h3>
            <p className="text-sm leading-relaxed font-light">
              Công ty TNHH Thương mại Du lịch và Dịch vụ Hàng không ABTRIP. Đối tác chiến lược cung cấp giải pháp di chuyển và lưu trú đẳng cấp cho doanh nghiệp.
            </p>
            <p className="text-sm font-semibold text-cyan-400">MST: 0109972765</p>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Hệ sinh thái</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/bang-gia" className="hover:text-cyan-300 transition-colors font-semibold text-white">Bảng Giá Dịch Vụ</Link></li>
              <li><Link href="/dich-vu-san-bay" className="hover:text-cyan-300 transition-colors">Dịch vụ Sân bay VIP</Link></li>
              <li><Link href="/dich-vu-mat-dat" className="hover:text-cyan-300 transition-colors">Dịch vụ Mặt đất Sân bay</Link></li>
              <li><Link href="/sim" className="hover:text-cyan-300 transition-colors">Sim & eSIM Quốc tế</Link></li>
              <li><Link href="/visa-ho-chieu" className="hover:text-cyan-300 transition-colors">Tiện ích Du lịch (Visa, Passport)</Link></li>
              <li><Link href="/tour" className="hover:text-cyan-300 transition-colors">Tour Du Lịch</Link></li>
              <li><Link href="/khach-san" className="hover:text-cyan-300 transition-colors">Đặt phòng Khách sạn</Link></li>
              <li><Link href="/to-chuc-su-kien" className="hover:text-cyan-300 transition-colors">Tổ chức Sự kiện (MICE)</Link></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-6">Thông tin liên hệ</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Trụ sở:</strong> Số 8 ngõ 80/78 Bắc Cầu, Phường Bồ Đề, TP. Hà Nội</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>VPGD:</strong> Số 16 ngõ 61 Lạc Trung, Phường Vĩnh Tuy, TP. Hà Nội</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-white font-bold text-lg">0868 320 320</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span>info@abtrip.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ABTRIP. All rights reserved. Designed with precision.</p>
        </div>
      </div>
    </footer>
  );
}
