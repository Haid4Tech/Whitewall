"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/navigation/sidebar";
import AdminNavBar from "@/components/admin/navigation/admin-navbar";
import AuthScreen from "@/components/admin/auth/auth-screen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("dashboard");
  return (
    <main className="min-h-screen bg-background">
      <AdminNavBar pageTitle={""} />
      <div>
        {true ? (
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
