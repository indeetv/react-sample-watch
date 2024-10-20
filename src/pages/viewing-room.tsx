import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { metaEndPoints } from "../utils/metaConfig";
import { getToken } from "../utils/auth";
import { PlaybackData } from "../types/playback";
import { myFetch } from "../lib/myFetch";
import { ProductContext } from "../store/Product";

export default function ViewingRoom() {
  const api = new myFetch();
  const [searchParams] = useSearchParams();
  const [screenerKey, setScreenerKey] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { host, endpoints } = useContext(ProductContext);
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
  });
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
