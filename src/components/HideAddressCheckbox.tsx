import { useNewListing } from "@/stores/useNewListing";

export default function HideAddressCheckbox() {
  const setHide = useNewListing((state) => state.setHide);
  const hide = useNewListing((state) => state.hide);

  // console.log("hide", hide);

  return (
    <fieldset className="ml-3">
      <legend className="sr-only">Hide Listing</legend>
      <div className="relative flex flex-col items-start">
        <div className="flex h-5 items-center">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            checked={hide ? true : false}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            onChange={(e) => {
              setHide(e.target.checked);
            }}
          />
          <div className="ml-2 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              *Hide address from listing
            </label>
          </div>
        </div>
        <p
          id="comments-description"
          className="w-[97.5%] rounded-sm border-[0.01rem] border-[#d1d5db] rounded-lg p-2 text-gray-600 text-[12px] shadow-lg relative"
        >
          You can hide the address if privacy is a concern, but the listing may
          receive fewer views and contacts than listings that show the property
          address.
        </p>
      </div>
    </fieldset>
  );
}
