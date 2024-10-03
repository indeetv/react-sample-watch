import { ReactNode } from "react";
export interface LoginLayoutProps {
  authType: string;
  onSubmit: (payload: { email: string; authKey: string }) => void;
}

export interface LoginFormData {
  authKey?: string | number | readonly string[] | undefined;
  username?: string;
  password?: string;
  pin?: string;
}

export interface LoginContextType {
  userLoggedIn: boolean | null;
  checkForLoginAndUpdate: () => void;
  login: (authType: string, credentials: LoginFormData) => Promise<void>;
  logout: () => void;
}

export interface LoginProviderProps {
  children: ReactNode;
}

export interface LoginApiResponce {
  status_code: string;
  token: string;
  refresh_token: string;
}

export interface LoginRequest {
  type: string;
  credentials: Object;
  persist: false;
}

export interface LogoutRequest {
  token: string | null; 
  refresh_token:string | null;
}

export interface LogoutResponse {
  status_code: string;
}
