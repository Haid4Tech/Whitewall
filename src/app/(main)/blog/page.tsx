"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Search, Calendar, User, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-card";
import { CATEGORIES } from "@/lib/constants";
import { BlogPost } from "@/common/types";
import Image from "next/image";
import { getBlogs } from "@/firebase/blog";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface LoadingStatesProps {
  readArticle: boolean;
  isError: boolean;
}

const LoadingStatesInitial = {
  readArticle: false,
  isError: false,
};

type BlogProps = BlogPost & { id: string };

export default function Page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [posts, setPosts] = useState<BlogProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] =
    useState<LoadingStatesProps>(LoadingStatesInitial);

  useEffect(() => {
    // fetch blog posts on mount
    (async () => {
      try {
        const blogPosts = await getBlogs();
        setPosts(blogPosts);
        setError(null);
      } catch (error) {
        setStates((prev) => ({ ...prev, isError: true }));
        setError("Failed to load blog posts. Please try again later.");
        throw error;
      }
    })();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude the featured post from the grid
      if (post.featured) return false;

      const matchesSearch =
        post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post?.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // get features post
  const featuredPost = posts.find((post) => post.featured);

  if (posts.length === 0 && !featuredPost) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading blog...</p>
      </div>
    );
  }

  if (states.isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Error Loading Blog Posts
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                src={featuredPost?.coverImageUrl || ""}
                alt={featuredPost?.title ?? ""}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="text-white py-2">Featured</Badge>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-3">
                {featuredPost?.category ?? ""}
              </Badge>
              <h3 className="text-2xl font-bold mb-4 leading-tight">
                {featuredPost?.title ?? ""}
              </h3>
              <p className="text-muted-foreground mb-6">
                {featuredPost?.excerpt ?? ""}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {featuredPost?.author?.name}
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
                  {featuredPost?.readTime ?? 0}
                </div>
              </div>

              <Button
                onClick={() => {
                  setStates((prev) => ({ ...prev, readArticle: true }));
                  router.push(`/blog/${featuredPost?.id}`);
                }}
                className="w-fit"
              >
                {states.readArticle ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  "Read Full Article"
                )}
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
            {CATEGORIES.map((category) => (
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
          {filteredPosts.map((post) => (
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
}
