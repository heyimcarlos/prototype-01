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
