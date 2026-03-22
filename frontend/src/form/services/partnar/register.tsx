import axios from "axios";
import type { PartnerFormData } from "../../types/Partner.type";

export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string; // ← token add kiya
}

export async function registerPartnerService(
  data: PartnerFormData,
): Promise<RegisterResponse> {
  const formData = new FormData();

  // Personal
  formData.append("fullName",    data.fullName);
  formData.append("email",       data.email);
  formData.append("phone",       data.phone);        // ← missing tha
  formData.append("password",    data.password);     // ← missing tha
  formData.append("serviceType", data.serviceType);  // ← missing tha

  // Address
  formData.append("address", data.address);
  formData.append("city",    data.city);
  formData.append("pincode", data.pincode);
  formData.append("state",   data.state);            // ← missing tha

  // Files
  if (data.profilePhoto) formData.append("profilePhoto", data.profilePhoto);
  if (data.aadhaarFront) formData.append("aadhaarFront", data.aadhaarFront);
  if (data.aadhaarBack)  formData.append("aadhaarBack",  data.aadhaarBack);

  const response = await axios.post<RegisterResponse>(
    "http://localhost:5000/api/partners/register",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data;
}