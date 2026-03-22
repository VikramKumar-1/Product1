import axios from "axios";
import type { PartnerFormData } from "../../types/Partner.type";

export interface KycResponse {
  success: boolean;
  message: string;
}

export async function KycPartnerService(
  data: PartnerFormData,
): Promise<KycResponse> {
  const formData = new FormData();

  formData.append("fullName",      data.fullName);
  formData.append("email",         data.email);
  formData.append("aadhaarNumber", data.aadhaarNumber);
  formData.append("address",       data.address);
  formData.append("city",          data.city);
  formData.append("pincode",       data.pincode);
  formData.append("state",         data.state);

  if (data.panNumber)    formData.append("panNumber",    data.panNumber);
  if (data.aadhaarFront) formData.append("aadhaarFront", data.aadhaarFront);
  if (data.aadhaarBack)  formData.append("aadhaarBack",  data.aadhaarBack);
  if (data.profilePhoto) formData.append("profilePhoto", data.profilePhoto);

  const response = await axios.post<KycResponse>(
    "http://localhost:5000/api/partners/kyc",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
}