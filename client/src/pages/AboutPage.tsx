import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Factory, Globe2, History, MapPin, Target, TreePine, Users } from "lucide-react";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const timelineItems: TimelineItem[] = [
  {
    year: "1955",
    title: "Mỏ Apatit Lào Cai",
    description: "Thành lập Mỏ Apatit Lào Cai, khởi đầu hoạt động khai thác quặng apatit trên địa bàn tỉnh Lào Cai.",
  },
  {
    year: "1988",
    title: "Xí nghiệp Liên hợp Apatit Lào Cai",
    description: "Tái cấu trúc thành Xí nghiệp Liên hợp Apatit Lào Cai để đáp ứng yêu cầu sản xuất mới.",
  },
  {
    year: "1993",
    title: "Công ty Apatit Việt Nam",
    description: "Chính thức thành lập Công ty Apatit Việt Nam, mở rộng phạm vi hoạt động khai thác và chế biến.",
  },
  {
    year: "2004",
    title: "Công ty TNHH MTV Apatit Việt Nam",
    description:
      "Chuyển đổi mô hình thành Công ty TNHH Một thành viên Apatit Việt Nam theo Quyết định số 116/2004/QĐ-TTg của Thủ tướng Chính phủ.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="pt-8 pb-10 md:pt-12 md:pb-14 bg-secondary text-white">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary bg-white/10 rounded-full px-4 py-1 animate-in slide-in-from-bottom-4 duration-500">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Hơn 60 năm hình thành và phát triển
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight animate-in slide-in-from-bottom-6 duration-700 delay-100">
                Đơn vị chủ lực trong khai thác
                <span className="block text-primary">và chế biến quặng Apatit Việt Nam</span>
              </h1>
              <p className="text-white/80 max-w-2xl text-base md:text-lg animate-in slide-in-from-bottom-8 duration-700 delay-200">
                Công ty TNHH MTV Apatit Việt Nam (VINAAPACO) là doanh nghiệp đầu ngành trong lĩnh vực khai thác khoáng
                sản, sản xuất phân bón và hóa chất, đóng góp quan trọng cho phát triển nông nghiệp và công nghiệp của
                đất nước.
              </p>
              <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom-10 duration-700 delay-300">
                <Button className="rounded-full px-8" asChild>
                  <a href="/san-pham">Khám phá sản phẩm</a>
                </Button>
                <Button variant="outline" className="rounded-full px-8 border-white/40 text-white" asChild>
                  <a href="/lien-he">Kết nối hợp tác</a>
                </Button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6">
              <div className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/15 animate-in slide-in-from-bottom-6 duration-600 delay-150">
                <History className="w-8 h-8 text-primary mb-3" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">KINH NGHIỆM</p>
                <p className="text-2xl font-heading font-bold">60+ năm</p>
                <p className="text-xs text-white/70 mt-1">khai thác và chế biến quặng Apatit</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/15 animate-in slide-in-from-bottom-6 duration-600 delay-200">
                <Factory className="w-8 h-8 text-primary mb-3" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">LĨNH VỰC</p>
                <p className="text-2xl font-heading font-bold">4+</p>
                <p className="text-xs text-white/70 mt-1">khai khoáng, phân bón, hóa chất, xây dựng</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/15 animate-in slide-in-from-bottom-6 duration-600 delay-250">
                <Users className="w-8 h-8 text-primary mb-3" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">ĐỘI NGŨ</p>
                <p className="text-2xl font-heading font-bold">Hàng nghìn</p>
                <p className="text-xs text-white/70 mt-1">cán bộ, kỹ sư và công nhân lành nghề</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/15 animate-in slide-in-from-bottom-6 duration-600 delay-300">
                <TreePine className="w-8 h-8 text-primary mb-3" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">ĐỊNH HƯỚNG</p>
                <p className="text-2xl font-heading font-bold">Bền vững</p>
                <p className="text-xs text-white/70 mt-1">gắn khai thác với bảo vệ môi trường</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-secondary">Về VINAAPACO</h2>
              <p className="text-muted-foreground">
                Tiền thân là Mỏ Apatit Lào Cai thành lập từ năm 1955, Công ty TNHH MTV Apatit Việt Nam đã trải qua nhiều
                giai đoạn phát triển và tái cấu trúc để phù hợp với yêu cầu sản xuất kinh doanh từng thời kỳ. Với mạng
                lưới mỏ, nhà máy tuyển, kho chứa và hệ thống vận chuyển đồng bộ, VINAAPACO hiện là đơn vị chủ lực trong
                chuỗi cung ứng nguyên liệu Apatit cho các nhà máy phân bón và hóa chất trong nước.
              </p>
              <p className="text-muted-foreground">
                Công ty tập trung vào khai thác, tuyển, chế biến và tiêu thụ quặng Apatit; sản xuất phân bón NPK và các
                sản phẩm hóa chất liên quan; đồng thời tham gia xây dựng hạ tầng, dịch vụ vận tải và xuất nhập khẩu
                nguyên vật liệu phục vụ ngành hóa chất và nông nghiệp.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" aria-hidden />
                  <span className="text-sm text-muted-foreground">
                    Hệ thống mỏ và nhà máy tuyển quặng trải dài trên địa bàn tỉnh Lào Cai.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" aria-hidden />
                  <span className="text-sm text-muted-foreground">
                    Danh mục sản phẩm phong phú: quặng Apatit tuyển, đá phosphate, quặng Fenspát, Kaolin, phân bón NPK
                    và phụ gia các loại.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" aria-hidden />
                  <span className="text-sm text-muted-foreground">
                    Mối quan hệ hợp tác bền chặt với các tập đoàn hóa chất, doanh nghiệp phân bón và đối tác hạ tầng
                    trên cả nước.
                  </span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <Target className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-heading font-semibold text-secondary mb-2">Sứ mệnh</h3>
                <p className="text-sm text-muted-foreground">
                  Cung cấp nguồn nguyên liệu và sản phẩm chất lượng cao, an toàn và ổn định cho ngành phân bón, hóa
                  chất và các ngành công nghiệp liên quan, góp phần đảm bảo an ninh lương thực và phát triển kinh tế
                  bền vững.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <Globe2 className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-heading font-semibold text-secondary mb-2">Tầm nhìn</h3>
                <p className="text-sm text-muted-foreground">
                  Trở thành doanh nghiệp khai khoáng và hóa chất hàng đầu Việt Nam, từng bước hội nhập khu vực, đi đầu
                  trong đổi mới công nghệ, an toàn sản xuất và bảo vệ môi trường.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:col-span-2">
                <h3 className="text-lg font-heading font-semibold text-secondary mb-3">Giá trị cốt lõi</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-secondary mb-1">Trách nhiệm</p>
                    <p className="text-muted-foreground">
                      Đặt an toàn, chất lượng và trách nhiệm với cộng đồng lên hàng đầu trong mọi hoạt động.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">Chuyên nghiệp</p>
                    <p className="text-muted-foreground">
                      Chuẩn hóa quy trình, nâng cao năng lực đội ngũ, áp dụng công nghệ hiện đại trong quản lý và sản
                      xuất.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">Bền vững</p>
                    <p className="text-muted-foreground">
                      Khai thác hiệu quả gắn với phục hồi môi trường, tối ưu sử dụng tài nguyên và tiết kiệm năng
                      lượng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-2">
                  Lịch sử hình thành và phát triển
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Hơn nửa thế kỷ gắn bó với ngành khai khoáng, VINAAPACO liên tục đổi mới mô hình tổ chức và công nghệ
                  để đáp ứng yêu cầu phát triển của nền kinh tế.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10">
              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <div key={item.year} className="flex gap-6 relative pb-8 last:pb-0">
                    {index !== timelineItems.length - 1 && (
                      <div className="absolute left-[23px] top-10 bottom-0 w-px bg-primary/20" />
                    )}
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 z-10">
                      {item.year.slice(2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <History className="w-4 h-4 text-primary" />
                        <h3 className="font-heading font-semibold text-secondary">{item.title}</h3>
                      </div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        {item.year}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-3">
                    Lĩnh vực hoạt động chính
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Khai thác khoáng hóa chất và khoáng phân bón, đặc biệt là quặng Apatit.</li>
                    <li>• Hoạt động dịch vụ hỗ trợ khai thác mỏ và quặng.</li>
                    <li>• Sản xuất phân bón và hợp chất chứa phốt pho.</li>
                    <li>• Xây dựng công trình công ích, hạ tầng đường sắt và đường bộ liên quan tới vận chuyển hàng hóa.</li>
                    <li>• Xuất nhập khẩu nguyên vật liệu, vật tư, thiết bị và hàng hóa phục vụ ngành hóa chất.</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-3">Hệ thống trụ sở</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-secondary">Trụ sở chính</p>
                        <p>Đại lộ Trần Hưng Đạo, Phường Bắc Cường, TP Lào Cai, Tỉnh Lào Cai.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-secondary">Văn phòng đại diện tại Hà Nội</p>
                        <p>Số 2, Ngõ Quan Thổ 1, Phường Ô Chợ Dừa, TP Hà Nội.</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 rounded-full" asChild>
                    <a href="/lien-he">Xem thông tin liên hệ chi tiết</a>
                  </Button>
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
