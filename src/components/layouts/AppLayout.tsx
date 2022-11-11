import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const { data: session } = useSession();
  console.log(session, "session data");

  //@TODO: apply SEO here. Maybe we can use the NextSEO package.
  return (
    <main className="bg-custom-white lg:overflow-x-hidden">
      <Navbar />
      {children}
    </main>
  );
}
