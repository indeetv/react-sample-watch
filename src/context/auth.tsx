import React, { useState, createContext } from "react";
import {
  LoginContextType,
  LoginProviderProps,
} from "../interfaces/auth";
import { myFetch } from "../lib/myFetch";
import { getClientID } from "../utils/api";

const LoginContext = createContext<LoginContextType>({});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const api = new myFetch();
  const clientID = getClientID();
  const apiKey = import.meta.env.VITE_API_KEY;

  const login = async (authType,payload): Promise<void> => {
    api.post('auth/login?device=browser', {type:', body: 'This is a new post.' }, { Authorization: `Bearer ${apiKey}`})
    // const {auth_type,singup_allowed,key} = await api.get("meta/product-config?device=browser", { Authorization: `Bearer ${apiKey}`,ClientID: clientID}) as ProductConfigType;
    // setAuthType(auth_type);
    // setKey(key);
    // setSignupAllowed(singup_allowed);
    // console.error("Error fetching product config:", error);
  };

  return (
    <LoginContext.Provider value={{ login }}>{children}</LoginContext.Provider>
  );
};

export default LoginProvider;

export { LoginContext };
