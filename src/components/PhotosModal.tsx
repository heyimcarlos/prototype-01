import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";

export default function PhotosModal({ setOpenPhotos, openPhotos, photos }) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={openPhotos} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={() => setOpenPhotos(false)}
        onClick={() => setOpenPhotos(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-1">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {/* <div className="h-auto w-full">
                  <div
                    className="w-7 h-7 bg-gray-300 absolute right-0 top-0 mr-3 mt-3 rounded-md flex justify-center items-center border-[1px] border-black"
                    onClick={() => setOpenPhotos(false)}
                  >
                    <ArrowsPointingInIcon className="w-5 h-5" />
                  </div>
                </div> */}
                <div
                  className="w-full h-full bg-white"
                  onClick={() => {
                    setOpenPhotos(false);
                  }}
                >
                  {photos &&
                    photos.map((image, idx) => (
                      <Image key={idx} src={image} alt={idx} />
                    ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
