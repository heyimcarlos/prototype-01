import React, { type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { useState } from "react";
import { type NewListingState, useNewListing } from "@/stores/useNewListing";
import Divider from "./formComponents/Divider";
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
import PhotosModal from "../singleViewListing/PhotosModal";
import ProfilePlaceholder from "../../../public/assets/images/ProfilePlaceholder.avif";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import slugify from "@/lib/slugify";

// import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";

type StepType = {
  setStep: Dispatch<SetStateAction<string>>;
};

const NewListingStep4 = ({ setStep }: StepType) => {
  const newListingState = useNewListing((state) => state);
  const [selected, setSelected] = useState("Contacto");
  const newListing = useNewListing((state) => state);
  const [openPhotos, setOpenPhotos] = useState(false);
  const router = useRouter();

  const mutation = trpc.listing.create.useMutation({
    onSuccess() {
      router.push("/dashboard");
    },
  });

  const handleSubmit = (listingState: NewListingState) => {
    mutation.mutate({
      name: listingState.recordName,
      bio: "bio",
      meters: listingState.meters,
      condition: listingState.condition,
      maintenance: listingState.maintenance,
      listingType: "RENT",
      propertyType: listingState.propertyType,
      halfBathrooms: listingState.halfBathrooms,
      bedrooms: listingState.bedrooms,
      price: listingState.price,
      fullBathrooms: listingState.fullBathrooms,
      currency: "DOP",
      neighborhoodSlug: slugify(listingState.sector),
      listingDetail: {
        buildingAmenities: listingState.selectedBuildingAmenities,
        exteriorAmenities: listingState.selectedExteriorAmenities,
        interiorAmenities: listingState.selectedInteriorAmenities,
        lotSquareFeet: 0,
        yearBuilt: 2018,
        yearRemodeled: 2021,
      },
      listingLocation: {
        googlePlaceId: listingState.placeId,
        city: "Santo Domingo",
        country: "Republica Dominicana",
        lat: String(listingState.lat),
        lng: String(listingState.lng),
        name: listingState.name,
        state: "Distrito Nacional",
        formattedAddress: listingState.fullAddress,
      },
    });
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

  SwiperCore.use([Pagination]);

  const half = Math.ceil(newListing.selectedBuildingAmenities.length / 2);
  const firstHalf = newListing.selectedBuildingAmenities.slice(0, half);
  const secondHalf = newListing.selectedBuildingAmenities.slice(half);
  const intHalf = Math.ceil(newListing.selectedInteriorAmenities.length / 2);
  const intFirstHalf = newListing.selectedInteriorAmenities.slice(0, intHalf);
  const intSecondHalf = newListing.selectedInteriorAmenities.slice(intHalf);

  return (
    <div
      id="start"
      className="mt-[1px] h-[calc(100vh-55.59px)] w-full scroll-mt-[22rem] overflow-auto scroll-smooth md:mt-[2px] md:h-[calc(100vh-82.59px)] md:scroll-mt-[32rem] xl:px-[18rem] 2xl:px-[30rem]"
    >
      {openPhotos && (
        <PhotosModal
          openPhotos={openPhotos}
          setOpenPhotos={setOpenPhotos}
          photos={previewImages}
        />
      )}

      <div id="imagesAndTopElement" className="w-full ">
        <div className="absolute z-20 mt-3 flex w-full justify-center space-x-6 pb-1.5 md:text-xl xl:relative xl:-mb-[3.5rem]">
          <button className="rounded-lg bg-indigo-600 py-1 px-2 text-white shadow-xl md:py-2 md:px-4">
            Save & Exit
          </button>
          <button
            className="rounded-lg bg-indigo-600 py-1 px-2 text-white shadow-xl md:py-2 md:px-4"
            onClick={() => setStep("step 3")}
          >
            Back
          </button>
          <button
            className="rounded-lg bg-indigo-600 py-1 px-2 text-white shadow-xl md:py-2 md:px-4"
            onClick={() => handleSubmit(newListingState)}
          >
            Publish
          </button>
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
              className="max-h-[16rem] w-full md:max-h-[25.5rem]"
              onClick={(e) => {
                e.stopPropagation();
                setOpenPhotos(true);
              }}
            >
              <Image
                className="max-h-[15.5rem] object-cover md:max-h-[25.5rem]"
                src={image}
                alt={idx.toString()}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        id="firstInfoAndNavBar"
        className="sticky top-0 z-30 -mt-[6px] bg-white md:py-2 xl:border-l-2 xl:border-r-2 xl:border-black/20"
      >
        <div className="flex flow-root items-end px-4">
          <div className="flex-1">
            <div>
              <div className="flex justify-end">
                <div className="flex w-full justify-between">
                  <h3 className="mt-[0.15rem] text-xl font-bold text-gray-900 md:text-2xl">
                    ${newListingState.price.toLocaleString()}
                  </h3>

                  <h3 className=" flex pt-2 text-sm md:pt-1 md:text-xl">
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

              <p className="text-md mt-1 block text-gray-500 md:text-xl">
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
          className="flex justify-evenly bg-white pt-2 text-sm md:pt-3 md:text-xl"
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
        className="h-[calc(100vh-38px-54.39px-55.59px)] w-full overflow-auto scroll-smooth md:h-[calc(100vh-58px-94.59px-55.59px)] xl:border-l-2 xl:border-r-2 xl:border-black/20"
      >
        <div className="px-4 py-1">
          <div
            id="Contacto"
            className="mb-3 flex scroll-mt-[30rem] flex-col md:flex-row"
          >
            <div className="flex h-auto w-[30rem]">
              <div className="mt-0.5 inline-flex h-full max-w-[10rem] overflow-hidden rounded-full border-4 border-white md:mt-1 md:w-[7rem]">
                <Image
                  className="h-[5rem] w-[5rem] md:h-[6.5rem] md:w-[6.5rem]"
                  src={ProfilePlaceholder}
                  alt="profile"
                />
              </div>

              <div className="mt-1 flex-1 md:ml-3 md:mt-4">
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
            <div className="mt-2 flex w-full flex-col flex-wrap space-y-1 text-sm md:space-y-2 md:text-lg">
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
              <dd className="col-span-2 mt-1 mt-0 ml-6 text-sm text-gray-900 md:text-lg">
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
              <dt className="w-40 flex-shrink-0 pt-3 text-sm font-medium text-gray-500 md:text-lg">
                Property Amenities
              </dt>
              <div className="mt-2 flex w-full ">
                <div className="text-md flex w-[50%] flex-col md:text-lg">
                  {firstHalf.map((amen) => (
                    <div
                      key={amen}
                      className="mt-1 w-fit max-w-[100%] rounded-md border-[1px] border-indigo-600 py-1 px-2"
                    >
                      {amen}
                    </div>
                  ))}
                </div>
                <div className="text-md ml-1 flex w-[50%] flex-col md:text-lg">
                  {secondHalf.map((amen) => (
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
                  {intFirstHalf.map((amen) => (
                    <div
                      key={amen}
                      className="mt-1 w-fit max-w-[100%] rounded-md border-[1px] border-indigo-600 py-1 px-2"
                    >
                      {amen}
                    </div>
                  ))}
                </div>
                <div className="text-md ml-1 flex w-[50%] flex-col md:text-lg">
                  {intSecondHalf.map((amen) => (
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
            <div id="Exterior">
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
            </div>
          </dl>
        </div>
        <div className="flex h-full items-center justify-center">
          Legal info about ntornos
        </div>
      </div>
    </div>
  );
};

export default NewListingStep4;
