"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { MicButton } from "@/components/ui/MicButton";
import { VoicePlayer } from "@/components/ui/VoicePlayer";
import { TextInput } from "@/components/ui/TextInput";
import { ReturnButton } from "@/components/ui/ReturnButton";

export const AccountSetting: React.FC = () => {
  const router = useRouter();
  const audioFileRef = useRef<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newpassword, setNewPassword] = useState<string>("");

  const submitData = async () => {
    alert("登録しました");
    router.push("/home");
  };

  useEffect(() => {
    console.log(audioFileRef);
  }, [audioFileRef]);

  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>アカウント情報設定</h1>
      </div>
      <div className={clsx(style["window-style"])}>
        <div className={clsx(style["input-wrapper"])}>
          <div>
            <h2>あなたのエイサーを録音しよう‼</h2>
            <div className={clsx(style["recorder-wrapper"])}>
              <VoicePlayer audioFile={audioFile} />
              <MicButton setAudioFile={setAudioFile} />
            </div>
          </div>

          <h1>ユーザーネーム変更</h1>

          <TextInput setValue={setName}>お名前</TextInput>
          <h1>パスワード変更</h1>
          <TextInput setValue={setCurrentPassword} type="password">
            現在のパスワード
          </TextInput>
          <TextInput setValue={setNewPassword} type="password">
            変更後のパスワード
          </TextInput>
        </div>

        <Button onClick={submitData}>変更</Button>
      </div>
      <ReturnButton />
    </>
  );
};
