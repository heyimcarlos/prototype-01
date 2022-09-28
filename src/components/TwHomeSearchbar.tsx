import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";

const TwHomeSearchbar = () => {
  return (
    <div className="absolute z-10 w-full mt-[1.9rem] sm:mt-[2.5rem] md:mt-[2.4rem] lg:mt-[0.5rem] xl:mt-[2rem]">
      <div className="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-20 pb-14">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center ">
            <div className="lg:py-24">
              <h1 className="mt-4 text-3xl font-bold text-center tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                <span className="fixed text-indigo-600 mr-2">
                  Know the area.
                </span>
                <span className="text-black -ml-[0.15rem]">Know the area.</span>
                <br />
                <span className="fixed">Find your place.</span>
                <span className="text-black -ml-[0.15rem]">
                  Find your place.
                </span>
              </h1>

              <div className="mt-5 sm:mt-12 lg:ml-6">
                <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0 ">
                  <div className="sm:flex">
                    <div className="min-w-0 flex-1 flex items-center justify-end">
                      <label htmlFor="search" className="sr-only">
                        Initial search
                      </label>
                      <div
                        // className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3 z-100"
                        className="absolute flex items-center px-3 py-2 bg-indigo-600 rounded-md mr-[0.4rem]"
                      >
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        type="text"
                        placeholder="City, Neighborhood, Address"
                        className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwHomeSearchbar;
