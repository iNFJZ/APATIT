import { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ChevronDown, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { solutions } from "@/lib/solutions";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [location] = useLocation();

  const handleScrollToTopIfSameRoute = (targetHref: string) => {
    if (location !== targetHref) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

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
    { name: "Giải pháp", href: "/giai-phap" },
    { name: "Công bố", href: "/cong-bo-thong-tin" },
    { name: "Sản phẩm", href: "/san-pham" },
    { name: "Tin tức", href: "/tin-tuc" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  const extendedNavLinks = isAuthenticated
    ? [...navLinks, { name: "Nhân viên", href: "/nhan-vien" }, { name: "Quản trị", href: "/admin" }]
    : navLinks;

  const solutionsLinks = useMemo(
    () =>
      solutions.map((item) => ({
        name: item.title,
        href: `/giai-phap/${item.slug}`,
      })),
    [],
  );

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
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                handleScrollToTopIfSameRoute("/");
              }}
            >
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
              {extendedNavLinks.map((link) => {
                if (link.href !== "/giai-phap") {
                  return (
                    <li key={link.name}>
                      <Link href={link.href}>
                        <a
                          className={`font-medium text-sm transition-colors hover:text-primary ${
                            location === link.href
                              ? "text-primary"
                              : isScrolled || !isHomePage
                              ? "text-secondary/80"
                              : "text-white/90 drop-shadow-md"
                          }`}
                          onClick={() => {
                            handleScrollToTopIfSameRoute(link.href);
                          }}
                        >
                          {link.name}
                        </a>
                      </Link>
                    </li>
                  );
                }

                const isActive = location === "/giai-phap" || location.startsWith("/giai-phap/");

                return (
                  <li key={link.name} className="relative">
                    <div className="inline-flex flex-col group">
                      <Link href="/giai-phap">
                        <a
                          className={`font-medium text-sm transition-colors hover:text-primary inline-flex items-center gap-1 ${
                            isActive
                              ? "text-primary"
                              : isScrolled || !isHomePage
                              ? "text-secondary/80"
                              : "text-white/90 drop-shadow-md"
                          }`}
                          onClick={() => {
                            handleScrollToTopIfSameRoute("/giai-phap");
                          }}
                        >
                          Giải pháp <ChevronDown className="w-4 h-4 opacity-80" />
                        </a>
                      </Link>

                      <div className="absolute left-[-0.5rem] top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                        <div className="w-[260px] rounded-2xl border border-slate-100 bg-white shadow-xl overflow-hidden py-2">
                          {solutionsLinks.map((item) => (
                            <Link key={item.href} href={item.href}>
                              <a className="relative flex items-center px-4 py-2.5 text-sm text-secondary hover:text-primary hover:bg-primary/5 transition-colors group/item">
                                <span>{item.name}</span>
                                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 translate-x-[-120%] transition-all duration-700 w-4 h-4 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
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
              {isAuthenticated ? (
                <Button
                  className="rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    void logout();
                  }}
                >
                  Đăng xuất
                </Button>
              ) : (
                <Link href="/dang-nhap">
                  <Button className="rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
                    Đăng nhập
                  </Button>
                </Link>
              )}
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
            {extendedNavLinks.map((link) => {
              if (link.href !== "/giai-phap") {
                return (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <a
                        className={`block py-2 font-medium hover:text-primary transition-colors ${
                          location === link.href ? "text-primary" : "text-secondary"
                        }`}
                        onClick={() => {
                          handleScrollToTopIfSameRoute(link.href);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </a>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-2 font-medium text-secondary hover:text-primary transition-colors"
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  >
                    <span>Giải pháp</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileSolutionsOpen ? (
                    <div className="pl-3 pb-2">
                      <Link href="/giai-phap">
                        <a
                          className="block py-2 text-sm font-semibold text-primary"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileSolutionsOpen(false);
                          }}
                        >
                          Xem tất cả
                        </a>
                      </Link>
                      <ul className="flex flex-col gap-1">
                        {solutionsLinks.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href}>
                              <a
                                className="block py-2 text-sm text-secondary hover:text-primary transition-colors"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileSolutionsOpen(false);
                                }}
                              >
                                {item.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            {isAuthenticated ? (
              <Button
                className="w-full justify-center"
                onClick={() => {
                  void logout();
                }}
              >
                Đăng xuất
              </Button>
            ) : (
              <Link href="/dang-nhap">
                <Button className="w-full justify-center">Đăng nhập</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
