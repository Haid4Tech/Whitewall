"use client";

import { SetStateAction, useState } from "react";
import { Sidebar } from "@/components/admin/navigation/sidebar";
import AdminNavBar from "@/components/admin/navigation/admin-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("dashboard");
  return (
    <main className="min-h-screen bg-background">
      <AdminNavBar pageTitle={""} />
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <div className="p-5">{children}</div>
      </div>
    </main>
  );
}
