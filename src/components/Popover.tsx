import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import classNames from "@/lib/classNames";

type Props = {
  children: React.ReactNode;
} & (
  | {
      triggerIcon: JSX.Element;
      triggerText?: never;
    }
  | {
      triggerIcon?: never;
      triggerText: string;
    }
);

const Popover = ({ children, triggerIcon, triggerText }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (open: boolean) => setOpen(open);

  const trigger = triggerIcon ?? (
    <button className="group inline-flex items-center rounded-md border bg-white p-1 text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
      <span className="mx-2">{triggerText}</span>
      <ChevronDownIcon
        className={classNames(
          open ? "text-gray-600" : "text-gray-400",
          "ml-2 h-5 w-5 group-hover:text-gray-500"
        )}
        aria-hidden="true"
      />
    </button>
  );

  return (
    <RadixPopover.Root open={open} onOpenChange={handleOpen}>
      <RadixPopover.Trigger asChild className="cursor-pointer">
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content className="z-10 m-2 origin-top-right overflow-hidden rounded-md bg-white p-8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;
