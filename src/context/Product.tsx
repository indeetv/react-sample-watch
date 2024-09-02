import React, { useState, createContext } from "react";
import { ProductContextType,ProductProviderProps,ProductConfigType } from '../interfaces/product';
import { myFetch } from "../lib/myFetch";
import { getClientID } from '../utils/api';


const ProductContext = createContext<ProductContextType>({
    authType: '',
    key: '',
    signupAllowed: false,
    getProductConfig: async () => {},
});


const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const api = new myFetch();
    const clientID = getClientID();
    const apiKey = import.meta.env.VITE_API_KEY
    const [authType, setAuthType] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [signupAllowed, setSignupAllowed] = useState<boolean>(false);

    const getProductConfig = async ():Promise<void> => {
        try {
            const {auth_type,singup_allowed,key} = await api.get("meta/product-config?device=browser", { Authorization: `Bearer ${apiKey}`,ClientID: clientID}) as ProductConfigType;
            setAuthType(auth_type);
            setKey(key);
            setSignupAllowed(singup_allowed);
        } catch (error) {
            console.error("Error fetching product config:", error);
        }
    };

    return (
        <ProductContext.Provider value={{ authType, key, signupAllowed, getProductConfig }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;

export { ProductContext };
