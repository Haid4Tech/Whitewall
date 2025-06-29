"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, Edit, Trash2, Calendar } from "lucide-react";
import { BlogEditor } from "./blog-editor";
import { BlogAnalytics } from "./blog-analytics";
import { BlogCategories } from "./blog-categories";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  status: "draft" | "published" | "scheduled";
  publishDate: string;
  views: number;
  likes: number;
  comments: number;
  featuredImage: string;
  tags: string[];
  seoScore: number;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Home Staging Tips That Sell Properties Fast",
    excerpt:
      "Discover proven staging techniques that help properties sell 30% faster and for higher prices.",
    author: "Sarah Johnson",
    category: "Home Staging",
    status: "published",
    publishDate: "2024-06-20",
    views: 2340,
    likes: 89,
    comments: 23,
    featuredImage:
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    tags: ["staging", "selling", "tips"],
    seoScore: 95,
  },
  {
    id: "2",
    title: "Market Trends: What Buyers Want in 2024",
    excerpt:
      "Analysis of current real estate market trends and buyer preferences for the year ahead.",
    author: "Mike Chen",
    category: "Market Analysis",
    status: "published",
    publishDate: "2024-06-18",
    views: 1876,
    likes: 67,
    comments: 34,
    featuredImage:
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    tags: ["market", "trends", "2024"],
    seoScore: 88,
  },
  {
    id: "3",
    title: "First-Time Homebuyer Guide: Everything You Need to Know",
    excerpt:
      "Complete guide for first-time buyers covering financing, inspections, and closing process.",
    author: "Lisa Wang",
    category: "Buyer Guide",
    status: "draft",
    publishDate: "2024-06-25",
    views: 0,
    likes: 0,
    comments: 0,
    featuredImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    tags: ["first-time", "guide", "buying"],
    seoScore: 72,
  },
];

enum tabsEnum {
  POSTS = "posts",
  ANALYTICS = "analytics",
  CATEGORIES = "categories",
  INSIGHTS = "insights",
}

export const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  if (showEditor) {
    return (
      <BlogEditor
        post={editingPost}
        onSave={(post) => {
          if (editingPost) {
            setPosts(
              posts.map((p) =>
                p.id === editingPost.id ? { ...post, id: editingPost.id } : p
              )
            );
          } else {
            setPosts([...posts, { ...post, id: Date.now().toString() }]);
          }
          setShowEditor(false);
          setEditingPost(null);
        }}
        onCancel={() => {
          setShowEditor(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={"text-2xl font-semibold text-gray-900"}>
            Blog Management
          </h1>
          <p className="text-gray-600">
            Create and manage your real estate blog content
          </p>
        </div>
        <Button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 border-1 border-gray-200">
          {Object.values(tabsEnum).map((item, index) => (
            <TabsTrigger
              value={item}
              key={index}
              className={cn("flex items-center gap-2 cursor-pointer")}
            >
              <Edit className="h-4 w-4" />
              {item}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          {/* Search and Filter Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search posts, authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Home Staging">Home Staging</option>
                  <option value="Market Analysis">Market Analysis</option>
                  <option value="Buyer Guide">Buyer Guide</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Blog Posts Table */}
          <Card className="py-4">
            <CardHeader>
              <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        width={200}
                        height={200}
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500">
                            By {post.author}
                          </span>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {post.publishDate}
                          </span>
                          <span
                            className={`text-sm font-medium ${getSeoScoreColor(
                              post.seoScore
                            )}`}
                          >
                            SEO: {post.seoScore}%
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {post.views}
                        </div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {post.likes}
                        </div>
                        <div className="text-xs text-gray-500">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {post.comments}
                        </div>
                        <div className="text-xs text-gray-500">Comments</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPost(post);
                            setShowEditor(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <BlogAnalytics />
        </TabsContent>

        <TabsContent value="categories">
          <BlogCategories />
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Content Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        87%
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg. SEO Score
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        3.2min
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg. Read Time
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        42%
                      </div>
                      <div className="text-sm text-gray-600">
                        Engagement Rate
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Top Performing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "home staging",
                    "market trends",
                    "first time buyer",
                    "real estate tips",
                    "property value",
                  ].map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
