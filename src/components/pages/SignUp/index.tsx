import { useEffect, useRef, useState } from "react";
import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { MicButton } from "@/components/ui/MicButton";
import { VoicePlayer } from "@/components/ui/VoicePlayer";
import { TextInput } from "@/components/ui/TextInput";

export const SignUp: React.FC = () => {
  const audioFileRef = useRef<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    console.log(audioFileRef.current);
  }, [audioFileRef.current]);
  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>アカウント登録</h1>
      </div>
      <div className={clsx(style["window-style"])}>
        <div className={clsx(style["input-wrapper"])}>
          <TextInput setValue={setName}>お名前</TextInput>
          <TextInput setValue={setEmail}>メールアドレス</TextInput>
          <TextInput setValue={setPassword} type="password">
            パスワード
          </TextInput>
          <TextInput setValue={setConfirmPassword} type="password">
            確認用パスワード
          </TextInput>
          <div>
            <h2>あなたのエイサーを録音しよう‼</h2>
            <div className={clsx(style["recorder-wrapper"])}>
              <VoicePlayer audioFile={audioFile} />
              <MicButton setAudioFile={setAudioFile} />
            </div>
          </div>
        </div>

        <Button>登録</Button>
      </div>
    </>
  );
};
