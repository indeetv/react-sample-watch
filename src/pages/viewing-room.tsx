import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import { endpoints } from "../utils/metaConfig";
import { getCookie } from "../utils/auth";
import { PlaybackData } from "../types/playback";
import { myFetch } from "../lib/myFetch";

export default function ViewingRoom() {
  const api = new myFetch();
  const [searchParams] = useSearchParams();
  const { playback } = useContext(ProjectsContext);
  const [screenerKey, setScreenerKey] = useState<string>();
  const [dataToEnablePlayback, setDataToEnablePlayback] = useState({
    apiUrl: "",
    embeddablePlayerInitializationUrl: "",
    embeddablePlayerTemplateURL: "",
  });

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
    if (window?.initializeIndeePlayer) {
      window.initializeIndeePlayer(
        "video_player",
        {
          playbackSourcesData: {
            drm: playbackData.drm,
            manifest: playbackData.manifest,
          },
          playbackMode: "dash",
          overlayWatermarkDetails: {},
          engagementInterval: { ...playbackData.engagement },
        },
        embeddablePlayerHtml,
        "video_key",
        { autoPlay: true }
      );
    }
  };

  const fetchPlaybackData = async () => {
    const token = getCookie("token");
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
    const playbackData = response;
    await getEmbeddablePlayer(playbackData);
  };

  const init = async () => {
    if (screenerKey) {
      dataToEnablePlayback.apiUrl = `stream/${screenerKey}/playback`;
      dataToEnablePlayback.embeddablePlayerInitializationUrl =
        endpoints["watch.stream.player_function.retrieve"];
      dataToEnablePlayback.embeddablePlayerTemplateURL =
        endpoints["watch.stream.player_component.retrieve"];
      await loadScript(dataToEnablePlayback.embeddablePlayerInitializationUrl);
      await fetchPlaybackData();
    }
  };

  useEffect(() => {
    const screenerKey = searchParams.get("screenerKey") as string;
    setScreenerKey(screenerKey);
    init();
  });
  return (
    <div id="main-container" className="h-[100vh]">
      <iframe id="video_player" className="w-full h-full"></iframe>
    </div>
  );
}
