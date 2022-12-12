const NewListingStep3 = ({ setStep }) => {
  return (
    <div className="w-full h-[calc(100vh-68px)]">
      <div className="w-full flex justify-center space-x-6 py-3">
        <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
          Save & Exit
        </div>
        <div
          className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 2.5")}
        >
          Back
        </div>
        <div
          className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
          onClick={() => setStep("step 4")}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default NewListingStep3;
