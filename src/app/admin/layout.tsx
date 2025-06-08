"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("dashboard");
  return (
    <main className="min-h-screen bg-background flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="p-5">{children}</div>
    </main>
  );
}
