import React, { useState, createContext } from "react";
import { myFetch } from "../lib/myFetch";
import { getCookie } from "../utils/auth";
import {
  ProjectsContextType,
  ProjectsProviderProps,
  ProjectsResponse,
  Project,
  VideosResponse,
  Video,
} from "../types/projects";

const ProjectsContext = createContext<ProjectsContextType>({
  projects: null,
  selectedPrjVideos: null,
  fetchProjects: () => {},
  fetchProjectsVideos: () => {},
  playback: () => {},
});

const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const api = new myFetch();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedPrjVideos, setSelectedPrjVideos] = useState<Video[] | null>(
    null
  );

  const fetchProjects = async (brandKey: string): Promise<void> => {
    const jwtToken = getCookie("token");
    const { results }: ProjectsResponse = await api.get(
      `content/projects?brand=${brandKey}`,
      {
        Authorization: `JWT ${jwtToken}`,
      }
    );
    setProjects(results);
  };

  const fetchProjectsVideos = async (prjKey: string): Promise<void> => {
    const jwtToken = getCookie("token");

    const response = await api.get<VideosResponse>(
      `content/projects/${prjKey}/videos`,
      {
        Authorization: `JWT ${jwtToken}`,
      } as HeadersInit
    );

    const { results } = response;
    setSelectedPrjVideos(results);
  };

  const playback = async (screenerKey: string): Promise<void> => {
    const jwtToken = getCookie("token");
    await api.post(
      `stream/${screenerKey}/playback`,
      {
        stream_protocol: "dash",
      },
      {
        Authorization: `JWT ${jwtToken}`,
      }
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        fetchProjects,
        fetchProjectsVideos,
        selectedPrjVideos,
        playback,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
export { ProjectsContext };
