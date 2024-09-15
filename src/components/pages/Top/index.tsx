import React from "react";
import Link from "next/link";
import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { ColorDisplay } from "@/components/ui/ColorDisplay";

export const Top: React.FC = () => {
  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>Omiai Eisa</h1>
        <p>~ えいさーで見つかるピッタリな相手 ~</p>
      </div>
      <div className={clsx(style["button-wrapper"])}>
        <Link href="/sign_up">
          <Button buttonShape="square">Sign Up</Button>
        </Link>
        <Link href="/sign_in">
          <Button buttonShape="square">Sign In</Button>
        </Link>
      </div>
    </>
  );
};
