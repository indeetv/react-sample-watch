import React, { useEffect, useContext } from "react";
import LoginLayout from "../components/Login/Login";
import { ProductContext } from "../context/Product";

export default function Login() {
    const { getProductConfig, authType } = useContext(ProductContext);

    const handleFormSubmit = (payload: { email: string; authKey: string }) => {
        console.log('Form submitted with payload:', payload);
    };

    useEffect(() => {
        getProductConfig();
    }, []);

    return (
        <LoginLayout authType={authType} onSubmit={handleFormSubmit} />
    );
}
