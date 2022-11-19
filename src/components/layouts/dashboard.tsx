import React, { Fragment, useState } from "react";
import { Dialog as HeadlessUIDialog, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { AvatarMenu } from "@/components/Avatar";
import { useSession } from "next-auth/react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Settings", href: "/account", icon: CogIcon },
];

const DashboardSidebarContainer = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <aside className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-[0.3rem] px-4">
      <div className="flex flex-shrink-0 items-center">
        <Logo />
      </div>
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="space-y-1 flex-1 pb-4">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? "bg-indigo-50 border-indigo-500 text-indigo-500"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  "group border-l-4 py-2  flex items-center text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="hidden md:inline mb-6">
        <div className="hover:bg-gray-200 rounded-md p-3">
          <AvatarMenu>
            <span className="flex-grow truncate text-sm pl-3">
              <span className="block truncate font-medium text-gray-900">
                {session?.user.name || session?.user?.email?.split("@")[0]}
              </span>
              <span className="block truncate font-normal text-gray-700">
                {session?.user.email}
              </span>
            </span>
          </AvatarMenu>
        </div>
      </div>
    </aside>
  );
};

const DashboardNavbar = ({
  children,
  openDialog,
}: {
  children: React.ReactNode;
  openDialog: () => void;
}) => {
  return (
    <div className="flex sticky top-0 z-10 md:hidden h-16 flex-shrink-0 bg-white shadow">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={openDialog}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-end px-4">{children}</div>
    </div>
  );
};

const Dialog = ({
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
      <HeadlessUIDialog
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
            <HeadlessUIDialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              {/* Close Button */}
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-1 right-1 z-10 p-1">
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
            </HeadlessUIDialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </HeadlessUIDialog>
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
    <div className="min-h-screen bg-custom-white">
      {/* Mobile */}
      <div className="md:hidden">
        <Dialog open={open} closeDialog={() => setOpen(false)}>
          <div className="fixed inset-y-0 flex w-full flex-col">
            <DashboardSidebarContainer />
          </div>
        </Dialog>
      </div>

      {/* Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <DashboardSidebarContainer />
      </div>

      <div className="flex flex-1 flex-col md:pl-64">
        {/* Navbar */}
        <DashboardNavbar openDialog={() => setOpen(true)}>
          <div className="ml-4 flex items-center md:ml-6">
            <AvatarMenu />
          </div>
        </DashboardNavbar>

        {/* Content area */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
