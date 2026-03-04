import news1Img from "@/assets/images/news-1.jpg";
import news2Img from "@/assets/images/news-2.jpg";

export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  img: string;
};

export const news: NewsItem[] = [
  {
    slug: "gap-mat-dau-xuan-chuc-tet-cbcnv",
    date: "03/02/2026",
    title: "Gặp mặt đầu xuân, chúc Tết CBCNV Công ty TNHH MTV Apatit Việt Nam",
    img: news1Img,
    excerpt:
      "Sáng nay, đồng chí Phùng Quang Hiệp đã có buổi gặp mặt và chúc tết toàn thể cán bộ công nhân viên công ty nhân dịp đầu xuân năm mới.",
    content:
      "Sáng nay, Công ty TNHH MTV Apatit Việt Nam đã tổ chức buổi gặp mặt đầu xuân nhằm tổng kết hoạt động, tri ân người lao động và triển khai những nhiệm vụ trọng tâm trong năm.\n\n" +
      "Buổi gặp mặt là dịp để ban lãnh đạo công ty gửi lời chúc mừng năm mới tới toàn thể cán bộ công nhân viên, động viên tinh thần thi đua lao động sản xuất, tiếp tục giữ vững an toàn và hiệu quả trong khai thác, chế biến và tiêu thụ sản phẩm.",
  },
  {
    slug: "tang-cuong-phoi-hop-dam-bao-an-ninh-trat-tu",
    date: "25/01/2026",
    title: "Tăng cường phối hợp bảo đảm an ninh, trật tự, an toàn sản xuất",
    img: news2Img,
    excerpt:
      "Công ty Apatit Việt Nam vừa ký kết quy chế phối hợp nhằm đảm bảo an ninh trật tự và an toàn trong hoạt động khai thác và sản xuất kinh doanh.",
    content:
      "Công ty Apatit Việt Nam đã ký kết quy chế phối hợp với các đơn vị liên quan nhằm tăng cường công tác bảo đảm an ninh, trật tự, an toàn sản xuất.\n\n" +
      "Chương trình phối hợp tập trung vào quản lý khu vực khai thác, kiểm soát phương tiện ra vào, nâng cao nhận thức an toàn lao động và đảm bảo ổn định sản xuất.",
  },
  {
    slug: "cong-bo-quyet-dinh-bo-nhiem-thanh-vien-hd-tv",
    date: "15/01/2026",
    title: "Công bố quyết định bổ nhiệm thành viên hội đồng thành viên",
    img: "https://images.unsplash.com/photo-1577415124269-0ea1c41258ce?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Buổi lễ công bố các quyết định quan trọng về nhân sự cấp cao của công ty đã diễn ra thành công tốt đẹp tại trụ sở chính.",
    content:
      "Tại trụ sở công ty, lễ công bố quyết định bổ nhiệm thành viên hội đồng thành viên đã được tổ chức trang trọng với sự tham dự của đại diện các đơn vị và cán bộ chủ chốt.\n\n" +
      "Các quyết định nhân sự góp phần kiện toàn tổ chức, nâng cao hiệu lực quản trị và tạo nền tảng cho giai đoạn phát triển tiếp theo.",
  },
];

export function findNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}

