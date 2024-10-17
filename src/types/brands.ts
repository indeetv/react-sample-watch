import { ReactNode } from "react";

export interface BrandsContextType {
  getBrands: (url?:string) => void;
  brands: Brand[] | null;
  totalBrands: number;
  nextUrl: string | null;
}

export interface BrandsProviderProps {
  children: ReactNode;
}

export interface Brand {
  id: any;
  key: string;
  keyword: string;
  name: string;
  logo: string;
  header: string;
}

export interface BrandsResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Brand[];
}
