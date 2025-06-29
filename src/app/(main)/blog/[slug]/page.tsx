"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/common/data";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);

  // redirect to blog
  useEffect(() => {
    if (!post) {
      return router.replace("/blog");
    }
  }, [post, router]);

  const relatedPosts = blogPosts
    .filter(
      (p) =>
        p.id !== post?.id &&
        (p.category === post?.category ||
          p.tags.some((tag) => post?.tags.includes(tag)))
    )
    .slice(0, 3);

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
      {/* Hero Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          width={400}
          height={400}
          src={post?.featuredImage ?? ""}
          alt={post?.title ?? "Blog image"}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <Badge className="mb-4 bg-white/90 text-foreground">
              {post?.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post?.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span className="font-medium">{post?.author?.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {new Date(post?.publishDate ?? "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {post?.readTime}
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Article
            </div>
          </div>

          {/* Article Excerpt */}
          <div className="text-lg text-muted-foreground mb-8 p-6 bg-muted/30 border-l-4 border-primary">
            {post?.excerpt}
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post?.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

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
              <Button onClick={() => router.push("/properties")} size="lg">
                View Properties
              </Button>

              <Button
                onClick={() => router.push("/blog")}
                variant="outline"
                size="lg"
              >
                More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
