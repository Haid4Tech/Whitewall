"use client";

import { BlogPost } from "@/common/types";
import { BlogEditor } from "@/components/admin/blog/blog-editor";

export default function EditBlog() {
  return (
    <div>
      <BlogEditor onSave={() => {}} onCancel={() => {}} />
    </div>
  );
}
