import React, { useState, createContext, useContext, useEffect } from "react";
import {
  ProductContextType,
  ProductProviderProps,
  ProductConfigType,
  MetaConfigResponce,
  Endpoints,
} from "../types/product";
import { myFetch } from "../lib/myFetch";
import { GlobalContext } from "./Global";
import { okStatus } from "../utils/api";
import { metaEndPoints } from "../utils/metaConfig";

const ProductContext = createContext<ProductContextType>({
  logoImg: "",
  authType: "",
  key: "",
  signupAllowed: false,
  getMetaConfig: async () => {},
  getProductConfig: async () => {},
  endpoints:metaEndPoints,
  host: "",
});

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const api = new myFetch();

  //store variables
  const [authType, setAuthType] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [signupAllowed, setSignupAllowed] = useState<boolean>(false);
  const [host, setHost] = useState<string>("");
  const [endpoints, setEndpoints] = useState<Endpoints>(metaEndPoints);
  const [logoImg, setLogoImg] = useState<string>("");
  const { setLoadingState } = useContext(GlobalContext);

  useEffect(() => {
    if (host) {
      getProductConfig();
    }
  }, [host]);
  //store methods
  const getMetaConfig = async (): Promise<void> => {
    setLoadingState(true);
    const { endpoints, host, status_code }: MetaConfigResponce = await api.get(
      "v2/watch/meta/endpoints?device=browser"
    );
    if (status_code === okStatus) {
      setEndpoints(endpoints);
      setHost(host.name);
    }
    setLoadingState(false);
  };

  const getProductConfig = async (): Promise<void> => {
      setLoadingState(true);
      const { auth_type, singup_allowed, key, assets } = (await api.get(
        `${endpoints["watch.meta.product.retrieve"]}?device=browser`
      )) as ProductConfigType;
      setAuthType(auth_type);
      setKey(key);
      setSignupAllowed(singup_allowed);
      setLogoImg(assets.logo_image.links[0]);
      setLoadingState(false);
  };

  return (
    <ProductContext.Provider
      value={{
        authType,
        key,
        signupAllowed,
        logoImg,
        getProductConfig,
        getMetaConfig,
        endpoints,
        host,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export { ProductContext };
