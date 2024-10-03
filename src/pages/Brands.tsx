import React, { useEffect, useContext } from "react";
import { BrandsContext } from "../store/Brands";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { Brand } from "../types/brands";

export default function Brands() {
  const navigate = useNavigate();
  const { getBrands, brands, totalBrands } = useContext(BrandsContext);

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    redirectToProjectPage();
  }, [brands, totalBrands]);

  const redirectToProjectPage = (): void => {
    if (totalBrands === 1 && brands && (brands as Brand[])[0]?.keyword === "allprojects") {
      const brandKey = (brands as Brand[])[0].key;
      navigate(`/projects?brand=${brandKey}`);
    }
  };
  return (
    <>
      <AppLayout tableData={brands} pageToRedirect='projects' queryNameToAdd='brand'>
        Select the brand whose content you want to see.
      </AppLayout>
    </>
  );
}
