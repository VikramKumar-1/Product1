/* ══════════════════════════════════════════════════════════
   LOGIN TYPES — Login.types.ts
══════════════════════════════════════════════════════════ */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string | number;
      email: string;
      name?: string;
      role?: string;
    };
  };
}

export interface LoginError {
  success: false;
  message: string;
  statusCode: number;
}