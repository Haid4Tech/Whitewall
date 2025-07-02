"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/common/types";
import ReactMarkdown from "react-markdown";
import { formatTimestamp } from "@/lib/utils";
import { getBlogDocumentById } from "@/firebase/blog";
import LoadingSpinner from "@/components/ui/loading-spinner";

const loadingStateInitial = {
  isBack: false,
  isOtherBlog: false,
  isProperties: false,
};

interface loadingStateProps {
  isBack: boolean;
  isOtherBlog: boolean;
  isProperties: boolean;
}

export default function Page() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [state, setState] = useState<loadingStateProps>(loadingStateInitial);
  const [blog, setBlog] = useState<BlogPost | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const post = (await getBlogDocumentById(
          params.slug
        )) as BlogPost | null;
        setBlog(post);
        setError(null);
      } catch (error) {
        setError("Failed to load blog. Please try again later");
        throw error;
      }
    })();
  }, [params, blog]);

  if (!blog) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading blog...</p>
      </div>
    );
  }

  if (error) {
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
    </div>;
  }

  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: post?.title,
  //       text: post?.excerpt,
  //       url: window.location.href,
  //     });
  //   } else {
  //     navigator.clipboard.writeText(window.location.href);
  //   }
  // };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[70vh] overflow-hidden">
        <img
          width={400}
          height={400}
          src={blog?.coverImageUrl ?? ""}
          alt={blog?.title ?? "Blog image"}
          className="w-full h-full rounded-lg object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <Badge className="mb-4 bg-white/90 text-foreground">
              {blog?.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {blog?.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-10">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-4 pb-4 border-b">
          <div className="flex items-center gap-2">
            <User size={20} />
            <span className="font-medium">{blog?.author?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={20} />
            {blog?.publishDate
              ? formatTimestamp(
                  blog.publishDate instanceof Date
                    ? blog.publishDate.toISOString()
                    : blog.publishDate ?? undefined
                )
              : "No Date"}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} />
            {blog?.readTime}
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} />
            Article
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-sm mb-4 text-gray-800">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 className="text-xl font-bold mb-2">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mb-2">{children}</h2>
              ),
              li: ({ children }) => (
                <li className="text-sm list-disc ml-6">{children}</li>
              ),
            }}
          >
            {blog?.content || "No content..."}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog?.tags?.map((tag) => (
              <Badge className="bg-gray-200" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blog?.youtubeLinks?.map((link, index) => {
            const videoId = link.split("/").pop();
            return (
              <div key={index} className="relative group">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allowFullScreen
                  className="w-full aspect-video rounded-md"
                />
              </div>
            );
          })}
        </div>

        {/* Related Posts */}
        {/* {relatedPosts.length > 0 && (
          <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
            </div>
            </div>
            )} */}

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Take the Next Step?
          </h3>
          <p className="text-muted-foreground mb-6">
            Connect with our expert real estate professionals to discuss your
            property needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setState((prev) => ({ ...prev, isProperties: true }));
                router.push("/properties");
              }}
              size="lg"
            >
              {state.isProperties ? (
                <LoadingSpinner size="sm" />
              ) : (
                "View Proprties"
              )}
            </Button>

            <Button
              onClick={() => {
                setState((prev) => ({ ...prev, isOtherBlog: true }));
                router.push("/blog");
              }}
              variant="outline"
              size="lg"
            >
              {state.isOtherBlog ? (
                <LoadingSpinner size="sm" />
              ) : (
                "More Articles"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
