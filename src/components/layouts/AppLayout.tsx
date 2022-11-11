import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "../Footer";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  //@TODO: apply SEO here. Maybe we can use the NextSEO package.
  return (
    <main className="bg-custom-white lg:overflow-x-hidden">
      <Navbar />
      <>{children}</>
      <Footer />
    </main>
  );
}
