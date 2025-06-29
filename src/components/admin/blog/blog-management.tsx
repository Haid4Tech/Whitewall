"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, Edit, Trash2, Calendar } from "lucide-react";
import BlogInsights from "./blog-insights";
import { BlogEditor } from "./blog-editor";
import { BlogAnalytics } from "./blog-analytics";
import { BlogCategories } from "./blog-categories";
import { BlogPost } from "@/common/types";

import { AdminBlogCard } from "./blog-card-admin";
import { blogPosts } from "@/common/data";

enum tabsEnum {
  POSTS = "posts",
  ANALYTICS = "analytics",
}

type BlogProps = BlogPost & { id: string };

export const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogProps[]>(blogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post?.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());
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
                p.slug === editingPost.slug ? { ...post, id: p.id } : p
              )
            );
          } else {
            setPosts([...posts]);
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
      <div className="flex flex-col flex-col-reverse md:flex-row md:items-center justify-between">
        <div>
          <h1 className={"text-lg md:text-3xl font-semibold text-gray-900"}>
            Blog Management
          </h1>
          <p className="text-xs md:text-base text-gray-600">
            Create and manage your real estate blog content
          </p>
        </div>
        <Button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 ml-auto"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList
          className={cn(
            "grid-cols-" + Object.values(tabsEnum).length,
            "grid w-full border-1 border-gray-200"
          )}
        >
          {Object.values(tabsEnum).map((item, index) => (
            <TabsTrigger
              value={item}
              key={index}
              className={cn("flex items-center gap-2 cursor-pointer")}
            >
              <Edit size={15} />
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
              </div>
            </CardContent>
          </Card>

          {/* Blog Posts Table */}

          <p>Blog Posts ({filteredPosts.length})</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <AdminBlogCard key={post?.slug} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <BlogAnalytics />
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories">
          <BlogCategories />
        </TabsContent>

        <TabsContent value="insights">
          <BlogInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
};
