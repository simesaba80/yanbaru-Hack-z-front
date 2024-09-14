import { useEffect, useRef, useState } from "react";
import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { MicButton } from "@/components/ui/MicButton";
import { VoicePlayer } from "@/components/ui/VoicePlayer";

export const SignUp: React.FC = () => {
  const audioFileRef = useRef<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(audioFileRef.current);
  }, [audioFileRef.current]);
  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>アカウント登録</h1>
      </div>
      <div className={clsx(style["window-style"])}>
        <div className={clsx(style["input-wrapper"])}></div>
        <Button>登録</Button>
        <div className={clsx(style["recorder-wrapper"])}>
          <VoicePlayer audioFile={audioFile} />
          <MicButton setAudioFile={setAudioFile} />
        </div>
      </div>
    </>
  );
};
