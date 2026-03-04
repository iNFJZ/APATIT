import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarDays, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

type AnnouncementPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  publishedAt: string;
};

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, isError } = useQuery<{
    posts: AnnouncementPost[];
  }>({
    queryKey: ["/api/posts?type=ANNOUNCEMENT"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const posts = data?.posts ?? [];

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return posts;
    }
    const keyword = searchTerm.toLowerCase().trim();
    return posts.filter((item) => {
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword) ||
        item.content.toLowerCase().includes(keyword)
      );
    });
  }, [searchTerm, posts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-6">
              Công bố thông tin
            </h1>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-10 rounded-full"
                  placeholder="Tìm kiếm công bố..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
              <Button
                className="rounded-full px-8"
                type="button"
                onClick={() => {
                  if (!searchTerm.trim()) {
                    return;
                  }
                  setSearchTerm("");
                }}
              >
                {searchTerm.trim() ? "Xóa từ khóa" : "Tìm kiếm"}
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <p className="text-muted-foreground">Đang tải danh sách công bố...</p>
            ) : isError ? (
              <p className="text-red-500">Không thể tải danh sách công bố. Vui lòng thử lại sau.</p>
            ) : filteredPosts.length === 0 ? (
              <p className="text-muted-foreground">
                Không tìm thấy công bố phù hợp với từ khóa "
                <span className="font-semibold">{searchTerm}</span>".
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Tìm thấy{" "}
                  <span className="font-semibold text-secondary">{filteredPosts.length}</span> thông báo
                  {searchTerm.trim() ? " phù hợp với tiêu chí tìm kiếm." : " trong danh sách hiện tại."}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((item) => (
                    <div
                      key={item.slug}
                      className="group border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
                    >
                      <Link href={`/cong-bo-thong-tin/${item.slug}`}>
                        <a className="block h-full">
                          <div className="aspect-[16/9] overflow-hidden relative">
                            <img
                              src={item.imageUrl ?? ""}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium text-secondary shadow-sm">
                              <CalendarDays className="w-4 h-4 text-primary" />
                              {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
                            </div>
                          </div>
                          <div className="p-6">
                            <h2 className="text-lg md:text-xl font-heading font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {item.title}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5">
                              {item.summary}
                            </p>
                            <span className="inline-flex items-center font-medium text-primary">
                              Xem chi tiết <ArrowRight className="ml-2 w-4 h-4" />
                            </span>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

