import { useState } from "react";
import { loginService } from "../services/Login";
import type { LoginRequest, LoginResponse } from "../types/login.types";

export function useLogin() {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginService(credentials);
      setData(res);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { login, data, loading, error };
}