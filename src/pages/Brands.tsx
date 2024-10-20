import React, { useEffect, useContext } from "react";
import { BrandsContext } from "../store/Brands";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { Brand } from "../types/brands";
import { ProductContext } from "../store/Product";

export default function Brands() {
  const navigate = useNavigate();
  const { getBrands, brands, totalBrands, nextUrl } = useContext(BrandsContext);
  const { endpoints } = useContext(ProductContext);

  const handleButtonClick = () => {};
  useEffect(() => {
    if(endpoints){
      getBrands();
    }
  }, [endpoints]);

  useEffect(() => {
    redirectToProjectPage();
  }, [brands, totalBrands]);

  const redirectToProjectPage = (): void => {
    if (
      totalBrands === 1 &&
      brands &&
      (brands as Brand[])[0]?.keyword === "allprojects"
    ) {
      const brandKey = (brands as Brand[])[0].key;
      navigate(`/projects?brand=${brandKey}`);
    }
  };

  const handleShowMoreClicked = () => getBrands(nextUrl as string);

  return (
    <>
      <AppLayout
        tableData={brands}
        pageToRedirect="projects"
        queryNameToAdd="brand"
        onButtonClick={handleButtonClick}
        footerText={nextUrl && "Load More Brands..."}
        onShowMoreClicked={handleShowMoreClicked}
      >
        Select the brand whose content you want to see.
      </AppLayout>
    </>
  );
}
