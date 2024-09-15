import React from "react";
import style from "./index.module.css";
import clsx from "clsx";

type ColorDisplayProps = {
  color1: string;
  color2: string;
};

export const ColorDisplay: React.FC<ColorDisplayProps> = ({
  color1,
  color2,
}: ColorDisplayProps) => {
  return (
    <div
      className={clsx(style["color-style"])}
      style={{
        background: `linear-gradient(45deg, ${color1}, ${color2})`,
      }}
    ></div>
  );
};
