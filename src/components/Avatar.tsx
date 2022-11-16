import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import classNames from "@/lib/classNames";
import { signOut } from "next-auth/react";
import LogoutIcon from "./icons/logout";
import { User } from "@prisma/client";
import * as Tooltip from "@radix-ui/react-tooltip";

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
    "rounded-full",
    props.className || "",
    props.size ? `h-${props.size} w-${props.size}` : ""
  );
  const avatar = imgSrc ? (
    <Image
      // className="inline-flex h-8 w-8 rounded-full overflow-hidden aspect-square bg-indigo-500 p-[2px]"
      src={imgSrc}
      alt={alt}
      className={className}
      // width={720}
      // height={720}
      fill
    />
  ) : null;

  return props.title ? (
    <Tooltip.Tooltip delayDuration={300}>
      <Tooltip.TooltipTrigger className="cursor-default">
        {avatar}
      </Tooltip.TooltipTrigger>
      <Tooltip.Content className="rounded-sm bg-black p-2 text-sm text-white">
        <Tooltip.Arrow />
        {props.title}
      </Tooltip.Content>
    </Tooltip.Tooltip>
  ) : (
    <>{avatar}</>
  );
}

export function AvatarMenu({ avatarUrl }: { avatarUrl: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <Avatar imageSrc={avatarUrl || ""} />
        </Menu.Button>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/account"
                aria-disabled
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "flex group items-center w-full px-4 py-2 text-sm text-gray-700 first:pt-3 last:pb-3"
                )}
                onClick={handleSignOut}
              >
                <span className="mr-2 h-5 w-5">
                  <LogoutIcon />
                </span>
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
