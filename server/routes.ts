import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

type PublicUser = {
  id: string;
  username: string;
};

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

const employees: Employee[] = [
  {
    id: "e-001",
    code: "NV001",
    fullName: "Nguyễn Văn A",
    department: "Kinh doanh",
    position: "Chuyên viên",
    occupation: "Chuyên viên kinh doanh",
    location: "Trụ sở Lào Cai",
    email: "nv.a@vinaapaco.com",
    phone: "0214 000 001",
    startDate: "2018-03-15",
    birthDate: "1990-06-10",
    maritalStatus: "Độc thân",
    managerName: "Trần Văn Quản lý",
  },
  {
    id: "e-002",
    code: "NV002",
    fullName: "Trần Thị B",
    department: "Kế toán",
    position: "Chuyên viên",
    occupation: "Kế toán tổng hợp",
    location: "Trụ sở Hà Nội",
    email: "tt.b@vinaapaco.com",
    phone: "0214 000 002",
    startDate: "2019-07-01",
    birthDate: "1992-11-20",
    maritalStatus: "Đã kết hôn",
    managerName: "Phạm Thị Kế toán trưởng",
  },
  {
    id: "e-003",
    code: "NV003",
    fullName: "Lê Văn C",
    department: "Nhân sự",
    position: "Chuyên viên",
    occupation: "Chuyên viên nhân sự",
    location: "Trụ sở Lào Cai",
    email: "lv.c@vinaapaco.com",
    phone: "0214 000 003",
    startDate: "2020-01-10",
    birthDate: "1988-03-05",
    maritalStatus: "Độc thân",
    managerName: "Nguyễn Thị Trưởng phòng nhân sự",
  },
];

function getPublicUser(user: { id: string; username: string }): PublicUser {
  return { id: user.id, username: user.username };
}

function assertAuthenticated(sessionUserId?: string): asserts sessionUserId is string {
  if (!sessionUserId) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const staffUsername = process.env.STAFF_USERNAME ?? "admin";
  const staffPassword = process.env.STAFF_PASSWORD ?? "admin";

  const existingStaffUser = await storage.getUserByUsername(staffUsername);
  if (!existingStaffUser && process.env.NODE_ENV !== "production") {
    await storage.createUser({ username: staffUsername, password: staffPassword });
  }

  const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });

  app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
      return res.json({ isAuthenticated: false as const });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      req.session.userId = undefined;
      return res.json({ isAuthenticated: false as const });
    }
    return res.json({ isAuthenticated: true as const, user: getPublicUser(user) });
  });

  app.post("/api/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid payload" });
    }
    const { username, password } = parsed.data;
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = user.id;
    return res.json({ user: getPublicUser(user) });
  });

  app.post("/api/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("vinaapaco.sid");
      return res.json({ ok: true });
    });
  });

  app.get("/api/employees", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      return res.json({ employees });
    } catch (err) {
      return next(err);
    }
  });

  app.get("/api/employees/:id", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const employee = employees.find((item) => item.id === req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return res.json({ employee });
    } catch (err) {
      return next(err);
    }
  });

  app.use("/api", (_req, res) => {
    return res.status(404).json({ message: "Not found" });
  });

  return httpServer;
}
