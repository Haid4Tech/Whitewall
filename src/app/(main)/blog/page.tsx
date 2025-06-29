"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, User, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/common/data";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Page() {
  const router = useRouter();
  const [loadingStates, setLoadingStates] = useState({
    pageLoad: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!blogPosts) {
    setLoadingStates({
      pageLoad: true,
    });
  }

  if (loadingStates.pageLoad) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading blog...</p>
      </div>
    );
  }

  const categories = [
    "All",
    "Market Analysis",
    "Selling Tips",
    "Investment",
    "Luxury Market",
  ];

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

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-br from-background to-muted/20 border-b-1 border-gray-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-gold animate-fade-in">
            Real Estate
            <span className="h-20 block text-gray-700">Insights & Tips</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay informed with the latest market trends, expert advice, and
            insider tips from our real estate professionals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <div className="grid md:grid-cols-2 gap-8 bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64 md:h-auto">
              <Image
                width={200}
                height={200}
                src={featuredPost?.featuredImage ?? ""}
                alt={featuredPost?.title ?? ""}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="text-white py-2">Featured</Badge>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-3">
                {featuredPost.category}
              </Badge>
              <h3 className="text-2xl font-bold mb-4 leading-tight">
                {featuredPost.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {featuredPost.author?.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {featuredPost?.publishDate
                    ? // Handle Firestore Timestamp or string/Date
                      typeof featuredPost.publishDate === "object" &&
                      typeof (featuredPost.publishDate as any).toDate ===
                        "function"
                      ? (featuredPost.publishDate as any)
                          .toDate()
                          .toLocaleDateString()
                      : new Date(
                          featuredPost.publishDate as string | number | Date
                        ).toLocaleDateString()
                    : "No Date"}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredPost.readTime}
                </div>
              </div>

              <Button
                onClick={() => router.push(`/blog/${featuredPost.slug}`)}
                className="w-fit"
              >
                Read Full Article
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-2 items-center mb-8 space-y-4 gap-5">
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
        </div>

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
            <BlogCard key={post?.slug} post={post} />
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
}
