"use client";

import AppLayout from "@/components/provider/layout";
import DashboardLayoutWrapper from "@/components/provider/dashboard-wrapper";
import { Suspense } from "react";
import Loading from "./loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <DashboardLayoutWrapper>
        <Suspense fallback={<Loading />}>
          <main className="min-h-screen bg-background px-4">{children}</main>
        </Suspense>
      </DashboardLayoutWrapper>
    </AppLayout>
  );
}
