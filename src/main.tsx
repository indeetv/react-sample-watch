import React from "react";
import { StrictMode } from "react";
import AppRouter from "./router/AppRouter";
import ProductProvider from "./store/Product";
import BrandsProvider from "./store/Brands";
import LoginProvider from "./store/auth";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProjectsProvider from "./store/Projects";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ProductProvider>
        <LoginProvider>
          <BrandsProvider>
            <ProjectsProvider>
              <AppRouter />
            </ProjectsProvider>
          </BrandsProvider>
        </LoginProvider>
      </ProductProvider>
    </StrictMode>
  );
}
