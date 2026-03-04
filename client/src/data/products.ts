import apatitImg from "@/assets/images/product-quang-apatit-tuyen.png";
import fenspatImg from "@/assets/images/product-fenspat.png";
import kaolinImg from "@/assets/images/product-kaolin.png";
import npkImg from "@/assets/images/product-npk.png";
import phosphateImg1 from "@/assets/images/product-phosphate1.png";
import phosphateImg2 from "@/assets/images/product-phosphate2.png";
import phuGiaImg from "@/assets/images/product-phu-gia.png";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  img: string;
  shortDescription: string;
  description: string;
};

export const products: Product[] = [
  {
    slug: "da-phosphate-loai-1",
    name: "Đá phosphate loại 1",
    category: "Khoáng sản",
    price: "Liên hệ",
    img: phosphateImg1,
    shortDescription:
      "Đá phosphate loại 1 (Apatite ore) có hàm lượng P2O5 khoảng 32 ± 1% (71–72% BPL), là nguyên liệu chính cho sản xuất phân bón phosphat.",
    description:
      "Đá phosphate loại 1 được khai thác từ quặng Apatit, dùng làm nguyên liệu cho sản xuất phân bón và các sản phẩm hóa chất chứa phốt pho. Thành phần hóa học điển hình (khối lượng %) của Apatite ore như sau:\n\n" +
      "- P2O5 (BPL): 32 ± 1% tương đương khoảng 71–72% BPL đối với quặng loại 1; 23 ± 1% (50–57% BPL) đối với quặng loại 2; 15 ± 1% đối với quặng loại 3; 32 ± 1% (71–72% BPL) đối với quặng đã tuyển.\n" +
      "- SiO2: 17% (loại 1), 11% (loại 2), 50% (loại 3), 14,5% (quặng tuyển).\n" +
      "- CaO: 45% cho quặng loại 1 và 2, 22% cho loại 3, 42% cho quặng tuyển.\n" +
      "- Fe2O3: 3,5% (loại 1), 3% (loại 2), 4% (loại 3), 3% (quặng tuyển).\n" +
      "- Al2O3: 6% (loại 1), 2,5% (loại 2), 8% (loại 3), 3,5% (quặng tuyển).\n" +
      "- MgO: 3% (loại 1), 8% (loại 2), 3% (loại 3), 1% (quặng tuyển).\n" +
      "- H2O: 14 ± 1% (loại 1), 3 ± 1% (loại 2), 18 ± 1% (loại 3), 16–18% (quặng tuyển).\n" +
      "- Cỡ hạt (Size Fraction): 1–250 mm chiếm khoảng 70% đối với loại 1 và loại 3; 25–250 mm khoảng 70% đối với loại 2; dưới 0,1 mm chiếm khoảng 98% đối với quặng tuyển.\n\n" +
      "Nhờ hàm lượng P2O5 cao và cỡ hạt phù hợp, đá phosphate loại 1 là nguồn nguyên liệu quan trọng cho các nhà máy sản xuất phân lân và NPK.",
  },
  {
    slug: "da-phosphate-loai-2",
    name: "Đá phosphate loại 2",
    category: "Khoáng sản",
    price: "Liên hệ",
    img: phosphateImg2,
    shortDescription:
      "Đá phosphate loại 2 có thể đạt hàm lượng P2O5 ≥ 26%, cỡ hạt được điều chỉnh linh hoạt theo yêu cầu khách hàng.",
    description:
      "Đá phosphate loại 2 là sản phẩm Apatite ore được phân loại theo hàm lượng P2O5 và cỡ hạt, phù hợp cho các dây chuyền sản xuất cần tối ưu chi phí. Theo mô tả kỹ thuật, đá phosphate loại 2 có thể đạt hàm lượng P2O5 ≥ 26% và cỡ hạt (size fraction) được điều chỉnh theo yêu cầu khách hàng.\n\n" +
      "Bảng thành phần hóa học tham khảo (Apatite ore, khối lượng %):\n" +
      "- P2O5 (BPL): 32 ± 1% (71–72% BPL) đối với quặng loại 1; 23 ± 1% (50–57% BPL) đối với quặng loại 2; 15 ± 1% đối với quặng loại 3; 32 ± 1% (71–72% BPL) đối với quặng đã tuyển.\n" +
      "- SiO2: 17% (loại 1), 11% (loại 2), 50% (loại 3), 14,5% (quặng tuyển).\n" +
      "- CaO: 45% cho quặng loại 1 và 2, 22% cho loại 3, 42% cho quặng tuyển.\n" +
      "- Fe2O3: 3,5% (loại 1), 3% (loại 2), 4% (loại 3), 3% (quặng tuyển).\n" +
      "- Al2O3: 6% (loại 1), 2,5% (loại 2), 8% (loại 3), 3,5% (quặng tuyển).\n" +
      "- MgO: 3% (loại 1), 8% (loại 2), 3% (loại 3), 1% (quặng tuyển).\n" +
      "- H2O: 14 ± 1% (loại 1), 3 ± 1% (loại 2), 18 ± 1% (loại 3), 16–18% (quặng tuyển).\n" +
      "- Cỡ hạt (Size Fraction): 1–250 mm chiếm khoảng 70% đối với loại 1 và loại 3; 25–250 mm khoảng 70% đối với loại 2; dưới 0,1 mm chiếm khoảng 98% đối với quặng tuyển.\n\n" +
      "Với thành phần hóa học ổn định và khả năng điều chỉnh cỡ hạt linh hoạt, đá phosphate loại 2 phù hợp cho nhiều công nghệ sản xuất phân lân khác nhau.",
  },
  {
    slug: "phan-bon-npk",
    name: "Phân Bón NPK",
    category: "Phân bón",
    price: "Liên hệ",
    img: npkImg,
    shortDescription:
      "Công ty tổ chức sản xuất và tiêu thụ nhiều loại phân bón NPK theo yêu cầu đặt hàng của khách hàng.",
    description:
      "Công ty TNHH MTV Apatit Việt Nam tổ chức sản xuất và tiêu thụ các loại phân bón NPK theo đơn đặt hàng, đáp ứng nhu cầu đa dạng của khách hàng. Hiện tại Công ty đang sản xuất các loại NPK sau:\n\n" +
      "- NPK 5 – 10 – 3\n" +
      "- NPK 8 – 6 – 4\n" +
      "- NPK 5 – 10 – 15\n" +
      "- NPK 8 – 4 – 6\n" +
      "- NPK 10 – 20 – 6\n" +
      "- NPK 8 – 4 – 8\n" +
      "- NPK 10 – 5 – 5\n" +
      "- NPK 5 – 20 – 5\n\n" +
      "Các công thức trên được phối trộn từ nguồn nguyên liệu đạt chuẩn, bảo đảm cung cấp cân đối các nguyên tố dinh dưỡng đa lượng N–P–K cho nhiều loại cây trồng và điều kiện canh tác khác nhau.",
  },
  {
    slug: "phu-gia-cac-loai",
    name: "Phụ gia các loại",
    category: "Hóa chất",
    price: "Liên hệ",
    img: phuGiaImg,
    shortDescription: "Các loại phụ gia phục vụ ngành phân bón và hóa chất.",
    description:
      "Danh mục phụ gia đa dạng, phục vụ cho sản xuất phân bón, xử lý môi trường và các ngành công nghiệp liên quan. Sản phẩm được nghiên cứu và phát triển nhằm tối ưu hiệu quả sử dụng và an toàn cho người lao động.",
  },
  {
    slug: "quang-apatit-tuyen",
    name: "Quặng Apatit tuyển",
    category: "Khoáng sản",
    price: "Liên hệ",
    img: apatitImg,
    shortDescription:
      "Quặng Apatit tuyển (Apatite ore) có hàm lượng P2O5 khoảng 32 ± 1%, là nguyên liệu quan trọng cho phân bón và hóa chất chứa phốt pho.",
    description:
      "Quặng Apatit tuyển là sản phẩm được chế biến từ quặng Apatit nguyên khai qua các công đoạn tuyển rửa, nhằm nâng hàm lượng P2O5 và giảm tạp chất. Theo bảng \"Quặng Apatit: Giới hạn thành phần hoá học\", thành phần điển hình (khối lượng %) như sau:\n\n" +
      "- P2O5: 32 ± 1% đối với quặng I nguyên khai, 23 ± 1% đối với quặng II nguyên khai, 15 ± 1% đối với quặng III nguyên khai và 32 ± 1% đối với quặng tuyển.\n" +
      "- SiO2: 17% (quặng I), 8% (quặng II), 50% (quặng III), 15% (quặng tuyển).\n" +
      "- CaO: 45% (quặng I), 43% (quặng II), 22% (quặng III), 45% (quặng tuyển).\n" +
      "- Fe2O3: 3,5% (quặng I), 2% (quặng II), 4% (quặng III), khoảng 1–2,5% (quặng tuyển).\n" +
      "- Al2O3: 6% (quặng I), 1% (quặng II), 8% (quặng III), khoảng 3–4,5% (quặng tuyển).\n" +
      "- MgO: 3% (quặng I), 7% (quặng II), 3% (quặng III), 1% (quặng tuyển).\n" +
      "- H2O: 14 ± 1% (quặng I), 3 ± 1% (quặng II), 18 ± 1% (quặng III), 16–18% (quặng tuyển).\n" +
      "- Cỡ hạt (mm): 1–250 mm chiếm khoảng 70% đối với quặng I và III, 25–250 mm chiếm khoảng 70% đối với quặng II, dưới 0,1 mm chiếm khoảng 98% đối với quặng tuyển.\n\n" +
      "Với các chỉ tiêu trên, quặng Apatit tuyển đáp ứng tốt yêu cầu của các dây chuyền sản xuất phân lân, phân NPK và các sản phẩm hóa chất chứa phốt pho.",
  },
  {
    slug: "quang-fenspat",
    name: "Quặng Fenspát",
    category: "Khoáng sản",
    price: "Liên hệ",
    img: fenspatImg,
    shortDescription:
      "Quặng Fenspát được sử dụng cho sản xuất gốm sứ, men, thủy tinh và các vật liệu xây dựng, với nhiều dòng sản phẩm xương, men và cao lanh.",
    description:
      "Quặng Fenspát là nguyên liệu quan trọng cho sản xuất gốm sứ, men, thủy tinh và một số vật liệu xây dựng. Theo bảng thành phần trên website, sản phẩm bao gồm các loại Fenspát xương (Fb), Fenspát men (Fa), quặng cao lanh làm xương, quặng cao lanh làm men và quặng tan A với các chỉ tiêu hóa học tham khảo như sau (khối lượng %):\n\n" +
      "- SiO2: khoảng 73–74% đối với quặng Fenspát xương (Fb), 71 ± 1% đối với Fenspát men (Fa), 50 ± 1% cho quặng cao lanh làm xương, 47 ± 1% cho quặng cao lanh làm men và 61 ± 1% cho quặng tan A.\n" +
      "- TiO2: không lớn hơn khoảng 0,04% đối với Fb, nhỏ hơn 0,08% đối với Fa, nhỏ hơn 0,1% cho quặng cao lanh làm xương, nhỏ hơn 0,02% cho quặng cao lanh làm men.\n" +
      "- CaO: khoảng 0,35–0,45% (Fb), xấp xỉ 0,6% (Fa), khoảng 0,2% đối với quặng tan A.\n" +
      "- Fe2O3: nhỏ hơn 1% (Fb), khoảng 0,4% (Fa), nhỏ hơn 0,1% cho quặng cao lanh làm xương, khoảng 0,5% cho quặng cao lanh làm men và khoảng 1,5% cho quặng tan A.\n" +
      "- Al2O3: khoảng 15–16% (Fb), 16 ± 1% (Fa), 32 ± 1% cho quặng cao lanh làm xương, 37 ± 1% cho quặng cao lanh làm men và khoảng 1 ± 0,5% cho quặng tan A.\n" +
      "- K2O: khoảng 4,5–4,7% (Fb), 8–9% (Fa), nhỏ hơn 2% cho quặng cao lanh làm xương, khoảng 1% cho quặng cao lanh làm men và khoảng 0,05% cho quặng tan A.\n" +
      "- Na2O: khoảng 4,2–4,4% (Fb), 2–3% (Fa), nhỏ hơn 1% cho quặng cao lanh làm xương, khoảng 1% cho quặng cao lanh làm men và khoảng 0,2% cho quặng tan A.\n" +
      "- MgO: khoảng 0,25–0,35% (Fb), khoảng 0,3% (Fa).\n" +
      "- MKN (mất khi nung): nhỏ hơn 1% (Fb), khoảng 0,6–0,7% (Fa), 13 ± 1% cho quặng cao lanh làm xương và khoảng 13–14% cho quặng cao lanh làm men.\n" +
      "- Cỡ hạt (mm): khoảng 0,25 mm đối với Fb, khoảng 0,2 mm đối với Fa và quặng cao lanh làm xương, cỡ hạt khoảng 63 µm cho quặng cao lanh làm men và 0,25 mm cho quặng tan A.\n" +
      "- H2O: nhỏ hơn 1% đối với Fb và Fa, khoảng 8 ± 1% cho quặng cao lanh làm xương, 12 ± 1% cho quặng cao lanh làm men và nhỏ hơn 1% cho quặng tan A.\n\n" +
      "Nhờ thành phần ổn định và đa dạng chủng loại, quặng Fenspát của Công ty Apatit Việt Nam đáp ứng tốt yêu cầu về kỹ thuật cho nhiều ứng dụng trong ngành gốm sứ và vật liệu xây dựng.",
  },
  {
    slug: "quang-kaolin",
    name: "Quặng Kaolin",
    category: "Khoáng sản",
    price: "Liên hệ",
    img: kaolinImg,
    shortDescription:
      "Kaolin (cao lanh) là loại đất sét màu trắng, dẻo khi gặp nước và trở nên rắn khi nung ở nhiệt độ cao.",
    description:
      "Kaolin (cao lanh) là loại đất sét màu trắng, nằm sâu dưới đất cát do thủy triều hoặc phong hóa tạo nên. Cái tên kaolin có nguồn gốc từ cách gọi Cao Lĩnh thổ (đất Cao Lĩnh) – một vùng đồi ở Cảnh Đức Trấn, Giang Tô, Trung Quốc. Khi gặp nước, kaolin dính dẻo, dễ định hình. Tiếp xúc với nhiệt độ cao, loại đất sét này lại thành thể rắn.\n\n" +
      "Kaolin không chỉ là nguyên liệu làm gốm sứ, nó còn ứng dụng được trong làm đẹp. Kaolin chứa nhiều khoáng chất có lợi cho da. Trong đó, điển hình là kẽm với tác dụng kháng viêm, thúc đẩy quá trình phát triển tế bào, cân bằng sự điều tiết bã nhờn, hỗ trợ cải thiện tình trạng mụn. Ngoài ra, nó còn chứa silic nhôm hiệu quả để làm liền sẹo và sát khuẩn, silica giúp kiềm dầu, còn canxi là thành phần chính tạo nên lớp biểu bì. Sử dụng kaolin sẽ mang lại tác dụng hút độc tố, cặn bã và cuốn đi lớp tế bào chết để các lỗ chân lông thoáng sạch, góp phần mang lại làn da tươi sáng hơn.\n\n" +
      "Nhận ra khả năng khử trùng và làm sạch hiệu quả của kaolin, phụ nữ Châu Phi và Ai Cập cổ đại thường pha đất sét trắng với nước và mật ong để tạo hỗn hợp mặt nạ đắp lên da. Tại Việt Nam, phụ nữ quý tộc, vương phi trong cung đình Huế đều sử dụng phấn nụ làm từ cao lanh, thảo dược, hoa tươi. Họ không chỉ trang điểm bằng phấn nụ vào ban ngày để tạo lớp nền mịn màng tươi sáng mà còn thoa phấn khắp người để dưỡng da, làm mát vào ban đêm. Công thức tạo nên sản phẩm này vẫn được những người thuộc dòng dõi quý tộc triều Nguyễn lưu giữ và tiếp tục sản xuất đến tận bây giờ.",
  },
];

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

