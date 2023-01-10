import type { CustomNeighborhoodType } from "@/stores/useNeighborhoods";
import { useSelectedListing } from "@/stores/useSelectedListing";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { Listing, ListingDetail, ListingLocation } from "@prisma/client";
import mapboxgl, { Popup, type PointLike } from "mapbox-gl";
import Image from "next/image";
import React, { useState } from "react";
import { Marker } from "react-map-gl";
import house from "../../../public/assets/images/house1.jpeg";

type Props = {
  listingLocation: ListingLocation & {
    listings: (Listing & {
      listingDetail: ListingDetail | null;
    })[];
  };
  notMobile: boolean;
  curListingId: string;
  setListing: (
    listing:
      | (Listing & {
          listingDetail: ListingDetail | null;
        })
      | null
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedListings: (
    listings: (Listing & {
      listingDetail: ListingDetail | null;
    })[]
  ) => void;
  neighborhood: CustomNeighborhoodType;
  neighborhoodName: string;
};

const ListingMarker = ({
  curListingId,
  setListing,
  setSelectedListings,
  listingLocation,
  neighborhood,
  neighborhoodName,
  notMobile,
  setOpen,
}: Props) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const setDirection = useSelectedListing((state) => state.setDirection);
  const previewNeighborhood = useSelectedListing(
    (state) => state.previewNeighborhood
  );
  const setPreviewNeighborhood = useSelectedListing(
    (state) => state.setPreviewNeighborhood
  );
  const previewAddress = useSelectedListing((state) => state.previewAddress);
  const setPreviewAddress = useSelectedListing(
    (state) => state.setPreviewAddress
  );
  const setNeighborhood = useSelectedListing((state) => state.setNeighborhood);
  const setListingAddress = useSelectedListing(
    (state) => state.setListingAddress
  );

  let offset;
  if (listingLocation.listings.length < 2) {
    offset = [0.4, -73.3];
  } else {
    offset = [0.4, -153];
  }

  return (
    <>
      {showPopUp && (
        <Marker
          latitude={parseFloat(listingLocation.lat)}
          longitude={parseFloat(listingLocation.lng)}
          offset={offset as PointLike}
          pitchAlignment="viewport"
        >
          {listingLocation.listings.length > 0 && (
            <div
              className={`${
                listingLocation.listings.length > 1
                  ? "max-h-[18rem] min-h-[18rem]"
                  : "max-h-[8rem] min-h-[8rem]"
              } scrollbar w-[23rem] overflow-auto bg-white`}
              onMouseOut={() => setShowPopUp(false)}
              onMouseOver={() => setShowPopUp(true)}
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              {listingLocation.listings.length > 1 && (
                <div className="sticky top-0 h-8 w-full bg-white text-[16px] text-white">
                  <span className="flex h-full w-full items-center justify-center bg-black/70">
                    {listingLocation.listings.length} Homes in this location
                    <ArrowsUpDownIcon className="ml-3 h-5 w-5" />
                  </span>
                </div>
              )}
              {listingLocation.listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex h-[8rem] w-full border-b-2 bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection("right");
                    if (notMobile) setOpen(true);
                    setListing(listing);
                    setListingAddress(previewAddress);
                    setNeighborhood(previewNeighborhood);
                  }}
                >
                  <div className="flex h-full w-[40%]">
                    <Image src={house} alt={"alt"} />
                  </div>
                  <div className="h-full w-[60%] pl-2 pt-2 ">
                    <div>
                      <span className="flex w-full">
                        <span className="w-full lg:text-[16px]">
                          {neighborhood.name}
                        </span>
                        <HeartIcon className="mr-2 -mt-1 h-6 w-6" />
                      </span>
                      <span className="block h-14 pr-3 pt-1 text-xs lg:text-[14px]">
                        {listingLocation.name}
                      </span>
                    </div>

                    <div className="min-w-[3rem] text-[15px] leading-5 text-black">
                      <span className="block">
                        <b>{listing?.bedrooms}</b> bd |{" "}
                        <b>
                          {listing
                            ? listing.fullBathrooms + listing.halfBathrooms
                            : null}
                        </b>{" "}
                        ba | <b>{listing?.meters}</b> sqft
                      </span>

                      <span className="block flex">
                        <span className="">
                          ${listing?.price.toLocaleString()}
                        </span>

                        {listing.maintenance > 0 && (
                          <span className="mr-2 flex w-full justify-end">
                            mant. ${listing.maintenance}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Marker>
      )}

      <Marker
        onClick={(e) => {
          e.originalEvent.stopPropagation();

          if (!listingLocation.listings[0]) return;
          if (listingLocation.listings.length < 2) {
            setDirection("right");
            setListing(listingLocation.listings[0]);
            if (notMobile) setOpen(true);
            setSelectedListings([]);
            setNeighborhood(
              neighborhood.name === "Custom Boundary"
                ? neighborhoodName
                : neighborhood.name
            );
            setListingAddress(listingLocation.name);
          } else {
            setListing(null);
            setSelectedListings(listingLocation.listings);
            setNeighborhood(
              neighborhood.name === "Custom Boundary"
                ? neighborhoodName
                : neighborhood.name
            );
            setListingAddress(listingLocation.name);
          }
        }}
        latitude={parseFloat(listingLocation.lat)}
        longitude={parseFloat(listingLocation.lng)}
      >
        <div
          onMouseOver={() => {
            setShowPopUp(true);

            if (!listingLocation.listings[0]) return;
            setPreviewNeighborhood(
              neighborhood.name === "Custom Boundary"
                ? neighborhoodName
                : neighborhood.name
            );
            setPreviewAddress(listingLocation.name);
          }}
          onMouseOut={() => setShowPopUp(false)}
          className={`flex cursor-pointer items-center justify-center rounded-full border-[0.05rem] border-black bg-green-500 py-1 px-2`}
          style={{
            opacity: curListingId
              ? Number(curListingId) === listingLocation.id
                ? 1
                : 0.4
              : 1,
          }}
        >
          <span className="text-sm">
            {listingLocation.listings.length > 1
              ? `${listingLocation.listings.length} Listings`
              : listingLocation.listings[0]?.price
              ? `$${new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 1,
                  notation: "compact",
                  compactDisplay: "short",
                }).format(listingLocation.listings[0]?.price)}`
              : null}
          </span>
        </div>
      </Marker>
    </>
  );
};

export default ListingMarker;
