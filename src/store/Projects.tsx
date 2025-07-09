import React, { useState, createContext, useContext } from "react";
import { myFetch } from "../lib/myFetch";
import { getToken } from "../utils/auth";
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
import { GlobalContext } from "./Global";
import { ProductContext } from "./Product";

const ProjectsContext = createContext<ProjectsContextType>({
  projects: null,
  nextPrjUrl: null,
  nextVidoesUrl: null,
  selectedPrjVideos: null,
  fetchProjects: async () => {},
  fetchProjectsVideos: async () => {},
  getVideoDetails: (prjKey: string, videoKey: string) => Promise<VideoDetails>,
  playback: async () => {},
});

const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
  const api = new myFetch();
  const { setLoadingState, setPaginatorLoadingState } =
    useContext(GlobalContext);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const { endpoints } = useContext(ProductContext);
  const [nextPrjUrl, setNextPrjUrl] = useState<string | null>(null);
  const [nextVidoesUrl, setNextVidoesUrl] = useState<string | null>(null);
  const [selectedPrjVideos, setSelectedPrjVideos] = useState<Video[] | null>(
    null
  );

  const fetchProjects = async (
    brandKey: string,
    nextUrl?: string
  ): Promise<void> => {
    const jwtToken = getToken("token");
    const endpoint =
      nextUrl ?? `${endpoints["watch.content.project.list"]}?brand=${brandKey}`;
    const isFullUrl = nextUrl ? true : false;
    if (nextUrl) setPaginatorLoadingState(true);
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
    setPaginatorLoadingState(false);
  };

  const fetchProjectsVideos = async (
    prjKey: string,
    nextUrl?: string
  ): Promise<void> => {
    const jwtToken = getToken("token");
    const endpoint =
      nextUrl ??
      `${endpoints["watch.content.videos.list"].replace(
        "<str:project_key>",
        prjKey
      )}`;
    if (nextUrl) setPaginatorLoadingState(true);
    const isFullUrl = nextUrl ? true : false;
    setLoadingState(true);

    const { results, next } = await api.get<VideosResponse>(
      endpoint,
      {
        Authorization: `JWT ${jwtToken}`,
      } as HeadersInit,
      isFullUrl
    );

    if (nextUrl) {
      setSelectedPrjVideos((prevVideos) =>
        prevVideos ? [...prevVideos, ...results] : results
      );
    } else setSelectedPrjVideos(results);
    setNextVidoesUrl(next);
    setPaginatorLoadingState(false);
    setLoadingState(false);
  };

  const playback = async (screenerKey: string): Promise<void> => {
    const jwtToken = getToken("token");
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
  ): Promise<VideoDetails> => {
    setLoadingState(true);
    const jwtToken = getToken("token");
    
    const response = await api.get<VideoDetails>(
      endpoints["watch.content.video.retrieve"]
        .replace("<str:project_key>", prjKey)
        .replace("<str:video_key>", videoKey),
      {
        Authorization: `JWT ${jwtToken}`,
      }
    );
    setLoadingState(false);

    return response;
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
        nextVidoesUrl,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
export { ProjectsContext };