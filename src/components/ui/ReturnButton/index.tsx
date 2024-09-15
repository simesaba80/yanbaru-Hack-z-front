import React from "react";
import style from "./index.module.css";
import clsx from "clsx";
import UndoIcon from "@mui/icons-material/Undo";

export const ReturnButton: React.FC = () => {
  const back = () => {
    window.history.back();
  };

  return (
    <button className={clsx(style["return-button"])} onClick={back}>
      <UndoIcon className={clsx(style["back-icon"])} />
      <h2>back</h2>
    </button>
  );
};
