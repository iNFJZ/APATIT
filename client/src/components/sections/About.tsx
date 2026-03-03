import aboutImg from "@/assets/images/about.jpg";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const milestones = [
    { year: "1955", title: "Thành lập Mỏ Apatit Lào Cai" },
    { year: "1988", title: "Đổi tên thành XN Liên hợp Apatit" },
    { year: "1993", title: "Thành lập Công ty Apatit Việt Nam" },
    { year: "2004", title: "Chuyển đổi thành Công ty TNHH MTV" }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image & Stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[3/4] lg:aspect-square group">
              <img 
                src={aboutImg} 
                alt="Về chúng tôi" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="text-5xl font-heading font-bold text-primary mb-2">60+</div>
                <div className="text-xl font-medium">Năm kinh nghiệm</div>
                <div className="w-12 h-1 bg-primary mt-4 rounded-full"></div>
              </div>
            </div>
            
            {/* Decorative block */}
            <div className="absolute -z-10 -top-8 -right-8 w-2/3 h-2/3 bg-primary/10 rounded-2xl blur-2xl"></div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-2/3 h-2/3 bg-blue-500/10 rounded-2xl blur-2xl"></div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
              <span className="w-8 h-px bg-primary"></span>
              Về Chúng Tôi
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6 leading-tight">
              Tiên phong trong khai thác & sản xuất phân bón
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Công ty TNHH Một thành viên Apatit Việt Nam (Trước đây là Mỏ Apatit Lào Cai) được thành lập từ năm 1955. Qua hơn 6 thập kỷ, chúng tôi không ngừng đổi mới và phát triển để đáp ứng nhu cầu sản xuất kinh doanh và đóng góp cho đất nước.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-secondary mb-2">Tầm Nhìn</h4>
                  <p className="text-muted-foreground">Trở thành tập đoàn công nghiệp hóa chất hàng đầu khu vực, phát triển bền vững và thân thiện với môi trường.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-secondary mb-2">Sứ Mệnh</h4>
                  <p className="text-muted-foreground">Cung cấp nguồn nguyên liệu chất lượng cao cho ngành công nghiệp phân bón, góp phần đảm bảo an ninh lương thực quốc gia.</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="rounded-full px-8">
              Lịch sử phát triển
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}