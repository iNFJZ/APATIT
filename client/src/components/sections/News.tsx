import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

type HomePost = {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  publishedAt: string;
};

export default function News() {
  const { data, isLoading, isError } = useQuery<{ posts: HomePost[] }>({
    queryKey: ["/api/posts?type=NEWS&limit=4&offset=0"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const posts = data?.posts ?? [];
  const featured = posts[0];
  const secondary = posts.slice(1);

  return (
    <section id="news" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
            <span className="w-8 h-px bg-primary"></span>
            Tin Tức & Sự Kiện
            <span className="w-8 h-px bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary">
            Cập nhật hoạt động mới nhất
          </h2>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Đang tải tin tức...</p>
        ) : isError ? (
          <p className="text-red-500">Không thể tải tin tức.</p>
        ) : featured ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Link href={`/tin-tuc/${featured.slug}`}>
              <a className="group cursor-pointer rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 block">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={featured.imageUrl ?? ""}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium text-secondary shadow-sm">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    {new Date(featured.publishedAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-heading font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {featured.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{featured.summary}</p>
                  <span className="inline-flex items-center font-medium text-primary">
                    Đọc tiếp <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </a>
            </Link>

            <div className="flex flex-col gap-8">
              {secondary.map((item) => (
                <Link key={item.slug} href={`/tin-tuc/${item.slug}`}>
                  <a className="flex flex-col sm:flex-row gap-6 group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-full sm:w-48 shrink-0 aspect-[4/3] rounded-xl overflow-hidden relative">
                      <img
                        src={item.imageUrl ?? ""}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                        <CalendarDays className="w-3.5 h-3.5 text-primary" />
                        {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{item.summary}</p>
                    </div>
                  </a>
                </Link>
              ))}

              <div className="mt-auto pt-4 flex justify-end">
                <Link href="/tin-tuc">
                  <a className="inline-flex items-center gap-2 font-medium text-secondary hover:text-primary transition-colors">
                    Xem tất cả tin tức <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}