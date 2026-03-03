import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location === "/";

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/gioi-thieu" },
    { name: "Sản phẩm", href: "/san-pham" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow flex items-center justify-center">
                <img
                  src="/image-ec7d5f4a-e673-4515-abdc-fa062a491c7a.png"
                  alt="VINAAPACO logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-heading font-bold text-lg leading-tight ${
                    isScrolled || !isHomePage ? "text-secondary" : "text-white drop-shadow-md"
                  }`}
                >
                  APATIT VIỆT NAM
                </span>
                <span
                  className={`text-xs font-medium ${
                    isScrolled || !isHomePage ? "text-primary" : "text-white/90 drop-shadow-md"
                  }`}
                >
                  VINAAPACO
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a
                      className={`font-medium text-sm transition-colors hover:text-primary ${
                        location === link.href 
                          ? "text-primary" 
                          : (isScrolled || !isHomePage ? "text-secondary/80" : "text-white/90 drop-shadow-md")
                      }`}
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${
                  isScrolled || !isHomePage ? "text-secondary" : "text-white hover:text-white hover:bg-white/20"
                }`}
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button className="rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                Đăng nhập
              </Button>
            </div>
          </nav>

          <button
            className={`lg:hidden p-2 rounded-md ${
              isScrolled || !isHomePage ? "text-secondary" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <a
                    className={`block py-2 font-medium hover:text-primary transition-colors ${
                      location === link.href ? "text-primary" : "text-secondary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Button className="w-full justify-center">Đăng nhập</Button>
          </div>
        </div>
      )}
    </header>
  );
}
