import { Card } from "@/components/ui/card";
import { Building2, FileText, Users, TrendingUp } from "lucide-react";

export default function Page() {
  const stats = [
    {
      label: "Total Properties",
      value: "156",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      label: "Active Listings",
      value: "89",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Blog Posts",
      value: "24",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      label: "Active Agents",
      value: "12",
      icon: Users,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your real estate admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Properties</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg border"
              >
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div>
                  <p className="font-medium">Modern Family Home #{i}</p>
                  <p className="text-sm text-muted-foreground">
                    Added 2 days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Blog Posts</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg border"
              >
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div>
                  <p className="font-medium">Market Trends #{i}</p>
                  <p className="text-sm text-muted-foreground">
                    Published 1 week ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
