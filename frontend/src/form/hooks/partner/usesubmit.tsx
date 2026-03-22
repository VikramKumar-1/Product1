/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import {
  SubmitPartnerService,
  type SubmitResponse,
} from "../../services/partnar/submit";
import type { PartnerFormData } from "../../types/Partner.type";

interface UseSubmitOptions {
  onSuccess?: (data: SubmitResponse) => void;
  onError?: (error: unknown) => void;
}

export function useRegister(options: UseSubmitOptions = {}) {
  const { onSuccess, onError } = options;

  const mutation = useMutation<SubmitResponse, Error | any, PartnerFormData>({
    mutationFn: async (formData: PartnerFormData) => {
      return SubmitPartnerService(formData);
    },

    onSuccess: (data) => {
      console.log("Submit successful:", data.message);
      onSuccess?.(data);
    },

    onError: (error: any) => {
      console.error("Submit failed:", error);

      onError?.(error);
    },
    retry: false,
  });

  return {
    Submit: mutation.mutate,
    SubmitAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
