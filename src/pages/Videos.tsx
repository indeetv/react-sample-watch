import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import AppLayout from "../components/AppLayout";
import { VideoItem } from "../types/projects";
import { useNavigate } from "react-router-dom";

export default function Videos() {
  const [filteredData, setFilteredData] = useState<VideoItem[]>([]);
  const [searchParams] = useSearchParams();
  const {
    fetchProjectsVideos,
    selectedPrjVideos,
    getVideoDetails,
    nextVidoesUrl,
  } = useContext(ProjectsContext);
  const prjKey = searchParams.get("project") as string;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectsVideos(prjKey);
  }, []);

  useEffect(() => {
    if (selectedPrjVideos) {
      const filter = selectedPrjVideos.map((item: VideoItem) => ({
        name: item.name,
        poster: item.poster,
        max_views: item.screening_details.max_views,
        views_consumed: item.screening_details.views_consumed,
        start_date: convertEpochToDate(item.screening_details.start_date),
        expiry_date: convertEpochToDate(item.screening_details.expiry_date),
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
    const scrKey = await getVideoDetails(prjKey, videoKey);
    navigate(`/viewing_room?screenerKey=${encodeURIComponent(scrKey)}`);
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
      Selected Project : 2012
    </AppLayout>
  );
}
