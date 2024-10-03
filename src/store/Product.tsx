import React, { useState, createContext } from "react";
import {
  ProductContextType,
  ProductProviderProps,
  ProductConfigType,
} from "../types/product";
import { myFetch } from "../lib/myFetch";

const ProductContext = createContext<ProductContextType>({
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
  //store methods
  const getMetaConfig = async (): Promise<void> => {
    const data = await api.get("setup/meta-config?device=browser");
    console.log("meta config", data);
  };

  const getProductConfig = async (): Promise<void> => {
    const { auth_type, singup_allowed, key } = (await api.get(
      "meta/product-config?device=browser"
    )) as ProductConfigType;
    setAuthType(auth_type);
    setKey(key);
    setSignupAllowed(singup_allowed);
  };

  return (
    <ProductContext.Provider
      value={{ authType, key, signupAllowed, getProductConfig, getMetaConfig }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export { ProductContext };
