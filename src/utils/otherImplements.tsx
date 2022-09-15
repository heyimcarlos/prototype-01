export {};

// const onZoomEnd = (event) => {
//   // @INFO: temporary implementation, this is sketchy
//   if (15 > event.viewState.zoom && !show) {
//     console.log(mapRef.current?.getZoom());
//     setShow(true);
//     console.log(show);
//   }
//   if (14 < event.viewState.zoom && show) {
//     console.log(mapRef.current?.getZoom());
//     setShow(false);
//     console.log(show);
//   }
// };

// const onClickMaker = (event, lng, lat) => {
//   event.originalEvent.stopPropagation();
//   setIsListingClick(true);
//   setShowRoutes(true);
//   setSelectedListing(`${lng},${lat}`);
// };

// longitude={
//   feat.geometry.coordinates[
//     feat.geometry.coordinates.length - 1
//   ][0]
// }
// latitude={
//   feat.geometry.coordinates[
//     feat.geometry.coordinates.length - 1
//   ][1]
// }

// {
/* {destArr.length > 0 &&
          showRoutes &&
          destArr.map((dest, idx) => {
            console.log(dest.lng);
            return (
              <Marker key={idx} longitude={dest.lng} latitude={dest.lat}>
                <div className="bg-white-500 cursor-pointer py-1 px-2 rounded-full flex justify-center items-center">
                  <CakeIcon />
                </div>
              </Marker>
            );
          })} */
// }

// {
/* {directions &&
          directions.features.map((feat, idx) => (
            <Marker
              key={idx}
              longitude={
                feat.geometry.coordinates[
                  feat.geometry.coordinates.length - 1
                ][0]
              }
              latitude={
                feat.geometry.coordinates[
                  feat.geometry.coordinates.length - 1
                ][1]
              }
            >
              <div className="bg-white-500 cursor-pointer py-1 px-2 rounded-full flex justify-center items-center">
                <CakeIcon />
              </div>
            </Marker>
          ))} */
// }

// <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
//   {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
//   <a
//     href="#"
//     className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
//   >
//     Dashboard
//   </a>
//   <a
//     href="#"
//     className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
//   >
//     Team
//   </a>
//   <a
//     href="#"
//     className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
//   >
//     Projects
//   </a>
//   <a
//     href="#"
//     className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
//   >
//     Calendar
//   </a>
// </div>;
