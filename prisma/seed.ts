import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const load = async () => {
  try {
    // Seed Users
    const user = await prisma.user.findFirst({
      where: {
        email: "johndoe@mail.com",
      },
    });

    if (!user) return;

    //   Seed Coordinates
    // await prisma.coordinate.createMany({
    //   data: [
    //     {
    //       latitude: 18.457742568747676,
    //       longitude: -69.93860006737556,
    //     },
    //     {
    //       latitude: 18.454526650895332,
    //       longitude: -69.94397336219362,
    //     },
    //     {
    //       latitude: 18.45352545645595,
    //       longitude: -69.93722475972179,
    //     },
    //     {
    //       latitude: 18.451922040523996,
    //       longitude: -69.94816325274623,
    //     },
    //     {
    //       latitude: 18.447188998944625,
    //       longitude: -69.94851507562157,
    //     },
    //   ],
    // });

    // //   Seed Places
    // const place = await prisma.place.create({
    //   data: {
    //     name: "Bella Vista",
    //     slug: "bella-vista",
    //     bounds: JSON.stringify([
    //       [-69.94941340515106, 18.445379846197582],
    //       [-69.95264444692324, 18.451486258946545],
    //       [-69.94630663421701, 18.454032498186237],
    //       [-69.94782273843276, 18.457781059459577],
    //       [-69.94230511325321, 18.459502069608618],
    //       [-69.93614127971959, 18.462755438909554],
    //       [-69.9340038213163, 18.460397931075875],
    //       [-69.93233859209545, 18.458582627977563],
    //       [-69.93087219621475, 18.456460820801354],
    //       [-69.9316178212388, 18.455423483303818],
    //       [-69.93223917542583, 18.45443329166386],
    //       [-69.93494827968058, 18.45205209315081],
    //       [-69.93542050886248, 18.452947993496423],
    //       [-69.93765738393535, 18.45193421117922],
    //       [-69.94941340515106, 18.445379846197582],
    //     ]),
    //     brderCoords: JSON.stringify([
    //       [-69.94941340515106, 18.445379846197582],
    //       [-69.95264444692324, 18.451486258946545],
    //       [-69.94630663421701, 18.454032498186237],
    //       [-69.94782273843276, 18.457781059459577],
    //       [-69.94230511325321, 18.459502069608618],
    //       [-69.93614127971959, 18.462755438909554],
    //       [-69.9340038213163, 18.460397931075875],
    //       [-69.93233859209545, 18.458582627977563],
    //       [-69.93087219621475, 18.456460820801354],
    //       [-69.9316178212388, 18.455423483303818],
    //       [-69.93223917542583, 18.45443329166386],
    //       [-69.93494827968058, 18.45205209315081],
    //       [-69.93542050886248, 18.452947993496423],
    //       [-69.93765738393535, 18.45193421117922],
    //       [-69.94941340515106, 18.445379846197582],
    //     ]),
    //     center: {
    //       create: {
    //         latitude: 18.455238459744564,
    //         longitude: -69.94231440322523,
    //       },
    //     },
    //   },
    // });

    //   if (!place) return;

    // Seed Listings
    await prisma.listing.createMany({
      data: [
        {
          name: "Primera Casa",
          slug: "primera-casa",
          description: "Primera casa de la lista",
          price: 50,
          currency: "USD",

          locationId: "cl7sdv5un0002x5v8ehozaq0c",
          placeId: "cl7sdv61n0009x5v8k8lsmdi4",
          userId: user.id,
        },
        {
          name: "Segunda Casa",
          slug: "segunda-casa",
          description: "Segunda casa de la lista",
          price: 12000,
          currency: "USD",
          locationId: "cl7sdv5un0003x5v8xovl3j7e",
          placeId: "cl7sdv61n0009x5v8k8lsmdi4",
          userId: user.id,
        },
        {
          name: "Tercera Casa",
          slug: "tercera-casa",
          description: "Tercera casa de la lista",
          price: 7234,
          currency: "USD",
          locationId: "cl7sdv5uo0004x5v8xxko3ho9",
          placeId: "cl7sdv61n0009x5v8k8lsmdi4",
          userId: user.id,
        },
        {
          name: "Cuarta Casa",
          slug: "cuarta-casa",
          description: "Cuarta casa de la lista",
          price: 12345,
          currency: "USD",
          locationId: "cl7sdv5uo0005x5v8lkkbhq68",
          placeId: "cl7sdv61n0009x5v8k8lsmdi4",
          userId: user.id,
        },
        {
          name: "Quinta Casa",
          slug: "quinta-casa",
          description: "Quinta casa de la lista",
          price: 532,
          currency: "USD",
          locationId: "cl7sdv5uo0006x5v8tu17hvld",
          placeId: "cl7sdv61n0009x5v8k8lsmdi4",
          userId: user.id,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
