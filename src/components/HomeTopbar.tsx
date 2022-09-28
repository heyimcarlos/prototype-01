import React from "react";

const HomeTopbar = () => {
  return (
    <div id="HomeTopbar" className="absolute text-white z-20 flex w-full">
      <div className="font-['Libre_Baskerville'] text-3xl ml-3 inline">
        <span className="text-indigo-600">n</span>
        <span>tornos</span>
      </div>
      <div className="inline flex justify-end w-full mr-4 text-white">
        <div className=" border-b-2 border-transparent px-4 py-1 text-lg font-medium hover:border-white hover:text-indigo-600">
          <a href="#">Sell</a>
        </div>
        <div className=" border-b-2 border-transparent px-4 py-1 text-lg font-medium hover:border-white hover:text-indigo-600">
          <a href="#">Favorites</a>
        </div>
        <div className=" border-b-2 border-transparent px-4 py-1 text-lg font-medium hover:border-white hover:text-indigo-600">
          <a href="#">Agents</a>
        </div>
        <div className=" border-b-2 border-transparent px-4 py-1 text-lg font-medium hover:border-white hover:text-indigo-600">
          <a href="#">Dashboard</a>
        </div>
        <div className=" border-b-2 border-transparent px-4 py-1 text-lg font-medium hover:border-white hover:text-indigo-600">
          <a href="#">Register/Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default HomeTopbar;
