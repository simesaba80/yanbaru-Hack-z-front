import style from "./index.module.css";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const Home: React.FC = () => {
  return (
    <>
      <div className={clsx(style["title-wrapper"])}>
        <h1>ホーム</h1>
      </div>
      <div className={clsx(style["button-wrapper"])}>
        <Link href="/result">
          <Button>お見合い</Button>
        </Link>
        <Link href="/account_setting">
          <Button>登録情報設定</Button>
        </Link>
      </div>
    </>
  );
};
