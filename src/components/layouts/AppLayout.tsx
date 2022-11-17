import React from "react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const router = useRouter()
  //@TODO: apply SEO here. Maybe we can use the NextSEO package.
  let navbar = (<Navbar />)

  if (router.pathname === '/') {
    navbar = (
      <div className="z-20 absolute inset-0 h-20">
        <Navbar />
      </div>
    )
  }

  return (
    <main className="bg-custom-white lg:overflow-x-hidden">
      {navbar}
      <>{children}</>
      <Footer />
    </main>
  );
}
