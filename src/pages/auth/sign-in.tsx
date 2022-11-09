import Link from "next/link";
import React, { useEffect, useState } from "react";
import GoogleIcon from "@/components/icons/google";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import _ from "lodash";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import WarningIcon from "@/components/icons/warning";

function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 ring-2 ring-transparent focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

const providers = [{ name: "google" }];

export default function SignInPage({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { query } = useRouter();
  const { error } = query;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      setErrorMessage(
        "Account linking is only available while signed in, please sign in with the provider you originally chose."
      );
    }
  }, [error]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return <h1>Already Sign in</h1>;
  }

  const handleOAuthSignIn = (provider: string) => signIn(provider);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    signIn("email", { email, redirect: false }).then((res) => {
      if (res?.ok) setIsEmailSent(true);
    });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#f3f4f6] py-12 sm:px-6 lg:px-8">
      <div className="mb-auto h-4 mx-auto">
        <Link href="/">
          <span className="sr-only">ntornos</span>
          <h1 className="font-['Libre_Baskerville']  ml-2 inline text-2xl md:text-3xl md:-ml-1">
            <span className="text-indigo-600">n</span>
            <span>tornos</span>
          </h1>
        </Link>
      </div>
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl text-neutral-900">Welcome back</h2>
      </div>
      <div className="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border mx-2 rounded-md border-gray-200 bg-white px-4 py-10 sm:px-10">
          {isEmailSent ? (
            <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-xl text-neutral-900">
                An email containing a magic link has been sent!
              </h2>
              <small>The magic link will expire after 10 minutes.</small>
              <button
                className="space-y-6 mt-4 inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5 rounded-md border border-transparent text-white bg-zinc-900 focus:outline-none focus:ring-offset-2 w-full justify-center"
                onClick={() => setIsEmailSent(false)}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="hidden"
                    hidden
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                </div>
                <div className="space-y-6">
                  <div className="space-y-6">
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      label="Email Address"
                      placeholder="foo.bar@example.com"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="space-y-6 inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5 rounded-md border border-transparent text-white bg-zinc-900 focus:outline-none focus:ring-offset-2 w-full justify-center"
                    type="submit"
                  >
                    Send email
                  </button>
                </div>
              </form>
              <hr className="my-8" />
              <div className="space-y-3">
                {error ? (
                  <div className="rounded-sm border border-opacity-20 p-3 border-red-900 bg-red-50 text-red-500">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <WarningIcon />
                      </div>
                      <div className="ml-3 flex-grow">
                        <h3 className="text-sm font-medium">{errorMessage}</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>map</div>
                )}
                {providers.map((p) => (
                  <button
                    onClick={() => handleOAuthSignIn(p.name)}
                    key={p.name}
                    className="inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5 rounded-md border border-gray-200 text-zinc-900 bg-white hover:bg-gray-100 w-full justify-center"
                  >
                    <GoogleIcon />
                    Sign in with {_.capitalize(p.name)}
                  </button>
                ))}
              </div>
            </>
          )}
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
