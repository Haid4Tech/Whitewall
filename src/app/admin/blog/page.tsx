"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, User } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  status: "published" | "draft";
  coverImage: string;
  category: string;
}

const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "2024 Real Estate Market Trends",
    excerpt:
      "Discover the latest trends shaping the real estate market this year...",
    author: "Sarah Johnson",
    publishDate: "2024-01-15",
    status: "published",
    coverImage:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=400",
    category: "Market Analysis",
  },
  {
    id: "2",
    title: "First Time Home Buyer's Guide",
    excerpt: "Everything you need to know about buying your first home...",
    author: "Mike Chen",
    publishDate: "2024-01-10",
    status: "draft",
    coverImage:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=400",
    category: "Buying Tips",
  },
];

export default function Page() {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "published"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-muted relative">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-3 right-3 ${getStatusColor(
                  blog.status
                )}`}
              >
                {blog.status}
              </Badge>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <Badge variant="outline" className="mb-2">
                  {blog.category}
                </Badge>
                <h3 className="font-semibold text-lg">{blog.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
