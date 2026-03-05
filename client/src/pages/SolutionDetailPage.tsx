import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { getSolutionBySlug, solutions } from "@/lib/solutions";

export default function SolutionDetailPage() {
  const [match, params] = useRoute<{ slug: string }>("/giai-phap/:slug");
  const slug = params?.slug ?? "";
  const solution = getSolutionBySlug(slug);

  if (!match || !solution) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-xl text-center mx-auto">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Không tìm thấy giải pháp
                </h1>
                <p className="text-muted-foreground mb-8">
                  Nội dung bạn đang tìm không tồn tại hoặc đã được cập nhật. Vui lòng quay lại danh sách giải pháp.
                </p>
                <Link href="/giai-phap">
                  <Button className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại Giải pháp
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

  const related = solutions.filter((item) => item.slug !== solution.slug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-14 md:py-18 bg-secondary text-white">
          <div className="container mx-auto px-4 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="inline-flex items-center gap-3 text-primary bg-white/10 rounded-full px-4 py-1">
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  {solution.icon}
                </span>
                <span className="text-sm font-semibold">Giải pháp</span>
              </div>
              <Link href="/giai-phap">
                <Button variant="outline" className="rounded-full border-white/40 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Danh sách giải pháp
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              {solution.title}
            </h1>
            <p className="text-white/80 max-w-3xl text-base md:text-lg">{solution.summary}</p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] gap-10">
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Danh mục</p>
                <nav className="flex flex-col gap-1">
                  {solutions.map((item) => (
                    <Link key={item.slug} href={`/giai-phap/${item.slug}`}>
                      <a
                        className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                          item.slug === solution.slug
                            ? "bg-primary/10 text-primary"
                            : "text-secondary hover:bg-slate-50"
                        }`}
                      >
                        {item.title}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-8">
              {solution.sections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-secondary mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-1">Cần tư vấn giải pháp phù hợp?</h3>
                  <p className="text-sm text-muted-foreground">
                    Liên hệ với chúng tôi để nhận tư vấn kỹ thuật, năng lực cung ứng và phương án triển khai.
                  </p>
                </div>
                <Button className="rounded-full px-8" asChild>
                  <a href="/lien-he">Liên hệ ngay</a>
                </Button>
              </div>

              {related.length > 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-4">Khám phá thêm</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {related.map((item) => (
                      <Link key={item.slug} href={`/giai-phap/${item.slug}`}>
                        <a className="block min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:bg-white hover:shadow-sm transition-all">
                          <div className="flex items-center gap-3 mb-2 min-w-0">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              {item.icon}
                            </div>
                            <div className="min-w-0 font-heading font-semibold text-secondary break-words">
                              {item.title}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 break-words overflow-hidden min-w-0">
                            {item.summary}
                          </p>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

