import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  MessageSquare,
  Heart,
} from "lucide-react";

export const BlogAnalytics = () => {
  const analyticsData = {
    totalViews: 45230,
    uniqueVisitors: 12890,
    totalPosts: 23,
    totalComments: 187,
    avgReadTime: "3:24",
    bounceRate: "32%",
    topPosts: [
      {
        title: "Top 10 Home Staging Tips That Sell Properties Fast",
        views: 2340,
        engagement: 89,
        trend: "up",
      },
      {
        title: "Market Trends: What Buyers Want in 2024",
        views: 1876,
        engagement: 67,
        trend: "up",
      },
      {
        title: "Investment Properties: ROI Analysis",
        views: 1542,
        engagement: 45,
        trend: "down",
      },
    ],
    monthlyViews: [
      { month: "Jan", views: 3200 },
      { month: "Feb", views: 4100 },
      { month: "Mar", views: 3800 },
      { month: "Apr", views: 4500 },
      { month: "May", views: 5200 },
      { month: "Jun", views: 4800 },
    ],
    topKeywords: [
      { keyword: "home staging", traffic: 1240 },
      { keyword: "real estate market", traffic: 980 },
      { keyword: "first time buyer", traffic: 756 },
      { keyword: "property investment", traffic: 623 },
      { keyword: "home selling tips", traffic: 489 },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalViews.toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                +12.5% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unique Visitors
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.uniqueVisitors.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                +8.2% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Comments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalComments}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                +15.3% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Read Time
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.avgReadTime}
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                +5.8% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPosts.map((post, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        {post.views} views
                      </span>
                      <span className="text-sm text-gray-600">
                        {post.engagement} engagements
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {post.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topKeywords.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <Badge variant="outline">{item.keyword}</Badge>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.traffic} visits
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Views Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Views Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.monthlyViews.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">
                  {item.month}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(item.views / 5500) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  {item.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">68%</div>
            <div className="text-sm text-gray-600">Mobile Traffic</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.2min</div>
            <div className="text-sm text-gray-600">Avg Session Duration</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">23%</div>
            <div className="text-sm text-gray-600">Return Visitors</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
