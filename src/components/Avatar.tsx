import React, { type ReactNode } from "react";
import { type User } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "@/lib/classNames";
import { signOut } from "next-auth/react";
import LogoutIcon from "./icons/logout";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Popover from "@radix-ui/react-popover";
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
    "rounded-full",
    props.className || "",
    props.size ? `h-${props.size} w-${props.size}` : ""
  );
  const avatar = imgSrc ? (
    <Image
      src={imgSrc}
      alt={alt}
      className={`inline-flex  aspect-square p-[2px] ${className}`}
      width={720}
      height={720}
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

const avatarMenuNavigation = [{ href: "/account", name: "Settings " }];

export function AvatarMenu({ children }: { children?: ReactNode }) {
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
        <button className="flex rounded-full text-sm text-left focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <Avatar user={user} alt={`${user.name} avatar`} size={10} />
          {children}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="z-10 m-2 w-32 origin-top-right rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <>
            {avatarMenuNavigation.map((item) => {
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
                "flex group items-center w-full px-4 py-2 text-sm text-gray-700 first:pt-3 last:pb-3 hover:bg-gray-100"
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
