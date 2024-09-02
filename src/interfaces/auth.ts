import { ReactNode } from 'react';
export interface LoginLayoutProps {
    authType: string; 
    onSubmit: (payload: { email: string; authKey: string }) => void;
}


export interface LoginContextType {
 
}

export interface LoginProviderProps {
    children: ReactNode;
}

