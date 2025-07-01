"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/common/types";
import Image from "next/image";
import LoadingSpinner from "../ui/loading-spinner";

type IBlogCard = BlogPost & { id: string };

interface BlogCardProps {
  post: IBlogCard;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Card className="group cursor-pointer overflow-hidden hover-scale transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="relative overflow-hidden">
        <Image
          width={200}
          height={200}
          src={post?.coverImageUrl ?? ""}
          alt={post?.title ?? ""}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {post.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {post.author?.name}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {post?.publishDate
              ? typeof post.publishDate === "object" &&
                typeof (post.publishDate as any).toDate === "function"
                ? (post.publishDate as any).toDate().toLocaleDateString()
                : new Date(
                    post.publishDate as string | number | Date
                  ).toLocaleDateString()
              : "No Date"}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {post?.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post?.tags && post.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 2}
            </Badge>
          )}
        </div>

        <Link
          href={`/blog/${post.id}`}
          className="text-primary hover:text-primary/80 text-sm font-medium story-link"
          onClick={() => setIsLoading(true)}
        >
          {isLoading ? (
            <div className="flex flex-row gap-1">
              Read More
              <LoadingSpinner size="sm" />
            </div>
          ) : (
            "Read More →"
          )}
        </Link>
      </CardContent>
    </Card>
  );
};
