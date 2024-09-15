import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { ReturnButton } from "@/components/ui/ReturnButton";

export const SignIn: React.FC = () => {
  const router = useRouter();
  const audioFileRef = useRef<File | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailIsIncorrect, setEmailIsIncorrect] = useState<boolean>(false);
  const [passwordIsIncorrect, setPasswordIsIncorrect] =
    useState<boolean>(false);

  let nameIsEmpty = false;
  let emailIsEmpty = false;
  let incorrectPassword = false;

  const checkPassward = () => {
    if (password !== "") {
      incorrectPassword = false;
      setPasswordIsIncorrect(false);
    } else {
      incorrectPassword = true;
      setPasswordIsIncorrect(true);
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
    isEmailEmpty();
    checkPassward();
    if (nameIsEmpty || emailIsEmpty || incorrectPassword) {
      alert("入力内容に誤りがあります");
      return;
    }
    alert("サインインしました");
    router.push("/home");
  };

  useEffect(() => {
    console.log(audioFileRef.current);
  }, [audioFileRef.current]);
  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>サインイン</h1>
      </div>
      <div className={clsx(style["window-style"])}>
        <div className={clsx(style["input-wrapper"])}>
          <TextInput
            setValue={setEmail}
            isIncorrect={emailIsIncorrect}
            onBlur={isEmailEmpty}
          >
            メールアドレス
          </TextInput>
          <TextInput
            setValue={setPassword}
            isIncorrect={passwordIsIncorrect}
            onBlur={checkPassward}
          >
            パスワード
          </TextInput>
        </div>
        <Button onClick={submitData}>サインイン</Button>
      </div>
      <ReturnButton />
    </>
  );
};
