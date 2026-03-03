import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import phosphateImg1 from "@/assets/images/product-phosphate1.png";
import phosphateImg2 from "@/assets/images/product-phosphate2.png";
import npkImg from "@/assets/images/product-npk.png";
import phuGiaImg from "@/assets/images/product-phu-gia.png";
import apatitImg from "@/assets/images/product-quang-apatit-tuyen.png";
import fenspatImg from "@/assets/images/product-fenspat.png";
import kaolinImg from "@/assets/images/product-kaolin.png";

export default function ProductsPage() {
  const products = [
    { name: "Đá phosphate loại 1", category: "Khoáng sản", price: "Liên hệ", img: phosphateImg1 },
    { name: "Đá phosphate loại 2", category: "Khoáng sản", price: "Liên hệ", img: phosphateImg2 },
    { name: "Phân Bón NPK", category: "Phân bón", price: "Liên hệ", img: npkImg },
    { name: "Phụ gia các loại", category: "Hóa chất", price: "Liên hệ", img: phuGiaImg },
    { name: "Quặng Apatit tuyển", category: "Khoáng sản", price: "Liên hệ", img: apatitImg },
    { name: "Quặng Fenspát", category: "Khoáng sản", price: "Liên hệ", img: fenspatImg },
    { name: "Quặng Kaolin", category: "Khoáng sản", price: "Liên hệ", img: kaolinImg },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-6">Danh mục Sản phẩm</h1>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10 rounded-full" placeholder="Tìm kiếm sản phẩm..." />
              </div>
              <Button className="rounded-full px-8">Tìm kiếm</Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((p, i) => (
                <div key={i} className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">{p.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-lg text-secondary mb-2">{p.name}</h3>
                    <div className="text-primary font-bold mb-4">{p.price}</div>
                    <Button variant="outline" className="w-full rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Chi tiết <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
