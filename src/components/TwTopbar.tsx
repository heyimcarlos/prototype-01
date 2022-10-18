import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logoPicture from "../../public/assets/images/logo2.0.png";
import Link from "next/link";
import { useSectors } from "@/stores/useSectors";
import FlyOutMenu2 from "../components/FlyOutMenu2";
import { useGlobalShow } from "@/stores/useGlobalShow";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const TwTopbar = () => {
  const sectors = useSectors((state) => state.sectors);
  const deleteThisSector = useSectors((state) => state.deleteThisSector);
  const globalShow = useGlobalShow((state) => state.globalShow);
  const setGlobalShowTrue = useGlobalShow((state) => state.setGlobalShowTrue);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div
            className=""
            style={{
              marginTop: "-0.5rem",
              marginBottom: "-0.5rem",
            }}
          >
            <div className="flex h-16 justify-between">
              <div className="flexpx-2 lg:px-0 relative">
                <div
                  className="flex flex-shrink-0 items-center justify-start cursor-pointer"
                  style={{
                    marginLeft: "1.1rem",
                    marginBottom: "0.2rem",
                    marginTop: "0.7rem",
                  }}
                >
                  <Link href="/" className="-mt-1">
                    <a>
                      <span className="sr-only">ntornos</span>
                      <div className="font-['Libre_Baskerville'] text-2xl ml-2 inline md:text-3xl md:-ml-1">
                        <span className="text-indigo-600">n</span>
                        <span className="text-black">tornos</span>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex flex-1 items-center px-2 justify-start">
                <div className="w-[17rem] max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>

                <FlyOutMenu2 />

                {sectors.length > 0 && (
                  <div className="flex ml-1">
                    <div
                      className="pr-10 mr-1 border-2 rounded-xl"
                      key={
                        sectors.length > 0
                          ? sectors[sectors.length - 1]?.name
                          : ""
                      }
                    >
                      <span className="pl-3">
                        {sectors.length > 0
                          ? sectors[sectors.length - 1]?.name
                          : ""}
                      </span>
                      <div
                        style={{
                          display: "inline",
                          position: "absolute",
                          border: "0.15rem solid black",
                          marginTop: "1.5px",
                          marginLeft: "7px",
                          borderRadius: "100%",
                        }}
                        onClick={() => {
                          if (sectors.length < 1) return;
                          deleteThisSector(sectors[sectors.length - 1]);
                          setGlobalShowTrue();
                        }}
                      >
                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8 ">
                {/* <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-black px-1 pt-3 text-sm font-medium text-gray-900"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Favorites
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Agents
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Dashboard
                </a> */}
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Register/Sign In
                </a>
              </div>
              {/* Bell Icon below! */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {/* <button
                  type="button"
                  className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    {/* <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        // layout="fill"
                        height="50px"
                        width="50px"
                      />
                    </Menu.Button> */}
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
                    {/* <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
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
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items> */}
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              {/* <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button> */}
              {/* <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Calendar
              </Disclosure.Button> */}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {/* <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default TwTopbar;
