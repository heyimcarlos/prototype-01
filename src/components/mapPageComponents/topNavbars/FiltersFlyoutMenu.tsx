import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import useWindowSize from "@/hooks/useWindowSize";

import {
  AdjustmentsHorizontalIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import RangeSlider from "./Slider";
import Slider from "./Slider";

export default function FiltersFlyoutMenu() {
  const width = useWindowSize();

  let isMobile;

  if (width) {
    isMobile = width < 425;
  }

  return (
    <>
      <Popover
        className={`${isMobile ? "inline" : "-ml-[0.5px]"} sm:ml-1`}
        //
      >
        <>
          <Popover.Button
            className={`text-gray-500 px-2 border-2 rounded-xl bg-white text-base font-medium hover:text-gray-900`}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`fixed z-[51] left-0 -mt-8 w-full transform px-0.5 sm:px-1`}
            >
              {/* <Popover.Button className=" absolute z-[51] right-0 mr-2 mt-1 justify-end rounded-full border-2 border-black">
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </Popover.Button> */}

              {/* <Formik */}
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative flex flex-wrap bg-white pl-2 gap-1 py-3 sm:p-1 ">
                  <form>
                    <RangeSlider
                      min={0}
                      max={30000000}
                      step={100000}
                      //
                    />
                  </form>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </>
  );
}
