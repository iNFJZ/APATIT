import "dotenv/config";
import bcrypt from "bcryptjs";
import { inArray } from "drizzle-orm";
import { db } from "../server/db";
import { posts, products, users } from "../shared/schema";

type SeedUser = {
  username: string;
  password: string;
};

type SeedPost = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  type: "NEWS" | "ANNOUNCEMENT";
  publishedAt: Date;
  isPublished: boolean;
};

type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  priceLabel: string;
  imageUrl: string;
  shortDescription: string;
  description: string;
  publishedAt: Date;
  isPublished: boolean;
};

function createDateFromLocalDay(day: number, month: number, year: number): Date {
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}

async function upsertAdminUser(input: SeedUser): Promise<void> {
  const passwordHash = await bcrypt.hash(input.password, 10);
  await db
    .insert(users)
    .values({
      username: input.username,
      password: passwordHash,
    })
    .onConflictDoUpdate({
      target: users.username,
      set: {
        password: passwordHash,
      },
    });
}

async function upsertPosts(seed: SeedPost[]): Promise<void> {
  for (const item of seed) {
    await db
      .insert(posts)
      .values({
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        content: item.content,
        imageUrl: item.imageUrl,
        type: item.type,
        publishedAt: item.publishedAt,
        isPublished: item.isPublished,
      })
      .onConflictDoUpdate({
        target: posts.slug,
        set: {
          title: item.title,
          summary: item.summary,
          content: item.content,
          imageUrl: item.imageUrl,
          type: item.type,
          publishedAt: item.publishedAt,
          isPublished: item.isPublished,
        },
      });
  }
}

async function upsertProducts(seed: SeedProduct[]): Promise<void> {
  for (const item of seed) {
    await db
      .insert(products)
      .values({
        slug: item.slug,
        name: item.name,
        category: item.category,
        priceLabel: item.priceLabel,
        imageUrl: item.imageUrl,
        shortDescription: item.shortDescription,
        description: item.description,
        publishedAt: item.publishedAt,
        isPublished: item.isPublished,
      })
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: item.name,
          category: item.category,
          priceLabel: item.priceLabel,
          imageUrl: item.imageUrl,
          shortDescription: item.shortDescription,
          description: item.description,
          publishedAt: item.publishedAt,
          isPublished: item.isPublished,
        },
      });
  }
}

const OLD_NEWS_SLUGS_REMOVED_ON_SEED = [
  "dong-chi-phung-quang-hiep-gap-mat-dau-xuan",
  "gap-mat-dau-xuan-binh-ngo-2026",
  "tang-cuong-phoi-hop-dam-bao-an-ninh-trat-tu",
];

async function executeSeed(): Promise<void> {
  await upsertAdminUser({ username: "admin", password: "admin" });

  await db.delete(posts).where(inArray(posts.slug, OLD_NEWS_SLUGS_REMOVED_ON_SEED));

  const seedPosts: SeedPost[] = [
    {
      slug: "dong-chi-phung-quang-hiep-gap-mat-dau-xuan-chuc-tet-cbcnv-cong-ty-tnhh-mtv-apatit-viet-nam",
      title: "Đồng chí Phùng Quang Hiệp gặp mặt đầu xuân, chúc Tết CBCNV Công ty TNHH MTV Apatit Việt Nam",
      summary:
        "Sáng ngày 24/02/2026, đồng chí Phùng Quang Hiệp – Ủy viên BCH Đảng bộ Chính phủ, Bí thư Đảng ủy, Chủ tịch Hội đồng thành viên Tập đoàn Hóa chất Việt Nam đã tới thăm, gặp mặt đầu Xuân và chúc mừng năm mới tập thể lãnh đạo, cán bộ, công nhân viên, người lao động Công ty TNHH MTV Apatit Việt Nam.",
      content:
        '<p>Sáng ngày 24/02/2026, đồng chí Phùng Quang Hiệp – Ủy viên BCH Đảng bộ Chính phủ, Bí thư Đảng ủy, Chủ tịch Hội đồng thành viên Tập đoàn Hóa chất Việt Nam đã tới thăm, gặp mặt đầu Xuân và chúc mừng năm mới tập thể lãnh đạo, cán bộ, công nhân viên, người lao động Công ty TNHH MTV Apatit Việt Nam.</p>' +
        '<figure><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&amp;fit=crop&amp;w=1600&amp;q=80" alt="Đồng chí Phùng Quang Hiệp gặp mặt đầu xuân, chúc Tết CBCNV Công ty TNHH MTV Apatit Việt Nam" /></figure>' +
        '<p>Trong không khí của những ngày đầu Xuân, đồng chí Bí thư Đảng ủy, Chủ tịch HĐTV Tập đoàn đã gửi tới tập thể Công ty lời chúc mừng năm mới sức khỏe, hạnh phúc, an khang, thịnh vượng; đồng thời biểu dương và ghi nhận những nỗ lực, cố gắng của đơn vị trong năm 2025, đặc biệt là việc duy trì ổn định sản xuất, đảm bảo việc làm, thu nhập cho người lao động, đóng góp tích cực vào kết quả chung của Tập đoàn.</p>' +
        '<p>Đồng chí Phùng Quang Hiệp nhấn mạnh, năm 2026 là năm có ý nghĩa quan trọng, mở đầu cho việc triển khai các nhiệm vụ theo Nghị quyết Đại hội Đảng các cấp, do đó Công ty cần tiếp tục phát huy truyền thống đoàn kết, chủ động đổi mới, nâng cao năng lực quản trị, đẩy mạnh ứng dụng khoa học công nghệ, tăng cường chuyển đổi số, chuyển đổi xanh trong sản xuất; chú trọng công tác an toàn, môi trường và chăm lo đời sống người lao động. Lãnh đạo Tập đoàn tin tưởng Công ty sẽ tiếp tục giữ vững vai trò là đơn vị khai thác, chế biến apatit chủ lực, góp phần bảo đảm nguồn nguyên liệu cho sản xuất phân bón, hóa chất trong nước.</p>' +
        '<p>Thay mặt tập thể lãnh đạo, cán bộ, người lao động, lãnh đạo Công ty TNHH Apatit Việt Nam bày tỏ vui mừng, xúc động khi được lãnh đạo Tập đoàn tới thăm, chúc Tết ngay những ngày đầu năm mới; đồng thời cam kết sẽ nỗ lực hoàn thành tốt nhiệm vụ sản xuất kinh doanh năm 2026, đóng góp vào sự phát triển bền vững của Tập đoàn Hóa chất Việt Nam.</p>' +
        '<p>Chương trình gặp mặt đầu Xuân diễn ra trong không khí ấm áp, thân tình, thể hiện sự quan tâm, gắn bó của lãnh đạo Tập đoàn đối với các đơn vị thành viên, tạo động lực để cán bộ, người lao động bước vào năm mới với quyết tâm cao, khí thế mới, hoàn thành thắng lợi các mục tiêu, nhiệm vụ đã đề ra.</p>',
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      type: "NEWS",
      publishedAt: createDateFromLocalDay(24, 2, 2026),
      isPublished: true,
    },
    {
      slug: "cong-ty-apatit-viet-nam-gap-mat-dau-xuan-binh-ngo-2026",
      title: "Công ty Apatit Việt Nam: Gặp mặt đầu xuân Bính Ngọ 2026",
      summary:
        "Sáng ngày 23/02/2026 (mùng 7 Tết), trong không khí vui tươi, phấn khởi, mừng Đảng, mừng xuân, mừng đất nước đổi mới của những ngày đầu năm mới. Công ty Apatit Việt Nam đã tổ chức buổi gặp mặt đầu xuân Bính Ngọ 2026.",
      content:
        "Sáng ngày 23/02/2026 (mùng 7 Tết), trong không khí vui tươi, phấn khởi, mừng Đảng, mừng xuân, mừng đất nước đổi mới của những ngày đầu năm mới. Công ty Apatit Việt Nam đã tổ chức buổi gặp mặt đầu xuân Bính Ngọ 2026.\n\n" +
        "Tham dự chương trình có đồng chí Nguyễn Văn Đông – Bí thư Đảng ủy, Tổng giám đốc Công ty; đồng chí Nguyễn Thanh Hà – Chủ Tịch Hội đồng thành viên Công ty; cùng các đồng chí trong Ban Thường vụ Đảng ủy, Hội đồng thành viên; Ban Tổng giám đốc Công ty và toàn thể CBCNV làm việc tại trụ sở Công ty.\n\n" +
        "Đây là hoạt động thường niên của Công ty nhằm động viên tinh thần, tăng cường sự đoàn kết, tạo khí thế thi đua sôi nổi ngay từ những ngày đầu năm mới.\n\n" +
        "Phát biểu tại buổi gặp mặt, đồng chí Nguyễn Văn Đông gửi lời chúc mừng tốt đẹp nhất nhân dịp năm mới tới toàn thể CBCNV, người lao động Công ty; ghi nhận và biểu dương những kết quả đã đạt được trong năm 2025, đồng thời nhấn mạnh những mục tiêu, nhiệm vụ cần tập trung, nỗ lực hơn nữa, đoàn kết, sáng tạo và triển khai thực hiện đồng bộ các giải pháp nhằm tháo gỡ những khó khăn, đảm bảo duy trì hoạt động sản xuất kinh doanh ổn định, hoàn thành tốt các mục tiêu, nhiệm vụ năm 2026 theo Nghị quyết Đại hội Đảng bộ Công ty đề ra và Tập đoàn Hóa chất Việt Nam giao.\n\n" +
        "Sau chương trình gặp mặt tại trụ sở Công ty, lãnh đạo Công ty đã tổ chức đi thăm hỏi, chúc Tết tới các chi nhánh, đơn vị đồng thời động viên tinh thần CBCNV người lao động trong toàn Công ty, lan tỏa sự đồng lòng từ ban lãnh đạo Công ty đến người lao động trong việc thực hiện thắng lợi các chỉ tiêu sản xuất kinh doanh ngay từ những tháng đầu năm, quyết tâm hành động phấn đấu đưa Công ty hoàn thành kế hoạch sản xuất năm 2026 Tập đoàn Hóa chất Việt Nam giao, góp phần vào sự lớn mạnh của ngành hóa chất và kinh tế địa phương.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      type: "NEWS",
      publishedAt: createDateFromLocalDay(23, 2, 2026),
      isPublished: true,
    },
    {
      slug: "cong-ty-apatit-viet-nam-tang-cuong-phoi-hop-bao-dam-an-ninh-trat-tu-an-toan-trong-hoat-dong-san-xuat-kinh-doanh",
      title:
        "Công ty Apatit Việt Nam tăng cường phối hợp bảo đảm an ninh, trật tự, an toàn trong hoạt động sản xuất kinh doanh",
      summary:
        "Ngày 5/01/2026, tại Trụ sở Công ty TNHH MTV Apatit Việt Nam đã diễn ra Lễ ký kết Quy chế phối hợp về đảm bảo An ninh trật tự, an toàn xã hội, phòng chống khủng bố, công tác PCCC&CNCH giữa Công ty Apatit Việt Nam và Công an phường Cam Đường.",
      content:
        "Ngày 5/01/2026, tại Trụ sở Công ty TNHH MTV Apatit Việt Nam đã diễn ra Lễ ký kết Quy chế phối hợp về đảm bảo An ninh trật tự, an toàn xã hội, phòng chống khủng bố, công tác PCCC&CNCH giữa Công ty Apatit Việt Nam và Công an phường Cam Đường. Tham dự buổi ký kết có các đồng chí: Nguyễn Thuần Hưng – Phó Bí thư Đảng ủy phường Cam Đường; Nguyễn Thu Hoài – Phó Chủ tịch UBND phường Cam Đường; Thượng tá Nguyễn Thanh Phúc – Trưởng Công an phường Cam Đường cùng lãnh đạo, cán bộ chiến sĩ Công an phường Cam Đường; đồng chí Nguyễn Văn Đông – Bí thư Đảng ủy, Tổng Giám đốc Công ty TNHH MTV Apatit Việt Nam, cùng lãnh đạo các phòng ban, đơn vị, chi nhánh trong toàn Công ty.\n\n" +
        "Xác định năm 2026 là năm hành động đột phá, lấy hiệu quả thực tế trong hoạt động sản xuất kinh doanh làm thước đo, Công ty TNHH MTV Apatit Việt Nam tiếp tục chú trọng công tác bảo đảm an ninh, trật tự, an toàn trong toàn bộ chuỗi hoạt động sản xuất. Việc ký kết Quy chế phối hợp với Công an phường Cam Đường thể hiện quyết tâm của Công ty trong việc chủ động phòng ngừa, kiểm soát rủi ro, đồng thời thực hiện nghiêm các chủ trương, chính sách, pháp luật của Nhà nước và địa phương nơi doanh nghiệp đứng chân.\n\n" +
        "Là doanh nghiệp kinh tế trọng điểm của tỉnh Lào Cai, với hơn 1.800 cán bộ, công nhân viên, địa bàn hoạt động trải dài, Công ty Apatit Việt Nam luôn xác định công tác giữ vững an ninh, trật tự, an toàn sản xuất là nhiệm vụ trọng tâm, xuyên suốt, có ý nghĩa quyết định đến sự ổn định sản xuất và bảo đảm an ninh, trật tự trên địa bàn. Ban Tổng Giám đốc Công ty quán triệt tinh thần không chủ quan, không lơ là, không đánh đổi an toàn lấy tiến độ sản xuất.\n\n" +
        "Phường Cam Đường là địa bàn trọng điểm về an ninh, trật tự của tỉnh, có diện tích rộng, dân số đông, tập trung nhiều khu khai thác khoáng sản và hoạt động sản xuất công nghiệp. Đặc điểm này đặt ra yêu cầu cao đối với công tác bảo đảm an ninh kinh tế, an ninh công nhân, an ninh nội bộ và trật tự an toàn xã hội, đòi hỏi sự phối hợp chặt chẽ, thường xuyên, hiệu quả giữa lực lượng Công an và doanh nghiệp. Thực tiễn cho thấy, trên địa bàn vẫn tiềm ẩn nguy cơ phát sinh các vấn đề phức tạp về an ninh công nhân, an ninh nội bộ, tai nạn lao động, cháy nổ và vi phạm pháp luật. Trước yêu cầu nhiệm vụ trong tình hình mới, lãnh đạo Công an phường Cam Đường đề nghị hai bên thực hiện nghiêm túc Quy chế phối hợp đã ký kết; chủ động nắm chắc tình hình từ sớm, từ xa; kiên quyết không để hình thành \"điểm nóng\", không để các vụ việc nhỏ kéo dài, phức tạp.\n\n" +
        "Trọng tâm trong thời gian tới là tăng cường phòng ngừa, đấu tranh, xử lý các hành vi vi phạm pháp luật; siết chặt kỷ cương, kỷ luật trong chấp hành các quy định về phòng cháy, chữa cháy, an toàn lao động; bảo đảm an toàn cho người lao động và tài sản của doanh nghiệp. Tiếp thu ý kiến chỉ đạo của lãnh đạo Đảng ủy phường Cam Đường và Công an phường Cam Đường, đồng chí Nguyễn Văn Đông – Bí thư Đảng ủy, Tổng Giám đốc Công ty bày tỏ lời cảm ơn sâu sắc tới các cấp, các ngành và lực lượng chức năng đã luôn quan tâm, đồng hành cùng doanh nghiệp. Với tinh thần chủ động – trách nhiệm – quyết liệt – hiệu quả, lãnh đạo Công ty Apatit Việt Nam cam kết tiếp tục triển khai đồng bộ các giải pháp, thực hiện nghiêm Quy chế phối hợp, góp phần giữ vững ổn định an ninh, trật tự; bảo đảm an toàn sản xuất; bảo vệ môi trường, phục vụ phát triển kinh tế – xã hội của địa phương trong năm 2026 và những năm tiếp theo.",
      imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80",
      type: "NEWS",
      publishedAt: createDateFromLocalDay(5, 1, 2026),
      isPublished: true,
    },
    {
      slug: "cong-bo-quyet-dinh-bo-nhiem-thanh-vien-hd-tv",
      title: "Công bố quyết định bổ nhiệm thành viên hội đồng thành viên công ty Apatit Việt Nam",
      summary:
        "Lễ công bố quyết định nhân sự được tổ chức trang trọng, góp phần kiện toàn tổ chức và nâng cao hiệu lực quản trị.",
      content:
        "Tại trụ sở công ty, lễ công bố quyết định bổ nhiệm thành viên hội đồng thành viên được tổ chức với sự tham dự của đại diện các đơn vị và cán bộ chủ chốt.\n\n" +
        "Các quyết định nhân sự góp phần kiện toàn tổ chức, nâng cao hiệu lực quản trị và tạo nền tảng cho giai đoạn phát triển tiếp theo.",
      imageUrl: "https://images.unsplash.com/photo-1577415124269-0ea1c41258ce?auto=format&fit=crop&w=1600&q=80",
      type: "ANNOUNCEMENT",
      publishedAt: createDateFromLocalDay(21, 10, 2025),
      isPublished: true,
    },
  ];

  const seedProducts: SeedProduct[] = [
    {
      slug: "phan-bon-npk",
      name: "Phân Bón NPK",
      category: "Phân bón",
      priceLabel: "Liên hệ",
      imageUrl: "https://images.unsplash.com/photo-1589927986089-35812386e7c1?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Công ty tổ chức sản xuất và tiêu thụ nhiều loại phân bón NPK theo yêu cầu đặt hàng của khách hàng.",
      description:
        "Công ty TNHH MTV Apatit Việt Nam tổ chức sản xuất và tiêu thụ các loại phân bón NPK theo đơn đặt hàng.\n\n" +
        "Một số công thức tham khảo: NPK 5–10–3, 8–6–4, 5–10–15, 8–4–6, 10–20–6, 8–4–8, 10–5–5, 5–20–5.",
      publishedAt: createDateFromLocalDay(1, 1, 2026),
      isPublished: true,
    },
    {
      slug: "phu-gia-cac-loai",
      name: "Phụ gia các loại",
      category: "Hóa chất",
      priceLabel: "Liên hệ",
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Các loại phụ gia phục vụ ngành phân bón và hóa chất.",
      description:
        "Danh mục phụ gia đa dạng phục vụ sản xuất phân bón, xử lý môi trường và các ngành công nghiệp liên quan.\n\n" +
        "Sản phẩm được lựa chọn và kiểm soát chất lượng để tối ưu hiệu quả sử dụng và an toàn vận hành.",
      publishedAt: createDateFromLocalDay(1, 1, 2026),
      isPublished: true,
    },
    {
      slug: "quang-apatit-tuyen",
      name: "Quặng Apatit tuyển",
      category: "Khoáng sản",
      priceLabel: "Liên hệ",
      imageUrl: "https://images.unsplash.com/photo-1604147706283-25f9f38d2b77?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Quặng Apatit tuyển là nguyên liệu quan trọng cho phân bón và hóa chất chứa phốt pho.",
      description:
        "Quặng Apatit tuyển là sản phẩm được chế biến từ quặng nguyên khai qua các công đoạn tuyển rửa nhằm nâng hàm lượng P2O5 và giảm tạp chất.\n\n" +
        "Với chỉ tiêu phù hợp, sản phẩm đáp ứng tốt yêu cầu cho các dây chuyền sản xuất phân lân, phân NPK và hóa chất chứa phốt pho.",
      publishedAt: createDateFromLocalDay(1, 1, 2026),
      isPublished: true,
    },
    {
      slug: "da-phosphate-loai-1",
      name: "Đá phosphate loại 1",
      category: "Khoáng sản",
      priceLabel: "Liên hệ",
      imageUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=80",
      shortDescription:
        "Đá phosphate loại 1 có hàm lượng P2O5 cao, là nguyên liệu chính cho sản xuất phân bón phosphat.",
      description:
        "Đá phosphate loại 1 được khai thác từ quặng Apatit, sử dụng làm nguyên liệu cho sản xuất phân bón và các sản phẩm hóa chất chứa phốt pho.\n\n" +
        "Thông số kỹ thuật có thể được cung cấp theo yêu cầu khách hàng và tiêu chuẩn áp dụng.",
      publishedAt: createDateFromLocalDay(1, 1, 2026),
      isPublished: true,
    },
    {
      slug: "da-phosphate-loai-2",
      name: "Đá phosphate loại 2",
      category: "Khoáng sản",
      priceLabel: "Liên hệ",
      imageUrl: "https://images.unsplash.com/photo-1562938959-03c0f20e9b38?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Đá phosphate loại 2 có thể đạt hàm lượng P2O5 ≥ 26%, cỡ hạt linh hoạt theo yêu cầu.",
      description:
        "Đá phosphate loại 2 phù hợp cho các dây chuyền sản xuất cần tối ưu chi phí.\n\n" +
        "Hàm lượng P2O5 và cỡ hạt có thể điều chỉnh theo yêu cầu của khách hàng.",
      publishedAt: createDateFromLocalDay(1, 1, 2026),
      isPublished: true,
    },
    {
      slug: "quang-fenspat",
      name: "Quặng Fenspát",
      category: "Khoáng sản",
      priceLabel: "Liên hệ",
      imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Quặng Fenspát dùng cho gốm sứ, men, thủy tinh và vật liệu xây dựng.",
      description:
        "Quặng Fenspát là nguyên liệu quan trọng cho sản xuất gốm sứ, men, thủy tinh và một số vật liệu xây dựng.\n\n" +
        "Chỉ tiêu hóa học và cỡ hạt được cung cấp theo từng loại sản phẩm và mục đích sử dụng.",
      publishedAt: createDateFromLocalDay(1, 1, 2026),
      isPublished: true,
    },
    {
      slug: "quang-kaolin",
      name: "Quặng Kaolin",
      category: "Khoáng sản",
      priceLabel: "Liên hệ",
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
      shortDescription: "Kaolin (cao lanh) là loại đất sét trắng, dẻo khi gặp nước và rắn khi nung ở nhiệt độ cao.",
      description:
        "Kaolin (cao lanh) là loại đất sét màu trắng, ứng dụng trong gốm sứ và nhiều ngành công nghiệp.\n\n" +
        "Thông số kỹ thuật, độ mịn và độ ẩm được xác định theo lô hàng và yêu cầu sử dụng.",
      publishedAt: createDateFromLocalDay(1, 1, 2026),
      isPublished: true,
    },
  ];

  await upsertPosts(seedPosts);
  await upsertProducts(seedProducts);
}

executeSeed()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Seed completed.");
    process.exit(0);
  })
  .catch((err: unknown) => {
    // eslint-disable-next-line no-console
    console.error("Seed failed:", err);
    process.exit(1);
  });

