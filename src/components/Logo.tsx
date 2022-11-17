import React, { type HTMLAttributes } from "react";
import Link from "next/link";

type Props = {
  className?: HTMLAttributes<HTMLHeadingElement>["className"];
};
const Logo = ({ className }: Props) => (
  <Link href="/">
    <span className="sr-only">ntornos</span>
    <h2
      className={`font-['Libre_Baskerville'] font-semibold tracking-tighter p-2 lg:pl-0 text-2xl sm:text-3xl ${className}`}
    >
      <span className="text-indigo-700">n</span>
      <span>tornos</span>
    </h2>
  </Link>
);

export default Logo;
