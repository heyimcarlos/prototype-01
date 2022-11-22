import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import house from "../../public/assets/images/house1.jpeg";
import { useState } from "react";
import { Listing } from "@prisma/client";

type SingleViewSlideOverTypes = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listing: Listing;
};

const SingleViewSlideOver = ({
  open,
  setOpen,
  listing,
}: SingleViewSlideOverTypes) => {
  const [selected, setSelected] = useState("");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setSelected("")}
        // onClose={setOpen}
      >
        <div className="fixed">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full h-[calc(100vh-48px-33.4px)] bottom-0 fixed">
                  <div className="flex h-full w-full flex-col bg-white">
                    <div className="w-full h-auto">
                      <div className="fixed z-10 right-0 mt-3 mr-3 flex h-7 items-center">
                        <button
                          type="button"
                          className=" mr-1 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-black"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <Image src={house} alt="house1" />
                    </div>

                    <div className="divide-y divide-gray-200 h-full w-full">
                      <div className="pb-4">
                        <div className="flow-root flex items-end px-4">
                          <div className="flex-1">
                            <div>
                              <div className="flex justify-end">
                                <div className="flex justify-start w-full">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl mt-[0.15rem]">
                                    ${listing.price.toLocaleString()}
                                  </h3>
                                  <p className="inline text-md text-gray-600 mt-[0.4rem] ml-3">
                                    <b>
                                      $
                                      {Math.floor(
                                        listing.price / listing.squareFeet
                                      ).toLocaleString()}
                                    </b>{" "}
                                    / sqft
                                  </p>
                                </div>
                                <h3 className="mt-1 text-sm">
                                  <HeartIcon className="ml-2 h-6 w-6 inline text-indigo-600" />
                                </h3>
                                <h3 className="mt-1 text-sm">
                                  <ShareIcon className="ml-2 h-6 w-6 inline text-indigo-600" />
                                </h3>
                              </div>
                              <h3 className=" pt-2 text-sm flex">
                                <b>{listing.bedrooms}</b> bd |{" "}
                                <b className="ml-1">
                                  {listing.fullBathrooms +
                                    listing.halfBathrooms}
                                </b>{" "}
                                ba |<b className="ml-1">{listing.squareFeet}</b>{" "}
                                sqft
                              </h3>
                              <p className="block text-md text-gray-500 mt-2">
                                2034 49th St, Kissimmee, FL 34744
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="inline flex justify-evenly">
                        <a
                          href="#Contact"
                          className={`inline ${
                            selected === "Contact"
                              ? "border-b-2 border-indigo-600"
                              : ""
                          }`}
                          onClick={() => setSelected("Contact")}
                        >
                          Contact
                        </a>
                        <a
                          href="#features"
                          className={`inline ${
                            selected === "features"
                              ? "border-b-2 border-indigo-600"
                              : ""
                          }`}
                          onClick={() => setSelected("features")}
                        >
                          Features
                        </a>
                        <a
                          href="#overview"
                          className={`inline  ${
                            selected === "overview"
                              ? "border-b-2 border-indigo-600"
                              : ""
                          }`}
                          onClick={() => setSelected("overview")}
                        >
                          Overview
                        </a>
                        <a
                          href="#details"
                          className={`inline  ${
                            selected === "details"
                              ? "border-b-2 border-indigo-600"
                              : ""
                          }`}
                          onClick={() => setSelected("details")}
                        >
                          Details
                        </a>
                      </div>

                      <div className="h-full w-full overflow-auto scroll-smooth">
                        <div className="px-4 py-1 sm:px-0 sm:py-0 overflow-auto ">
                          <div id="Contact">
                            <div className="flex w-full h-auto">
                              <div className="inline-flex overflow-hidden rounded-full border-4 border-white w-[5rem] h-full">
                                <Image
                                  // className="h-15 w-15 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48 "
                                  src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                  alt="profile"
                                  width={100}
                                  height={100}
                                />
                              </div>

                              <div className="mt-1 flex-1">
                                <div className="mt-3">
                                  <div className="flex items-center -mb-1">
                                    <h3 className="text-xl font-bold text-gray-900 text-lg">
                                      Ashley Porter
                                    </h3>
                                    <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                      <span className="sr-only">Online</span>
                                    </span>
                                  </div>
                                  <p className="inline text-sm text-gray-500 ">
                                    @ashleyporter
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap space-y-1 sm:space-y-0 sm:space-x-3">
                              <button
                                type="button"
                                className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
                              >
                                Request a tour
                              </button>
                              <button
                                type="button"
                                className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                407-913-2390
                              </button>
                            </div>
                          </div>
                          <dl
                            id="features"
                            className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 overflow-auto mt-9"
                          >
                            <div className="sm:flex sm:px-6 sm:my-5 overflow-auto">
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Bio
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                <p>
                                  Enim feugiat ut ipsum, neque ut. Tristique mi
                                  id elementum praesent. Gravida in tempus
                                  feugiat netus enim aliquet a, quam
                                  scelerisque. Dictumst in convallis nec in
                                  bibendum aenean arcu.
                                </p>
                              </dd>
                            </div>
                            <div
                              id="overview"
                              className="sm:flex sm:px-6 sm:py-5"
                            >
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Location
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                New York, NY, USA
                              </dd>
                            </div>
                            <div
                              id="details"
                              className="sm:flex sm:px-6 sm:py-5 "
                            >
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Website
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                ashleyporter.com
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div className="h-full flex justify-center items-center">
                          Legal info about ntornos
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SingleViewSlideOver;
