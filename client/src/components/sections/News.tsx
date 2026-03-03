import { CalendarDays, ArrowRight } from "lucide-react";
import news1 from "@/assets/images/news-1.jpg";
import news2 from "@/assets/images/news-2.jpg";

export default function News() {
  const news = [
    {
      date: "03/02/2026",
      title: "Gặp mặt đầu xuân, chúc Tết CBCNV Công ty TNHH MTV Apatit Việt Nam",
      img: news1,
      excerpt: "Sáng nay, đồng chí Phùng Quang Hiệp đã có buổi gặp mặt và chúc tết toàn thể cán bộ công nhân viên công ty nhân dịp đầu xuân năm mới."
    },
    {
      date: "25/01/2026",
      title: "Tăng cường phối hợp bảo đảm an ninh, trật tự, an toàn sản xuất",
      img: news2,
      excerpt: "Công ty Apatit Việt Nam vừa ký kết quy chế phối hợp nhằm đảm bảo an ninh trật tự và an toàn trong hoạt động khai thác và sản xuất kinh doanh."
    },
    {
      date: "15/01/2026",
      title: "Công bố quyết định bổ nhiệm thành viên hội đồng thành viên",
      img: "https://images.unsplash.com/photo-1577415124269-0ea1c41258ce?q=80&w=600&auto=format&fit=crop",
      excerpt: "Buổi lễ công bố các quyết định quan trọng về nhân sự cấp cao của công ty đã diễn ra thành công tốt đẹp tại trụ sở chính."
    }
  ];

  return (
    <section id="news" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
            <span className="w-8 h-px bg-primary"></span>
            Tin Tức & Sự Kiện
            <span className="w-8 h-px bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary">
            Cập nhật hoạt động mới nhất
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Main featured news */}
          <div className="group cursor-pointer rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-[16/9] overflow-hidden relative">
              <img 
                src={news[0].img} 
                alt={news[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium text-secondary shadow-sm">
                <CalendarDays className="w-4 h-4 text-primary" />
                {news[0].date}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-heading font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-2">
                {news[0].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {news[0].excerpt}
              </p>
              <span className="inline-flex items-center font-medium text-primary">
                Đọc tiếp <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Secondary news list */}
          <div className="flex flex-col gap-8">
            {news.slice(1).map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-6 group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-full sm:w-48 shrink-0 aspect-[4/3] rounded-xl overflow-hidden relative">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                    <CalendarDays className="w-3.5 h-3.5 text-primary" />
                    {item.date}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="mt-auto pt-4 flex justify-end">
              <a href="#" className="inline-flex items-center gap-2 font-medium text-secondary hover:text-primary transition-colors">
                Xem tất cả tin tức <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}