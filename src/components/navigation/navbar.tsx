import React from "react";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";
import LogoutIcon from "@/components/icons/logout";
import Image from "next/image";
import defaultAvatar from "../../../public/assets/images/user.png";
import Divider from "@/components/Divider";

// @TODO: Make logo its own component

const navigation = [
  { name: "Sell", href: "#" },
  { name: "Favorites", href: "#" },
  { name: "Agents", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Avatar({ avatarUrl }: { avatarUrl: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <Image
            className="inline-flex h-8 w-8 rounded-full overflow-hidden aspect-square bg-indigo-500 p-[2px]"
            src={avatarUrl || defaultAvatar}
            alt="Avatar"
            width={720}
            height={720}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "flex group items-center w-full px-4 py-2 text-sm text-gray-700 first:pt-3 last:pb-3"
                )}
                onClick={handleSignOut}
              >
                <span className="mr-2 h-5 w-5">
                  <LogoutIcon />
                </span>
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  const handleSignIn = () =>
    router.push(`/auth/sign-in?callbackUrl=${router.asPath}`);

  //@INFO: shadow for header -> bg-gradient-to-b from-black opacity-95

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
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
                  <Popover.Button className="inline-flex justify-center text-custom-white border rounded-md border-custom-white px-2 py-2 text-sm font-medium shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all">
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
                    className="text-base font-medium text-white px-3 py-2 hover:text-indigo-600 hover:bg-white hover:rounded-md"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            {/*right side desktop*/}
            <div className="hidden transition-opacity md:flex md:items-center md:space-x-2">
              {session ? (
                <>
                  <Link
                    href={"/dashboard"}
                    className="text-base font-medium text-white px-3 py-2 hover:text-indigo-600 hover:bg-white hover:rounded-md"
                  >
                    Dashboard
                  </Link>
                  <Avatar avatarUrl={session.user?.image || ""} />
                  {/*
                  <button
                    className="text-base font-medium text-white px-3 py-2 hover:text-indigo-600 hover:bg-white hover:rounded-md"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>*/}
                </>
              ) : (
                <button
                  className="text-base font-semibold leading-none p-3 border rounded-2xl hover:rounded-md transition-all duration-300 text-indigo-600 bg-white"
                  onClick={handleSignIn}
                >
                  Sign in
                </button>
              )}
            </div>
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
            className="absolute inset-x-0 top-0 z-10 origin-top transition md:hidden opacity-100 scale-100"
          >
            <div className="bg-custom-white rounded-md border border-zinc-300 shadow">
              <div className="flex items-center justify-between px-5 pt-4">
                {/*
                 */}
                <div>
                  <Link href="/">
                    <span className="sr-only">ntornos</span>
                    <h2 className="font-['Libre_Baskerville'] font-semibold tracking-tighter p-2 lg:pl-0 text-2xl sm:text-3xl">
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
                      <div className="flex items-end justify-between flex-wrap">
                        <div className="inline-flex items-center">
                          <div className="flex-shrink-0">
                            <Image
                              className={classNames(
                                session.user?.image ?? "p-[2px]",
                                "h-10 w-10 rounded-full overflow-hidden aspect-square bg-indigo-500"
                              )}
                              src={session.user?.image || defaultAvatar}
                              alt="Avatar"
                              width={720}
                              height={720}
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium">
                              {session.user?.name ??
                                session.user?.email?.split("@")[0]}
                            </div>
                            <div className="text-sm font-medium text-gray-400">
                              {session.user?.email}
                            </div>
                          </div>
                        </div>
                        <Link
                          href={"/dashboard"}
                          className="text-base mt-4 font-medium relative px-4 py-2 rounded-md hover:text-indigo-600 shadow-sm bg-custom-white hover:bg-white hover:rounded-md border border-gray-700"
                        >
                          Dashboard
                        </Link>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="block mt-4 text-start rounded-md pr-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-500"
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <p className="text-center text-base font-medium text-gray-400">
                      Existing customer?{" "}
                      <button
                        className="text-base font-semibold hover:rounded-md transition-all duration-300 text-indigo-600"
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
};

export default Navbar;
