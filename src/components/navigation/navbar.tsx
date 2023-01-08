import React from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";
import Divider from "@/components/newListingComponents/formComponents/Divider";
import { Avatar, UserPopover } from "../ui/Avatar";
import { trpc } from "@/utils/trpc";

const navigation = [
  { name: "Sell", href: "#" },
  { name: "Favorites", href: "#" },
  { name: "Agents", href: "#" },
];

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data } = trpc.user.me.useQuery(undefined, {
    enabled: status !== "loading" && status !== "unauthenticated",
  });

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  const handleSignIn = () =>
    router.push(`/auth/sign-in?callbackUrl=${router.asPath}`);

  return (
    <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8 ">
      <Popover as="header" className="relative">
        <div className="">
          <nav
            className="relative flex items-center justify-between"
            aria-label="Global"
          >
            <div className="flex flex-1 items-center">
              <div className="flex w-full items-center justify-between md:w-auto">
                <Logo className="text-custom-white" />
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="inline-flex justify-center rounded-md border border-custom-white px-2 py-2 text-sm font-medium text-custom-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      strokeWidth={2}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>
              {/*left menu items*/}
              <div className="hidden -space-x-1 md:ml-10 md:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-base font-medium text-white hover:rounded-md hover:bg-white hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            {/*right side desktop*/}
            {status !== "loading" ? (
              <div className="hidden transition-opacity md:flex md:items-center md:space-x-2">
                {status === "authenticated" ? (
                  <>
                    <Link
                      href={"/dashboard"}
                      className="px-3 py-2 text-base font-medium text-white hover:rounded-md hover:bg-white hover:text-indigo-600"
                    >
                      Dashboard
                    </Link>
                    <UserPopover />
                  </>
                ) : (
                  <button
                    className="rounded-2xl border bg-white p-3 text-base font-semibold leading-none text-indigo-600 transition-all duration-300 hover:rounded-md"
                    onClick={handleSignIn}
                  >
                    Sign in
                  </button>
                )}
              </div>
            ) : null}
          </nav>
        </div>

        {/* popover data*/}
        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top scale-100 opacity-100 transition md:hidden"
          >
            <div className="rounded-md border border-zinc-300 bg-custom-white shadow">
              <div className="flex items-center justify-between px-5 pt-4">
                {/*
                 */}
                <div>
                  <Link href="/">
                    <span className="sr-only">ntornos</span>
                    <h2 className="p-2 font-['Libre_Baskerville'] text-2xl font-semibold tracking-tighter sm:text-3xl lg:pl-0">
                      <span className="text-indigo-700">n</span>
                      <span>tornos</span>
                    </h2>
                  </Link>
                </div>

                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-custom-white p-2 text-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="pt-5 pb-6">
                <div className="flex flex-col space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <Divider />
                <div className="mt-6 px-5">
                  {/*
                  <Link
                    href="#"
                    className="block w-full rounded-md bg-indigo-600 py-3 px-4 text-center font-medium text-white shadow hover:bg-indigo-700"
                  >
                    Start free trial
                  </Link>
                */}
                  {session ? (
                    <div>
                      <div className="flex flex-wrap items-end justify-between">
                        {data ? (
                          <div className="inline-flex items-center">
                            <div className="flex-shrink-0">
                              <Avatar
                                user={data}
                                alt={`${data.name} avatar`}
                                size={12}
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-base font-medium">
                                {data.name ?? data.email?.split("@")[0]}
                              </div>
                              <div className="text-sm font-medium text-gray-400">
                                {data.email}
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <Link
                          href={"/dashboard"}
                          className="relative mt-4 rounded-md border border-gray-700 bg-custom-white px-4 py-2 text-base font-medium shadow-sm hover:rounded-md hover:bg-white hover:text-indigo-600"
                        >
                          Dashboard
                        </Link>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="mt-4 block rounded-md py-2 pr-3 text-start text-base font-medium text-gray-900 hover:text-indigo-500"
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <p className="text-center text-base font-medium text-gray-400">
                      Existing customer?{" "}
                      <button
                        className="text-base font-semibold text-indigo-600 transition-all duration-300 hover:rounded-md"
                        onClick={handleSignIn}
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
