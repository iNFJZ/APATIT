import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FileText, PlusCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      setLocation("/dang-nhap");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-muted-foreground">Đang xác thực...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-56 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100">
          <Link href="/admin">
            <a className="font-heading font-bold text-secondary">Quản trị</a>
          </Link>
        </div>
        <nav className="p-2 flex flex-col gap-1">
          <Link href="/admin/posts">
            <a className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-primary/10 hover:text-primary transition-colors">
              <FileText className="w-4 h-4" />
              Tin tức & Thông báo
            </a>
          </Link>
          <Link href="/admin/posts/moi">
            <a className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-primary/10 hover:text-primary transition-colors">
              <PlusCircle className="w-4 h-4" />
              Đăng bài mới
            </a>
          </Link>
        </nav>
        <div className="mt-auto p-2 border-t border-slate-100">
          <Link href="/">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <ArrowLeft className="w-4 h-4" />
              Về trang chủ
            </Button>
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
