import React, { useState, createContext } from "react";
import { myFetch } from "../lib/myFetch";
import { getCookie } from "../utils/auth";

const ProjectsContext = createContext<ProjectsContextType | null>({
  projects: null,
  fetchProjects:() => {},
});

const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const api = new myFetch();
  const [projects, setProjects] = useState<Project[] | null>(null);

  const fetchProjects = async (): Promise<void> => {
    const jwtToken = getCookie("token");
    const { results }: ProjectsResponse = await api.get(
      `/content/watchlist/projects`,
      {
        Authorization: `JWT ${jwtToken}`,
      }
    );
    setProjects(results);
  };

  return (
    <ProjectsContext.Provider value={{ projects, fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
export { ProjectsContext };
