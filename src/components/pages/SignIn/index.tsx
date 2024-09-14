import React from "react";
import Link from "next/link";
import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { MicButton } from "@/components/ui/MicButton";

export const Signin: React.FC = () => {
  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>アカウント登録</h1>
      </div>
      <div className={clsx(style["window-style"])}>
        <div className={clsx(style["input-wrapper"])}></div>
        <Button>登録</Button>
        <MicButton />
      </div>
    </>
  );
};
