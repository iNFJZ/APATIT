import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

import heroBg from "@/assets/images/hero.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Khu mỏ Apatit" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-secondary/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 mt-20">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6 animate-in slide-in-from-bottom-4 duration-500">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Hơn 60 năm hình thành và phát triển
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 animate-in slide-in-from-bottom-6 duration-700 delay-100">
            Khơi nguồn <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              giá trị vững bền
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl animate-in slide-in-from-bottom-8 duration-700 delay-200">
            Đơn vị hàng đầu Việt Nam trong lĩnh vực khai thác, tuyển quặng Apatit, sản xuất phân bón và hóa chất, đóng góp tích cực vào sự phát triển của nền nông nghiệp nước nhà.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button size="lg" className="rounded-full text-base h-12 px-8 shadow-lg shadow-primary/20 group">
              Khám phá Sản phẩm
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,195,96.65,236.4,81.65,280.4,70.52,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}