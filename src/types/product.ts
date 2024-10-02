import { ReactNode } from 'react';

export interface ProductContextType {
    authType: string;
    key: string;
    signupAllowed: boolean;
    getMetaConfig: ()=> Promise<void>;
    getProductConfig: () => Promise<void>;
}

export interface ProductProviderProps {
    children: ReactNode;
}

export interface ProductConfigType{
    auth_type:string;
    key:string;
    singup_allowed:boolean;
}
