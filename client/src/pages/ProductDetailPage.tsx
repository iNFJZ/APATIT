import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

type SpecRow = {
  label: string;
  first: string;
  second: string;
  third: string;
  beneficiated: string;
};

type SimpleSpecRow = {
  label: string;
  values: string[];
};

function renderPhosphateTable(): React.ReactElement {
  const rows: SpecRow[] = [
    {
      label: "P2O5 (BPL)",
      first: "32 ± 1 (71–72%)",
      second: "23 ± 1 (50–57%)",
      third: "15 ± 1",
      beneficiated: "32 ± 1 (71–72%)",
    },
    { label: "SiO2", first: "17", second: "11", third: "50", beneficiated: "14,5" },
    { label: "CaO", first: "45", second: "45", third: "22", beneficiated: "42" },
    { label: "Fe2O3", first: "3,5", second: "3", third: "4", beneficiated: "3" },
    { label: "Al2O3", first: "6", second: "2,5", third: "8", beneficiated: "3,5" },
    { label: "MgO", first: "3", second: "8", third: "3", beneficiated: "1" },
    { label: "H2O", first: "14 ± 1", second: "3 ± 1", third: "18 ± 1", beneficiated: "16–18" },
    {
      label: "Size Fraction (mm)",
      first: "1–250: 70%",
      second: "25–250: 70%",
      third: "1–250: 70%",
      beneficiated: "< 0,1: 98%",
    },
  ];

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-secondary border-b border-slate-200">N₀</th>
            <th className="px-4 py-3 text-left font-semibold text-secondary border-b border-slate-200">
              Components %
            </th>
            <th className="px-4 py-3 text-center font-semibold text-secondary border-b border-slate-200">
              1st grade
            </th>
            <th className="px-4 py-3 text-center font-semibold text-secondary border-b border-slate-200">
              2nd grade
            </th>
            <th className="px-4 py-3 text-center font-semibold text-secondary border-b border-slate-200">
              3rd grade
            </th>
            <th className="px-4 py-3 text-center font-semibold text-secondary border-b border-slate-200">
              Beneficiated
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
              <td className="px-4 py-2 border-b border-slate-100 align-top text-muted-foreground">
                {index + 1}
              </td>
              <td className="px-4 py-2 border-b border-slate-100 align-top font-medium text-secondary">
                {row.label}
              </td>
              <td className="px-4 py-2 border-b border-slate-100 align-top text-center">{row.first}</td>
              <td className="px-4 py-2 border-b border-slate-100 align-top text-center">{row.second}</td>
              <td className="px-4 py-2 border-b border-slate-100 align-top text-center">{row.third}</td>
              <td className="px-4 py-2 border-b border-slate-100 align-top text-center">
                {row.beneficiated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderFenspatTable(): React.ReactElement {
  const headers = [
    "Quặng Fenspát xương (Fb)",
    "Quặng Fenspát men (Fa)",
    "Quặng cao lin làm xương",
    "Quặng cao lin làm men",
    "Quặng tan A",
  ];

  const rows: SimpleSpecRow[] = [
    { label: "SiO2", values: ["73–74", "71 ± 1", "50 ± 1", "47 ± 1", "61 ± 1"] },
    { label: "TiO2", values: ["≤ 0,04", "< 0,08", "< 0,1", "< 0,02", ""] },
    { label: "CaO", values: ["0,35–0,45", "≈ 0,6", "", "", "≈ 0,2"] },
    { label: "Fe2O3", values: ["< 1", "≈ 0,4", "< 0,1", "≈ 0,5", "≈ 1,5"] },
    { label: "Al2O3", values: ["15–16", "16 ± 1", "32 ± 1", "37 ± 1", "1 ± 0,5"] },
    { label: "K2O", values: ["4,5–4,7", "8–9", "< 2", "≈ 1", "≈ 0,05"] },
    { label: "Na2O", values: ["4,2–4,4", "2–3", "< 1", "≈ 1", "≈ 0,2"] },
    { label: "MgO", values: ["0,25–0,35", "≈ 0,3", "", "", ""] },
    { label: "MKN", values: ["< 1", "0,6–0,7", "13 ± 1", "13–14", ""] },
    { label: "Cỡ hạt (mm)", values: ["≈ 0,25", "≈ 0,2", "≈ 0,2", "≈ 63 µm", "≈ 0,25"] },
    { label: "H2O", values: ["< 1", "< 1", "8 ± 1", "12 ± 1", "< 1"] },
  ];

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-secondary border-b border-slate-200">
              Thành phần %
            </th>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-center font-semibold text-secondary border-b border-slate-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.label} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
              <td className="px-4 py-2 border-b border-slate-100 align-top font-medium text-secondary">
                {row.label}
              </td>
              {row.values.map((value, valueIndex) => (
                <td
                  key={`${row.label}-${valueIndex}`}
                  className="px-4 py-2 border-b border-slate-100 align-top text-center text-muted-foreground"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProductDetailPage() {
  const [match, params] = useRoute<{ slug: string }>("/san-pham/:slug");
  const slug = params?.slug ?? "";
  const { data, isLoading, isError } = useQuery<{
    product: {
      id: string;
      slug: string;
      name: string;
      category: string;
      priceLabel: string;
      imageUrl: string | null;
      shortDescription: string;
      description: string;
      publishedAt: string;
    };
  }>({
    queryKey: ["/api/products", slug],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: Boolean(slug),
  });

  const { data: listData } = useQuery<{
    products: {
      slug: string;
      name: string;
      category: string;
      priceLabel: string;
      imageUrl: string | null;
      shortDescription: string;
    }[];
  }>({
    queryKey: ["/api/products?limit=20&offset=0"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const product = data?.product;
  const relatedProducts =
    listData?.products?.filter((item) => item.slug !== slug).slice(0, 4) ?? [];

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-xl text-center mx-auto">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Không tìm thấy sản phẩm
                </h1>
                <p className="text-muted-foreground mb-8">
                  Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật. Vui lòng quay lại danh sách sản phẩm.
                </p>
                <Link href="/san-pham">
                  <Button className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại danh sách sản phẩm
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <p className="text-muted-foreground">Đang tải thông tin sản phẩm...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-xl text-center mx-auto">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Không thể tải sản phẩm
                </h1>
                <p className="text-muted-foreground mb-8">
                  Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau hoặc quay lại danh sách sản phẩm.
                </p>
                <Link href="/san-pham">
                  <Button className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại danh sách sản phẩm
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-10 bg-slate-50 border-b">
          <div className="container mx-auto px-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground max-w-2xl">{product.shortDescription}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link href="/san-pham">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Danh sách sản phẩm
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="w-full">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white">
                <img
                  src={product.imageUrl ?? ""}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-secondary mb-4">
                  Thông tin chi tiết
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
                {(slug === "da-phosphate-loai-1" ||
                  slug === "da-phosphate-loai-2" ||
                  slug === "quang-apatit-tuyen") &&
                  renderPhosphateTable()}
                {slug === "quang-fenspat" && renderFenspatTable()}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                    Nhóm sản phẩm
                  </div>
                  <div className="text-base font-semibold text-secondary">{product.category}</div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                    Giá tham khảo
                  </div>
                  <div className="text-base font-semibold text-primary">{product.priceLabel}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 space-y-4">
                <h3 className="text-base font-heading font-semibold text-secondary">
                  Cần báo giá chi tiết cho sản phẩm này?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Vui lòng liên hệ trực tiếp với chúng tôi để được tư vấn và cung cấp thông tin kỹ thuật, tiêu chuẩn chất
                  lượng, điều kiện giao hàng và giá cả.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/lien-he">
                    <Button className="rounded-full px-6">
                      <Phone className="w-4 h-4 mr-2" />
                      Liên hệ phòng kinh doanh
                    </Button>
                  </Link>
                  <a href="mailto:info@vinaapaco.com">
                    <Button variant="outline" className="rounded-full px-6">
                      <Mail className="w-4 h-4 mr-2" />
                      Gửi email yêu cầu
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-secondary">
                  Sản phẩm tương tự
                </h2>
                <Link href="/san-pham">
                  <Button variant="outline" className="rounded-full">
                    Xem tất cả sản phẩm
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <div
                    key={item.slug}
                    className="group border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <Link href={`/san-pham/${item.slug}`}>
                      <a className="block h-full">
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={item.imageUrl ?? ""}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                            {item.category}
                          </p>
                          <h3 className="text-sm font-heading font-semibold text-secondary mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {item.shortDescription}
                          </p>
                          <div className="text-sm font-semibold text-primary">{item.priceLabel}</div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

