import { CheckCircleIcon as Outline } from "@heroicons/react/24/outline";
import { CheckCircleIcon as Solid } from "@heroicons/react/20/solid";
import React, { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import NewListingStep1 from "@/components/NewListingStep1";
import NewListingStep2 from "@/components/NewListingStep2";
import NewListingStep2Half from "@/components/NewListingStep2Half";
import NewListingStep3 from "@/components/NewListingStep3";
import NewListingStep4 from "@/components/NewListingStep4";

const New = () => {
  const [step, setStep] = useState("step 1");

  return (
    <div className="w-full h-[100vh] overflow-y-auto" draggable={false}>
      <div className="w-full pt-1">
        <div
          id="stepsBar"
          className="w-full h-auto flex items-center justify-center"
        >
          {step === "step 1" && (
            <>
              <Outline className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
            </>
          )}
          {step === "step 2" && (
            <>
              <Solid className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-600"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
            </>
          )}
          {step === "step 2.5" && (
            <>
              <Solid className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-600"></div>
              <Outline className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
            </>
          )}
          {step === "step 3" && (
            <>
              <Solid className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-600"></div>
              <Solid className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-600"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
              <div className="w-[4rem] h-2 bg-indigo-200"></div>
              <Outline className="h-8 w-8 text-indigo-300" />
            </>
          )}
          {step === "step 4" && (
            <>
              <Solid className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-600"></div>
              <Solid className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-600"></div>
              <Solid className="h-8 w-8 text-indigo-600" />
              <div className="w-[4rem] h-2 bg-indigo-600"></div>
              <Solid className="h-8 w-8 text-indigo-600" />
            </>
          )}
        </div>

        <div
          id="stepsBarLabels"
          className="w-full h-full shadow-md flex items-center justify-center text-[12px] space-x-[3.3rem] border-b-[0.1rem] -mb-[10px] -ml-[1px] "
        >
          <div className="">Location</div>
          <div className="pr-1">Details</div>
          <div className="">Photos</div>
          <div className="">Preview</div>
        </div>
      </div>
      {step === "step 1" && <NewListingStep1 setStep={setStep} />}
      {step === "step 2" && <NewListingStep2 setStep={setStep} />}
      {step === "step 2.5" && <NewListingStep2Half setStep={setStep} />}
      {step === "step 3" && <NewListingStep3 setStep={setStep} />}
      {step === "step 4" && <NewListingStep4 setStep={setStep} />}
    </div>
  );
};

export default New;
