import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                404 – Không tìm thấy trang
              </h1>
              <p className="text-muted-foreground mb-8">
                Trang bạn truy cập không tồn tại hoặc đã được thay đổi. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
              </p>
              <Link href="/">
                <Button className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Về trang chủ
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
