import classNames from "@/lib/classNames";
import React, {
  forwardRef,
  type ReactElement,
  type Ref,
  useCallback,
} from "react";
import { useId } from "@radix-ui/react-id";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useFormContext,
  type UseFormReturn,
} from "react-hook-form";
import { Alert } from "../Alert";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

type InputProps = Omit<JSX.IntrinsicElements["input"], "name"> & {
  name: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <input
        {...props}
        ref={ref}
        className={classNames(
          "block w-full appearance-none rounded-sm border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm",
          props.className
        )}
      />
    );
  }
);

export function Label(props: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...props}
      className={classNames(
        "block text-sm font-medium text-gray-700",
        props.className
      )}
    >
      {props.children}
    </label>
  );
}

type InputFieldProps = {
  label?: string;
  hint?: string;
  addOnPrefix?: React.ReactNode;
  addOnSuffix?: React.ReactNode;
} & React.ComponentProps<typeof Input> & {
    labelProps?: React.ComponentProps<typeof Label>;
  };

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(props, ref) {
    const id = useId();
    const methods = useFormContext();
    const {
      hint,
      addOnPrefix,
      addOnSuffix,
      placeholder,
      className,
      labelProps,
      label,
      ...passThrough
    } = props;

    return (
      <div>
        {!!label && (
          <Label htmlFor={id} {...labelProps}>
            {label}
          </Label>
        )}
        {addOnPrefix || addOnSuffix ? (
          <div className="relative mb-1 flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-800 focus-within:ring-offset-1">
            {addOnPrefix && (
              <div className="rounded-l-md border-r-0">{addOnPrefix}</div>
            )}
            <Input
              id={id}
              placeholder={placeholder}
              className={classNames(
                className,
                addOnPrefix && "rounded-l-none",
                addOnSuffix && "rounded-r-none",
                "!my-0 !ring-0"
              )}
              {...passThrough}
              ref={ref}
            />
            {addOnSuffix && (
              <div className="rounded-r-md border-l-0">{addOnSuffix}</div>
            )}
          </div>
        ) : (
          <Input
            id={id}
            placeholder={placeholder}
            className={className}
            {...passThrough}
            ref={ref}
          />
        )}
        {hint && (
          <div className="text-gray mt-2 flex items-center text-sm text-gray-700">
            {hint}
          </div>
        )}
        {methods.formState.errors[props.name]?.message && (
          <Alert
            classNames="mt-1"
            severity="error"
            message={<>{methods.formState.errors[props.name]?.message}</>}
          />
        )}
      </div>
    );
  }
);

export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(
  function TextField(props, ref) {
    return <InputField {...props} ref={ref} />;
  }
);

export const NumberWithButtonsField = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(function NumberWithButtonsField(props, ref) {
  const id = useId();
  const methods = useFormContext();
  const { onChange, label, labelProps, ...passThrough } = props;

  const handleIncrement = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      methods.setValue(props.name, methods.getValues(props.name) + 1);
    },
    [methods, props.name]
  );

  const handleDecrement = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const value = methods.getValues(props.name);
      if (value === 0) return;

      methods.setValue(props.name, value - 1);
    },
    [methods, props.name]
  );

  return (
    <div>
      {!!label && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      <div className="focus-within:ring-offset-10 relative mb-1 flex max-w-[135px] items-center justify-center rounded-md border border-gray-300 shadow-md focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-800">
        <button className="border-r p-2 outline-none" onClick={handleDecrement}>
          <MinusIcon className="h-6 w-6" />
        </button>
        <Input
          id={id}
          ref={ref}
          className="w-12 border-none p-0 text-center focus:outline-none focus:ring-0"
          onChange={(e) => {
            e.preventDefault();
            if (!e.target.value || Number(e.target.value) < 0) {
              methods.resetField(props.name);
            }
            if (onChange) onChange(e);
          }}
          {...passThrough}
        />
        <button className="border-l p-2 outline-none" onClick={handleIncrement}>
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="max-w-[8.5rem]">
        {methods.formState.errors[props.name]?.message && (
          <Alert
            classNames="mt-1 w-full"
            severity="error"
            message={<>{methods.formState.errors[props.name]?.message}</>}
          />
        )}
      </div>
    </div>
  );
});

type FormProps<T extends object> = {
  form: UseFormReturn<T>;
  handleSubmit: SubmitHandler<T>;
} & Omit<JSX.IntrinsicElements["form"], "onSubmit">;

const PlainForm = <T extends FieldValues>(
  props: FormProps<T>,
  ref: Ref<HTMLFormElement>
) => {
  const { form, handleSubmit, ...passThrough } = props;

  return (
    <FormProvider {...form}>
      <form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form
            .handleSubmit(handleSubmit)(e)
            .catch((e) => console.error(e));
        }}
        {...passThrough}
      >
        {props.children}
      </form>
    </FormProvider>
  );
};

export const Form = forwardRef(PlainForm) as <T extends FieldValues>(
  p: FormProps<T> & { ref?: Ref<HTMLFormElement> }
) => ReactElement;
