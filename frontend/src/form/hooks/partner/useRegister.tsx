/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import {
  registerPartnerService,
  type RegisterResponse,
} from "../../services/partnar/register";
import type { PartnerFormData } from "../../types/Partner.type";

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: unknown) => void;
}

export function useRegister(options: UseRegisterOptions = {}) {
  const { onSuccess, onError } = options;

  const mutation = useMutation<RegisterResponse, Error | any, PartnerFormData>({
    mutationFn: async (formData: PartnerFormData) => {
      return registerPartnerService(formData);
    },

    onSuccess: (data) => {
      console.log("Registration successful:", data.message);
      if (data.token) {
        localStorage.setItem("partnerToken", data.token); // ← token save
      }
      onSuccess?.(data);
    },

    onError: (error: any) => {
      console.error("Registration failed:", error);
      onError?.(error);
    },

    retry: false,
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}