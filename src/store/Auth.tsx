import React, { useState, createContext, useEffect, useContext } from "react";
import {
  LoginFormData,
  LoginApiResponce,
  LoginContextType,
  LoginRequest,
  LoginProviderProps,
  LogoutRequest,
  LogoutResponse
} from "../types/auth";
import { getToken, removeToken, setToken } from "../utils/auth";
import { okStatus } from "../utils/api";
import { myFetch } from "../lib/myFetch";
import { ProductContext } from "./Product";

const LoginContext = createContext<LoginContextType>({
  login: async () => {},
  checkForLoginAndUpdate: () => {},
  logout:()=>{},
  userLoggedIn: null,
  authLoading:false,
  errorMsg:""
});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const api = new myFetch();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const [authLoading,setAuthLoading] = useState<boolean>(false)
  const {endpoints} = useContext(ProductContext)
  const [errorMsg,setErrorMsg] = useState<string>("")

  const login = async (
    authType: string,
    credentials: LoginFormData
  ): Promise<void> => {
    try {
      setAuthLoading(true)
      const { status_code: _statusCode, token,refresh_token:rfToken } = await api.post<LoginApiResponce,LoginRequest>(`${endpoints["watch.auth.session.login"]}`, {
        type: authType,
        credentials: credentials,
        persist: false,
      });
      if (_statusCode === okStatus) {
        setToken("token", token)
        setToken("rfToken",rfToken)
        setUserLoggedIn(true);
      }
      setAuthLoading(false)
    } catch (error) {
      const match = error.message.match(/"status_message":"(.*?)"/);
      const statusMessage = match ? match[1] : "Login Failed";
      setErrorMsg(statusMessage)
      setAuthLoading(false)
    }
  };

  const checkForLoginAndUpdate = (): void => {
    if (getToken("token")) {
      setUserLoggedIn(true);
    } else setUserLoggedIn(false);
  };

  const logout = async (): Promise<void> => {
    const jwtToken = getToken("token");
    const rfToken = getToken("rfToken");
    setAuthLoading(true)
    const { status_code } = await api.post<LogoutResponse,LogoutRequest>(`${endpoints["watch.auth.session.logout"]}`, {
      token: jwtToken,
      refresh_token:rfToken
    });
    if (status_code === okStatus) {
      removeToken("token");
      removeToken("rfToken")
    }
    setAuthLoading(false)
    window.location.reload()
  };

  return (
    <LoginContext.Provider
      value={{ login, userLoggedIn, checkForLoginAndUpdate,logout,authLoading,errorMsg }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export { LoginContext };
