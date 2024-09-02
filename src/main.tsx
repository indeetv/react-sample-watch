import React from 'react';
import { StrictMode } from 'react';
import AppRouter from './router/AppRouter';
import ProductProvider from "./context/Product"
import { createRoot } from 'react-dom/client';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
          <ProductProvider>
            <AppRouter />
          </ProductProvider>
        </StrictMode>
    );
}