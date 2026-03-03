import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Products() {
  const products = [
    {
      name: "Phân Bón NPK",
      category: "Phân bón",
      img: "https://images.unsplash.com/photo-1592982537447-6f2f2c8d2346?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Quặng Apatit tuyển",
      category: "Khoáng sản",
      img: "https://images.unsplash.com/photo-1621689254070-5883a45fb22d?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Đá phosphate loại 1",
      category: "Khoáng sản",
      img: "https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Quặng Kaolin",
      category: "Khoáng sản",
      img: "https://images.unsplash.com/photo-1516027101569-82ce3855ffdc?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section id="products" className="py-20 md:py-32 bg-secondary text-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider text-sm uppercase mb-4">
              <span className="w-8 h-px bg-primary"></span>
              Sản Phẩm Chủ Đạo
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Chất lượng tạo nên thương hiệu
            </h2>
            <p className="text-white/70 text-lg">
              Danh mục sản phẩm đa dạng, đáp ứng các tiêu chuẩn khắt khe nhất của thị trường trong nước và quốc tế.
            </p>
          </div>
          
          <Link href="/san-pham">
            <Button variant="outline" className="rounded-full text-white border-white/20 hover:bg-white/10 shrink-0">
              Xem tất cả sản phẩm
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-6">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-primary text-sm font-medium mb-2">{product.category}</div>
                  <h3 className="text-xl font-heading font-semibold text-white mb-4">{product.name}</h3>
                  <div className="flex items-center text-sm font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Tìm hiểu thêm <ArrowRight className="ml-2 w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}