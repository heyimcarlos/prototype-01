import { PrismaClient, type Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const neighborhoods: Prisma.NeighborhoodCreateInput[] = [
  {
    name: "La Julia",
    slug: "la-julia",
    bounds: [
      [-69.93020605560467, 18.455260286335545],
      [-69.92919468274141, 18.456688659505033],
      [-69.92798103530522, 18.457946470814136],
      [-69.92580096491014, 18.458308889312036],
      [-69.92555374043232, 18.45852207630611],
      [-69.9250817664296, 18.459438777362337],
      [-69.92429514309124, 18.46012097032056],
      [-69.92249714688964, 18.461293483132124],
      [-69.91986757744428, 18.462956305746488],
      [-69.92083400040265, 18.464938880883523],
      [-69.92793608539985, 18.463190805075428],
      [-69.92840805940307, 18.463190805075428],
      [-69.92881260854845, 18.462977623880448],
      [-69.93025100551004, 18.46562105197806],
      [-69.93602706830832, 18.46267916976295],
      [-69.93456619639431, 18.461186891388877],
      [-69.93353234857811, 18.459886466797045],
      [-69.93234117609435, 18.458692625709972],
      [-69.93020605560467, 18.455260286335545],
    ],
    lat: "18.46222430662145",
    lng: "-69.93302765447778",
  },
];

const listingLocations: Prisma.ListingLocationCreateInput[] = [
  {
    name: "Torre Marevento",
    city: "Santo Domingo",
    lat: "18.459749926739637",
    lng: "-69.92814945120342",
    country: "Dominican Republic",
    state: "Distrito Nacional",
    formattedAddress:
      "C. Dr. Núñez y Domínguez 28, Santo Domingo, Dominican Republic",
    googlePlaceId: "ChIJabQmWHRipY4Rd08cqwpJTlM",
  },
];

const createNeighborhoodAndAddListingLocation = async (
  neighborhood: Prisma.NeighborhoodCreateInput,
  listingLocation: Prisma.ListingLocationCreateInput
) => {
  const neighborhoodResult = await prisma.neighborhood.create({
    data: {
      ...neighborhood,
      listingLocations: {
        create: await createListingLocation(listingLocation),
      },
    },
  });

  return neighborhoodResult;
};

const createListingLocation = async (
  listingLocation: Prisma.ListingLocationCreateInput
) => {
  const listingLocationResult = await prisma.listingLocation.create({
    data: listingLocation,
  });

  return listingLocationResult;
};

const createListing = async (listing: Prisma.ListingCreateInput) => {
  const listingResult = await prisma.listing.create({
    data: listing,
  });

  if (!listing) return null;

  return listing;
};

const createListingDetail = async (
  listingDetail: Prisma.ListingDetailCreateInput
) => {
  const listingDetailResult = await prisma.listingDetail.create({
    data: listingDetail,
  });

  if (!listingDetail) return null;

  return listingDetail;
};

const load = async () => {
  try {
    // Seed Users
    const user = await prisma.user.findFirst({
      where: {
        email: "carlos.cruz1500@gmail.com",
      },
    });

    if (!user) return;

    // create a neighborhood
    const neighborhoodWithListingLocation =
      await createNeighborhoodAndAddListingLocation(
        neighborhoods[0] as Prisma.NeighborhoodCreateInput,
        listingLocations[0] as Prisma.ListingLocationCreateInput
      );

    if (!neighborhoodWithListingLocation) return;
    console.log("New neighborhood and listingLocation created: ", {
      neighborhoodWithListingLocation,
    });

    // [[-69.93020605560467, 18.455260286335545],
    //  [-69.92919468274141, 18.456688659505033],
    // [-69.92798103530522, 18.457946470814136],
    // [-69.92580096491014, 18.458308889312036],
    // [-69.92555374043232, 18.45852207630611],
    // [-69.9250817664296, 18.459438777362337],
    // [-69.92429514309124, 18.46012097032056],
    // [-69.92249714688964, 18.461293483132124],
    // [-69.91986757744428, 18.462956305746488],
    // [-69.92083400040265, 18.464938880883523],
    //  [-69.92793608539985, 18.463190805075428],
    //  [-69.92840805940307, 18.463190805075428],
    //  [-69.92881260854845, 18.462977623880448],
    //  [-69.93025100551004, 18.46562105197806],
    //  [-69.93602706830832, 18.46267916976295],
    //  [-69.93456619639431, 18.461186891388877],
    //  [-69.93353234857811, 18.459886466797045],
    //  [-69.93234117609435, 18.458692625709972],
    //  [-69.93020605560467, 18.455260286335545]]

    // Seed Listings
    // await prisma.listing.createMany({
    //   data: [
    //     {
    //       name: "renzik Casa 1",
    //       slug: "renzik-casa-1",
    //       description: "renzik Casa 1",
    //       price: 50,
    //       currency: "USD",
    //       locationId: 1,
    //       placeId: place.id,
    //       userId: user.id,
    //     },
    //     {
    //       name: "renzik Casa 2",
    //       slug: "renzik-casa-2",
    //       description: "renzik Casa 2",
    //       price: 12000,
    //       currency: "USD",
    //       locationId: 1,
    //       placeId: place.id,
    //       userId: user.id,
    //     },
    //     {
    //       name: "renzik Casa 3",
    //       slug: "renzik-casa-3",
    //       description: "renzik Casa 3",
    //       price: 7234,
    //       currency: "USD",
    //       locationId: 1,
    //       placeId: place.id,
    //       userId: user.id,
    //     },
    //     {
    //       name: "renzik Casa 4",
    //       slug: "renzik-casa-4",
    //       description: "renzik Casa 4",
    //       price: 12345,
    //       currency: "USD",
    //       locationId: 1,
    //       placeId: place.id,
    //       userId: user.id,
    //     },
    //     {
    //       name: "renzik Casa 5",
    //       slug: "renzik-casa-5",
    //       description: "renzik Casa 5",
    //       price: 532,
    //       currency: "USD",
    //       locationId: "cl7t8mjex0011usv8cvg9onlb",
    //       placeId: place.id,
    //       userId: user.id,
    //     },
    //   ],
    // });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
