export type LeadSource = "website" | "facebook" | "instagram" | "google";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  service?: string;
  campaign?: string;
  keyword?: string;
  message?: string;
  createdAt: Date;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
}
