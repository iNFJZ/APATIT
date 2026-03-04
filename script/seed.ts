import bcrypt from "bcryptjs";
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

async function executeSeed(): Promise<void> {
  await upsertAdminUser({ username: "admin", password: "admin" });

  const seedPosts: SeedPost[] = [
    {
      slug: "dong-chi-phung-quang-hiep-gap-mat-dau-xuan",
      title: "Đồng chí Phùng Quang Hiệp gặp mặt đầu xuân, chúc Tết CBCNV Công ty TNHH MTV Apatit Việt Nam",
      summary:
        "Buổi gặp mặt đầu xuân nhằm động viên tinh thần người lao động, triển khai nhiệm vụ trọng tâm và gửi lời chúc mừng năm mới tới toàn thể CBCNV.",
      content:
        "Công ty TNHH MTV Apatit Việt Nam tổ chức gặp mặt đầu xuân nhằm tổng kết hoạt động, tri ân người lao động và triển khai những nhiệm vụ trọng tâm trong năm.\n\n" +
        "Ban lãnh đạo công ty gửi lời chúc mừng năm mới, kêu gọi thi đua lao động sản xuất, giữ vững an toàn và hiệu quả trong khai thác, chế biến và tiêu thụ sản phẩm.",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      type: "NEWS",
      publishedAt: createDateFromLocalDay(24, 2, 2026),
      isPublished: true,
    },
    {
      slug: "gap-mat-dau-xuan-binh-ngo-2026",
      title: "Công ty Apatit Việt Nam: Gặp mặt đầu xuân Bính Ngọ 2026",
      summary:
        "Hoạt động đầu xuân tạo không khí phấn khởi, thống nhất mục tiêu và kế hoạch công tác năm 2026.",
      content:
        "Chương trình gặp mặt đầu xuân được tổ chức trong không khí ấm áp, đoàn kết, nhằm tạo động lực cho tập thể người lao động.\n\n" +
        "Công ty thống nhất mục tiêu, kế hoạch và ưu tiên hành động để đảm bảo sản xuất kinh doanh ổn định trong năm 2026.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      type: "NEWS",
      publishedAt: createDateFromLocalDay(24, 2, 2026),
      isPublished: true,
    },
    {
      slug: "tang-cuong-phoi-hop-dam-bao-an-ninh-trat-tu",
      title:
        "Công ty Apatit Việt Nam tăng cường phối hợp bảo đảm an ninh, trật tự, an toàn trong hoạt động sản xuất kinh doanh",
      summary:
        "Ký kết và triển khai cơ chế phối hợp nhằm đảm bảo an ninh trật tự, an toàn sản xuất, kiểm soát khu vực và phương tiện ra vào.",
      content:
        "Công ty tăng cường phối hợp với các đơn vị liên quan nhằm đảm bảo an ninh trật tự và an toàn sản xuất.\n\n" +
        "Chương trình tập trung vào quản lý khu vực khai thác, kiểm soát phương tiện ra vào, nâng cao nhận thức an toàn lao động và đảm bảo ổn định sản xuất.",
      imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80",
      type: "NEWS",
      publishedAt: createDateFromLocalDay(6, 1, 2026),
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

