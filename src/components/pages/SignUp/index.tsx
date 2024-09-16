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

export const SignUp: React.FC = () => {
  const router = useRouter();
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
    await strageAudioFile();
    alert("登録しました");
    router.push("/home");
  };

  const strageAudioFile = async () => {
    const fileName = "hoge.ogg";
    const signedGcsUrl =
      "https://storage.googleapis.com/yanbaru-eisa-storage-bucket-prod/hoge.ogg?x-goog-signature=1ff37544d41c7750bcbe1e2a8a209a0f8f82f3d4ee115ac71e05190856130da9421e985b228fbbc8a436d036979919f99d2667754884e5d19d3b3e1da9a1da76011cc782ea6dd0ff52fc31643dcf9c7d1954de39c261ce499574d42cb702cbbe708a9cf7bf96fce0e706c26380225bc04b05ba59e786c7d2cb543cae50a1165f6c8ae2d001c657a35fa8cc7a0bf71e31ca866401eb5fe0a93b5449fa3490a6ef55901e66c561103ff8604c5f8de51c3d01d83cebd9cb15c991da6ae3a3452e67e957609d9a3f1fbbd2c794632198d2b44a92edcfb48a5d6ebc81c21650dd896094f4164dde269b77162718b629b2b4ab125aca661b145136e042760880b16ee7&x-goog-algorithm=GOOG4-RSA-SHA256&x-goog-credential=yanbaru-eisa-hoge-prod%40yanbaru-eisa.iam.gserviceaccount.com%2F20240915%2Fasia-northeast1%2Fstorage%2Fgoog4_request&x-goog-date=20240915T144219Z&x-goog-expires=86400&x-goog-signedheaders=content-type%3Bhost";
    if (audioFile) {
      const newFile = new File([audioFile], fileName, {
        type: audioFile.type,
        lastModified: audioFile.lastModified,
      });
      const data = await fetch(signedGcsUrl, {
        method: "PUT",
        body: newFile,
      });
      if (data.ok) {
        console.log("success");
        router.push("/home");
      } else {
        console.log("failed");
        alert("登録に失敗しました");
      }
    } else {
      console.log("no file");
      alert("エイサーの音声が見つかりません");
    }
  };

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
      <ReturnButton />
    </>
  );
};
