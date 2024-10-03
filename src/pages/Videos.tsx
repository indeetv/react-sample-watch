import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import AppLayout from "../components/AppLayout";

export default function Videos() {
  const [filteredData, setfilteredData] = useState();
  const [searchParams] = useSearchParams();
  const { fetchProjectsVideos, selectedPrjVideos } =
    useContext(ProjectsContext);

  useEffect(() => {
    const prjKey = searchParams.get("project") as string;
    fetchProjectsVideos(prjKey);
  }, []);

  useEffect(() => {
    if (selectedPrjVideos) {
      const filter = selectedPrjVideos.map((item) => ({
        name: item.name,
        poster: item.poster,
        max_views: item.screening_details.max_views,
        views_consumed: item.screening_details.views_consumed,
        start_date: convertEpochToDate(item.screening_details.start_date),
        expiry_date: convertEpochToDate(item.screening_details.expiry_date),
        key:item.screening_details.screener_key
      }));
      setfilteredData(filter);
    }
  }, [selectedPrjVideos]);

  const convertEpochToDate = (epoch) => {
    return new Date(epoch * 1000).toLocaleString();
  };
// pageToRedirect='videos' queryNameToAdd='project'
  return <AppLayout tableData={filteredData} pageToRedirect="viewing_room" queryNameToAdd="screenerKey">Select Videos To Play</AppLayout>;
}
