import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import AppLayout from "../components/AppLayout";

export default function Projects() {
    const { fetchProjects, projects } = useContext(ProjectsContext);
    const [searchParams] = useSearchParams();

  useEffect(() => {
    const brand = searchParams.get("brand") as string;
    fetchProjects(brand);
  }, []);

  return <AppLayout tableData={projects} pageToRedirect='videos' queryNameToAdd='project'>Select Project</AppLayout>;
}
