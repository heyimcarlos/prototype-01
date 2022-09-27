import _ from "lodash";

type Props = {
  name: string;
  value: string;
};

const PreferenceInput = (props: Props) => {
  return (
    <div className="w-full">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {_.capitalize(props.name)}
      </label>
      <div className="mt-1 flex items-center justify-between">
        <input
          defaultValue={props.value}
          type="text"
          name={props.name}
          id="email"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={`Enter your ${props.name} address`}
        />
      </div>
    </div>
  );
};

export default PreferenceInput;
