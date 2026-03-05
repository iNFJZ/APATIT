import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { solutions } from "@/lib/solutions";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="pt-8 pb-16 md:pt-12 md:py-20 bg-secondary text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary bg-white/10 rounded-full px-4 py-1 mb-4 animate-in slide-in-from-bottom-4 duration-500">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Giải pháp & Lĩnh vực hoạt động
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 animate-in slide-in-from-bottom-6 duration-700 delay-100">
                Giải pháp tổng thể từ khai thác đến sản xuất và hạ tầng
              </h1>
              <p className="text-white/80 text-base md:text-lg animate-in slide-in-from-bottom-8 duration-700 delay-200">
                Dựa trên nền tảng khai thác quặng Apatit, VINAAPACO phát triển chuỗi giải pháp khép kín: khai thác,
                dịch vụ hỗ trợ, sản xuất phân bón, xây dựng hạ tầng, công trình công ích và xuất nhập khẩu nguyên vật
                liệu.
              </p>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-3">
                  Danh mục giải pháp
                </h2>
                <p className="text-muted-foreground">
                  Chọn một lĩnh vực để xem năng lực triển khai, hạng mục dịch vụ và các cam kết chất lượng của chúng tôi.
                </p>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <a href="/lien-he">Tư vấn hợp tác</a>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((item) => (
                <Link key={item.slug} href={`/giai-phap/${item.slug}`}>
                  <a className="block min-w-0 group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-secondary mb-4 group-hover:text-primary transition-colors break-words min-w-0">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 break-words overflow-hidden min-w-0">
                      {item.summary}
                    </p>
                    <span className="inline-flex items-center font-medium text-primary">
                      Xem chi tiết <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

