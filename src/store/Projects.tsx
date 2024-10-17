import React, { useState, createContext, useContext } from "react";
import { myFetch } from "../lib/myFetch";
import { getCookie } from "../utils/auth";
import {
  ProjectsContextType,
  ProjectsProviderProps,
  ProjectsResponse,
  Project,
  VideosResponse,
  Video,
  VideoDetails,
  ApiResponse,
} from "../types/projects";
import { GlobalContext } from "./global";

const ProjectsContext = createContext<ProjectsContextType>({
  projects: null,
  nextPrjUrl: null,
  nextVidoesUrl:null,
  selectedPrjVideos: null,
  fetchProjects: async () => {},
  fetchProjectsVideos: async () => {},
  getVideoDetails: (prjKey: string, videoKey: string) => Promise<string>,
  playback: async () => {},
});

const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const api = new myFetch();
  const { setLoadingState } = useContext(GlobalContext);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [nextPrjUrl, setNextPrjUrl] = useState<string | null>(null);
  const [nextVidoesUrl, setNextVidoesUrl] = useState<string | null>(null);
  const [selectedPrjVideos, setSelectedPrjVideos] = useState<Video[] | null>(
    null
  );

  const fetchProjects = async (
    brandKey: string,
    nextUrl?: string
  ): Promise<void> => {
    const jwtToken = getCookie("token");
    const endpoint = nextUrl ?? `content/projects?brand=${brandKey}`;
    const isFullUrl = nextUrl ? true : false;

    setLoadingState(true);
    const { results, count, next }: ProjectsResponse = await api.get(
      endpoint,
      {
        Authorization: `JWT ${jwtToken}`,
      },
      isFullUrl
    );

    if (nextUrl) {
      setProjects((prevProjects) =>
        prevProjects ? [...prevProjects, ...results] : results
      );
    } else setProjects(results);
    setNextPrjUrl(next);
    setLoadingState(false);
  };

  const fetchProjectsVideos = async (
    prjKey: string,
    nextUrl?: string
  ): Promise<void> => {
    const jwtToken = getCookie("token");
    const endpoint = nextUrl ?? `content/projects/${prjKey}/videos`;

    setLoadingState(true);
    const { results,next } = await api.get<VideosResponse>(endpoint, {
      Authorization: `JWT ${jwtToken}`,
    } as HeadersInit);
    if (nextUrl) {
      setSelectedPrjVideos((prevVideos) =>
        prevVideos ? [...prevVideos, ...results] : results
      );
    } else setSelectedPrjVideos(results);
    setNextVidoesUrl(next)
    debugger
    setLoadingState(false);
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

  const getVideoDetails = async (
    prjKey: string,
    videoKey: string
  ): Promise<string> => {
    setLoadingState(true);
    const jwtToken = getCookie("token");
    const response = await api.get<ApiResponse<VideoDetails>>(
      `content/projects/${prjKey}/videos/${videoKey}`,
      {
        Authorization: `JWT ${jwtToken}`,
      }
    );
    setLoadingState(false);
    return response.screening_details.screener_key;
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        fetchProjects,
        fetchProjectsVideos,
        getVideoDetails,
        selectedPrjVideos,
        playback,
        nextPrjUrl,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
export { ProjectsContext };
