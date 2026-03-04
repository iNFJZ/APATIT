import React, { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (!searchTerm.trim()) {
          return true;
        }
        const keyword = searchTerm.toLowerCase().trim();
        return (
          product.name.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword) ||
          product.shortDescription.toLowerCase().includes(keyword)
        );
      }),
    [searchTerm],
  );

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
                <Input
                  className="pl-10 rounded-full"
                  placeholder="Tìm kiếm sản phẩm..."
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
            {filteredProducts.length === 0 ? (
              <p className="text-muted-foreground">
                Không tìm thấy sản phẩm phù hợp với từ khóa "
                <span className="font-semibold">{searchTerm}</span>".
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Tìm thấy{" "}
                  <span className="font-semibold text-secondary">
                    {filteredProducts.length}
                  </span>{" "}
                  sản phẩm
                  {searchTerm.trim()
                    ? " phù hợp với tiêu chí tìm kiếm."
                    : " trong danh mục hiện tại."}
                </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                <div
                  key={product.slug}
                  className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/san-pham/${product.slug}`}>
                    <a className="block h-full">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-lg text-secondary mb-2">
                          {product.name}
                        </h3>
                        <div className="text-primary font-bold mb-4">{product.price}</div>
                        <Button
                          variant="outline"
                          className="w-full rounded-full group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          Chi tiết <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
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
