import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import AppLayout from "../components/AppLayout";

export default function Projects() {
  const { fetchProjects, projects, nextPrjUrl } = useContext(ProjectsContext);
  const [searchParams] = useSearchParams();
  const handleButtonClick = () => {};
  const brand = searchParams.get("brand") as string;

  useEffect(() => {
    fetchProjects(brand);
  }, []);

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
      Select Project
    </AppLayout>
  );
}
