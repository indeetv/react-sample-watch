import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectsContext } from "../store/Projects";
import { endpoints } from "../utils/metaConfig";
import { getCookie } from "../utils/auth";
import { getClientID } from "../utils/api";

export default function ViewingRoom() {
  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  const apiKey =  import.meta.env.VITE_API_KEY || "";
  const [searchParams] = useSearchParams();
  const { playback } = useContext(ProjectsContext);
  const [screenerKey, setScreenerKey] = useState<string>();
  const [dataToEnablePlayback, setDataToEnablePlayback] = useState({
    apiUrl: "",
    embeddablePlayerInitializationUrl: "",
    embeddablePlayerTemplateURL: "",
    apiKey: apiKey,
  });

  // Function to load external scripts
  const loadScript = (url: string) => {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.body.appendChild(script);
    });
  };

  // Function to fetch and initialize the embeddable player
  const getEmbeddablePlayer = async (playbackData: any) => {
    try {
      const response = await fetch(
        dataToEnablePlayback.embeddablePlayerTemplateURL,
        {
          headers: {
            Authorization: `Bearer ${dataToEnablePlayback.apiKey}`,
            Clientid: getClientID(),
            "Content-Type": "application/html",
          },
        }
      );
      const embeddablePlayerHtml = await response.text();
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
    } catch (error) {
      console.error(
        "Error fetching or initializing the embeddable player:",
        error
      );
    }
  };

  // Function to fetch playback data
  const fetchPlaybackData = async () => {
    try {
      const token = getCookie("token");
      if (!dataToEnablePlayback.apiUrl) {
        throw new Error("Screener key is missing or invalid");
      }
      const response = await fetch(dataToEnablePlayback.apiUrl, {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          Clientid: getClientID(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stream_protocol: "dash" }),
      });
      const playbackData = await response.json();
      await getEmbeddablePlayer(playbackData);
    } catch (error) {
      console.error("Error fetching playback data:", error);
    }
  };

  const init = async () => {
    try {
      if (screenerKey) {
        dataToEnablePlayback.apiUrl = `${baseUrl}stream/${screenerKey}/playback`;
        dataToEnablePlayback.embeddablePlayerInitializationUrl = endpoints["watch.stream.player_function.retrieve"]
        dataToEnablePlayback.embeddablePlayerTemplateURL = endpoints["watch.stream.player_component.retrieve"]
        debugger
        await loadScript(
          dataToEnablePlayback.embeddablePlayerInitializationUrl
        );
        await fetchPlaybackData();
      }
    } catch (error) {
      console.error("Error initializing the player:", error);
    }
  };

  useEffect(() => {
    const screenerKey = searchParams.get("screenerKey") as string;
    setScreenerKey(screenerKey);
    // playback
    init();
  });
  return (
    <div id="main-container">
      <iframe id="video_player"></iframe>
    </div>
  );
}
