import DashboardLayout from "@/components/layouts/dashboard";
import { useRouter } from "next/router";
import React from "react";
import { type NextPageWithLayout } from "../_app";

type Props = {
  query?: string;
};

const DashboardListing: NextPageWithLayout<Props> = (props) => {
  const { query } = useRouter();
  return <div>listing: {query.slug}</div>;
};

DashboardListing.layout = DashboardLayout;

export default DashboardListing;
