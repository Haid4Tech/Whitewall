"use client";

import { useState, useMemo, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/common/data";
// import { Search, Calendar, User, Clock } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";

export const BlogList = () => {
  // const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Reset search and category when component mounts
    setSearchQuery("");
    setSelectedCategory("All");
  }, []);

  // const categories = [
  //   "All",
  //   "Market Analysis",
  //   "Selling Tips",
  //   "Investment",
  //   "Luxury Market",
  // ];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        {/* <div className="grid md:grid-cols-2 items-center mb-8 space-y-4 gap-5">
          <div className="relative my-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div> */}

        {/* Blog Posts Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {filteredPosts.length} Article
            {filteredPosts.length !== 1 ? "s" : ""} Found
          </h2>
          <p className="text-muted-foreground">
            {selectedCategory !== "All"
              ? `Showing articles in ${selectedCategory}`
              : "Showing all articles"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <BlogCard key={post?.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
