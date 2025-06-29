"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/general/input-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Eye, Image, Tag, Search, AlertCircle } from "lucide-react";
import { BlogPost } from "@/common/types";

interface BlogEditorProps {
  post?: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  post,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BlogPost>({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    author: {
      name: post?.author?.name || "Admin",
      image: post?.author?.image || "",
    },
    category: post?.category || "General",
    status: post?.status || "draft",
    publishDate: post?.publishDate || new Date().toISOString().split("T")[0],
    views: post?.views || 0,
    likes: post?.likes || 0,
    featuredImage:
      post?.featuredImage ||
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    tags: post?.tags || [],
    seoScore: post?.seoScore || 0,
    content: post?.content || "",
    metaDescription: post?.metaDescription || "",
  });

  const [newTag, setNewTag] = useState("");
  const [seoAnalysis, setSeoAnalysis] = useState({
    titleLength: 0,
    metaDescLength: 0,
    keywordDensity: 0,
    readabilityScore: 85,
    recommendations: [
      "Add more internal links to other blog posts",
      "Include alt text for all images",
      "Consider adding a FAQ section",
    ],
  });

  useEffect(() => {
    // Simulate SEO analysis
    const titleLength = formData?.title?.length ?? 0;
    const metaDescLength = formData?.metaDescription?.length ?? 0;
    const contentLength = formData?.content?.length ?? 0;

    let score = 0;
    if (titleLength >= 30 && titleLength <= 60) score += 25;
    if (metaDescLength >= 120 && metaDescLength <= 160) score += 25;
    if (contentLength >= 300) score += 25;
    if (formData.tags.length >= 3) score += 25;

    setSeoAnalysis((prev) => ({
      ...prev,
      titleLength,
      metaDescLength,
    }));

    setFormData((prev) => ({ ...prev, seoScore: score }));
  }, [
    formData.title,
    formData.metaDescription,
    formData.content,
    formData.tags,
  ]);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={"text-2xl font-semibold text-gray-900"}>
            {post ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-gray-600">
            Write engaging content for your real estate blog
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputWithLabel
                items={{
                  htmlfor: "title",
                  label: " Post Title",
                  name: "title",
                  type: "text",
                  placeholder: "Enter Post Title",
                }}
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Brief description of your post..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your blog post content here..."
                  rows={15}
                  className="font-mono"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.content?.length || 0} characters
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="seo" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="seo">SEO Optimization</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    SEO Settings
                    <Badge
                      className={getSeoScoreColor(formData?.seoScore ?? 0)}
                    >
                      Score: {formData.seoScore}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <Textarea
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaDescription: e.target.value,
                        })
                      }
                      placeholder="Brief description for search engines..."
                      rows={3}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData.metaDescription?.length || 0}/160 characters
                      (optimal: 120-160)
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Focus Keywords
                    </label>
                    <Input
                      value={formData.metaKeywords}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaKeywords: e.target.value,
                        })
                      }
                      placeholder="real estate, home buying, property investment..."
                    />
                  </div> */}

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      SEO Recommendations
                    </h4>
                    <div className="space-y-2">
                      {seoAnalysis.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <img
                      src={formData.featuredImage}
                      alt={formData.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h1 className="text-3xl font-bold mb-2">
                      {formData.title || "Your Post Title"}
                    </h1>
                    <p className="text-gray-600 text-lg mb-4">
                      {formData.excerpt}
                    </p>
                    <div className="whitespace-pre-wrap text-gray-800">
                      {formData.content || "Your content will appear here..."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border rounded-md bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date
                </label>
                <Input
                  type="date"
                  value={
                    typeof formData.publishDate === "string"
                      ? formData.publishDate
                      : formData.publishDate instanceof Date
                      ? formData.publishDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, publishDate: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md bg-white"
                >
                  <option value="General">General</option>
                  <option value="Home Staging">Home Staging</option>
                  <option value="Market Analysis">Market Analysis</option>
                  <option value="Buyer Guide">Buyer Guide</option>
                  <option value="Seller Tips">Seller Tips</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Input
                  value={formData.featuredImage}
                  onChange={(e) =>
                    setFormData({ ...formData, featuredImage: e.target.value })
                  }
                  placeholder="Image URL..."
                />
                <Button variant="outline" size="sm" className="w-full">
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button onClick={handleAddTag} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    #{tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
