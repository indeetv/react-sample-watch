import React, { useState, createContext } from "react";
import {
  BrandsContextType,
  BrandsProviderProps,
  BrandsResponse,
} from "../types/brands";
import { getCookie } from "../utils/auth";

import { myFetch } from "../lib/myFetch";

const BrandsContext = createContext<BrandsContextType>({
  getBrands: () => {},
  brands: null,
  totalBrands:0
});

const BrandsProvider: React.FC<BrandsProviderProps> = ({ children }) => {
  const api = new myFetch();
  const [brands, setBrands] = useState<[] | null>(null);
  const [totalBrands,setTotalBrands] = useState<number>(0)

  const getBrands = async (): Promise<void> => {
    const jwtToken = getCookie("token");
    const { results, count } = await api.get<BrandsResponse>("content/brands", {
      Authorization: `JWT ${jwtToken}`,
    });
    setBrands(results)
    setTotalBrands(count)
  };

  return (
    <BrandsContext.Provider value={{ getBrands, brands,totalBrands }}>
      {children}
    </BrandsContext.Provider>
  );
};

export default BrandsProvider;

export { BrandsContext };
