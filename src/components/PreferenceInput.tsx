import React from "react";

type Props = {
  input: {
    name: string;
    placeholder: string;
    label: string;
  };
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
    <div>
      <label
        htmlFor={props.input.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.input.label}
      </label>
      {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
      <div className="mt-1 flex items-center justify-between">
        <input
          //   value={value}
          //   onChange={(e) => setValue(e.target.value)}
          type="text"
          name={props.input.name}
          id="email"
          className="block w-full w-8/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={props.input.placeholder}
        />
        {/* <Toggle /> */}
      </div>
      {/* </Autocomplete> */}
    </div>
  );
};

export default PreferenceInput;
