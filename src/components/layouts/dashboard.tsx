import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

const secondaryNavigation = [
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];

const DashboardSidebar = () => {
  const router = useRouter();

  return (
    <nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pt-5 pb-4">
      <div className="flex flex-shrink-0 items-center px-4">
        <Logo />
      </div>
      <div className="mt-5 flex-grow">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? "bg-purple-50 border-purple-600 text-purple-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  "group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    isActive
                      ? "text-purple-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
      <div className="block w-full flex-shrink-0">
        {secondaryNavigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <item.icon
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

const DashboardNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
        {children}
      </div>
    </div>
  );
};

const SidebarDialog = ({
  children,
  open,
  closeDialog,
}: {
  children: React.ReactNode;
  open: boolean;
  closeDialog: () => void;
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={closeDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-5 right-0 z-10 p-1">
                  <button
                    type="button"
                    className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-gray-300 focus:outline-none"
                    onClick={closeDialog}
                  >
                    <XMarkIcon
                      className="h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
              </Transition.Child>
              {children}
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-custom-white">
      {/* Mobile */}
      <div className="md:hidden">
        {/* Navbar */}
        <DashboardNavbar>
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </DashboardNavbar>
        <SidebarDialog open={open} closeDialog={() => setOpen(false)}>
          <div className="fixed inset-y-0 flex w-full flex-col">
            <DashboardSidebar />
          </div>
        </SidebarDialog>
      </div>

      {/* Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <DashboardSidebar />
      </div>

      {/* Content area */}
      <div className="md:pl-64">{children}</div>
    </main>
  );
}
