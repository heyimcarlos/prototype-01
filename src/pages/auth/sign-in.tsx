import Link from "next/link";
import React from "react";
import { getCsrfToken } from "next-auth/react";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import AuthForm from "@/components/AuthForm";

export const Logo = () => (
  <Link href="/">
    <span className="sr-only">ntornos</span>
    <h1 className="font-['Libre_Baskerville'] ml-2 md:-ml-1 inline text-2xl md:text-3xl ">
      <span className="text-indigo-600">n</span>
      <span>tornos</span>
    </h1>
  </Link>
);

export default function SignInPage({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#f3f4f6] py-12 sm:px-6 lg:px-8">
      <div className="mb-auto h-4 mx-auto">
        <Logo />
      </div>
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl text-neutral-900">Welcome back</h2>
      </div>
      <div className="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border mx-2 rounded-md border-gray-200 bg-white px-4 py-10 sm:px-10">
          {csrfToken && <AuthForm csrfToken={csrfToken} authType="sign-in" />}
        </div>
        <div className="mt-8 text-center text-sm text-neutral-600">
          <Link href="/auth/sign-up">Don&apos;t have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken,
    },
  };
}
