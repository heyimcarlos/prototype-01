import React, { Fragment, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { SelectedListingState } from "@/stores/useSelectedListing";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import house from "../../public/assets/images/house1.jpeg";
import first from "../../public/assets/images/interior/first.webp";
import second from "../../public/assets/images/interior/second.webp";
import third from "../../public/assets/images/interior/third.webp";
import fourth from "../../public/assets/images/interior/fourth.webp";
import fifth from "../../public/assets/images/interior/fifth.webp";
import sixth from "../../public/assets/images/interior/sixth.webp";

const nums = [
  { id: 1, img: first },
  { id: 2, img: second },
  { id: 3, img: third },
  { id: 4, img: fourth },
  { id: 5, img: fifth },
  { id: 6, img: sixth },
];

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  listing: SelectedListingState["listing"];
};

const LeftSlideOver = ({ open, setOpen, listing }: Props) => {
  const [selected, setSelected] = useState("");

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setSelected("")}
      // onClose={setOpen}
      // onBlur={setLeftSlideOver(false)}
      >
        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="pointer-events-auto w-screen max-w-[82.5rem] mt-[5.25rem]">
              {/* <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl mt-[5.25rem]"> */}

              <div className="flex h-full w-full flex-row bg-white shadow-xl ">
                <div className=" w-[43rem] h-full overflow-auto">
                  <div className="max-w-[43rem]">
                    <Image
                      // className="h-20 w-10"
                      src={house}
                      // width={"100%"}
                      // height={"100%"}
                      alt="house1"
                    //   layout="fill"
                    />
                  </div>
                  {/* <div className="w-full h-full flex flex-row flex-wrap bg-white pl-[0.2rem]">
                    {nums.map((num) => {
                      return (
                        <div
                          // className="min-w-[20.5rem] max-w-[20.5rem] max-h-[10rem] min-h-[10rem] h-[10rem] pl-1 "
                          className="max-w-[15rem] max-h-[0rem] text-0"
                          key={num}
                        >
                          <Image
                            // className="h-20 w-10"
                            src={house}
                            // width="400%"
                            // height="400%"
                            alt="house1"
                            //   layout="fill"
                          />
                        </div>
                      );
                    })}
                  </div> */}
                  <Grid container>
                    {nums.map((num) => {
                      return (
                        <Grid
                          key={num.id}
                          xl={6}
                          className="max-w-[20.5rem] pl-[0.5rem]"
                          item
                        >
                          <Image
                            // className="h-20 w-10"
                            src={num.img}
                            // width="400%"
                            // height="400%"
                            alt="house1"
                          //   layout="fill"
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>

                <div className="fixed z-10 right-0 mt-3 mr-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-black"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="divide-y divide-gray-200 -mt-[0.35rem]">
                  <div className="pb-4">
                    <div className="flow-root px-4 -mt-9 sm:flex sm:items-end sm:px-6">
                      <div className="mt-7 sm:ml-0 sm:flex-1 pt-4">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                              ${listing.price}
                            </h3>
                            <h3 className="ml-4 pt-2 text-sm">
                              <b>4</b> bd | <b>3.5</b> ba | <b>1600</b> sqft
                            </h3>

                            <h3>
                              <HeartIcon className="ml-40 mr-1 -mt-1 h-6 w-6 inline text-indigo-600" />
                              Save
                            </h3>
                            <h3>
                              <ShareIcon className="ml-4 mr-1 -mt-1 h-6 w-6 inline text-indigo-600" />
                              Share
                            </h3>
                          </div>
                          <p className=" inline text-md text-gray-500 mt-2">
                            2034 49th St, Kissimmee, FL 34744
                          </p>
                          <p className="ml-[7.5rem] inline text-md text-gray-600 mt-2">
                            <b>$288.75</b> / sqft
                          </p>
                          <p className="ml-[1rem] inline text-md text-gray-600 mt-2">
                            <b>$1250</b> / mos
                          </p>
                        </div>
                        <div>
                          <div className="mt-3 flex">
                            <div className=" inline-flex overflow-hidden rounded-full border-4 border-white">
                              <Image
                                className="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48 "
                                src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                alt="profile"
                                width={95}
                                height={20}
                              />
                            </div>

                            <div className="mt-1 sm:ml-6 sm:flex-1">
                              <div>
                                <div className="flex items-center -mb-1">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
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
                              <div className="mt-2 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-evenly">
                    <a
                      href="#features"
                      className={`inline ${selected === "features"
                          ? "border-b-2 border-indigo-600"
                          : ""
                        }`}
                      onClick={() => setSelected("features")}
                    >
                      Features
                    </a>
                    <a
                      href="#overview"
                      className={`inline  ${selected === "overview"
                          ? "border-b-2 border-indigo-600"
                          : ""
                        }`}
                      onClick={() => setSelected("overview")}
                    >
                      Overview
                    </a>
                    <a
                      href="#details"
                      className={`inline  ${selected === "details"
                          ? "border-b-2 border-indigo-600"
                          : ""
                        }`}
                      onClick={() => setSelected("details")}
                    >
                      Details
                    </a>
                  </div>

                  <div className="h-full w-full overflow-auto scroll-smooth">
                    <div className="px-4 py-5 sm:px-0 sm:py-0 overflow-auto ">
                      <dl
                        id="features"
                        className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 overflow-auto "
                      >
                        <div className="sm:flex sm:px-6 sm:my-5 overflow-auto">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Bio
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                            <span>{listing.name}</span>
                            <p>{listing.description}</p>
                          </dd>
                        </div>
                        <div id="overview" className="sm:flex sm:px-6 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Location
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                            Kissimmee, FL, USA
                          </dd>
                        </div>
                        <div id="details" className="sm:flex sm:px-6 sm:py-5 ">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Website
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                            ashleyporter.com
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="h-[26.1rem] flex justify-center items-center bg-indigo-600">
                      Legal info about ntornos
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LeftSlideOver;
