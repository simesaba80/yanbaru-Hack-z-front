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
      "https://storage.googleapis.com/yanbaru-eisa-storage-bucket-prod/test.ogg?x-goog-signature=168dc009152147b8306fe69a0938e4b7da7acb184dc3d0161488d29ed96c359dbbc4066a36690b83b0a185cef430700313b8e3586186abfb635eef4cd40c3009d560514ea3302a4175f39fee7cd7e0a3bd9ec3bdd4676d059d86f1811c9bcf55fdefd67e1617da5d8fdcf9445e752a247160e2fcb70e25d470619b7eeeabee954f40973ed8f959ddc06bd83ea26aa4c77c05dcd4402fc6b2fdefc0f0b905235c6185f03b861af1162f6ae29b5e9ecbf55410a4f984b69234b042b56ecd91a737ea0a34a46d348343a9d9c0da6d315fe8b50d99c3ee36c235e57c488537740fa370b47fee21c2caa82f29064abb1e58034ddae3ca28113dba82520bf2a0a72ee8&x-goog-algorithm=GOOG4-RSA-SHA256&x-goog-credential=yanbaru-eisa-hoge-prod%40yanbaru-eisa.iam.gserviceaccount.com%2F20240915%2Fasia-northeast1%2Fstorage%2Fgoog4_request&x-goog-date=20240915T081840Z&x-goog-expires=3600&x-goog-signedheaders=content-type%3Bhost";
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
    </>
  );
};
