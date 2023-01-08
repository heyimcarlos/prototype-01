import { useNewListing } from "@/stores/useNewListing";

export default function HideAddressCheckbox() {
  const setHide = useNewListing((state) => state.setHide);
  const hide = useNewListing((state) => state.hide);

  // console.log("hide", hide);

  return (
    <fieldset className="">
      <legend className="sr-only">Hide Listing</legend>
      <div className="relative flex flex-col items-start">
        <div className="flex h-5 items-center">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            checked={hide ? true : false}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 shadow-md focus:ring-indigo-500 md:h-6 md:w-6"
            onChange={(e) => {
              setHide(e.target.checked);
            }}
          />
          <div className="ml-2 text-sm md:text-xl lg:text-lg">
            <label htmlFor="comments" className="font-medium text-gray-700">
              *Hide address from listing
            </label>
          </div>
        </div>
        <p
          id="comments-description"
          className="relative mt-[0.2rem] w-full rounded-sm rounded-lg border-[0.01rem] border-[#d1d5db] p-2 text-[12px] text-gray-600 shadow-md md:mt-2 md:p-1 md:px-2 md:text-[20px] lg:text-[16px] xl:p-2"
        >
          You can hide the address if privacy is a concern, but the listing may
          receive fewer views and contacts than listings that show the property
          address.
        </p>
      </div>
    </fieldset>
  );
}
