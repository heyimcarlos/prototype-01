import React from "react";

export default function Footer() {
  return (
    <footer className="bg-indigo-500">
      <div className="flex flex-col items-center gap-y-4 py-12 md:justify-between lg:flex-row max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center font-medium text-gray-400">
          created by ussss
        </div>
        <nav className="flex flex-wrap justify-center">
          <div className="py-2 px-5">Terms of Service</div>
          <div className="py-2 px-5">Privacy Policy </div>
        </nav>
        <div className="flex justify-center space-x-6">social media icons</div>
        <p className="text-center text-gray-400">
          @ 2022 ntornos inc, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
