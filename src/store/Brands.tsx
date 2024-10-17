import React, { useState, createContext, useContext } from "react";
import {
  Brand,
  BrandsContextType,
  BrandsProviderProps,
  BrandsResponse,
} from "../types/brands";
import { getCookie } from "../utils/auth";

import { myFetch } from "../lib/myFetch";
import { GlobalContext } from "./global";

const BrandsContext = createContext<BrandsContextType>({
  getBrands: () => {},
  brands: null,
  totalBrands: 0,
  nextUrl: null,
});

const BrandsProvider: React.FC<BrandsProviderProps> = ({ children }) => {
  const api = new myFetch();
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [totalBrands, setTotalBrands] = useState<number>(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const { setLoadingState } = useContext(GlobalContext);

  const getBrands = async (url?: string): Promise<void> => {
    const jwtToken = getCookie("token");
    const endpoint = url ?? "content/brands";
    const isFullUrl = url ? true : false;
    
    setLoadingState(true);
    const { results, count, next } = await api.get<BrandsResponse>(
      endpoint,
      {
        Authorization: `JWT ${jwtToken}`,
      },
      isFullUrl
    );

    if (url) {
      setBrands((prevBrands) =>
        prevBrands ? [...prevBrands, ...results] : results
      );
    } else setBrands(results)
    setNextUrl(next);
    setTotalBrands(count);
    setLoadingState(false);
  };

  return (
    <BrandsContext.Provider value={{ getBrands, brands, totalBrands, nextUrl }}>
      {children}
    </BrandsContext.Provider>
  );
};

export default BrandsProvider;

export { BrandsContext };
