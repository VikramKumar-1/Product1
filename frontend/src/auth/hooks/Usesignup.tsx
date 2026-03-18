import { useState } from "react";
import { signupService } from "../services/Signup";
import type { SignupRequest, SignupResponse } from "../types/signup.types";

export function useSignup() {
  const [data, setData] = useState<SignupResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (credentials: SignupRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signupService(credentials);
      setData(res);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { signup, data, loading, error };
}