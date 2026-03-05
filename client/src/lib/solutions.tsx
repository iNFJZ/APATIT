import { Building2, Globe, Handshake, Pickaxe, Tractor, TrainTrack } from "lucide-react";
import React from "react";

export type SolutionKey =
  | "mining"
  | "support-services"
  | "fertilizer-production"
  | "infrastructure-construction"
  | "public-works"
  | "import-export";

export type SolutionSection = {
  title: string;
  bullets: string[];
};

export type Solution = {
  key: SolutionKey;
  slug: string;
  title: string;
  summary: string;
  icon: React.ReactElement;
  sections: SolutionSection[];
};

export const solutions: Solution[] = [
  {
    key: "mining",
    slug: "khai-thac-khoang-san",
    title: "Khai thác khoáng sản",
    summary: "Khai thác khoáng hóa chất và khoáng phân bón (quặng Apatit) từ các mỏ quy mô lớn với công nghệ hiện đại.",
    icon: <Pickaxe className="w-8 h-8" />,
    sections: [
      {
        title: "Năng lực khai thác",
        bullets: [
          "Tổ chức khai thác tại các mỏ quy mô lớn, đảm bảo tiến độ và sản lượng ổn định theo kế hoạch.",
          "Ứng dụng cơ giới hóa và tối ưu quy trình để nâng cao hiệu suất, giảm thất thoát tài nguyên.",
          "Quản lý an toàn lao động, kiểm soát rủi ro và tuân thủ các tiêu chuẩn vận hành tại mỏ.",
        ],
      },
      {
        title: "Chất lượng & kiểm soát",
        bullets: [
          "Phân loại quặng theo chỉ tiêu kỹ thuật phục vụ các mục đích chế biến khác nhau.",
          "Kiểm soát chất lượng theo lô, đảm bảo tính đồng đều cho khách hàng và nhà máy sử dụng.",
          "Theo dõi nguồn gốc, tuyến vận chuyển và lưu kho nhằm giảm sai lệch chất lượng.",
        ],
      },
    ],
  },
  {
    key: "support-services",
    slug: "dich-vu-ho-tro",
    title: "Dịch vụ hỗ trợ",
    summary: "Cung cấp dịch vụ hỗ trợ khai thác mỏ và quặng cho các đối tác trong và ngoài nước một cách chuyên nghiệp.",
    icon: <Handshake className="w-8 h-8" />,
    sections: [
      {
        title: "Dịch vụ hỗ trợ khai thác",
        bullets: [
          "Hỗ trợ kỹ thuật khai thác và vận hành tại mỏ theo yêu cầu đối tác.",
          "Tư vấn lựa chọn giải pháp tối ưu trong tổ chức khai thác, an toàn và môi trường.",
          "Hỗ trợ logistics, điều phối vận chuyển và các công việc phụ trợ liên quan.",
        ],
      },
      {
        title: "Cam kết dịch vụ",
        bullets: [
          "Quy trình phối hợp rõ ràng, đầu mối hỗ trợ xuyên suốt.",
          "Chất lượng dịch vụ nhất quán, đảm bảo tiến độ và tuân thủ an toàn.",
          "Linh hoạt theo quy mô dự án và yêu cầu kỹ thuật của đối tác.",
        ],
      },
    ],
  },
  {
    key: "fertilizer-production",
    slug: "san-xuat-phan-bon",
    title: "Sản xuất phân bón",
    summary: "Nghiên cứu, sản xuất các loại phân bón NPK và các loại hợp chất nitơ chất lượng cao phục vụ nông nghiệp.",
    icon: <Tractor className="w-8 h-8" />,
    sections: [
      {
        title: "Danh mục sản phẩm",
        bullets: [
          "Sản xuất các dòng phân bón NPK theo đơn đặt hàng và nhu cầu thị trường.",
          "Tối ưu công thức phối trộn theo cây trồng, thổ nhưỡng và mùa vụ.",
          "Đảm bảo tiêu chuẩn chất lượng và tính ổn định của lô hàng.",
        ],
      },
      {
        title: "Nghiên cứu & phát triển",
        bullets: [
          "Cải tiến công nghệ và quy trình sản xuất nhằm nâng cao hiệu quả sử dụng phân bón.",
          "Phối hợp thử nghiệm thực địa với đối tác/đại lý để đánh giá hiệu quả sản phẩm.",
          "Kiểm soát chất lượng đầu vào–đầu ra để đảm bảo truy xuất và độ tin cậy.",
        ],
      },
    ],
  },
  {
    key: "infrastructure-construction",
    slug: "xay-dung-ha-tang",
    title: "Xây dựng hạ tầng",
    summary: "Thi công các công trình đường sắt, đường bộ, cầu cống và hệ thống giao thông vận tải chuyên dụng.",
    icon: <TrainTrack className="w-8 h-8" />,
    sections: [
      {
        title: "Hạng mục thi công",
        bullets: [
          "Thi công đường bộ, đường sắt, cầu cống và hạ tầng phục vụ vận chuyển hàng hóa.",
          "Hệ thống thoát nước, công trình phụ trợ và các hạng mục kỹ thuật liên quan.",
          "Tổ chức thi công đảm bảo an toàn, tiến độ và chất lượng công trình.",
        ],
      },
      {
        title: "Năng lực triển khai",
        bullets: [
          "Kinh nghiệm thi công hạ tầng gắn với đặc thù mỏ và vận tải.",
          "Quản lý vật tư, thiết bị và nhân lực theo kế hoạch dự án.",
          "Kiểm soát chất lượng thi công theo tiêu chuẩn, hồ sơ nghiệm thu đầy đủ.",
        ],
      },
    ],
  },
  {
    key: "public-works",
    slug: "cong-trinh-cong-ich",
    title: "Công trình công ích",
    summary: "Xây dựng nhà ở, nhà làm việc, nhà kho và các công trình công cộng, công trình nông nghiệp.",
    icon: <Building2 className="w-8 h-8" />,
    sections: [
      {
        title: "Hạng mục công ích",
        bullets: [
          "Xây dựng nhà ở, nhà làm việc, kho bãi và các công trình phục vụ sản xuất.",
          "Công trình công cộng và công trình nông nghiệp theo yêu cầu địa phương/đối tác.",
          "Tối ưu thiết kế–thi công để đảm bảo hiệu quả vận hành và độ bền công trình.",
        ],
      },
      {
        title: "Chất lượng & an toàn",
        bullets: [
          "Tuân thủ tiêu chuẩn kỹ thuật, quy định pháp lý và an toàn thi công.",
          "Kiểm soát chất lượng vật liệu, nghiệm thu theo giai đoạn.",
          "Đảm bảo tiến độ và minh bạch trong phối hợp triển khai.",
        ],
      },
    ],
  },
  {
    key: "import-export",
    slug: "xuat-nhap-khau",
    title: "Xuất nhập khẩu",
    summary: "Xuất nhập khẩu nguyên vật liệu, vật tư, thiết bị và hàng hóa phục vụ sản xuất kinh doanh.",
    icon: <Globe className="w-8 h-8" />,
    sections: [
      {
        title: "Phạm vi hoạt động",
        bullets: [
          "Xuất nhập khẩu nguyên vật liệu, vật tư, thiết bị phục vụ sản xuất.",
          "Kết nối đối tác trong nước và quốc tế, tối ưu chuỗi cung ứng.",
          "Hỗ trợ thủ tục và phối hợp logistics theo lô hàng.",
        ],
      },
      {
        title: "Năng lực cung ứng",
        bullets: [
          "Quản lý nhà cung cấp, hợp đồng và kế hoạch giao nhận.",
          "Đảm bảo tiêu chuẩn chất lượng hàng hóa theo yêu cầu sử dụng.",
          "Tối ưu chi phí vận chuyển, lưu kho và thời gian thông quan.",
        ],
      },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((item) => item.slug === slug);
}

