import { ReactNode } from "react";

export interface ProductContextType {
  logoImg: string;
  authType: string;
  key: string;
  signupAllowed: boolean;
  getMetaConfig: () => Promise<void>;
  getProductConfig: () => Promise<void>;
  endpoints:Endpoints,
  host:string
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

export interface MetaConfigResponce {
  endpoints: Endpoints;
  host: Host;
  status_code: string;
  error?:Object
}

export interface Endpoints {
  [key: string]: string; 
}

interface Host {
  name: string;
}
