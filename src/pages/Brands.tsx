import React, { useEffect, useContext } from "react";
import { BrandsContext } from "../store/Brands";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

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
    if (totalBrands === 1 && brands && brands[0]?.keyword === "allprojects") {
      const brandKey = brands[0].key;
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
