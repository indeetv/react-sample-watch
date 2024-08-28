import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ProductContextType } from '../interfaces/product';
import {myFetch} from "../lib/myFetch"

const ProductContext = createContext<ProductContextType>({
    authType: '',
    key: '',
    signupAllowed: false,
});

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const api = new myFetch()
    // useEffect(() => {
    //     debugger
        
    // }, []); // Empty dependency array means this runs once on mount
    const getProductConfig =() =>{
        const data = api.get('meta/product-config/user')
        console.log("data",data)
    }
    return (
        <ProductContext.Provider value={{ ...ProductContext }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext
