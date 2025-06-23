"use client";

import { useState } from "react";
import { useMainContext } from "@/components/provider/main-provider";
import { Sidebar } from "@/components/admin/navigation/sidebar";
import AdminNavBar from "@/components/admin/navigation/admin-navbar";
import AuthScreen from "@/components/admin/auth/auth-screen";
import AdminProvider from "@/components/provider/layout";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AdminProvider>
  );
}

// Actual content (where context is consumed)
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLogin } = useMainContext();
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <main className="min-h-screen bg-background">
      <AdminNavBar pageTitle={""} />
      <div>
        {!isLogin ? (
          <AuthScreen />
        ) : (
          <div className="flex">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-5 w-full border-l border-t rounded-ss-lg border-gray-200">
              {children}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
