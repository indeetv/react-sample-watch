import React, { useState, createContext, useEffect } from "react";
import {
  LoginFormData,
  LoginContextType,
  LoginProviderProps,
} from "../types/auth";
import { setCookie, getCookie } from "../utils/auth";
import { okStatus } from "../utils/api";
import { myFetch } from "../lib/myFetch";

const LoginContext = createContext<LoginContextType>({
  login: async () => {},
  checkForLoginAndUpdate: () => {},
  userLoggedIn: null,
});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const api = new myFetch();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  const login = async (
    authType: string,
    credentials: LoginFormData
  ): Promise<void> => {
    const { status_code: _statusCode, token } = await api.post("auth/login", {
      type: authType,
      credentials: credentials,
      persist: false,
    });

    if (_statusCode === okStatus) {
      setCookie("token", token, 2);
      setUserLoggedIn(true);
    }
  };

  const checkForLoginAndUpdate = (): void => {
    if (getCookie("token")) {
      setUserLoggedIn(true);
    } else setUserLoggedIn(false);
  };

  return (
    <LoginContext.Provider
      value={{ login, userLoggedIn, checkForLoginAndUpdate }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export { LoginContext };
