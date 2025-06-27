"use client";

import { useRouter } from "next/navigation";
import { Building2, FileText, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, link: "/" },
  {
    id: "properties",
    label: "Properties",
    icon: Building2,
    link: "/properties",
  },
  { id: "blogs", label: "Blogs", icon: FileText, link: "/blogs" },
  { id: "agents", label: "Agents", icon: Users, link: "/agents" },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const router = useRouter();
  return (
    <div className="w-fit mx-3 bg-card border-r border-transparent">
      <div className="px-2 py-5">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(`/admin/${item.link}`);
                  onSectionChange(item.id);
                }}
                className={cn(
                  "text-sm cursor-pointer w-full flex items-center gap-3 py-3 px-5 rounded-lg text-left transition-colors",
                  activeSection === item.id
                    ? "bg-gray-50 text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
                )}
              >
                <Icon size={15} />
                <span className={"hidden md:block"}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
