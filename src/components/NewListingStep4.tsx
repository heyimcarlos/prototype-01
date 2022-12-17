import React from "react";

import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { useState } from "react";

import { useNewListing } from "@/stores/useNewListing";
import Divider from "./Divider";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Pagination } from "swiper";
import image0 from "../../public/assets/images/preview/0.jpg";
import image1 from "../../public/assets/images/preview/1.jpg";
import image2 from "../../public/assets/images/preview/2.jpg";
import image3 from "../../public/assets/images/preview/3.jpg";
import image4 from "../../public/assets/images/preview/4.jpg";
import image5 from "../../public/assets/images/preview/5.jpg";
import image6 from "../../public/assets/images/preview/6.jpg";
import image7 from "../../public/assets/images/preview/7.jpg";
import image8 from "../../public/assets/images/preview/8.jpg";
import PhotosModal from "./PhotosModal";
import ProfilePlaceholder from "../../public/assets/images/ProfilePlaceholder.avif";

const NewListingStep4 = ({ setStep }) => {
  const newListingState = useNewListing((state) => state);
  const [selected, setSelected] = useState("Contacto");
  const newListing = useNewListing((state) => state);
  const [openPhotos, setOpenPhotos] = useState(false);
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

  SwiperCore.use([Pagination]);

  // console.log("openPhotos", openPhotos);

  const half = Math.ceil(newListing.selectedBuildingAmenities.length / 2);
  const firstHalf = newListing.selectedBuildingAmenities.slice(0, half);
  const secondHalf = newListing.selectedBuildingAmenities.slice(half);
  const intHalf = Math.ceil(newListing.selectedInteriorAmenities.length / 2);
  const intFirstHalf = newListing.selectedInteriorAmenities.slice(0, intHalf);
  const intSecondHalf = newListing.selectedInteriorAmenities.slice(intHalf);

  return (
    <div
      id="start"
      className="h-[calc(100vh-55.59px)] md:h-[calc(100vh-82.59px)] w-full overflow-auto scroll-smooth scroll-mt-[22rem] md:scroll-mt-[32rem] mt-[1px] md:mt-[2px]"
    >
      {openPhotos && (
        <PhotosModal
          openPhotos={openPhotos}
          setOpenPhotos={setOpenPhotos}
          photos={previewImages}
        />
      )}

      <div id="imagesAndTopElement" className="w-full">
        <div className="w-full flex justify-center space-x-6 pb-1.5 absolute mt-3 z-20 md:text-xl">
          <div className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl">
            Save & Exit
          </div>
          <div
            className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
            onClick={() => setStep("step 3")}
          >
            Back
          </div>
          <div
            className="rounded-lg py-1 md:py-2 px-2 md:px-4 bg-indigo-600 text-white shadow-xl"
            onClick={() => setStep("step 4")}
          >
            Publish
          </div>
        </div>
        <Swiper
          pagination={{ type: "fraction" }}
          spaceBetween={0}
          slidesPerView={1}
        >
          {previewImages.map((image, idx) => (
            <SwiperSlide
              key={idx}
              draggable={false}
              className="max-h-[16rem] md:max-h-[25.5rem] w-full"
              onClick={(e) => {
                e.stopPropagation();
                setOpenPhotos(true);
              }}
            >
              <Image
                className="max-h-[15.5rem] md:max-h-[25.5rem] object-cover"
                src={image}
                alt={idx.toString()}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        id="firstInfoAndNavBar"
        className="bg-white sticky top-0 z-30 -mt-[6px] md:py-2"
      >
        <div className="flow-root flex items-end px-4">
          <div className="flex-1">
            <div>
              <div className="flex justify-end">
                <div className="flex justify-between w-full">
                  <h3 className="text-xl font-bold text-gray-900 mt-[0.15rem] md:text-2xl">
                    ${newListingState.price.toLocaleString()}
                  </h3>

                  <h3 className=" pt-2 md:pt-1 text-sm flex md:text-xl">
                    <b>{newListingState.bedrooms}</b> bd |{" "}
                    <b className="ml-1">
                      {newListingState.fullBathrooms +
                        newListingState.halfBathrooms}
                    </b>{" "}
                    ba |<b className="mx-1">{newListingState.meters}</b>
                    metros
                    <sup className="mt-2.5">2</sup>
                  </h3>
                </div>
              </div>

              <p className="block text-md text-gray-500 mt-1 md:text-xl">
                {newListingState.sector} -{" "}
                {newListingState.hide
                  ? "Dirección no disponible"
                  : newListingState.name}
                <span className="ml-2">{}</span>
              </p>
            </div>
          </div>
        </div>
        <Divider />
        <div
          id="Navbar"
          className="flex justify-evenly pt-2 bg-white md:pt-3 text-sm md:text-xl"
        >
          <a
            href="#Contacto"
            className={`inline pb-2 md:pb-3 ${
              selected === "Contacto"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-500"
                : ""
            }`}
            onClick={() => setSelected("Contacto")}
          >
            Contacto
          </a>
          <a
            href="#Descripción"
            className={`inline   ${
              selected === "Descripción"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-500"
                : ""
            }`}
            onClick={() => setSelected("Descripción")}
          >
            Descripción
          </a>
          <a
            href="#Propiedad"
            className={`inline   ${
              selected === "Propiedad"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-500"
                : ""
            }`}
            onClick={() => setSelected("Propiedad")}
          >
            Propiedad
          </a>
          <a
            href="#Interior"
            className={`inline   ${
              selected === "Interior"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-500"
                : ""
            }`}
            onClick={() => setSelected("Interior")}
          >
            Interior
          </a>
          <a
            href="#start"
            className={`inline ${
              selected === "start"
                ? "border-b-2 border-indigo-600 font-medium text-indigo-500"
                : ""
            }`}
            onClick={() => setSelected("start")}
          >
            Start
          </a>
        </div>
        <Divider />
      </div>

      <div
        id="detailsContainer"
        className="h-[calc(100vh-38px-54.39px-55.59px)] md:h-[calc(100vh-58px-94.59px-55.59px)] w-full overflow-auto scroll-smooth"
      >
        <div className="px-4 py-1">
          <div
            id="Contacto"
            className="mb-3 scroll-mt-[30rem] flex flex-col md:flex-row"
          >
            <div className="flex w-[30rem] h-auto">
              <div className="inline-flex overflow-hidden rounded-full border-4 border-white max-w-[10rem] h-full md:w-[7rem] mt-0.5 md:mt-1">
                {/* <div className="inline-flex overflow-hidden rounded-full border-4 border-white w-[5rem] h-full md:w-[7rem]"> */}
                <Image
                  className="w-[5rem] h-[5rem] md:w-[6.5rem] md:h-[6.5rem]"
                  // className="w-[6.5rem] h-[6.5rem]"
                  src={ProfilePlaceholder}
                  alt="profile"
                  // width={100}
                  // height={100}
                />
              </div>

              <div className="mt-1 flex-1 md:ml-3 md:mt-4">
                <div className="mt-3">
                  <div className="flex items-center -mb-1">
                    <h3 className="text-xl font-bold text-gray-900 text-lg md:text-xl">
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
            <div className="mt-2 w-full flex flex-col flex-wrap space-y-1 md:space-y-2 text-sm md:text-lg">
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
              <dt className="text-sm font-medium text-gray-500 w-40 flex-shrink-0 pt-3 md:text-lg">
                Descripción
              </dt>
              <dd className="mt-1 text-sm text-gray-900 col-span-2 mt-0 ml-6 md:text-lg">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  autem eum, eaque enim alias, laudantium totam sed quam
                  similique omnis quidem provident in doloribus optio labore
                  esse consequatur magni? Voluptas.
                </p>
              </dd>
            </div>

            <Divider />
            <div id="Propiedad">
              <dt className="text-sm font-medium text-gray-500 w-40 flex-shrink-0 pt-3 md:text-lg">
                Property Amenities
              </dt>
              <div className="w-full flex mt-2 ">
                <div className="w-[50%] flex flex-col text-md md:text-lg">
                  {firstHalf.map((amen) => (
                    <div
                      key={amen}
                      className="w-fit border-[1px] border-indigo-600 py-1 px-2 rounded-md mt-1 max-w-[100%]"
                    >
                      {amen}
                    </div>
                  ))}
                </div>
                <div className="w-[50%] flex flex-col ml-1 text-md md:text-lg">
                  {secondHalf.map((amen) => (
                    <div
                      key={amen}
                      className="w-fit border-[1px] border-indigo-600 py-1 px-2 rounded-md mt-1  max-w-[100%]"
                    >
                      {amen}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Divider />
            <div id="Interior">
              <dt className="text-sm font-medium text-gray-500 w-40 flex-shrink-0 pt-3 md:text-lg">
                Interior Amenities
              </dt>
              <div className="w-full flex mt-2 ">
                <div className="w-[50%] flex flex-col text-md md:text-lg">
                  {intFirstHalf.map((amen) => (
                    <div
                      key={amen}
                      className="w-fit border-[1px] border-indigo-600 py-1 px-2 rounded-md mt-1 max-w-[100%]"
                    >
                      {amen}
                    </div>
                  ))}
                </div>
                <div className="w-[50%] flex flex-col ml-1 text-md md:text-lg">
                  {intSecondHalf.map((amen) => (
                    <div
                      key={amen}
                      className="w-fit border-[1px] border-indigo-600 py-1 px-2 rounded-md mt-1  max-w-[100%]"
                    >
                      {amen}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Divider />
            <div id="Exterior">
              <dt className="text-sm font-medium text-gray-500 w-40 flex-shrink-0 pt-3 md:text-lg">
                Exterior Amenities
              </dt>
              <div className="flex flex-col flex-wrap mt-2 space-y-1 text-md md:text-lg">
                {newListing.selectedExteriorAmenities.map((amen) => (
                  <div
                    key={amen}
                    className="w-fit border-[1px] border-indigo-600 py-1 px-2 rounded-md"
                  >
                    {amen}
                  </div>
                ))}
              </div>
            </div>
          </dl>
        </div>
        <div className="h-full flex justify-center items-center">
          Legal info about ntornos
        </div>
      </div>
    </div>
  );
};

export default NewListingStep4;
