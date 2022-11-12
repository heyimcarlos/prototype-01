import DashboardLayout from "@/components/layouts/dashboard";
import React from "react";
import type { NextPageWithLayout } from "../_app";
import defaultAvatar from "../../../public/assets/images/user.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { prisma } from "@/server/db/client";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import GridIcon from "@/components/icons/grid";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import type { GetServerSidePropsContext } from "next";
import randomImage from "../../../public/assets/images/house1.jpeg";
import type { inferSSRProps } from "@/lib/types/inferSSRProps";

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
          <div className="flex-shrink-0">
            <Image
              className="mx-auto rounded-full h-20 w-20"
              src={session?.user?.avatar || defaultAvatar}
              alt="Avatar"
              width={720}
              height={720}
            />
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

const DashboardPage: NextPageWithLayout<
  inferSSRProps<typeof getServerSideProps>
> = ({ listings }) => {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto ">
      <ProfileOverview />
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="min-w-0 flex-1 xl:col-span-6">
          <div className="flex items-center py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none ">
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
        {listings.map((listing) => (
          <li
            key={listing.id}
            className="col-span-1 divide-y divide-gray-200 rounded-md bg-white shadow"
          >
            <Link href={`/listing/${listing.slug}`}>
              <div className="flex">
                <div className="mr-4 flex-shrink-0 self-center">
                  <Image
                    src={randomImage}
                    alt="Listing"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="">
                  <h4 className="text-lg font-bold">{listing.name}</h4>
                  <p className="mt-1">{listing.description}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

DashboardPage.layout = DashboardLayout;

export default DashboardPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const listings = await prisma.listing.findMany();

  return {
    props: {
      listings,
    },
  };
}
