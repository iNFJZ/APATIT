import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white/80 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight text-white">
                  APATIT VIỆT NAM
                </span>
                <span className="text-xs font-medium text-primary">
                  VINAAPACO
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Hơn 60 năm xây dựng và trưởng thành, Công ty TNHH MTV Apatit Việt Nam tự hào là đơn vị hàng đầu trong lĩnh vực khai thác khoáng hóa chất và khoáng phân bón.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary">
              Liên Hệ
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Đại lộ Trần Hưng Đạo, Phường Bắc Cường, TP Lào Cai, Tỉnh Lào Cai</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>0214 3852 252</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@vinaapaco.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 before:content-['›'] before:text-primary">
                  Giới thiệu công ty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 before:content-['›'] before:text-primary">
                  Lĩnh vực hoạt động
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 before:content-['›'] before:text-primary">
                  Sản phẩm & Dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 before:content-['›'] before:text-primary">
                  Công bố thông tin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 before:content-['›'] before:text-primary">
                  Cơ hội nghề nghiệp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-primary">
              Bản tin
            </h3>
            <p className="text-sm mb-4 text-white/70">
              Đăng ký để nhận những thông tin mới nhất về hoạt động và sản phẩm của chúng tôi.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button 
                type="button"
                className="bg-primary hover:bg-primary/90 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Công ty TNHH MTV Apatit Việt Nam. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}