import _ from "lodash";
import React from "react";

type Props = {
  name: string;
  value: string;
};

const PreferenceInput = (props: Props) => {
  // const [autocomplete, setAutocomplete] =
  //   const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
  //     // console.log("autocomplete: ", autocomplete);
  //     setAutocomplete(autocomplete);
  //   };

  //   const onPlaceChanged = () => {
  //     // console.log("onPlaceChanged: ");
  //     if (autocomplete) {
  //       const b = autocomplete?.getPlace();
  //       // console.log("b: ", b);
  //       setDestination({ location: b?.geometry?.location });
  //       setPreferences((val) => [
  //         {
  //           lat: b.geometry?.location?.lat(),
  //           lng: b.geometry?.location?.lng(),
  //         },
  //       ]);
  //     }
  //   };
  return (
    <div className="w-full">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {_.capitalize(props.name)}
      </label>
      {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
      <div className="mt-1 flex items-center justify-between">
        <input
          defaultValue={props.value}
          // value={props.value}
          // onChange={(e) => setValue(e.target.value)}
          type="text"
          name={props.name}
          id="email"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={`Enter your ${props.name} address`}
        />
        {/* <Toggle /> */}
      </div>
      {/* </Autocomplete> */}
    </div>
  );
};

export default PreferenceInput;
