import classNames from "@/lib/classNames";
import React, { type Dispatch, type SetStateAction } from "react";
import {
  components,
  type GroupBase,
  type OptionProps,
  type Props,
} from "react-select";
import Select from "@/components/ui/form/ReactSelect";
import { useFormContext } from "react-hook-form";

export type Option = {
  value: string;
  label: string;
};

const InputOption: React.FC<OptionProps<any, boolean, GroupBase<any>>> = ({
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  className,
  ...rest
}) => {
  const props = {
    ...innerProps,
  };

  return (
    <components.Option
      className={classNames(
        className,
        "dark:bg-darkgray-100 !flex !cursor-pointer items-center !py-3 text-[inherit]",
        isFocused && "dark:!bg-darkgray-200 !bg-gray-100",
        // @INFO: remove background style for selecteddark:!bg-darkgray-300 !bg-neutral-200
        isSelected && ""
      )}
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      innerProps={props}
    >
      <input
        type="checkbox"
        className="text-primary-600 focus:ring-primary-500 mr-2 h-4 w-4 rounded border-gray-300 ltr:mr-2 rtl:ml-2"
        checked={isSelected}
        readOnly
      />
      {children}
    </components.Option>
  );
};

type MultiSelectionCheckboxesProps = {
  options: { label: string; value: string }[];
  setSelected?: Dispatch<SetStateAction<Option[]>>;
  selected: Option[];
  setValue: (s: Option[]) => unknown;
};

const MultiValue = ({
  index,
  getValue,
}: {
  index: number;
  getValue: () => any;
}) => {
  return <>{!index && <div>{getValue().length}</div>}</>;
};

export default function MultiSelectCheckboxes({
  options,
  isLoading,
  selected,
  setSelected,
  setValue,
  className,
}: Omit<Props, "options"> & MultiSelectionCheckboxesProps) {
  const additonalComponents = { MultiValue };

  return (
    <Select
      value={selected}
      onChange={(s: Option[]) => {
        if (setSelected) setSelected(s);
        setValue(s);
      }}
      options={options}
      isMulti
      className={classNames(className ? className : "w-64 text-sm")}
      isSearchable={false}
      controlShouldRenderValue
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isLoading={isLoading}
      components={{
        ...additonalComponents,
        Option: InputOption,
      }}
    />
  );
}
