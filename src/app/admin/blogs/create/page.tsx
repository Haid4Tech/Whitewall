"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import BlogForm from "@/components/admin/blog/blog-form";

interface LoadingProps {
  isBack: boolean;
}

const LoadingInitial = {
  isBack: false,
};

export default function Page() {
  const [loadingStates, setLoadingStates] =
    useState<LoadingProps>(LoadingInitial);
  const router = useRouter();

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-row justify-between">
        <div className="mb-6">
          <h1 className={"text-lg md:text-3xl font-bold text-foreground"}>
            Create New Blog Post
          </h1>
          <p className="text-xs md:text-base text-gray-600">
            Share your insights and expertise
          </p>
        </div>

        <Button
          className="md:w-1/8"
          onClick={() => {
            setLoadingStates({
              isBack: true,
            });
            router.back();
          }}
        >
          {loadingStates.isBack ? <LoadingSpinner size="sm" /> : "Back"}
        </Button>
      </div>

      <BlogForm blogformType={"create"} />
    </div>
  );
}
