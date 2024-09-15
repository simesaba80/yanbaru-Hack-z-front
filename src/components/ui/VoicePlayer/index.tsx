import clsx from "clsx";
import style from "./index.module.css";
import { useEffect, useRef } from "react";

type VoicePlayerProps = {
  audioFile: File | null;
};

export const VoicePlayer: React.FC<VoicePlayerProps> = ({
  audioFile,
}: VoicePlayerProps) => {
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioElementRef.current = document.getElementById(
      "audio"
    ) as HTMLAudioElement;
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      audioElementRef.current!.src = url;
      audioElementRef.current.style.display = "block";
    } else {
      audioElementRef.current.style.display = "none";
    }
  }, [audioFile]);
  return (
    <>
      <audio
        id="audio"
        controls
        className={clsx(style["voice-player"])}
      ></audio>
    </>
  );
};
