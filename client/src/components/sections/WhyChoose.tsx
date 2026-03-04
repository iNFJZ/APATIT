import { ShieldCheck, Users, Factory, Leaf } from "lucide-react";

export default function WhyChoose() {
  const items = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Kinh nghiệm & uy tín",
      value: "60+ năm",
      description: "Liên tục khai thác, chế biến và cung ứng quặng Apatit cho ngành phân bón Việt Nam.",
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Chuỗi giá trị khép kín",
      value: "Từ mỏ đến nhà máy",
      description: "Khai thác, tuyển rửa, chế biến và cung cấp sản phẩm quặng, đá phosphate, phân bón.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Đội ngũ chuyên gia",
      value: "Hàng nghìn cán bộ",
      description: "Đội ngũ kỹ sư, công nhân lành nghề vận hành hệ thống khai thác và sản xuất hiện đại.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Cam kết bền vững",
      value: "An toàn & môi trường",
      description: "Tuân thủ nghiêm ngặt quy định về an toàn lao động và bảo vệ môi trường tại khu mỏ.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            Tại sao chọn VINAAPACO
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">
            Đối tác tin cậy của ngành phân bón Việt Nam
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            Với nền tảng lâu năm trong khai thác Apatit và sản xuất sản phẩm liên quan, VINAAPACO là lựa chọn
            đáng tin cậy cho các doanh nghiệp sản xuất phân bón và hóa chất trong nước.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-100 p-6 md:p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                  {item.title}
                </p>
                <p className="text-xl font-heading font-bold text-secondary mb-1">{item.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

