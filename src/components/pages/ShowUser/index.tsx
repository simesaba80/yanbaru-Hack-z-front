import { Loading } from "@/components/ui/Loading";
import style from "./index.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ColorDisplay } from "@/components/ui/ColorDisplay";
import { useParams } from "next/navigation";

type UserColor = {
  id: number;
  color1: string;
  color2: string;
};

type UserData = {
  id: number;
  name: string;
};

export const ShowUser: React.FC = () => {
  const { id } = useParams();
  const [colorData, setColorData] = useState<UserColor | null>(null);
  const [yourColor, setYourColor] = useState<UserColor | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setColorData({
      id: 1,
      color1: "#ff0000",
      color2: "#0000ff",
    });
    setYourColor({
      id: 2,
      color1: "#ff0e0e",
      color2: "#0eeeaf",
    });
    setUserData({
      id: 1,
      name: "Semikoron",
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
    </>
  );
};
