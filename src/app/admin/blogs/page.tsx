"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/common/types";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";

import { Input } from "@/components/ui/input";
import { Search, Plus, Edit } from "lucide-react";
import BlogInsights from "@/components/admin/blog/blog-insights";
import { BlogAnalytics } from "@/components/admin/blog/blog-analytics";
import { AdminBlogCard } from "@/components/admin/blog/blog-card-admin";
import { BlogCategories } from "@/components/admin/blog/blog-categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getBlogs } from "@/firebase/blog";

enum tabsEnum {
  POSTS = "posts",
  // ANALYTICS = "analytics",
}

type BlogProps = BlogPost & { id: string };

export default function Page() {
  const router = useRouter();
  const [states, setStates] = useState<{
    createBlog: boolean;
    isBlogLoading: boolean;
  }>({
    createBlog: false,
    isBlogLoading: false,
  });

  const [posts, setPosts] = useState<BlogProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setStates((prev) => ({ ...prev, isBlogLoading: true }));
      try {
        const blogs = await getBlogs();
        setPosts(blogs);
      } catch (error) {
        setStates((prev) => ({ ...prev, isBlogLoading: false }));
        throw error;
      } finally {
        setStates((prev) => ({ ...prev, isBlogLoading: false }));
      }
    })();
  }, [deleted]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post?.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  if (states.isBlogLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm md:text-base">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col flex-col-reverse md:flex-row md:items-center justify-between">
        <div>
          <h1 className={"text-lg md:text-3xl font-bold text-foreground"}>
            Blog Management
          </h1>
          <p className="text-xs md:text-base text-gray-600">
            Create and manage your real estate blog content
          </p>
        </div>
        <Button
          onClick={() => {
            setStates((prev) => ({
              ...prev,
              createBlog: true,
            }));
            router.push("/admin/blogs/create");
          }}
          className="flex items-center gap-2 ml-auto"
        >
          {states.createBlog ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Plus size={15} />
          )}
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
              <AdminBlogCard
                key={post?.id}
                post={post}
                setDeleted={setDeleted}
              />
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
}
