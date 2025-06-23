"use client";

import { useState } from "react";
import CreateBlogForm from "@/components/admin/blog/create-blog";
import BlogList from "@/components/admin/blog/blog-list";

import { BlogManagement } from "@/components/admin/blog/blog-management";

enum BlogType {
  NEW = "new",
  EDIT = "edit",
  MAIN = "main",
}

export default function Page() {
  const [type, setType] = useState<BlogType | undefined>(BlogType.MAIN);

  return (
    // <div>
    //   {type === BlogType.NEW && <CreateBlogForm />}
    //   {type === BlogType.EDIT && <></>}
    //   {type === BlogType.MAIN && <BlogList />}
    // </div>

    <div>
      <BlogManagement />
    </div>
  );
}
