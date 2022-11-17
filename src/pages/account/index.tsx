import DashboardLayout from "@/components/layouts/dashboard";
import React from "react";
import { type NextPageWithLayout } from "../_app";

const SettingsPage: NextPageWithLayout = ({}) => {
  return (
    <div>
      <h1>Settings Page</h1>
    </div>
  );
};

SettingsPage.layout = DashboardLayout;

export default SettingsPage;
