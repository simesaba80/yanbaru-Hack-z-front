import React from "react";
import style from "./index.module.css";
import clsx from "clsx";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  buttonShape?: "ends-round" | "square";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  buttonShape = "ends-round",
  ...props
}) => {
  return (
    <button
      className={clsx(style["button-style"], className)}
      data-shape={buttonShape}
      {...props}
    >
      {children}
    </button>
  );
};
