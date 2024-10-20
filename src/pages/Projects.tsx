import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import AppLayout from "../components/AppLayout";
import { BrandsContext } from "../store/Brands";
import { ProductContext } from "../store/Product";

export default function Projects() {
  const { fetchProjects, projects, nextPrjUrl } = useContext(ProjectsContext);
  const {host} = useContext(ProductContext)
  const [selectedBrand, setSelectedBrand] = useState<string>(() => {
    return sessionStorage.getItem('selectedBrand') || "";
  });
  const { brands } = useContext(BrandsContext);
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand") as string;

  useEffect(() => {
    if(host){
      fetchProjects(brand);
      displaySelectedBrand();
    }
  }, [brand,host]);

  const displaySelectedBrand = () => {
    if (brands) {
      for (const item of brands) {
        if (brand === item.key) {
          setSelectedBrand(item.name);
          sessionStorage.setItem('selectedBrand', item.name);
        }
      }
    }
  };

  const handleShowMoreClicked = () => fetchProjects(brand, nextPrjUrl as string);

  return (
    <AppLayout
      tableData={projects}
      pageToRedirect="videos"
      queryNameToAdd="project"
      onButtonClick={() => {}}
      footerText={nextPrjUrl && "Load More Projects..."}
      onShowMoreClicked={handleShowMoreClicked}
    >
      Selected Brand: {selectedBrand}
    </AppLayout>
  );
}