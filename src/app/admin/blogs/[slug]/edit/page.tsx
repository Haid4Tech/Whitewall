"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import BlogForm from "@/components/admin/blog/blog-form";

export default function EditBlog() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-row justify-between">
        <div className="mb-6">
          <h1 className={"text-lg md:text-3xl font-bold text-foreground"}>
            Edit Blog Post
          </h1>
          <p className="text-xs md:text-base text-gray-600">
            Share your insights and expertise
          </p>
        </div>

        <Button
          className="md:w-1/8"
          onClick={() => {
            setIsNavigating(true);
            router.back();
          }}
        >
          {isNavigating ? <LoadingSpinner size="sm" /> : "Back"}
        </Button>
      </div>

      <BlogForm blogformType={"edit"} postId={params?.slug} />
    </div>
  );
}
