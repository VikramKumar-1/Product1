/* ══════════════════════════════════════════════════════════
   Partner.types.ts
══════════════════════════════════════════════════════════ */

export interface PartnerFormData {
  // Personal
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  serviceType: string;
  profilePhoto: File | null;

  // Address
  address: string;
  city: string;
  state: string;          // ← string, method nahi
  pincode: string;

  // KYC
  aadhaarNumber: string;  // ← string, method nahi
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  panNumber: string;      // ← string, any nahi

  // Payment
  paymentMethod: "upi" | "bank" | "";
  upiId: string;
  accountHolderName: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  ifscCode: string;
}

export interface PartnerFormErrors {
  [key: string]: string | undefined;
}

export type ProfilePhotoSource = "manual" | "aadhaar" | null;

export type PartnerStep = 1 | 2 | 3 | 4 | 5;

export interface StepInfo {
  title: string;
  sub: string;
}

export interface Perk {
  title: string;
  body: string;
  icon: React.ReactNode;
}