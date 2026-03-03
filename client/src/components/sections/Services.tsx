import { Layers, Pickaxe, Tractor, TrainTrack, Building2, Globe } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Pickaxe className="w-8 h-8" />,
      title: "Khai thác khoáng sản",
      desc: "Khai thác khoáng hóa chất và khoáng phân bón (quặng Apatit) từ các mỏ quy mô lớn với công nghệ hiện đại."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Dịch vụ hỗ trợ",
      desc: "Cung cấp dịch vụ hỗ trợ khai thác mỏ và quặng cho các đối tác trong và ngoài nước một cách chuyên nghiệp."
    },
    {
      icon: <Tractor className="w-8 h-8" />,
      title: "Sản xuất phân bón",
      desc: "Nghiên cứu, sản xuất các loại phân bón NPK và các loại hợp chất nitơ chất lượng cao phục vụ nông nghiệp."
    },
    {
      icon: <TrainTrack className="w-8 h-8" />,
      title: "Xây dựng hạ tầng",
      desc: "Thi công các công trình đường sắt, đường bộ, cầu cống và hệ thống giao thông vận tải chuyên dụng."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Công trình công ích",
      desc: "Xây dựng nhà ở, nhà làm việc, nhà kho và các công trình công cộng, công trình nông nghiệp."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Xuất nhập khẩu",
      desc: "Xuất nhập khẩu nguyên vật liệu, vật tư, thiết bị và hàng hóa phục vụ sản xuất kinh doanh."
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
            <span className="w-8 h-px bg-primary"></span>
            Lĩnh Vực Hoạt Động
            <span className="w-8 h-px bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary mb-6">
            Đa dạng hóa để phát triển toàn diện
          </h2>
          <p className="text-muted-foreground text-lg">
            Với nền tảng vững chắc từ khai thác khoáng sản, chúng tôi mở rộng sang nhiều lĩnh vực thiết yếu để tạo chuỗi giá trị khép kín.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold text-secondary mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}