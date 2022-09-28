import React from "react";

const HomeSearchbar = ({ searchType, setSearchType }) => {
  return (
    <div
      id="HomeSearchbar"
      className="absolute z-10 w-full h-[15rem] flex justify-center items-center "
    >
      <div className="w-full h-full">
        <h1 className=" absolute text-4xl text-white font-['Libre_Baskerville'] font-extrabold">
          Know the area. Find your place.
        </h1>
        <h1 className="mt-[0.2rem] ml-[0.2rem] text-4xl text-black font-['Libre_Baskerville'] font-extrabold">
          Know the area. Find your place.
        </h1>
        <div className="sm:mt-6">
          <form action="#" className="sm:mx-auto sm:max-w-3xl lg:mx-0">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="initSearch"
                className={`text-sm px-5 py-2 ${
                  searchType === "buy"
                    ? "text-black bg-white "
                    : "text-white bg-indigo-600"
                }`}
                onClick={() => {
                  setSearchType("buy");
                }}
              >
                Buy
              </label>
              <label
                htmlFor="initSearch"
                className={`text-sm px-5 py-2 ${
                  searchType === "rent"
                    ? "text-black bg-white "
                    : "text-white bg-indigo-600"
                }`}
                onClick={() => {
                  setSearchType("rent");
                }}
              >
                Rent
              </label>
              <input
                id="initSearch"
                type="text"
                placeholder="Country, City, Neighborhood, Address"
                className="mt-[0.3rem] relative z-10  block w-full rounded-sm border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-0 "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchbar;
