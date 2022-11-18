import classNames from "@/lib/classNames";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

const Button = ({ children, ...otherProps }: Props) => {
  return (
    <button
      {...otherProps}
      className={classNames(
        otherProps.disabled
          ? "bg-slate-500"
          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
        "inline-flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2"
      )}
    >
      {children ? children : "Submit"}
    </button>
  );
};

export default Button;
