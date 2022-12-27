import { type Dispatch, type SetStateAction } from "react";

type StepType = {
  setStep: Dispatch<SetStateAction<string>>;
};

const NewListingStep3 = ({ setStep }: StepType) => {
  return (
    <div className="w-full h-[calc(100vh-68px)]">
      <div className="h-[45rem] w-full">
        <div className="gap-4 pt-5 mt-10 px-2 flex flex-col justify-center items-center">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Photos
          </label>
          <div className="mt-1 col-span-2 mt-0">
            <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-auto h-auto flex flex-col items-center justify-center mt-14">
          <label htmlFor="description" className="w-1/3">
            Description
          </label>
          <textarea
            id="description"
            // type="text"
            className="w-1/3 h-[10rem] rounded-md"
          />
        </div>
      </div>
      <div className="w-full flex justify-center space-x-6 absolute bottom-0 mb-3 md:mb-6 md:text-2xl">
        {/* <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
          Save & Exit
        </div> */}
        <button
          className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 2.5")}
        >
          Back
        </button>
        <button
          className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 4")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NewListingStep3;
