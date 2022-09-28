import React from "react";

const Test = () => {
  return (
    <div className="absolute z-10 w-full mt-[1.9rem] sm:mt-[2.5rem] md:mt-[2.4rem] lg:mt-[0.5rem] xl:mt-[2rem]">
      <div className="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-20 pb-14">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="mt-4 text-3xl font-bold text-center tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block text-indigo-600 mr-1">
                    Know the area.
                  </span>
                  <span className="block mr-1">Find your place.</span>
                </h1>

                <div className="mt-5 sm:mt-12">
                  <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div className="sm:flex">
                      <div className="min-w-0 flex-1">
                        <label htmlFor="search" className="sr-only">
                          Initial search
                        </label>
                        <input
                          id="search"
                          type="text"
                          placeholder="Country, City, Neighborhood, Address"
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
    </div>
  );
};

export default Test;
