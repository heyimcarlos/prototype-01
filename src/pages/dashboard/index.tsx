import DashboardLayout from "@/components/layouts/dashboard";
import React from "react";
import type { NextPageWithLayout } from "../_app";
import defaultAvatar from "../../../public/assets/images/user.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
      className="shadow overflow-hidden border rounded-md bg-white p-6"
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

export default function DashboardPage({ }: NextPageWithLayout) {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto ">
      <ProfileOverview />
      <h1>dashboard page</h1>
      <h2>hello world</h2>
    </div>
  );
}

DashboardPage.layout = DashboardLayout;
