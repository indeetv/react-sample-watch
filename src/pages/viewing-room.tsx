import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { metaEndPoints } from "../utils/metaConfig";
import { getToken } from "../utils/auth";
import { PlaybackData } from "../types/playback";
import { myFetch } from "../lib/myFetch";
import { ProductContext } from "../store/Product";
import { ProjectsContext } from "../store/Projects";

export default function ViewingRoom() {
  const api = new myFetch();
  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  const [searchParams] = useSearchParams();
  const [screenerKey, setScreenerKey] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { host, endpoints } = useContext(ProductContext);
  const [dataToEnablePlayback, setDataToEnablePlayback] = useState({
    apiUrl: "",
    embeddablePlayerInitializationUrl: "",
    embeddablePlayerTemplateURL: "",
  });
  const {getVideoDetails} = useContext(ProjectsContext);
  const projectKey = searchParams.get("project") as string;
  const videoKey = searchParams.get("video") as string;

  const loadScript = (url: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.body.appendChild(script);
    });
  };

  const getEmbeddablePlayer = async (
    playbackData: PlaybackData
  ): Promise<void> => {
    const response = await api.get(
      dataToEnablePlayback.embeddablePlayerTemplateURL,
      null,
      true
    );
    const embeddablePlayerHtml = response;

    const currentSelectedVideo = await getVideoDetails(projectKey, videoKey);

    if (window?.initializeIndeePlayer) {
      window.initializeIndeePlayer(
        "video_player",
        {
          playbackSourcesData: {
            drm: playbackData.drm,
            manifest: playbackData.manifest,
            defaultSubtitle: currentSelectedVideo?.subtitles[0]?.label || ''
          },
          playbackMode: "dash",
          overlayWatermarkDetails: currentSelectedVideo?.overlay_watermark_details,
          savePlayerPreferences: true,
          resumeDetails: {
            from_second: currentSelectedVideo?.resume_playback?.from_second || 0,
            duration_in_sec: currentSelectedVideo?.duration_in_sec
          },
          engagementData: {
            push_interval: playbackData.engagement.push_interval,
            endpointUrl: baseUrl+endpoints['watch.stream.view_engagement.record'] + '?'
          }
        },
        embeddablePlayerHtml,
        currentSelectedVideo?.key,
        { autoPlay: true }
      );
    }
  };

  const fetchPlaybackData = async () => {
    try {
      const token = getToken("token");
      if (!dataToEnablePlayback.apiUrl) {
        throw new Error("Screener key is missing or invalid");
      }
      const response = await api.post(
        dataToEnablePlayback.apiUrl,
        { stream_protocol: "dash" },
        {
          Authorization: `JWT ${token}`,
        },
        false
      );
      const playbackData = response as PlaybackData;
      await getEmbeddablePlayer(playbackData);
    } catch (error) {
      const match = error.message.match(/"detail":"(.*?)"/);
      const statusMessage = match ? match[1] : "Playback failed";
      setErrorMsg(statusMessage);
      return;
    }
  };

  const init = async () => {
    if (screenerKey) {
      dataToEnablePlayback.apiUrl = `${endpoints[
        "watch.stream.session.playback"
      ].replace("<str:screener_key>", screenerKey)}`;
      dataToEnablePlayback.embeddablePlayerInitializationUrl =
        `${host}${metaEndPoints["watch.stream.player_function.retrieve"]}`;
      dataToEnablePlayback.embeddablePlayerTemplateURL =
        `${host}${metaEndPoints["watch.stream.player_component.retrieve"]}`;
      await loadScript(dataToEnablePlayback.embeddablePlayerInitializationUrl);
      await fetchPlaybackData();
    }
  };

  useEffect(() => {
    if(host){
      const screenerKey = searchParams.get("screenerKey") as string;
      setScreenerKey(screenerKey);
      init();
    }
  },[host, screenerKey]);
  return (
    <>
      {errorMsg && (
        <div className="h-screen grid place-items-center">{errorMsg}</div>
      )}
      <div id="main-container" className="h-[100vh]">
        <iframe id="video_player" className="w-full h-full"></iframe>
      </div>
    </>
  );
}
