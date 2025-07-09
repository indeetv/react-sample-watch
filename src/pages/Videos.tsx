import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import AppLayout from "../components/AppLayout";
import { VideoItem } from "../types/projects";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../store/Product";

export default function Videos() {
  const [filteredData, setFilteredData] = useState<VideoItem[]>([]);
  const {projects} = useContext(ProjectsContext)
  const {host} = useContext(ProductContext)
  const [searchParams] = useSearchParams();
  const {
    fetchProjectsVideos,
    selectedPrjVideos,
    getVideoDetails,
    nextVidoesUrl,
  } = useContext(ProjectsContext);
  const prjKey = searchParams.get("project") as string;
  const navigate = useNavigate();
  const [selectedPrjName, setSelectedPrjName] = useState<string>(() => {
    return sessionStorage.getItem('selectedProject') || "";
  });

  useEffect(() => {
    if(host){
      fetchProjectsVideos(prjKey);
      getSelectedPrjName()
    }
  }, [host]);

 const  getSelectedPrjName = () =>{
    if(projects){
      for(const prj of projects){
        if(prj.key ===prjKey )  {
          sessionStorage.setItem("selectedProject",prj.name)
          sessionStorage.setItem("selectedProjectId",prj.key);
          setSelectedPrjName(prj.name)
        }
      }
    }
  }
  useEffect(() => {
    if (selectedPrjVideos) {
      const filter = selectedPrjVideos.map((item: VideoItem) => ({
        name: item.name,
        poster: item.poster,
        max_views: item.screening_details.max_views,
        views_consumed: item.screening_details.views_consumed,
        start_date: convertEpochToDate(item.screening_details.start_date),
        expiry_date: convertEpochToDate(item.screening_details.expiry_date),
        expired: item.screening_details.expired,
        key: item.screening_details.screener_key,
        video_key: item.key,
      }));
      setFilteredData(filter);
    }
  }, [selectedPrjVideos]);

  const convertEpochToDate = (epoch: number): string =>
    new Date(epoch * 1000).toLocaleString();

  const handleButtonClick = (key: string | null, videoKey?: string) => {
    if (!key && videoKey) {
      /**
       * Means user has requested playback for the video for which screener key doesn't exsist
       * call video-detials api first to generate screener-key
       */
      generateScreenerKeyAndPlayback(prjKey, videoKey);
    }
  };

  const generateScreenerKeyAndPlayback = async (
    prjKey: string,
    videoKey: string
  ) => {
    const data = await getVideoDetails(prjKey, videoKey);
    const scrKey = data.screening_details.screener_key;
    navigate(`/viewing_room?screenerKey=${encodeURIComponent(scrKey)}&project=${encodeURIComponent(sessionStorage.getItem("selectedProjectId")!)}&video=${encodeURIComponent(videoKey)}`);
  };

  const handleShowMoreClicked = () =>
    fetchProjectsVideos(prjKey, nextVidoesUrl as string);

  return (
    <AppLayout
      tableData={filteredData}
      pageToRedirect="viewing_room"
      queryNameToAdd="screenerKey"
      onButtonClick={handleButtonClick}
      footerText={nextVidoesUrl && "Load More Videos..."}
      onShowMoreClicked={handleShowMoreClicked}
    >
      Selected Project : {selectedPrjName}
    </AppLayout>
  );
}
