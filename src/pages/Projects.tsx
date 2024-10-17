import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import AppLayout from "../components/AppLayout";
import { BrandsContext } from "../store/Brands";

export default function Projects() {
  const { fetchProjects, projects, nextPrjUrl } = useContext(ProjectsContext);
  const [selectedBrand,setSelectedBrand] = useState<string>("")
  const {brands} = useContext(BrandsContext)
  const [searchParams] = useSearchParams();
  const handleButtonClick = () => {};
  const brand = searchParams.get("brand") as string;

  useEffect(() => {
    fetchProjects(brand);
    displaySelectedBrand()
  }, []);
  const displaySelectedBrand = () =>{
    if(brands){
      debugger
      for(const item of brands){
        if(brand === item.key)  setSelectedBrand(item.name)
      }
    }
  }
  const handleShowMoreClicked = () => fetchProjects(brand,nextPrjUrl as string);

  return (
    <AppLayout
      tableData={projects}
      pageToRedirect="videos"
      queryNameToAdd="project"
      onButtonClick={handleButtonClick}
      footerText={nextPrjUrl && "Load More Projects..."}
      onShowMoreClicked={handleShowMoreClicked}
    >
      Selected Brand: {selectedBrand}
    </AppLayout>
  );
}
