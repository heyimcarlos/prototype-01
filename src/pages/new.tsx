import { CheckCircleIcon as Outline } from "@heroicons/react/24/outline";
import { CheckCircleIcon as Solid } from "@heroicons/react/20/solid";
import React, { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import NewListingStep1 from "@/components/NewListingStep1";
import NewListingStep2 from "@/components/NewListingStep2";
import NewListingStep2Half from "@/components/NewListingStep2Half";

const New = () => {
  const [step, setStep] = useState("step 1");

  return (
    <div className="w-full h-[100vh]">
      <div className="w-full h-auto pt-3">
        <div
          id="stepsBar"
          className="w-full h-auto flex items-center justify-center"
        >
          {step === "step 1" && (
            <>
              <Outline className="h-8 w-8 text-indigo-600" />
              <div className="w-[6rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[6rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
            </>
          )}
          {step === "step 2" && (
            <>
              <Solid className="w-8 h-8 text-indigo-600" />
              <div className="min-w-[6rem] h-2 bg-indigo-600"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[6rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
            </>
          )}
          {step === "step 2.5" && (
            <>
              <Solid className="w-8 h-8 text-indigo-600" />
              <div className="min-w-[6rem] h-2 bg-indigo-600"></div>
              <Outline className="h-8 w-8 text-indigo-600" />
              <div className="w-[6rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
            </>
          )}
          {step === "step 3" && (
            <>
              <Solid className="w-8 h-8 text-indigo-600" />
              <div className="min-w-[6rem] h-2 bg-indigo-600"></div>
              <Solid className="w-8 h-8 text-indigo-600" />
              <div className="min-w-[6rem] h-2 bg-indigo-600"></div>
              <Outline className="h-8 w-8 text-indigo-600" />
            </>
          )}
          {step === "step 4" && (
            <>
              <Solid className="w-8 h-8 text-indigo-600" />
              <div className="min-w-[6rem] h-2 bg-indigo-600"></div>
              <Solid className="w-8 h-8 text-indigo-600" />
              <div className="min-w-[6rem] h-2 bg-indigo-600"></div>
              <Solid className="w-8 h-8 text-indigo-600" />
            </>
          )}
        </div>

        <div
          id="stepsBarLabels"
          className="w-full h-auto flex items-center justify-center text-[14px] space-x-[5rem] border-b-[0.1rem] shadow-md -mb-[10px]"
        >
          <div className="">Location</div>
          <div className="pr-1">Details</div>
          <div className="">Review</div>
        </div>
      </div>
      {step === "step 1" && <NewListingStep1 setStep={setStep} />}
      {step === "step 2" && <NewListingStep2 setStep={setStep} />}
      {step === "step 2.5" && <NewListingStep2Half setStep={setStep} />}
    </div>
  );
};

export default New;
