import axios from "axios";
import type { PartnerFormData } from "../../types/Partner.type";

export interface SubmitResponse {
  success: boolean;
  message: string;
}
export async function SubmitPartnerService(
  data: PartnerFormData,
): Promise<SubmitResponse> {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("address", data.address);
  formData.append("city", data.city);
  formData.append("pincode", data.pincode);

  if (data.aadhaarFront) {
    formData.append("aadhaarFront", data.aadhaarFront);
  }
  if (data.aadhaarBack) {
    formData.append("aadhaarBack", data.aadhaarBack);
  }
  if (data.profilePhoto) {
    formData.append("profilePhoto", data.profilePhoto);
  }

  const response = await axios.post<SubmitResponse>(
    "http://localhost:5000/api/partners/submit",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}
