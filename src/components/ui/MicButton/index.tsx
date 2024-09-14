import React, { useEffect, useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import style from "./index.module.css";
import clsx from "clsx";

type ButtonProps = {
  setAudioFile: (file: File) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MicButton: React.FC<ButtonProps> = ({
  setAudioFile,
}: ButtonProps) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

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
        mineType: "audio/ogg",
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
          const blob = new Blob(chunksRef.current, {
            type: "audio/ogg",
          });
          const file = new File([blob], "voice.ogg", {
            type: "audio/ogg",
          });
          setAudioFile(file);
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
        className={clsx(style["mic-button-style"])}
        data-is-recording={isRecording}
        onClick={clickHandle}
      >
        <MicIcon className={clsx(style["mic-icon"])} />
      </button>
    </>
  );
};
