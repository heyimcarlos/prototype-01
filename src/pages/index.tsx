import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Map from "@/components/Map";
// import {
//   Autocomplete,
//   AutocompleteProps,
//   DistanceMatrixService,
//   useJsApiLoader,
// } from "@react-google-maps/api";

const Home: NextPage = () => {
  // const [matrixResult, setMatrixResult] = useState<any>(null);
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   libraries: ["places"],
  // });

  // if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* container mx-auto flex flex-col items-center justify-center min-h-screen p-4 */}
      <main className="w-full h-[calc(100vh-48px)]">
        <>
          <div className="h-12 border-2 border-solid flex items-center">
            <input
              placeholder="Search Place"
              className="rounded border border-solid mx-2 p-1"
            />
            <button className="border p-1 mx-2 rounded">Search</button>
          </div>
          <Map />
          {/* <DistanceMatrixService
            onLoad={(distanceMatrixService) => console.log(distanceMatrixService)}
            callback={(res) => res?.rows.length}
            options={{
              destinations: [
                {
                  // location: { lat: 18.4654119, lng: -69.9624781 },
                  placeId: "ChIJR7-M6_1hpY4RA2xBS7WgIrU",
                },
              ],

              origins: [
                {
                  // location: { lat: 18.4568568, lng: -69.9405513 },
                  placeId: "ChIJ-xmaYwVipY4RLO6L7WwuY2k",
                },
              ],
              travelMode: google.maps.TravelMode.DRIVING,
            }}
          /> */}
        </>
      </main>
    </>
  );
};

export default Home;
