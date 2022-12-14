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

  return (
    <div
      id="start"
      className="h-[calc(100vh-55.59px)] w-full overflow-auto scroll-smooth scroll-mt-[22rem] mt-[1px]"
    >
      {openPhotos && (
        <PhotosModal
          openPhotos={openPhotos}
          setOpenPhotos={setOpenPhotos}
          photos={previewImages}
        />
      )}

      <div id="imagesAndTopElement" className="w-full">
        <div className="w-full flex justify-center space-x-6 pb-1.5 absolute mt-3 z-20">
          <div className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl">
            Save & Exit
          </div>
          <div
            className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
            onClick={() => setStep("step 3")}
          >
            Back
          </div>
          <div
            className="rounded-lg py-1 px-2 bg-indigo-600 text-white shadow-xl"
            onClick={() => setStep("step 4")}
          >
            Publish
          </div>
        </div>
        <Swiper
          pagination={{ type: "fraction" }}
          spaceBetween={0}
          slidesPerView={1}
          onClick={() => setOpenPhotos(true)}
        >
          {previewImages.map((image, idx) => (
            <SwiperSlide
              key={idx}
              draggable={false}
              className="max-h-[16rem] w-full"
            >
              <Image
                className="max-h-[15.5rem] object-cover"
                src={image}
                alt={idx.toString()}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        id="firstInfoAndNavBar"
        className="bg-white sticky top-0 z-20 -mt-[2px]"
      >
        <div className="flow-root flex items-end px-4">
          <div className="flex-1">
            <div>
              <div className="flex justify-end">
                <div className="flex justify-between w-full">
                  <h3 className="text-xl font-bold text-gray-900 mt-[0.15rem]">
                    ${newListingState.price.toLocaleString()}
                  </h3>

                  <h3 className=" pt-2 text-sm flex">
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

              <p className="block text-md text-gray-500 mt2">
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
        <div id="Navbar" className="flex justify-evenly pt-2 bg-white">
          <a
            href="#Contacto"
            className={`inline text-sm pb-2 ${
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
            className={`inline text-sm pb-2 ${
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
            className={`inline text-sm pb-2 ${
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
            className={`inline text-sm pb-2 ${
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
            className={`inline text-sm pb-2 ${
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
        className="h-[calc(100vh-38px-54.39px-55.59px)] w-full overflow-auto scroll-smooth"
      >
        <div className="px-4 py-1 sm:px-0 sm:py-0 ">
          <div id="Contacto" className="mb-3 scroll-mt-[30rem]">
            <div className="flex w-full h-auto">
              <div className="inline-flex overflow-hidden rounded-full border-4 border-white w-[5rem] h-full">
                <Image
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
                  <p className="inline text-sm text-gray-500 ">@ashleyporter</p>
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

          <dl id="Descripción" className="space-y-8 overflow-auto ">
            <div className="flex flex-col overflow-auto">
              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 pt-3">
                Descripción
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
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
              <dt className="text-sm font-medium text-gray-500 w-40 flex-shrink-0 pt-3">
                Property Amenities
              </dt>
              <div className="flex flex-col flex-wrap mt-2 space-y-1">
                {newListing.selectedBuildingAmenities.map((amen) => (
                  <div
                    key={amen}
                    className="w-fit border-[1px] border-indigo-600 py-1 px-2 rounded-md"
                  >
                    {amen}
                  </div>
                ))}
              </div>
            </div>
            <Divider />
            <div id="Interior">
              <dt className="text-sm font-medium text-gray-500 w-40 flex-shrink-0 pt-3">
                Interior Amenities
              </dt>
              <div className="flex flex-col flex-wrap mt-2 space-y-1">
                {newListing.selectedInteriorAmenities.map((amen) => (
                  <div
                    key={amen}
                    className="w-fit border-[1px] border-indigo-600 py-1 px-2 rounded-md"
                  >
                    {amen}
                  </div>
                ))}
              </div>
            </div>
            <Divider />
            <div id="Exterior">
              <dt className="text-sm font-medium text-gray-500 w-40 flex-shrink-0 pt-3">
                Exterior Amenities
              </dt>
              <div className="flex flex-col flex-wrap mt-2 space-y-1">
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
