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
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setColorData({
      id: 1,
      color1: "#ff0000",
      color2: "#0000ff",
    });
    setUserData({
      id: 1,
      name: "Semikoron",
    });
  }, [id]);

  return (
    <>
      {colorData && userData ? (
        <>
          <div className={clsx(style["title-wrapper"])}>
            <h1>お見合い</h1>
            <p>色が似ている人があなたのエイサーとピッタリです</p>
          </div>

          <div className={clsx(style["window-style"])}>
            <p>{userData.name}の色</p>
            <ColorDisplay color1={colorData.color1} color2={colorData.color2} />
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
