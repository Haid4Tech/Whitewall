"use client";

import AppLayout from "@/components/provider/layout";
import DashboardLayoutWrapper from "@/components/provider/dashboard-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <DashboardLayoutWrapper>
        <main className="min-h-screen bg-background px-4">{children}</main>
      </DashboardLayoutWrapper>
    </AppLayout>
  );
}
