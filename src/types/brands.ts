import { ReactNode } from "react";

export interface BrandsContextType {
  getBrands: () => void;
  brands: [] | null;
  totalBrands: number;
}

export interface BrandsProviderProps {
  children: ReactNode;
}

export interface Brand {
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
