import DashboardLayout from "@/components/layouts/dashboard";
import React from "react";
import type { NextPageWithLayout } from "../_app";
import defaultAvatar from "../../../public/assets/images/user.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import GridIcon from "@/components/icons/grid";
import { ListBulletIcon } from "@heroicons/react/24/outline";

const Card = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div
      aria-labelledby={label}
      className="shadow overflow-hidden border border-gray-300 rounded-md bg-white p-6"
    >
      {children}
    </div>
  );
};

const ProfileOverview = () => {
  const { data: session } = useSession();

  return (
    <Card label="profile-overview">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className=" sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:space-x-5">
          <div className="shrink-0">
            <div className="relative mx-auto h-20 w-20">
              <Image
                className="inline-flex rounded-full overflow-hidden aspect-square bg-indigo-500 h-full w-full"
                src={session?.user?.image || defaultAvatar}
                alt="Avatar"
                width={720}
                height={720}
              />
            </div>
          </div>
          <div className=" text-center mt-4 sm:my-auto  sm:pt-1 sm:text-left">
            <p className="text-sm font-medium text-gray-400">Welcome back,</p>
            <p className="text-xl font-bold sm:text-2xl">
              {session?.user?.name}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function DashboardPage({}: NextPageWithLayout) {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto ">
      <ProfileOverview />
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
          <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
            <div className="w-full">
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
                  className="block w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center relative border border-gray-300 rounded-md max-w-full select-none bg-white">
          <button className="h-10 w-10 p-2 border-r flex justify-center items-center">
            <div className="sr-only">Grid view</div>
            <GridIcon />
          </button>
          <button className="p-2">
            <div className="sr-only">List view</div>
            <ListBulletIcon className="h-6 w-6" />
          </button>
        </div>
        <button className="min-w-[120px] flex items-center justify-between bg-white border border-gray-300 py-2 px-4 rounded-md">
          Add New...
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[
          { name: "Listing 1", slug: "listing-1" },
          { name: "Listing 2", slug: "listing-2" },
          { name: "Listing 3", slug: "listing-3" },
          { name: "Listing 4", slug: "listing-4" },
        ].map((listing) => (
          <li
            key={listing.name}
            className="col-span-1 divide-y divide-gray-200 rounded-md bg-white shadow"
          >
            <Link href={`/listing/${listing.slug}`}>
              <div className="flex h-full p-4">
                <div className="">section 1</div>
                <div className="">section 2</div>
                <div className="">section 3</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

DashboardPage.layout = DashboardLayout;
