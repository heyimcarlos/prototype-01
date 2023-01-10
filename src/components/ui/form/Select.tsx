import React, { type ElementRef, forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import classNames from "@/lib/classNames";

type SelectProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive["Root"]
> & { label: string };

export const Select = forwardRef<
  ElementRef<typeof SelectPrimitive["Root"]>,
  SelectProps
>(function Select(props, forwardedRef) {
  const { children, label, ...passThrough } = props;

  return (
    <SelectPrimitive.Root aria-label={label} {...passThrough}>
      <SelectPrimitive.Trigger
        className="text-md inline-flex h-9 items-center justify-center gap-1 rounded border border-gray-300 bg-white px-4 leading-none shadow-md transition-all hover:bg-gray-100 focus:shadow-lg"
        ref={forwardedRef}
      >
        <SelectPrimitive.Value placeholder="Type" />
        <SelectPrimitive.Icon asChild className="">
          <ChevronDownIcon className="h-5 w-5" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal className=" z-10 shadow-lg">
        <SelectPrimitive.Content className="absolute top-12 overflow-hidden rounded-md bg-white shadow-md">
          <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white">
            <ChevronUpIcon className="h-5 w-5" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1">
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white">
            <ChevronDownIcon className="h-5 w-5" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive["Item"]
>;

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive["Item"]>,
  SelectItemProps
>(function SelectItem(props, forwardedRef) {
  const { children, className, ...passThrough } = props;

  return (
    <SelectPrimitive.Item
      {...passThrough}
      ref={forwardedRef}
      className={classNames(
        "relative flex h-6 select-none items-center rounded pr-8 pl-6 leading-none hover:bg-gray-100 disabled:pointer-events-none",
        className
      )}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <CheckIcon className="h-5 w-5" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

type SelecLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;

export const SelectLabel = ({ className, children }: SelecLabelProps) => {
  return (
    <SelectPrimitive.Label className={classNames("px-6 text-sm", className)}>
      {children}
    </SelectPrimitive.Label>
  );
};

type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive["Separator"]
>;

export const SelectSeparator = ({ className }: SelectSeparatorProps) => {
  return (
    <SelectPrimitive.Separator className={classNames("m-1", className)}>
      Select a color
    </SelectPrimitive.Separator>
  );
};

type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive["Group"]>;

export const SelectGroup = ({
  className,
  children,
  ...passThrough
}: SelectGroupProps) => {
  return (
    <SelectPrimitive.Group
      className={classNames("m-1", className)}
      {...passThrough}
    >
      {children}
    </SelectPrimitive.Group>
  );
};
