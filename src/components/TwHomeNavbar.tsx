import React, { ButtonHTMLAttributes } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
const navigation = [
  { name: "Sell", href: "#" },
  { name: "Favorites", href: "#" },
  { name: "Agents", href: "#" },
  { name: "Dashboard", href: "#" },
];

function AuthButton({
  children,
  ...props
}: { children: React.ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  props.onClick;
  return (
    <button
      {...props}
      className="text-base font-medium text-white px-3 py-2 mt-[0.2rem] hover:text-indigo-600 hover:bg-white hover:rounded-md"
    >
      {children}
    </button>
  );
}

const TwHomeNavbar = () => {
  const { data: session } = useSession();

  return (
    <Popover as="header" className="absolute z-20 w-full">
      <div className="pt-2 h-[5rem] bg-gradient-to-b from-black opacity-90">
        <nav
          className="relative mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center mt-1">
            <div className="flex w-full items-center md:w-auto">
              <div className="-ml-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md text-4xl text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>

              <Link href="/" className="-mt-1">
                <span className="sr-only">ntornos</span>
                <div className="font-['Libre_Baskerville'] text-2xl ml-2 inline md:text-3xl md:-ml-1">
                  <span className="text-indigo-600">n</span>
                  <span className="text-white">tornos</span>
                </div>
              </Link>

              <div className="w-full flex justify-end md:hidden -mt-1">
                <Link
                  href="#"
                  className="text-base font-medium text-white hover:text-gray-300 px-3 py-2 mt-[0.2rem] hover:text-indigo-600 hover:bg-white hover:rounded-md"
                >
                  Register/Sign In
                </Link>
              </div>
            </div>
            <div className="hidden md:w-full md:flex md:justify-end">
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
          <div className="hidden md:flex md:items-center">
            {session ? (
              <AuthButton onClick={() => signOut()}>Sign out</AuthButton>
            ) : (
              <>
                <AuthButton onClick={() => signIn()}>Sign in</AuthButton>
                <AuthButton>Sign up</AuthButton>
              </>
            )}
          </div>
        </nav>
      </div>

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
          className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <Image
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="pt-5 pb-6">
              <div className="space-y-1 px-2">
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
              <div className="mt-6 px-5">
                <Link
                  href="#"
                  className="block w-full rounded-md bg-indigo-600 py-3 px-4 text-center font-medium text-white shadow hover:bg-indigo-700"
                >
                  Start free trial
                </Link>
              </div>
              <div className="mt-6 px-5">
                <p className="text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <Link href="#" className="text-gray-900 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

// <Link
//   href="#"
//   className="text-base font-medium text-white hover:text-gray-300 px-3 py-2 mt-[0.2rem] hover:text-indigo-600 hover:bg-white hover:rounded-md"
// >
//   Register/Sign In
// </Link>
export default TwHomeNavbar;
