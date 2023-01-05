import React, {
  Fragment,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import Divider from "../newListingComponents/formComponents/Divider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Pagination } from "swiper";
import image0 from "../../../public/assets/images/preview/0.jpg";
import image1 from "../../../public/assets/images/preview/1.jpg";
import image2 from "../../../public/assets/images/preview/2.jpg";
import image3 from "../../../public/assets/images/preview/3.jpg";
import image4 from "../../../public/assets/images/preview/4.jpg";
import image5 from "../../../public/assets/images/preview/5.jpg";
import image6 from "../../../public/assets/images/preview/6.jpg";
import image7 from "../../../public/assets/images/preview/7.jpg";
import image8 from "../../../public/assets/images/preview/8.jpg";
import PhotosModal from "./PhotosModal";
import ProfilePlaceholder from "../../../public/assets/images/ProfilePlaceholder.avif";

import { useSelectedListing } from "@/stores/useSelectedListing";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { type GetNeighborhoodOutput } from "@/server/trpc/router/map";
import useWindowSize from "@/hooks/useWindowSize";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  listing: GetNeighborhoodOutput["listingLocations"][number]["listings"][number];
};

const previewImages = [
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

const SlideOver = ({ open, setOpen, listing }: Props) => {
  const [selected, setSelected] = useState("Contacto");
  const [openPhotos, setOpenPhotos] = useState(false);
  const listingAddress = useSelectedListing((state) => state.listingAddress);
  const neighborhood = useSelectedListing((state) => state.neighborhood);
  const direction = useSelectedListing((state) => state.direction);
  const router = useRouter();

  // console.log("LISTING:", listing);

  const onClose = () => {
    router.push(router.pathname, undefined, { shallow: true });
  };

  SwiperCore.use([Pagination]);

  const buildingAmenities = useMemo(() => {
    const buildingAmenities =
      (listing.listingDetail?.buildingAmenities as string[]) || [];

    const half = Math.ceil(buildingAmenities.length / 2);
    const firstHalf = buildingAmenities.slice(0, half);
    const secondHalf = buildingAmenities.slice(half);

    return [firstHalf, secondHalf];
  }, [listing.listingDetail?.buildingAmenities]);

  const interiorAmenities = useMemo(() => {
    const interiorAmenities =
      (listing.listingDetail?.interiorAmenities as string[]) || [];

    if (interiorAmenities.length === 0) return [];
    const intHalf = Math.ceil(interiorAmenities.length / 2);
    const intFirstHalf = interiorAmenities.slice(0, intHalf);
    const intSecondHalf = interiorAmenities.slice(intHalf);

    return [intFirstHalf, intSecondHalf];
  }, [listing.listingDetail?.interiorAmenities]);

  const width = useWindowSize();

  let is2xl;
  if (width) is2xl = width > 1536;

  const showCarousel =
    direction === "right" || (!is2xl && direction === "left");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div
          className={`pointer-events-none fixed inset-y-0 ${
            direction === "left" ? "left-0" : "right-0"
          } flex max-w-full`}
        >
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom={
              direction === "left" ? "-translate-x-full" : "translate-x-full"
            }
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo={
              direction === "left" ? "-translate-x-full" : "translate-x-full"
            }
          >
            <Dialog.Panel
              className={`pointer-events-auto mt-[5.1rem] w-screen ${
                direction === "left"
                  ? "lg:max-w-[calc(100vw-574px)]"
                  : "lg:max-w-[calc(575px)]"
              } xl:mt-[5.1rem] `}
            >
              <div
                id="Start"
                className={`h-[calc(100vh-48px-35.19px)] w-full scroll-mt-[100rem] overflow-auto scroll-smooth bg-white md:scroll-mt-[32rem] ${
                  direction === "left"
                    ? "2xl:flex 2xl:h-[calc(100vh-48px-33.19px)]"
                    : ""
                }`}
              >
                {openPhotos && (
                  <PhotosModal
                    openPhotos={openPhotos}
                    setOpenPhotos={setOpenPhotos}
                    photos={previewImages}
                  />
                )}

                {showCarousel && (
                  <div className="absolute right-0 z-10 mt-3 mr-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-black"
                      onClick={() => {
                        onClose();
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                )}

                {showCarousel && (
                  <div
                    id="imagesAndTopElement"
                    className="w-full bg-black bg-opacity-10"
                  >
                    <Swiper
                      pagination={{ type: "fraction" }}
                      spaceBetween={0}
                      slidesPerView={1}
                      // allowTouchMove={false}
                      // navigation={true}
                    >
                      <div className="border-1 absolute top-0 z-[50] ml-3 mt-3 h-auto w-auto rounded-lg bg-black bg-opacity-60 px-3 pb-0.5 pt-0.5 font-bold text-white">
                        {listing.listingType[0] +
                          listing.listingType.slice(1).toLocaleLowerCase()}
                      </div>
                      {previewImages.map((image, idx) => (
                        <SwiperSlide
                          key={idx}
                          // draggable={false}
                          className="max-h-[16rem] w-full md:max-h-[25.5rem]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenPhotos(true);
                          }}
                        >
                          <Image
                            className={`${
                              direction === "left"
                                ? "md:max-h-[25.5rem]"
                                : "md:max-h-[18rem]"
                            } max-h-[15.5rem] object-cover`}
                            src={image}
                            alt={idx.toString()}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                {is2xl && direction === "left" && (
                  <div
                    className="w-full overflow-y-auto bg-white 2xl:h-[calc(100vh-33.59px-50px)] 2xl:overflow-y-auto"
                    onClick={() => {
                      setOpenPhotos(false);
                    }}
                  >
                    {previewImages &&
                      previewImages.map((image, idx) => (
                        <Image
                          className="mb-2"
                          key={idx}
                          src={image}
                          alt={idx.toString()}
                        />
                      ))}
                  </div>
                )}

                <div>
                  {is2xl && direction === "left" && (
                    <div className="z-40 flex h-[3rem] w-full justify-end border-r-2 pt-3 pb-10">
                      <button
                        type="button"
                        className="mr-3 h-7 rounded-md border-2 bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-black"
                        onClick={() => {
                          onClose();
                          setOpen(false);
                        }}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  <div
                    id="firstInfoAndNavBar"
                    className={`sticky top-0 z-30 -mt-[6px] bg-white md:py-2 lg:border-r-2 ${
                      direction === "left" ? "2xl:py-0" : ""
                    }`}
                  >
                    <div className="flex flow-root items-end px-3">
                      <div className="flex-1">
                        <div>
                          <div className="flex justify-end">
                            <div className="flex w-full justify-between">
                              <h3 className=" text-xl font-bold text-gray-900 md:text-2xl">
                                ${listing.price.toLocaleString()}
                              </h3>

                              <h3 className="mt-1 flex text-sm md:text-[16px]">
                                <b>{listing.bedrooms}</b>bd |{" "}
                                <b className="ml-1">{listing.fullBathrooms}</b>
                                fba |
                                {listing.halfBathrooms > 0 && (
                                  <span>
                                    <b className="ml-1">
                                      {listing.halfBathrooms}
                                    </b>
                                    hba |
                                  </span>
                                )}
                                <b className="mx-1">{listing.meters}</b>
                                metros
                                <sup className="mt-2.5">2</sup>
                              </h3>
                            </div>
                          </div>

                          <div className="flex">
                            <p className="block text-base text-gray-500 md:text-xl">
                              {neighborhood} -{" "}
                              {listing.visibility === "HIDDEN"
                                ? "Dirección no disponible"
                                : listingAddress}
                            </p>
                            <span className="absolute right-0 mr-3 mt-0.5">
                              mant.
                              <span className="ml-2 font-bold">
                                {listing.maintenance.toLocaleString()}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div
                      id="Navbar"
                      className={`flex justify-evenly bg-white pt-2 text-sm md:pt-3 ${
                        direction === "left" ? "md:text-xl" : "md:text-lg"
                      }`}
                    >
                      <a
                        href="#Contacto"
                        className={`inline pb-2 md:pb-3 ${
                          selected === "Contacto"
                            ? "border-b-2 border-indigo-600 text-indigo-500"
                            : ""
                        }`}
                        onClick={() => setSelected("Contacto")}
                      >
                        Contacto
                      </a>
                      <a
                        href="#Descripción"
                        className={`inline pb-2 md:pb-3 ${
                          selected === "Descripción"
                            ? "border-b-2 border-indigo-600 text-indigo-500"
                            : ""
                        }`}
                        onClick={() => setSelected("Descripción")}
                      >
                        Descripción
                      </a>
                      <a
                        href="#Propiedad"
                        className={`inline pb-2 md:pb-3 ${
                          selected === "Propiedad"
                            ? "border-b-2 border-indigo-600 text-indigo-500"
                            : ""
                        }`}
                        onClick={() => setSelected("Propiedad")}
                      >
                        Propiedad
                      </a>
                      <a
                        href="#Interior"
                        className={`inline pb-2 md:pb-3 ${
                          selected === "Interior"
                            ? "border-b-2 border-indigo-600 text-indigo-500"
                            : ""
                        }`}
                        onClick={() => setSelected("Interior")}
                      >
                        Interior
                      </a>
                      {showCarousel && (
                        <a
                          href="#Start"
                          className={`inline pb-2 md:pb-3 ${
                            selected === "Start"
                              ? "border-b-2 border-indigo-600 text-indigo-500"
                              : ""
                          }`}
                          onClick={() => setSelected("Start")}
                        >
                          Start
                        </a>
                      )}
                    </div>
                    <Divider />
                  </div>

                  <div
                    id="detailsContainer"
                    className={`h-[calc(100vh-48px-35.19px-52px-32px)] w-full overflow-auto scroll-smooth bg-white md:h-[calc(100vh-58px-94.59px-55.59px)] lg:border-r-2 ${
                      direction === "left"
                        ? "2xl:h-[calc(100vh-60px-54px-33.59px-48px-52px)] 2xl:overflow-y-auto"
                        : ""
                    }`}
                  >
                    <div className="px-4 py-1">
                      <div
                        id="Contacto"
                        className={`mb-3 flex scroll-mt-[100rem] flex-col ${
                          direction === "left" ? "md:flex-row" : "md:flex-col"
                        }`}
                      >
                        <div className="flex h-auto w-[30rem] lg:w-[20rem] xl:w-[30rem]">
                          <div className="mt-0.5 inline-flex h-full max-w-[10rem] overflow-hidden rounded-full border-4 border-white md:mt-1 md:w-[7rem]">
                            {/* <div className="inline-flex overflow-hidden rounded-full border-4 border-white w-[5rem] h-full md:w-[7rem]"> */}
                            <Image
                              className="h-[5rem] w-[5rem] md:h-[6.5rem] md:w-[6.5rem]"
                              // className="w-[6.5rem] h-[6.5rem]"
                              src={ProfilePlaceholder}
                              alt="profile"
                              // width={100}
                              // height={100}
                            />
                          </div>

                          <div className="mt-2 max-w-[10rem] flex-1 md:ml-3 md:mt-4">
                            <div className="mt-3">
                              <div className="-mb-1 flex items-center">
                                <h3 className="text-xl text-lg font-bold text-gray-900 md:text-xl">
                                  Ashley Porter
                                </h3>
                                <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                  <span className="sr-only">Online</span>
                                </span>
                              </div>
                              <p className="inline text-sm text-gray-500 md:text-lg">
                                @ashleyporter
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`mt-2 flex w-full flex-col flex-wrap space-y-1 text-sm md:space-y-2 md:text-lg ${
                            direction === "left"
                              ? "lg:max-w-[13rem] lg:items-center"
                              : ""
                          } xl:max-w-none ${
                            !showCarousel ? "2xl:max-w-[18rem]" : ""
                          }`}
                        >
                          <button
                            type="button"
                            className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2  font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
                          >
                            Request a tour
                          </button>
                          <button
                            type="button"
                            className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2  font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            407-913-2390
                          </button>
                        </div>
                      </div>

                      <dl id="Descripción" className="space-y-8">
                        <div className="flex flex-col">
                          <dt className="w-40 flex-shrink-0 pt-3 text-sm font-medium text-gray-500 md:text-lg">
                            Descripción
                          </dt>
                          <dd className="col-span-2 mt-1 mt-0 text-sm text-gray-900 md:text-lg">
                            <div className="mt-2 text-[16px] font-semibold">
                              {listing.propertyType[0] +
                                listing.propertyType
                                  .slice(1)
                                  .toLocaleLowerCase()}{" "}
                              - {listing.condition}
                            </div>
                            <p className="mt-2 text-[16px]">
                              {listing.bio
                                ? listing.bio
                                : "Lorem ipsum dolor sit amet consectetur adipisicingelit. Dolor autem eum, eaque enim alias, laudantium totam sed quam similique omnis quidem provident doloribus optio labore esse consequatur magni? Voluptas."}
                            </p>
                          </dd>
                        </div>

                        <Divider />
                        <div id="Propiedad">
                          <dt className="w-40 flex-shrink-0 pt-3 text-sm font-medium text-gray-500 md:text-lg">
                            Property Amenities
                          </dt>
                          <div className="mt-2 flex w-full ">
                            <div className="text-md flex w-[50%] flex-col md:text-lg">
                              {buildingAmenities[0]?.map((amen) => (
                                <div
                                  key={amen}
                                  className="mt-1 w-fit max-w-[100%] rounded-md border-[1px] border-indigo-600 py-1 px-2"
                                >
                                  {amen}
                                </div>
                              ))}
                            </div>
                            <div className="text-md ml-1 flex w-[50%] flex-col md:text-lg">
                              {buildingAmenities[1]?.map((amen) => (
                                <div
                                  key={amen}
                                  className="mt-1 w-fit max-w-[100%] rounded-md border-[1px] border-indigo-600 py-1  px-2"
                                >
                                  {amen}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Divider />
                        <div id="Interior">
                          <dt className="w-40 flex-shrink-0 pt-3 text-sm font-medium text-gray-500 md:text-lg">
                            Interior Amenities
                          </dt>
                          <div className="mt-2 flex w-full ">
                            <div className="text-md flex w-[50%] flex-col md:text-lg">
                              {interiorAmenities[0]?.map((amen) => (
                                <div
                                  key={amen}
                                  className="mt-1 w-fit max-w-[100%] rounded-md border-[1px] border-indigo-600 py-1 px-2"
                                >
                                  {amen}
                                </div>
                              ))}
                            </div>
                            <div className="text-md ml-1 flex w-[50%] flex-col md:text-lg">
                              {interiorAmenities[1]?.map((amen) => (
                                <div
                                  key={amen}
                                  className="mt-1 w-fit max-w-[100%] rounded-md border-[1px] border-indigo-600 py-1  px-2"
                                >
                                  {amen}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Divider />
                        {/* <div id="Exterior">
                        <dt className="w-40 flex-shrink-0 pt-3 text-sm font-medium text-gray-500 md:text-lg">
                          Exterior Amenities
                        </dt>
                        <div className="text-md mt-2 flex flex-col flex-wrap space-y-1 md:text-lg">
                          {newListing.selectedExteriorAmenities.map((amen) => (
                            <div
                              key={amen}
                              className="w-fit rounded-md border-[1px] border-indigo-600 py-1 px-2"
                            >
                              {amen}
                            </div>
                          ))}
                        </div>
                      </div> */}
                      </dl>
                    </div>
                    <div className="flex h-full items-center justify-center">
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

export default SlideOver;
