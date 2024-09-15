"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { MicButton } from "@/components/ui/MicButton";
import { VoicePlayer } from "@/components/ui/VoicePlayer";
import { TextInput } from "@/components/ui/TextInput";

export const SignUp: React.FC = () => {
  const router = useRouter();
  const audioFileRef = useRef<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nameIsIncorrect, setnameIsIncorrect] = useState<boolean>(false);
  const [emailIsIncorrect, setEmailIsIncorrect] = useState<boolean>(false);
  const [isIncorrectPassword, setIsIncorrectPassword] =
    useState<boolean>(false);
  let nameIsEmpty = false;
  let emailIsEmpty = false;
  let incorrectPassword = false;

  const checkPassward = () => {
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        incorrectPassword = true;
        setIsIncorrectPassword(true);
      } else {
        incorrectPassword = false;
        setIsIncorrectPassword(false);
      }
    } else {
      incorrectPassword = true;
      setIsIncorrectPassword(true);
    }
  };

  const isNameEmpty = () => {
    if (name === "") {
      nameIsEmpty = true;
      setnameIsIncorrect(true);
    } else {
      nameIsEmpty = false;
      setnameIsIncorrect(false);
    }
  };

  const isEmailEmpty = () => {
    if (email === "") {
      emailIsEmpty = true;
      setEmailIsIncorrect(true);
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        emailIsEmpty = true;
        setEmailIsIncorrect(true);
      } else {
        emailIsEmpty = false;
        setEmailIsIncorrect(false);
      }
    }
  };

  const submitData = async () => {
    isNameEmpty();
    isEmailEmpty();
    checkPassward();
    if (nameIsEmpty || emailIsEmpty || incorrectPassword) {
      alert("入力内容に誤りがあります");
      return;
    }
    if (!audioFile) {
      alert("エイサーを録音してください");
      return;
    }
    alert("登録しました");
    router.push("/home");
  };

  useEffect(() => {
    console.log(audioFileRef);
  }, [audioFileRef]);
  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>アカウント登録</h1>
      </div>
      <div className={clsx(style["window-style"])}>
        <div className={clsx(style["input-wrapper"])}>
          <TextInput
            setValue={setName}
            onBlur={isNameEmpty}
            isIncorrect={nameIsIncorrect}
          >
            お名前
          </TextInput>
          <TextInput
            setValue={setEmail}
            onBlur={isEmailEmpty}
            isIncorrect={emailIsIncorrect}
          >
            メールアドレス
          </TextInput>
          <TextInput
            setValue={setPassword}
            type="password"
            onBlur={checkPassward}
            isIncorrect={isIncorrectPassword}
          >
            パスワード
          </TextInput>
          <TextInput
            setValue={setConfirmPassword}
            type="password"
            onBlur={checkPassward}
            isIncorrect={isIncorrectPassword}
          >
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

        <Button onClick={submitData}>登録</Button>
      </div>
    </>
  );
};
