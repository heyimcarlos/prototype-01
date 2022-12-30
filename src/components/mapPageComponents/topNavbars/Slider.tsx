import { useFilters } from "@/stores/useFilters";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";

type RangeSlideTypes = {
  min: number;
  max: number;
  step: number;
};

const RangeSlider = ({ min, max, step }: RangeSlideTypes) => {
  const progressRef = useRef(null);
  const [reset, setReset] = useState(true);

  const setMinPrice = useFilters((state) => state.setMinPrice);
  const minPrice = useFilters((state) => state.minPrice);
  const setMaxPrice = useFilters((state) => state.setMaxPrice);
  const maxPrice = useFilters((state) => state.maxPrice);

  const handleMin = (e) => {
    if (minPrice + 1500000 < maxPrice) {
      setMinPrice(parseInt(e.target.value));
    } else {
      if (parseInt(e.target.value) < maxPrice - 1500000) {
        setMinPrice(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    // console.log("e.target.value", e.target.value);
    if (maxPrice - 1500000 > minPrice) {
      setMaxPrice(parseInt(e.target.value));
    } else {
      if (parseInt(e.target.value) > maxPrice) {
        setMaxPrice(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = (minPrice / max) * 100 + "%";
      progressRef.current.style.right = 100 - (maxPrice / max) * 100 + "%";
    }
  }, [max, step, minPrice, maxPrice]);

  return (
    <div className="bg-green-300">
      {reset && (
        <div className="flex flex-col bg-white shadow-xl rounded-lg px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {" "}
            Price Range
          </h1>
          <button>
            <ArrowPathIcon
              className="h-5 w-5 "
              onClick={() => {
                setReset(false);
                setMinPrice(2500000);
                setMaxPrice(7500000);
                setTimeout(() => {
                  setReset(true);
                }, 100);
              }}
            />
          </button>
          <p className="font-semibold text-lg text-gray-700">
            Use slider or enter min and max price
          </p>

          <div className="flex justify-between items-center my-6 ">
            <div className="rounded-md">
              <span className="p-2 font-semibold"> Min</span>
              <input
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                type="text"
                value={minPrice.toLocaleString()}
                className="w-40 rounded-md border border-gray-400"
              />
            </div>
            <div className="ml-2 font-semibold text-lg"> - </div>
            <div className=" ">
              <span className="p-2 font-semibold"> Max</span>
              <input
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                type="text"
                value={maxPrice.toLocaleString()}
                className="w-40 rounded-md border border-gray-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="slider relative h-1 rounded-md bg-gray-300">
              <div
                className="progress absolute h-1 bg-green-300 rounded "
                ref={progressRef}
              ></div>
            </div>

            <div className="range-input relative  ">
              <input
                onChange={handleMin}
                type="range"
                min={min}
                step={step}
                max={max}
                value={minPrice}
                className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
              />

              <input
                onChange={handleMax}
                type="range"
                min={min}
                step={step}
                max={max}
                value={maxPrice}
                className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RangeSlider;

// import { useFilters } from "@/stores/useFilters";
// import React, { useEffect } from "react";

// const Slider = () => {
//   const minPrice = useFilters((state) => state.minPrice);
//   const setMinPrice = useFilters((state) => state.setMinPrice);

//   //   useEffect(() => {});

//   return (
//     <div>
//       <label htmlFor="minPrice" className="mr-2">
//         Min Price
//       </label>
//       <input
//         className="mb-2"
//         type="text"
//         value={minPrice.toLocaleString()}
//         onChange={(e) => {
//             if(parseInt(e.target.value) === )
//           setMinPrice(parseInt(e.target.value));
//         }}
//       />
//       <input
//         className="w-[98%] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//         type="range"
//         min={0}
//         max={20000000}
//         step={100000}
//         value={minPrice}
//         onChange={(e) => {
//           setMinPrice(parseInt(e.target.value));
//         }}
//       />
//     </div>
//   );
// };

// export default Slider;
