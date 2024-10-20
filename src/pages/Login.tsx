import React, { useEffect, useContext, useLayoutEffect } from "react";
import LoginLayout from "../components/Login/Login";
import { LoginContext } from "../store/Auth";
import { ProductContext } from "../store/Product";
import { LoginFormData } from "../types/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { authType } = useContext(ProductContext);
  const { login, userLoggedIn } = useContext(LoginContext);

  const handleFormSubmit = (payload: LoginFormData) => {
    const type = authType === "PWD" ? "password" : authType.toLowerCase();
    let credentials: { pin?: string; username?: string; password?: string } = {};

    if (authType === "PIN") {
      const pin = String(payload.authKey);
      credentials = { pin };
    } else if (authType === "PWD") {
      const { username, authKey } = payload;
      const password = String(authKey);
      credentials = { username, password };
    }

    login(type, credentials);
  };

  useEffect(() => {
    if (userLoggedIn) navigate("/brands");
  }, [userLoggedIn]);

  return <LoginLayout authType={authType} onSubmit={handleFormSubmit} />;
}
