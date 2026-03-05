import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

type AnnouncementPostDetail = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  publishedAt: string;
};

export default function AnnouncementDetailPage() {
  const [match, params] = useRoute<{ slug: string }>("/cong-bo-thong-tin/:slug");
  const slug = params?.slug ?? "";

  const { data, isLoading, isError } = useQuery<{
    post: AnnouncementPostDetail;
  }>({
    queryKey: ["/api/posts", slug],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: Boolean(slug),
  });

  const item = data?.post;

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-xl text-center mx-auto">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Không tìm thấy nội dung
                </h1>
                <p className="text-muted-foreground mb-8">
                  Trang bạn đang tìm không tồn tại hoặc đã được cập nhật.
                </p>
                <Link href="/cong-bo-thong-tin">
                  <Button className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại danh sách công bố
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
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <p className="text-muted-foreground">Đang tải nội dung...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-xl text-center mx-auto">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Không thể tải nội dung
                </h1>
                <p className="text-muted-foreground mb-8">
                  Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.
                </p>
                <Link href="/cong-bo-thong-tin">
                  <Button className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại danh sách công bố
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
      <main className="pt-16">
        <section className="pt-8 pb-10 md:pt-12 md:pb-10 bg-slate-50 border-b">
          <div className="container mx-auto px-4 md:px-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3 animate-in slide-in-from-bottom-4 duration-500">
                <CalendarDays className="w-4 h-4 text-primary" />
                {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2 animate-in slide-in-from-bottom-6 duration-600 delay-100">
                {item.title}
              </h1>
              <p className="text-muted-foreground max-w-3xl animate-in slide-in-from-bottom-8 duration-600 delay-200">{item.summary}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link href="/cong-bo-thong-tin">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Danh sách công bố
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white mb-8">
                <img src={item.imageUrl ?? ""} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <article className="prose prose-slate max-w-none">
                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">{item.content}</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

