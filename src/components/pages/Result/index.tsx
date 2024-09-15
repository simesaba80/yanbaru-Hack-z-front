import { Loading } from "@/components/ui/Loading";
import style from "./index.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ColorDisplay } from "@/components/ui/ColorDisplay";
import Link from "next/link";

type UserColor = {
  id: number;
  color1: string;
  color2: string;
};

const userColors: UserColor[] = [
  { id: 1, color1: "#FF5733", color2: "#33FF57" },
  { id: 2, color1: "#3357FF", color2: "#FF33A1" },
  { id: 3, color1: "#A133FF", color2: "#33FFF5" },
  { id: 4, color1: "#FF33D4", color2: "#33FF8A" },
  { id: 5, color1: "#FF8A33", color2: "#5733FF" },
  { id: 6, color1: "#33FFBD", color2: "#FF5733" },
  { id: 7, color1: "#5733FF", color2: "#33A1FF" },
  { id: 8, color1: "#FF33A1", color2: "#A133FF" },
  { id: 9, color1: "#33FFF5", color2: "#FF33D4" },
  { id: 10, color1: "#33FF8A", color2: "#FF8A33" },
];

export const Result: React.FC = () => {
  const [userColor, setUserColor] = useState<UserColor[]>(userColors);
  const [yourColor, setYourColor] = useState<UserColor | null>(null);

  useEffect(() => {
    setYourColor({
      id: 1,
      color1: "#ff0000",
      color2: "#0000ff",
    });
  }, []);

  return (
    <>
      {yourColor ? (
        <>
          <div className={clsx(style["title-wrapper"])}>
            <h1>お見合い</h1>
            <p>色が似ている人があなたのエイサーとピッタリです</p>
          </div>
          <div className={clsx(style["user-color-wrapper"])}>
            <p>あなたの色</p>
            <ColorDisplay color1={yourColor.color1} color2={yourColor.color2} />
          </div>
          <div className={clsx(style["window-style"])}>
            <div className={clsx(style["color-index-wrapper"])}>
              {userColor.map((color) => {
                return (
                  <div key={color.id}>
                    <Link href={`/result/${color.id}`}>
                      <ColorDisplay
                        color1={color.color1}
                        color2={color.color2}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loading />
          <h1 className={clsx(style["loading-message"])}>読み込み中</h1>
        </>
      )}
    </>
  );
};
