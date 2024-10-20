import React, { useState, createContext, useContext } from "react";
import {
  Brand,
  BrandsContextType,
  BrandsProviderProps,
  BrandsResponse,
} from "../types/brands";
import { getToken } from "../utils/auth";

import { myFetch } from "../lib/myFetch";
import { GlobalContext } from "./Global";
import { ProductContext } from "./Product";

const BrandsContext = createContext<BrandsContextType>({
  getBrands: () => {},
  brands: null,
  totalBrands: 0,
  nextUrl: null,
});

const BrandsProvider: React.FC<BrandsProviderProps> = ({ children }) => {
  const api = new myFetch();
  const {endpoints} = useContext(ProductContext)
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [totalBrands, setTotalBrands] = useState<number>(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const { setLoadingState, setPaginatorLoadingState } =
    useContext(GlobalContext);

  const getBrands = async (url?: string): Promise<void> => {
    const jwtToken = getToken("token");
    const endpoint = url ?? endpoints["watch.content.brand.list"];
    const isFullUrl = url ? true : false;
    if (isFullUrl) setPaginatorLoadingState(true);
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
    } else {
      setBrands(results);
    }

    setNextUrl(next);
    setTotalBrands(count);
    setPaginatorLoadingState(false);
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
