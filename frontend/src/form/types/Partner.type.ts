/* ══════════════════════════════════════════════════════════
   Partner.types.ts
══════════════════════════════════════════════════════════ */

export interface PartnerFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  profilePhoto: File | null;
}

export interface PartnerFormErrors {
  fullName?: string;
  email?: string;
  otp?: string;
  address?: string;
  city?: string;
  pincode?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
}

export type ProfilePhotoSource = "manual" | "aadhaar" | null;

export type PartnerStep = 1 | 2 | 3;

export interface StepInfo {
  title: string;
  sub: string;
}

export interface Perk {
  title: string;
  body: string;
  icon: React.ReactNode;
}