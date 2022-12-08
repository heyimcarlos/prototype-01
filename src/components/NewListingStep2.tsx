import React from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import PropertyTypeSelect from "@/components/PropertyTypeSelect";
import PropertyConditionSelect from "@/components/PropertyConditionSelect";

const NewListingStep2 = ({ setStep }) => {
  return (
    <>
      <div className="h-[calc(100vh-68px)] w-full flex flex-col items-center space-y-3 mt-3">
        <div className="w-full mt-6 flex flex-col justify-center items-center">
          <div className="w-[80%]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
              <span className="text-xs text-gray-400 ml-3">
                *For your records only
              </span>
            </label>
            <input
              id="name"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="Name of listing"
              className="relative cursor-default w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-3">
          <PropertyTypeSelect />
        </div>
        <div className="w-full flex justify-center items-center mt-3">
          <PropertyConditionSelect />
        </div>
        <div className="w-full h-full mt-6 flex flex-col space-y-3 justify-evenly items-center">
          <div className="w-[80%] flex items-center justify-between">
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700"
            >
              Bedrooms
            </label>
            <input
              id="name"
              type="number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className=" relative inline cursor-default w-[60%] rounded-md border border-gray-300 bg-white py-1 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-[80%] flex items-center justify-between">
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700"
            >
              Full Bathrooms
            </label>
            <input
              id="name"
              type="number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className=" relative inline cursor-default w-[60%] rounded-md border border-gray-300 bg-white py-1 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-[80%] flex items-center justify-between">
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700"
            >
              Half Bathrooms
            </label>
            <input
              id="name"
              type="number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className=" relative inline cursor-default w-[60%] rounded-md border border-gray-300 bg-white py-1 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="w-[80%] flex items-center justify-between">
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700"
            >
              Meters<sup>2</sup>
            </label>
            <input
              id="name"
              type="number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className=" relative inline cursor-default w-[60%] rounded-md border border-gray-300 bg-white py-1 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-[80%] flex items-center justify-between">
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700"
            >
              Mantenimiento
            </label>
            <input
              id="name"
              type="number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className=" relative inline cursor-default w-[60%] rounded-md border border-gray-300 bg-white py-1 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-[80%] flex items-center justify-between">
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="name"
              type="number"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className=" relative inline cursor-default w-[60%] rounded-md border border-gray-300 bg-white py-1 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-full flex justify-center space-x-6 py-3">
            <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
              Save & Exit
            </div>
            <div
              className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
              onClick={() => setStep("step 1")}
            >
              Back
            </div>
            <div
              className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
              onClick={() => setStep("step 2.5")}
            >
              Continue
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewListingStep2;
