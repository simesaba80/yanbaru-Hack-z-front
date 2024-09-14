import React, { useEffect, useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import style from "./index.module.css";
import clsx from "clsx";

type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MicButton: React.FC<ButtonProps> = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    // 初期レンダリング時に audio タグを取得
    audioElementRef.current = document.getElementById(
      "audio"
    ) as HTMLAudioElement;
  }, []);

  const voiceRecodeStart = () => {
    chunksRef.current = [];
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log("Recording started");
    }
  };

  const voiceRecodeStop = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Recording stopped");
    }
  };

  const recorderInit = async () => {
    if (navigator.mediaDevices.getUserMedia && !mediaRecorderRef.current) {
      const constraints = {
        audio: true,
        video: false,
        mineType: "audio/webm; codecs=opus",
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          // 録音データを audio タグにセット
          chunksRef.current.push(e.data);
          const blob = new Blob(chunksRef.current, {
            type: "audio/webm; codecs=opus",
          });
          const url = URL.createObjectURL(blob);
          audioElementRef.current!.src = url;
        };
        voiceRecodeStart();
      } catch (error) {
        console.log("Mic error:", error);
      }
    }
  };

  const clickHandle = () => {
    if (mediaRecorderRef.current) {
      if (isRecording) {
        voiceRecodeStop();
      } else {
        voiceRecodeStart();
      }
    } else {
      recorderInit();
    }
  };

  return (
    <>
      <button
        className={clsx(style["mic-button-style"], {
          [style["recording"]]: isRecording,
        })}
        onClick={clickHandle}
      >
        <MicIcon className={clsx(style["mic-icon"])} />
      </button>
      <figure>
        <audio controls id="audio"></audio>
      </figure>
    </>
  );
};
