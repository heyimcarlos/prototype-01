import HomeTwTopbar from "@/components/HomeTwTopbar";
import dynamic from "next/dynamic";
import Head from "next/head";

const LandingBG = dynamic(() => import("../components/LandingBG"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <Head>
        <title>ntornos.com map</title>
        <meta name="description" content="Real Estate User Facing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div>
          <div className="fixed z-10 w-full h-full flex justify-center items-center ">
            {/* <div className="w-full h-[calc(100vh-90px)] z-1"> */}

            <div className="text-white bg-black text-lg h-10 w-50">
              Hello FROM A DIFFERRENT DIV
            </div>
          </div>
          <LandingBG />
        </div>
        <div className="h-1/2 w-1/2 fixed ">
          <div>Next section of landing page</div>
        </div>
      </main>
    </>
  );
};

export default Home;
