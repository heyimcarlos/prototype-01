import React from "react";
import { type User } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "@/lib/classNames";
import { signOut } from "next-auth/react";
import LogoutIcon from "../icons/logout";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useMeQuery from "@/hooks/useMeQuery";

type AvatarProps = (
  | { user: Pick<User, "name" | "avatar"> }
  | { user?: null; imageSrc: string }
) & {
  className?: string;
  title?: string;
  size?: number;
  alt: string;
};

function defaultAvatarSrc(name: string) {
  return `https://www.gravatar.com/avatar/${name}?s=160&d=mp&r=PG`;
}

export function Avatar(props: AvatarProps) {
  let imgSrc = "";
  let alt: string = props.alt;

  if (props.user) {
    const user = props.user;
    alt = alt || user.name || "";

    if (user.avatar) {
      imgSrc = user.avatar;
    } else {
      imgSrc = defaultAvatarSrc(user.name || "");
    }
  } else {
    imgSrc = props.imageSrc;
  }

  const className = classNames(
    "rounded-full inline-flex  aspect-square p-[2px]",
    props.className || "",
    props.size ? `h-${props.size} w-${props.size}` : ""
  );
  const avatar = imgSrc ? (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      width={720}
      height={720}
    />
  ) : null;

  return props.title ? (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.TooltipTrigger className="cursor-default">
          {avatar}
        </Tooltip.TooltipTrigger>
        <Tooltip.Content className="rounded-sm bg-black p-2 text-sm text-white">
          <Tooltip.Arrow />
          {props.title}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ) : (
    <>{avatar}</>
  );
}

const secondaryNavigation = [{ href: "/account", name: "Settings" }];

export function UserDropdown() {
  const router = useRouter();
  const query = useMeQuery();
  const user = query.data;

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="rounded-md ring-0">
        <button
          type="button"
          className="group flex w-full cursor-pointer appearance-none items-center rounded-full p-2 text-left outline-none hover:bg-gray-200 md:rounded"
        >
          <Avatar user={user} alt={`${user.name} profile picture`} size={10} />
          <span className="flex-grow truncate pl-3 text-sm">
            <span className="block truncate font-medium text-gray-900">
              {user.name || user.email.split("@")[0]}
            </span>
            <span className="block truncate font-normal text-gray-700">
              {user.email}
            </span>
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="shadow-dropdown relative z-10 mt-1 w-60 origin-top-right overflow-hidden rounded-md border border-gray-200 bg-white text-sm">
          {secondaryNavigation.map((item) => (
            <DropdownMenu.Item
              key={item.name}
              className={
                "group flex w-full cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              }
            >
              <Link
                href={item.href}
                className="flex w-full min-w-max cursor-pointer items-center text-sm hover:bg-gray-100 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Item
            className={
              "group flex w-full cursor-pointer items-center px-4 py-2 text-sm text-gray-700 first:pt-3 last:pb-3 hover:bg-gray-100"
            }
          >
            <button
              onClick={handleSignOut}
              className="flex w-full min-w-max cursor-pointer items-center text-sm hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="mr-2 h-5 w-5">
                <LogoutIcon />
              </span>
              Sign out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function UserPopover() {
  const router = useRouter();
  const query = useMeQuery();
  const user = query.data;

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  if (!user) {
    return null;
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex rounded-full text-left text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <Avatar user={user} alt={`${user.name} avatar`} size={10} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="z-10 m-2 w-32 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <>
            {secondaryNavigation.map((item) => {
              const active = router.pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  aria-disabled
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              className={classNames(
                "group flex w-full items-center px-4 py-2 text-sm text-gray-700 first:pt-3 last:pb-3 hover:bg-gray-100"
              )}
              onClick={handleSignOut}
            >
              <span className="mr-2 h-5 w-5">
                <LogoutIcon />
              </span>
              Sign out
            </button>
          </>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
