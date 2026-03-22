import { useMutation } from "@tanstack/react-query";
import {
  KycPartnerService,
  type KycResponse,
} from "../../services/partnar/kyc";
import type { PartnerFormData } from "../../types/Partner.type";

interface UseKycOptions {
  onSuccess?: (data: KycResponse) => void;
  onError?: (error: unknown) => void;
}

export function useKyc(options: UseKycOptions = {}) {
  const { onSuccess, onError } = options;

  const mutation = useMutation<KycResponse, Error, PartnerFormData>({
    mutationFn: (formData: PartnerFormData) => KycPartnerService(formData),

    onSuccess: (data) => {
      console.log("Kyc successful:", data.message);
      onSuccess?.(data);
    },

    onError: (error: unknown) => {
      console.error("Kyc failed:", error);
      onError?.(error);
    },

    retry: false,
  });

  return {
    kyc: mutation.mutate,        // ← lowercase, consistent naming
    kycAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}