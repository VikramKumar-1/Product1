import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/login.types";

export async function loginService(
  credentials: LoginRequest
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
   "http://localhost:5000/api/auth/login",
    credentials
  );
  return response.data;
}
