import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link, useRoute } from "wouter";
import { useAuth } from "@/contexts/auth-context";

type Employee = {
  id: string;
  code: string;
  fullName: string;
  department: string;
  position: string;
  occupation: string;
  location: string;
  email: string;
  phone: string;
  startDate: string;
  birthDate: string;
  maritalStatus: string;
  managerName: string;
};

type EmployeeResponse = {
  employee: Employee;
};

export default function EmployeeDetailPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [match, params] = useRoute<{ id: string }>("/nhan-vien/:id");
  const employeeId = params?.id ?? "";
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function loadEmployee(): Promise<void> {
      if (!isAuthenticated || !employeeId) {
        return;
      }
      setErrorMessage("");
      try {
        const response = await fetch(`/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error(`Failed to load employee: ${response.status}`);
        }
        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Invalid API response. Expected JSON but received: ${text.slice(0, 60)}...`,
          );
        }
        const data = (await response.json()) as EmployeeResponse;
        setEmployee(data.employee);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Không thể tải thông tin nhân viên";
        setErrorMessage(message);
      }
    }
    void loadEmployee();
  }, [employeeId, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center gap-3 py-10">
                <Spinner className="h-6 w-6 text-primary" />
                <p className="text-muted-foreground text-sm">
                  Đang kiểm tra phiên đăng nhập của bạn...
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-xl mx-auto text-center">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Khu vực nhân viên
                </h1>
                <p className="text-muted-foreground mb-8">
                  Bạn cần đăng nhập để xem thông tin chi tiết nhân viên.
                </p>
                <Link href="/dang-nhap">
                  <Button className="rounded-full">Đăng nhập</Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-xl mx-auto text-center">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Không tìm thấy nhân viên
                </h1>
                <p className="text-muted-foreground mb-8">
                  Nhân viên bạn đang tìm không tồn tại hoặc đã được cập nhật.
                </p>
                <Link href="/nhan-vien">
                  <Button className="rounded-full">Quay lại danh sách nhân viên</Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                Không thể tải thông tin nhân viên
              </h1>
              <p className="text-muted-foreground mb-6">
                {errorMessage || "Vui lòng thử lại hoặc quay lại danh sách nhân viên."}
              </p>
              <Link href="/nhan-vien">
                <Button className="rounded-full">Quay lại danh sách nhân viên</Button>
              </Link>
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
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-2xl font-semibold">
                  {employee.fullName.slice(0, 1)}
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">{employee.code}</div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary">
                    {employee.fullName}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {employee.position} • {employee.department}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/nhan-vien">
                  <Button variant="outline" className="rounded-full">
                    Quay lại danh sách
                  </Button>
                </Link>
              </div>
            </div>

            {errorMessage ? (
              <p className="text-sm text-red-600 mb-6">{errorMessage}</p>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                <DetailRow label="Mã nhân viên" value={employee.code} />
                <DetailRow label="Làm việc tại cơ sở" value={employee.location} />
                <DetailRow label="Email" value={employee.email} />
                <DetailRow label="Điện thoại" value={employee.phone} />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                <DetailRow label="Ngày bắt đầu làm việc" value={employee.startDate} />
                <DetailRow label="Ngày sinh" value={employee.birthDate} />
                <DetailRow label="Trạng thái hôn nhân" value={employee.maritalStatus} />
                <DetailRow label="Phòng ban" value={employee.department} />
                <DetailRow label="Chức vụ" value={employee.position} />
                <DetailRow label="Nghề nghiệp" value={employee.occupation} />
                <DetailRow label="Quản lý trực tiếp" value={employee.managerName} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-secondary">{value || "-"}</span>
    </div>
  );
}

