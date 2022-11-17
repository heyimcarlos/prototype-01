import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import classNames from "@/lib/classNames";

const FlyoutMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900 " : "text-gray-500 ",
              "group border p-1 inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            )}
          >
            <span className="mx-2">Preferences</span>
            <ChevronDownIcon
              className={classNames(
                open ? "text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-40 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
              {children}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default FlyoutMenu;
