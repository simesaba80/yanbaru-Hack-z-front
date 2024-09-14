import React from "react";
import style from "./index.module.css";
import clsx from "clsx";

type TextInputProps = {
  children: React.ReactNode;
  setValue: (string: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput: React.FC<TextInputProps> = ({
  children,
  setValue,
  ...props
}) => {
  return (
    <>
      <div>
        <h2>{children}</h2>
        <span className={clsx(style["input-wrapper"])}>
          <input
            className={clsx(style["input-style"])}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            {...props}
          />
        </span>
      </div>
    </>
  );
};
