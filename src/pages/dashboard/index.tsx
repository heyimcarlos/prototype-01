import DashboardLayout from "@/components/layouts/dashboard";
import React, { useMemo, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlassIcon, CalendarIcon } from "@heroicons/react/20/solid";
import GridIcon from "@/components/icons/grid";
import {
  ListBulletIcon,
  HomeIcon,
  BanknotesIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import randomImage from "../../../public/assets/images/house1.jpeg";
import { Avatar } from "@/components/ui/Avatar";
import useMeQuery from "@/hooks/useMeQuery";
import { type UserMeOutput } from "@/server/trpc/router/user";
import { trpc } from "@/utils/trpc";
import { type Listing } from "@prisma/client";
import classNames from "@/lib/classNames";

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
      className="overflow-hidden rounded-md border border-gray-300 bg-white p-6 shadow"
    >
      {children}
    </div>
  );
};

const ProfileOverview = ({ user }: { user?: UserMeOutput }) => {
  if (!user) {
    return null;
  }

  return (
    <Card label="profile-overview">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className=" sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:space-x-5">
          <div className="flex-shrink-0 text-center">
            <Avatar
              user={user}
              alt={`${user.name} Avatar`}
              className="h-20 w-20"
            />
          </div>
          <div className=" mt-4 text-center sm:my-auto  sm:pt-1 sm:text-left">
            <p className="text-sm font-medium text-gray-400">Welcome back,</p>
            <p className="text-xl font-bold sm:text-2xl">
              {user.name || user.email?.split("@")[0]}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

function DashboardGridItem({ listing }: { listing: Listing }) {
  return (
    <li>
      <Link href={`/listing/${listing.slug}`}>
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="aspect-w-3 aspect-h-4 sm:aspect-none h-60 bg-gray-200 group-hover:opacity-75 ">
            <Image
              src={randomImage}
              alt="Listing"
              width={720}
              height={0}
              className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-lg font-bold text-gray-900">{listing.name}</h3>
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-indigo-600">
                {listing.bio}
              </p>
              <div className="ml-2 flex flex-shrink-0">
                <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {listing.listingType}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-end">
              <p className="text-sm italic text-gray-500">
                Published: {listing.createdAt.toDateString()}
              </p>
              <p className="text-base font-medium text-gray-900">
                $
                {listing.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: listing.currency,
                })}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

function DashboardListItem({ listing }: { listing: Listing }) {
  return (
    <li className="mb-4">
      <Link
        href={`/listing/${listing.slug}`}
        className="group flex overflow-hidden rounded-md bg-white shadow hover:bg-gray-50"
      >
        <div className="w-[10rem] group-hover:opacity-75">
          <Image
            src={randomImage}
            width={256}
            height={0}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-full px-4 py-4 sm:px-6">
          <h3 className="">{listing.name}</h3>
          <div className="flex items-center justify-between">
            <p className="w-40 truncate text-sm font-medium text-indigo-600 sm:w-full">
              {listing.bio}
            </p>
            <div className="ml-2 flex flex-shrink-0">
              <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                {listing.listingType}
              </p>
            </div>
          </div>
          <div className="mt-2 w-full sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <HomeIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {listing.propertyType}
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                <BanknotesIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {listing.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: listing.currency,
                })}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 md:hidden lg:flex">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p>
                <time dateTime={listing.createdAt.toString()}>
                  {listing.createdAt.toDateString()}
                </time>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

function DashboardListingView({
  listings,
  listingViewMode,
}: {
  listings?: Listing[];
  listingViewMode: "GRID" | "LIST";
}) {
  if (!listings) {
    return null;
  }

  if (listings.length < 1) {
    return <div>No listings found</div>;
  }

  if (listingViewMode === "GRID") {
    return (
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {listings.map((listing) => (
          <DashboardGridItem key={listing.id} listing={listing} />
        ))}
      </ul>
    );
  }

  return (
    <ul role="list" className="">
      {listings.map((listing) => (
        <DashboardListItem key={listing.id} listing={listing} />
      ))}
    </ul>
  );
}

const DashboardPage: NextPageWithLayout = () => {
  const query = useMeQuery();
  const user = query.data;
  const { data, isLoading } = trpc.user.getMylistings.useQuery();
  const [search, setSearch] = useState("");
  const [listingViewMode, setListingViewMode] = useState<"GRID" | "LIST">(
    "GRID"
  );

  const toggleListingViewMode = () => {
    setListingViewMode((viewMode) => (viewMode === "GRID" ? "LIST" : "GRID"));
  };

  const searchResults = useMemo(() => {
    if (!search) return data;

    return data?.filter((listing) => {
      if (listing.name.includes(search)) return listing;
      if (listing.name.toLowerCase().includes(search)) return listing;
      if (listing.bio.toLowerCase().includes(search)) return listing;
      if (listing.propertyType.toLowerCase().includes(search)) return listing;
      if (listing.listingType.toLowerCase().includes(search)) return listing;
    });
  }, [search, data]);

  return (
    <div>
      <ProfileOverview user={user} />
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
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="block w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative inline-flex max-w-full select-none items-center justify-center rounded-md border border-gray-300 bg-white">
          <button
            onClick={toggleListingViewMode}
            className={classNames(
              listingViewMode === "GRID" ? "" : "text-gray-300",
              "flex h-10 w-10 items-center justify-center border-r p-2"
            )}
          >
            <div className="sr-only">Grid view</div>
            <GridIcon />
          </button>
          <button
            onClick={toggleListingViewMode}
            className={classNames(
              listingViewMode === "GRID" ? "text-gray-300" : "",
              "p-2"
            )}
          >
            <div className="sr-only">List view</div>
            <ListBulletIcon className="h-6 w-6" />
          </button>
        </div>
        <Link href="/new">
          <button className="flex min-w-[120px] items-center justify-between rounded-md border border-gray-300 bg-white py-2 px-4">
            Add New
            <PlusCircleIcon className="ml-2 h-5 w-5" />
          </button>
        </Link>
      </div>
      {data && data.length < 1 ? (
        <div>Create your first listing!</div>
      ) : (
        <>
          {!isLoading ? (
            <DashboardListingView
              listings={searchResults}
              listingViewMode={listingViewMode}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

DashboardPage.layout = DashboardLayout;

export default DashboardPage;
