"use client";

import { useEffect } from "react";
import { BlogManagement } from "@/components/admin/blog/blog-management";
import { getBlogs } from "@/firebase/blog";

export default function Page() {
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getBlogs();
      console.log("BLOG ", blogs);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <BlogManagement />
    </div>
  );
}
