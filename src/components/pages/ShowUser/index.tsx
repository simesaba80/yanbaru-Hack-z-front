import { Loading } from "@/components/ui/Loading";
import style from "./index.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ColorDisplay } from "@/components/ui/ColorDisplay";
import { useParams } from "next/navigation";
import { ReturnButton } from "@/components/ui/ReturnButton";

type UserColor = {
  id: number;
  color1: string;
  color2: string;
};

type UserData = {
  id: number;
  name: string;
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

export const ShowUser: React.FC = () => {
  const { id } = useParams();
  const [colorData, setColorData] = useState<UserColor | null>(null);
  const [yourColor, setYourColor] = useState<UserColor | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setColorData({
      id: id as number,
      color1: userColors[(id as number) - 1].color1,
      color2: userColors[(id as number) - 1].color2,
    });
    setYourColor({
      id: 2,
      color1: "#ff0000",
      color2: "#0000ff",
    });
    setUserData({
      id: 1,
      name: `Test User${id}`,
    });
  }, [id]);

  return (
    <>
      {colorData && userData && yourColor ? (
        <>
          <div className={clsx(style["title-wrapper"])}>
            <h1>{userData.name}のページ</h1>
          </div>

          <div className={clsx(style["window-style"])}>
            <div className={clsx(style["your-color"])}>
              <ColorDisplay
                color1={yourColor.color1}
                color2={yourColor.color2}
              />
              <h2>あなたの色</h2>
            </div>

            <div className={clsx(style["user-color"])}>
              <ColorDisplay
                color1={colorData.color1}
                color2={colorData.color2}
              />
              <h2>{userData.name}の色</h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <Loading />
          <h1 className={clsx(style["loading-message"])}>読み込み中</h1>
        </>
      )}
      <ReturnButton />
    </>
  );
};
