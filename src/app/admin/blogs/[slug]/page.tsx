"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBlogDocumentById } from "@/firebase/blog";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, BookOpen, MoveLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { BlogPost } from "@/common/types";
import Image from "next/image";
import { formatTimestamp } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Page() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [state, setState] = useState<boolean>(false);
  const [blog, setBlog] = useState<BlogPost | null>();

  useEffect(() => {
    (async () => {
      const post = (await getBlogDocumentById(params.slug)) as BlogPost | null;
      setBlog(post);
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

  return (
    <div className="space-y-8 pb-8">
      <Button
        className="w-1/8"
        onClick={() => {
          setState(true);
          router.back();
        }}
      >
        {state ? <LoadingSpinner size="sm" /> : <MoveLeft size={15} />}
        Back
      </Button>
      <div className="relative h-[70vh] overflow-hidden">
        <Image
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

      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 py-8 border-b">
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
    </div>
  );
}
