import { ReactNode } from "react";

export interface ApiResponse {
  response: Response;
}

export interface ContentTableProps<T extends object> {
  tableData?: Array<T>;
  pageToRedirect?: string;
  queryNameToAdd?: string;
  onButtonClick?: (name: string) => void;
}
export interface Project {
  video_key: string;
  name: string;
  poster?: string;
  key: string;
}

export interface AppLayoutProps {
  children: React.ReactNode;
  footerText?:string | null;
  tableData: any;
  pageToRedirect?: string;
  queryNameToAdd?: string;
}

export interface GlobalContextType{
  setLoadingState:(isLoading:boolean) => void;
  isLoading:boolean;
}

export interface GlobalProviderProps{
  children: ReactNode;
}
