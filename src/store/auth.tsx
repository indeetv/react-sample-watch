import React, { useState, createContext, useEffect } from "react";
import {
  LoginFormData,
  LoginApiResponce,
  LoginContextType,
  LoginRequest,
  LoginProviderProps,
  LogoutRequest,
  LogoutResponse
} from "../types/auth";
import { setCookie, getCookie, removeCookie } from "../utils/auth";
import { okStatus } from "../utils/api";
import { myFetch } from "../lib/myFetch";

const LoginContext = createContext<LoginContextType>({
  login: async () => {},
  checkForLoginAndUpdate: () => {},
  logout:()=>{},
  userLoggedIn: null,
});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const api = new myFetch();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  const login = async (
    authType: string,
    credentials: LoginFormData
  ): Promise<void> => {
    const { status_code: _statusCode, token,refresh_token:rfToken } = await api.post<LoginApiResponce,LoginRequest>("auth/login", {
      type: authType,
      credentials: credentials,
      persist: false,
    });

    if (_statusCode === okStatus) {
      setCookie("token", token, 2);
      setCookie("rfToken",rfToken,2)
      setUserLoggedIn(true);
    }
  };

  const checkForLoginAndUpdate = (): void => {
    if (getCookie("token")) {
      setUserLoggedIn(true);
    } else setUserLoggedIn(false);
  };

  const logout = async (): Promise<void> => {
    const jwtToken = getCookie("token");
    const rfToken = getCookie("rfToken")
    const { status_code } = await api.post<LogoutResponse,LogoutRequest>("auth/logout", {
      token: jwtToken,
      refresh_token:rfToken
    });
    if (status_code === okStatus) {
      removeCookie("token");
      removeCookie("rfToken")
    }
    window.location.reload()
  };

  return (
    <LoginContext.Provider
      value={{ login, userLoggedIn, checkForLoginAndUpdate,logout }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export { LoginContext };
