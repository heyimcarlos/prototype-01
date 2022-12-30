import { useState, useEffect, useRef } from "react";

const RangeSlider = ({ initialMin, initialMax, min, max, step }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (minValue + 2000000 < maxValue) {
      setMinValue(parseInt(e.target.value));
    } else {
      if (parseInt(e.target.value) < maxValue - 2000000) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - 2000000 > minValue) {
      setMaxValue(parseInt(e.target.value));
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = (minValue / max) * 100 + "%";
      progressRef.current.style.right = 100 - (maxValue / max) * 100 + "%";
    }
  }, [minValue, maxValue, max, step]);

  return (
    <div className=" grid place-items-center bg-green-300">
      <div className="flex flex-col w-full bg-white shadow-xl rounded-lg px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1"> Price Range</h1>
        <p className="font-semibold text-lg text-gray-700">
          Use slider or enter min and max price
        </p>

        <div className="flex justify-between items-center my-6 ">
          <div className="rounded-md">
            <span className="p-2 font-semibold"> Min</span>
            <input
              onChange={(e) => setMinValue(e.target.value)}
              type="number"
              value={minValue}
              className="w-40 rounded-md border border-gray-400"
            />
          </div>
          <div className="ml-2 font-semibold text-lg"> - </div>
          <div className=" ">
            <span className="p-2 font-semibold"> Max</span>
            <input
              onChange={(e) => setMaxValue(e.target.value)}
              type="number"
              value={maxValue}
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
              value={minValue}
              className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
            />

            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
