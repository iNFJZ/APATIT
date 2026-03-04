import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AuthUser = {
  id: string;
  username: string;
};

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
};

type LoginPayload = {
  username: string;
  password: string;
};

type AuthContextValue = AuthState & {
  refreshMe: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const refreshMe = useCallback(async (): Promise<void> => {
    type MeResponse =
      | { isAuthenticated: false }
      | { isAuthenticated: true; user: AuthUser };
    try {
      const data = await fetchJson<MeResponse>("/api/me");
      if (!data.isAuthenticated) {
        setState({ isLoading: false, isAuthenticated: false, user: null });
        return;
      }
      setState({ isLoading: false, isAuthenticated: true, user: data.user });
      return;
    } catch {
      setState({ isLoading: false, isAuthenticated: false, user: null });
      return;
    }
  }, []);

  useEffect(() => {
    void refreshMe();
  }, [refreshMe]);

  const login = useCallback(
    async (payload: LoginPayload): Promise<void> => {
      type LoginResponse = { user: AuthUser };
      const data = await fetchJson<LoginResponse>("/api/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setState({ isLoading: false, isAuthenticated: true, user: data.user });
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    await fetchJson<{ ok: true }>("/api/logout", { method: "POST" });
    setState({ isLoading: false, isAuthenticated: false, user: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      refreshMe,
      login,
      logout,
    }),
    [logout, refreshMe, login, state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return contextValue;
}

