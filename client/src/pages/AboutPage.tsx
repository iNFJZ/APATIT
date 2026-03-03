import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, History, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-20 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Giới Thiệu</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Hành trình hơn 60 năm kiến tạo giá trị và đóng góp cho sự phát triển của ngành công nghiệp khai khoáng Việt Nam.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold text-secondary mb-6">Lịch sử hình thành</h2>
                <div className="space-y-8">
                  {[
                    { year: "1955", content: "Thành lập Mỏ Apatit Lào Cai - tiền thân của công ty ngày nay." },
                    { year: "1988", content: "Đổi tên thành Xí nghiệp Liên hợp Apatit Lào Cai để phù hợp quy mô mới." },
                    { year: "1993", content: "Chính thức thành lập Công ty Apatit Việt Nam." },
                    { year: "2004", content: "Chuyển đổi sang mô hình Công ty TNHH Một thành viên theo quyết định của Thủ tướng." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 relative pb-8 last:pb-0">
                      {i !== 3 && <div className="absolute left-[23px] top-10 bottom-0 w-px bg-primary/30"></div>}
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 z-10">
                        {item.year.slice(2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-secondary mb-1">{item.year}</h4>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-100 rounded-2xl p-8 lg:p-12">
                <div className="grid grid-cols-1 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <Target className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Sứ mệnh</h3>
                    <p className="text-muted-foreground text-sm">Cung cấp nguồn nguyên liệu chất lượng cao cho ngành công nghiệp phân bón, góp phần đảm bảo an ninh lương thực quốc gia.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <Eye className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Tầm nhìn</h3>
                    <p className="text-muted-foreground text-sm">Trở thành tập đoàn công nghiệp hóa chất hàng đầu khu vực, phát triển bền vững và thân thiện với môi trường.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
