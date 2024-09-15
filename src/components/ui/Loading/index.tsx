import React from "react";
import style from "./index.module.css";
import clsx from "clsx";

export const Loading: React.FC = () => {
  return <div className={clsx(style["circle-spin-4"])}></div>;
};
