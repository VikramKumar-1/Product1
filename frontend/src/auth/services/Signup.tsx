import axios from "axios";
import type { SignupRequest, SignupResponse } from "../types/signup.types";

export async function signupService(
  credentials: SignupRequest
): Promise<SignupResponse> {
  const response = await axios.post<SignupResponse>(
    "http://localhost:5000/api/auth/register",
    credentials
  );
  return response.data;
}