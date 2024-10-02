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
}

export interface LoginProviderProps {
  children: ReactNode;
}
