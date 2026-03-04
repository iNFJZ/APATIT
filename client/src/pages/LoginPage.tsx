import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    setLocation("/nhan-vien");
  }, [isAuthenticated, setLocation]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await login({ username, password });
      setLocation("/nhan-vien");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <h1 className="text-2xl font-heading font-bold text-secondary mb-2">Đăng nhập</h1>
              <p className="text-muted-foreground mb-6">
                Chỉ nhân viên được cấp tài khoản mới có thể truy cập mục nội bộ.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tên đăng nhập</label>
                  <Input
                    className="rounded-xl"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="admin"
                    autoComplete="username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mật khẩu</label>
                  <Input
                    className="rounded-xl"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                  />
                </div>
                {errorMessage ? (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                ) : null}
                <Button className="w-full rounded-xl py-6 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
              <div className="mt-6 text-xs text-muted-foreground">
                Mặc định ở môi trường dev: <span className="font-semibold">admin / admin</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

