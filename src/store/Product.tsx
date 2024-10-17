import React, { useState, createContext, useContext } from "react";
import {
  ProductContextType,
  ProductProviderProps,
  ProductConfigType,
} from "../types/product";
import { myFetch } from "../lib/myFetch";
import { GlobalContext } from "./global";

const ProductContext = createContext<ProductContextType>({
  logoImg:"",
  authType: "",
  key: "",
  signupAllowed: false,
  getMetaConfig: async () => {},
  getProductConfig: async () => {},
});

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const api = new myFetch();

  //store variables
  const [authType, setAuthType] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [signupAllowed, setSignupAllowed] = useState<boolean>(false);
  const [logoImg,setLogoImg] = useState<string>("")
  const {setLoadingState} = useContext(GlobalContext)

  //store methods
  const getMetaConfig = async (): Promise<void> => {
    const data = await api.get("setup/meta-config?device=browser");
    console.log("meta config", data);
  };

  const getProductConfig = async (): Promise<void> => {
    setLoadingState(true)
    const { auth_type, singup_allowed, key,assets } = (await api.get(
      "meta/product-config?device=browser"
    )) as ProductConfigType;
    setAuthType(auth_type);
    setKey(key);
    setSignupAllowed(singup_allowed);
    setLogoImg(assets.logo_image.links[0])
    setLoadingState(false)
  };

  return (
    <ProductContext.Provider
      value={{ authType, key, signupAllowed,logoImg, getProductConfig, getMetaConfig }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export { ProductContext };
