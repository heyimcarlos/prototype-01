import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Dialog as HeadlessUIDialog, Transition } from "@headlessui/react";
import { CogIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserDropdown, UserPopover } from "@/components/ui/Avatar";
import { useSession } from "next-auth/react";
import { ArrowSmallLeftIcon, Bars3Icon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Settings", href: "/account", icon: CogIcon },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white px-4 pt-[0.3rem]">
      <div className="flex flex-shrink-0 items-center">
        <Logo />
      </div>
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-1 space-y-1 pb-4">
          {navigation.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.name}
                href={{ pathname: item.href, query: `open=${true}` }}
                className={classNames(
                  isActive
                    ? "border-indigo-500 bg-indigo-50 text-indigo-500"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center rounded-md border-l-4 p-2 text-sm font-medium"
                )}
              >
                <item.icon
                  className={classNames(
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 h-6 w-6 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mb-6 hidden md:inline">
        <UserDropdown />
      </div>
    </aside>
  );
};

const useCloseSidebarOnNavigation = (closeSidebar: () => void) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.open) {
      router.replace(router.pathname);
      closeSidebar();
    }
  }, [closeSidebar, router]);

  return null;
};

function TopNavContainer() {
  const { status } = useSession();
  if (status !== "authenticated") {
    return null;
  }
  return <TopNav />;
}

function TopNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const closeSidebar = useCallback(() => setOpen(false), []);
  useCloseSidebarOnNavigation(closeSidebar);

  return (
    <div className="md:hidden">
      <Dialog open={open} closeDialog={() => setOpen(false)}>
        <div className="fixed inset-y-0 flex w-full flex-col">
          <Sidebar />
        </div>
      </Dialog>
      <div className="sticky z-10 flex w-full items-center justify-between border-b border-gray-100 bg-gray-50 p-4 sm:relative lg:hidden">
        <button
          type="button"
          className="dark:text-darkgray-900 dark:hover:bg-darkgray-200 dark:focus:bg-darkgray-200 focus:ring-offset relative flex min-h-[36px] min-w-[36px] items-center justify-center rounded-md text-sm  font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        {router.pathname.replace("/", "") !== "dashboard" && (
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 rounded-md px-2 py-1 hover:bg-gray-200"
          >
            <ArrowSmallLeftIcon className="h-6 w-6 text-gray-700" />
            <p className="font-semibold text-black">Dashboard</p>
          </Link>
        )}
        <div className="flex flex-1 justify-end px-4">
          <div className="ml-4 flex items-center md:ml-6">
            <UserPopover />
          </div>
        </div>
      </div>
    </div>
  );
}

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
                    className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-300 focus:outline-none"
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
  return (
    <div className="min-h-screen bg-custom-white">
      {/* Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top Nav */}
        <TopNavContainer />

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
