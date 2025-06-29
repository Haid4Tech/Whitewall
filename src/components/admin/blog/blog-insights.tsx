import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BlogInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">87%</div>
                <div className="text-sm text-gray-600">Avg. SEO Score</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3.2min</div>
                <div className="text-sm text-gray-600">Avg. Read Time</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">42%</div>
                <div className="text-sm text-gray-600">Engagement Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Top Performing Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "home staging",
              "market trends",
              "first time buyer",
              "real estate tips",
              "property value",
            ].map((keyword) => (
              <Badge key={keyword} variant="secondary" className="px-3 py-1">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogInsights;
