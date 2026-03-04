import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "wouter";
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

type EmployeesResponse = {
  employees: Employee[];
};

export default function EmployeesPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function loadEmployees(): Promise<void> {
      if (!isAuthenticated) {
        return;
      }
      setErrorMessage("");
      try {
        const response = await fetch("/api/employees");
        if (!response.ok) {
          throw new Error(`Failed to load employees: ${response.status}`);
        }
        const data = (await response.json()) as EmployeesResponse;
        setEmployees(data.employees);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Không thể tải danh sách nhân viên";
        setErrorMessage(message);
      }
    }
    void loadEmployees();
  }, [isAuthenticated]);

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) {
      return employees;
    }
    const keyword = searchTerm.toLowerCase().trim();
    return employees.filter((employee) => {
      const normalizedName = employee.fullName.toLowerCase();
      const normalizedCode = employee.code.toLowerCase();
      const normalizedEmail = employee.email.toLowerCase();
      const normalizedDepartment = employee.department.toLowerCase();
      const normalizedPosition = employee.position.toLowerCase();
      const normalizedLocation = employee.location.toLowerCase();
      return (
        normalizedName.includes(keyword) ||
        normalizedCode.includes(keyword) ||
        normalizedEmail.includes(keyword) ||
        normalizedDepartment.includes(keyword) ||
        normalizedPosition.includes(keyword) ||
        normalizedLocation.includes(keyword)
      );
    });
  }, [employees, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <section className="py-16">
            <div className="container mx-auto px-4">
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
        <main className="pt-24">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto text-center">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4">
                  Khu vực nhân viên
                </h1>
                <p className="text-muted-foreground mb-8">
                  Bạn cần đăng nhập để xem danh sách nhân viên của công ty.
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2">
                  Danh sách nhân viên
                </h1>
                <p className="text-muted-foreground">
                  Thông tin nội bộ chỉ hiển thị khi đăng nhập.
                </p>
              </div>
              <div className="w-full md:w-80">
                <Input
                  type="text"
                  placeholder="Tìm theo tên, mã, phòng ban, chức vụ..."
                  className="rounded-full"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            {errorMessage ? (
              <p className="text-sm text-red-600 mb-6">{errorMessage}</p>
            ) : null}

            {filteredEmployees.length === 0 ? (
              employees.length === 0 && !searchTerm.trim() ? (
                <p className="text-muted-foreground">
                  Hiện chưa có dữ liệu nhân viên để hiển thị.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Không tìm thấy nhân viên phù hợp với từ khóa "
                  <span className="font-semibold">{searchTerm}</span>".
                </p>
              )
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Đang hiển thị{" "}
                  <span className="font-semibold text-secondary">
                    {filteredEmployees.length}
                  </span>{" "}
                  nhân viên
                  {searchTerm.trim()
                    ? " theo từ khóa tìm kiếm."
                    : " trong danh sách hiện tại."}
                </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map((employee) => (
                  <Link key={employee.id} href={`/nhan-vien/${employee.id}`}>
                    <a className="block rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition-shadow group">
                      <div className="flex gap-4 items-center">
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xl font-semibold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {employee.fullName.slice(0, 1)}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-500 mb-1">{employee.code}</div>
                          <div className="text-base font-semibold text-secondary">
                            {employee.fullName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {employee.position} • {employee.department}
                          </div>
                          <div className="mt-1 text-xs text-primary">{employee.email}</div>
                        </div>
                      </div>
                    </a>
                  </Link>
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

