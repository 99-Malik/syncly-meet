"use client";

import React from "react";
import DashboardLayout from "../../components/Layout/layout";
import { DashboardHome } from "../../components/Dashboard/Home";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  );
}
