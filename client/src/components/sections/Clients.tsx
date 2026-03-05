import React from "react";
import agribankLogo from "@/assets/partners/agribank.png";
import laocaiLogo from "@/assets/partners/laocai.png";
import ipecoLogo from "@/assets/partners/ipeco.png";
import infoCenterLogo from "@/assets/partners/info-center.png";
import phanBonMienNamLogo from "@/assets/partners/phan-bon-mien-nam.png";
import vinachemLogo from "@/assets/partners/vinachem.png";
import dapVinachemLogo from "@/assets/partners/dap-vinachem.png";

type ClientLogo = {
  name: string;
  src: string;
};

const clientLogos: ClientLogo[] = [
  { name: "Agribank", src: agribankLogo },
  { name: "Lào Cai", src: laocaiLogo },
  { name: "IPECO", src: ipecoLogo },
  { name: "Trung tâm Thông tin KHKT Hóa chất", src: infoCenterLogo },
  { name: "Phân bón Miền Nam", src: phanBonMienNamLogo },
  { name: "Vinachem", src: vinachemLogo },
  { name: "DAP Vinachem", src: dapVinachemLogo },
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

        <div className="logo-marquee border border-slate-100 rounded-2xl bg-white py-8 px-4">
          <div className="logo-marquee-track gap-6 md:gap-10">
            {[...clientLogos, ...clientLogos].map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-center px-10 py-4 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-14 md:h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

