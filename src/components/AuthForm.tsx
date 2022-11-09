import React, { useState } from "react";
import _ from "lodash";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "./icons/google";
import WarningIcon from "./icons/warning";
import { Divider } from "@/pages/auth/sign-up";

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

const ErrorCard = ({ message }: { message: string }) => (
  <div className="rounded-sm border border-opacity-20 p-3 border-red-900 bg-red-50 text-red-500">
    <div className="flex">
      <div className="flex-shrink-0">
        <WarningIcon />
      </div>
      <div className="ml-3 flex-grow">
        <h3 className="text-sm font-medium">{message}</h3>
      </div>
    </div>
  </div>
);
type Props = {
  csrfToken: string;
  authType: "sign-in" | "sign-up";
};

const providers = [{ name: "google" }];

const AuthForm = ({ csrfToken, authType }: Props) => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { query } = useRouter();
  const { error } = query;
  const whichAuth = authType.replace("-", " ");

  const getError = (error: string) => {
    switch (error) {
      case "OAuthAccountNotLinked":
        return `Account linking is only available while signed in, please ${whichAuth} with the provider you originally chose.`;
      default:
        return "";
    }
  };

  const handleOAuthSignIn = (provider: string) => signIn(provider);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    signIn("email", { email, redirect: false }).then((res) => {
      if (res?.ok) setIsEmailSent(true);
    });
  };

  if (isEmailSent) {
    return (
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
    );
  }

  return (
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
      <Divider className="mt-6">
        OR <span className="uppercase">{whichAuth}</span> WITH
      </Divider>
      <div className="space-y-3 mt-4">
        {typeof error === "string" && <ErrorCard message={getError(error)} />}
        {providers.map((p) => (
          <button
            onClick={() => handleOAuthSignIn(p.name)}
            key={p.name}
            className="inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5 rounded-md border border-gray-200 text-zinc-900 bg-white hover:bg-gray-100 w-full justify-center"
          >
            <GoogleIcon />
            {_.capitalize(whichAuth)} with {_.capitalize(p.name)}
          </button>
        ))}
      </div>
    </>
  );
};

export default AuthForm;
