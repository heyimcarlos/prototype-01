import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  // Seed Users
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@mail.com",
    },
  });

  if (!user) return;

  // Seed Coordinates
  //   await prisma.coordinate.create({
  //     data: {
  //       latitude: 0,
  //       longitude: 0,
  //     },
  //   });

  //   Seed Places
  const place = await prisma.place.create({
    data: {
      name: "Bella Vista",
      slug: "bella-vista",
      bounds: JSON.stringify([]),
      brderCoords: JSON.stringify([]),
      center: {
        create: {
          latitude: 18.455238459744564,
          longitude: -69.94231440322523,
        },
      },
    },
  });

  if (!place) return;

  // Seed Listings
  await prisma.listing.createMany({
    data: [
      {
        name: "Primera Casa",
        slug: "primera-casa",
        description: "Primera casa de la lista",
        price: 50,
        currency: "USD",
        coordinatesId: place.centerId,
        placeId: place.id,
        userId: user.id,
      },
      {
        name: "Segunda Casa",
        slug: "segunda-casa",
        description: "Segunda casa de la lista",
        price: 12000,
        currency: "USD",
        coordinatesId: place.centerId,
        placeId: place.id,
        userId: user.id,
      },
      {
        name: "Tercera Casa",
        slug: "tercera-casa",
        description: "Tercera casa de la lista",
        price: 7234,
        currency: "USD",
        coordinatesId: place.centerId,
        placeId: place.id,
        userId: user.id,
      },
      {
        name: "Cuarta Casa",
        slug: "cuarta-casa",
        description: "Cuarta casa de la lista",
        price: 12345,
        currency: "USD",
        coordinatesId: place.centerId,
        placeId: place.id,
        userId: user.id,
      },
      {
        name: "Quinta Casa",
        slug: "quinta-casa",
        description: "Quinta casa de la lista",
        price: 532,
        currency: "USD",
        coordinatesId: place.centerId,
        placeId: place.id,
        userId: user.id,
      },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
