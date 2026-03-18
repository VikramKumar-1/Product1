export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string | number;
      name: string;
      email: string;
      role?: string;
    };
  };
}