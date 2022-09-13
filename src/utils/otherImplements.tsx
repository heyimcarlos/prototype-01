// const transformListingsToFeatureCollection = (
//   listings: GetPlaceOutput["listing"]
// ) => {
//   const features = listings.map((listing): Feature => {
//     return {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         //@TODO: I think the order is incorrect here
//         coordinates: [listing.location.longitude, listing.location.latitude, 0],
//       },
//       id: listing.id,
//       properties: {
//         id: listing.id,
//         name: listing.name,
//       },
//     };
//   });

//   return features;
// };
