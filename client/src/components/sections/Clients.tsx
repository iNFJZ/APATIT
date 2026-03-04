import { Building2, Factory, Landmark } from "lucide-react";

type ClientItem = {
  icon: JSX.Element;
  name: string;
  description: string;
};

const clientItems: ClientItem[] = [
  {
    icon: <Building2 className="w-8 h-8" />,
    name: "Nhà máy sản xuất phân bón",
    description: "Các doanh nghiệp sản xuất phân bón NPK và phân lân trong nước sử dụng nguồn quặng Apatit ổn định.",
  },
  {
    icon: <Factory className="w-8 h-8" />,
    name: "Doanh nghiệp hóa chất & vật liệu",
    description: "Đối tác trong chuỗi giá trị hóa chất, vật liệu phục vụ nông nghiệp và công nghiệp.",
  },
  {
    icon: <Landmark className="w-8 h-8" />,
    name: "Đơn vị hạ tầng & dịch vụ công",
    description: "Các dự án xây dựng hạ tầng, công trình công ích, dịch vụ logistics và vận tải chuyên dụng.",
  },
];

export default function ClientsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            Đối tác & khách hàng
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Đồng hành cùng nhiều đơn vị chủ lực
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            VINAAPACO là mắt xích quan trọng trong chuỗi cung ứng nguyên liệu cho các nhà máy phân bón, doanh nghiệp
            hóa chất và các dự án hạ tầng trọng điểm trên cả nước.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientItems.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 md:p-7 shadow-sm flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-1">
                {item.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-secondary mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

