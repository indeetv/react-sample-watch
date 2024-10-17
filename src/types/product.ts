import { ReactNode } from "react";

export interface ProductContextType {
  logoImg: string;
  authType: string;
  key: string;
  signupAllowed: boolean;
  getMetaConfig: () => Promise<void>;
  getProductConfig: () => Promise<void>;
}

export interface ProductProviderProps {
  children: ReactNode;
}

interface Asset {
  links: string[];
  file_type: "PDF" | "IMG";
}

interface Assets {
  [key: string]: Asset; 
}

export interface ProductConfigType {
  auth_type: string;
  key: string;
  singup_allowed: boolean;
  assets: Assets;
}
