import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import session from "express-session";
import createMemoryStore from "memorystore";
import fs from "fs";
import path from "path";

const app = express();
const httpServer = createServer(app);

const uploadsDir = path.resolve(process.cwd(), "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Required when app is behind a proxy (e.g. Vite dev proxy, nginx) so session/cookie work correctly
app.set("trust proxy", 1);

const MemoryStore = createMemoryStore(session);
const sessionSecret = process.env.SESSION_SECRET ?? "dev-session-secret";
// Production: consider connect-pg-simple for persistent session store (sessions survive restarts).

if (process.env.NODE_ENV === "production") {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    console.error(
      "FATAL: In production, SESSION_SECRET must be set and at least 32 characters. Refusing to start.",
    );
    process.exit(1);
  }
}

// Cookie Secure: only true when served over HTTPS (deploy). Set SECURE_COOKIE=true in production HTTPS.
// When running npm start locally (http://localhost), leave unset so login/session work over HTTP.
const cookieSecure = process.env.SECURE_COOKIE === "true";

app.use(
  session({
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: cookieSecure,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    },
    name: "vinaapaco.sid",
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    store: new MemoryStore({
      checkPeriod: 1000 * 60 * 60,
    }),
    proxy: true,
  }),
);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      const isSensitivePath = path === "/api/login" || path === "/api/me";
      if (capturedJsonResponse && !isSensitivePath) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    const status =
      (err as { status?: number }).status ?? (err as { statusCode?: number }).statusCode ?? 500;
    const isClientError = status >= 400 && status < 500;
    const message = isClientError && err instanceof Error ? err.message : "Internal Server Error";

    if (status >= 500) {
      console.error("Internal Server Error:", err);
    }

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
