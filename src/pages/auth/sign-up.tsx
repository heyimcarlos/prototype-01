import AuthForm from "@/components/AuthForm";
import DownArrowIcon from "@/components/icons/down-arrow";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React, { type HTMLAttributes, type ReactNode } from "react";
import { getServerSideProps, Logo } from "./sign-in";

export const Divider = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white px-2 text-gray-500">{children}</span>
    </div>
  </div>
);

export default function SignUpPage({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex min-h-screen items-center bg-gray-100 pb-16">
      <div className="max-w-7xl px-7 block w-auto lg:flex mx-auto">
        <div className="hidden lg:block w-full lg:w-1/2">
          <div className="mb-14 text-2xl md:text-5xl font-semibold text-gray-900">
            <Logo />
            <h2 className="mt-16 max-w-[450px]">
              It&apos;s time to join the
              <u className="text-indigo-500"> best real estate platform </u>
              in DR.
            </h2>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-32 ">
          <div className="border bg-white w-full max-w-md overflow-hidden rounded-md">
            <div className="px-3 py-4 sm:px-10">
              <div>
                <h2 className="mb-2 text-2xl font-semibold">
                  ntornos.com is free
                </h2>
                <p className="text-sm text-gray-400">
                  Create an account to start using ntornos.com for free to
                  individuals. Companies and agencies reach out to us.
                </p>
              </div>
              <Divider className="mt-4">
                <DownArrowIcon />
              </Divider>
              <div className="mt-4">
                {csrfToken && (
                  <AuthForm csrfToken={csrfToken} authType="sign-up" />
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-10 bg-zinc-50">
              <p className="text-xs leading-5 text-gray-500">
                By signing up, you agree to our{" "}
                <Link href="#" className="text-black">
                  Tems of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-black">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { getServerSideProps };
