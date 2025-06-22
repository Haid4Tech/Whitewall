import { blogService } from "@/services/blog-services";
import BlogForm from "./blog-form";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function EditBlogPage({ params }: EditPageProps) {
  const post = blogService.getPostById(params.id);

  if (!post) return notFound();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Blog Post</h1>
      <BlogForm postId={params.id} initialData={{ id: "asa", tags: [""] }} />
    </div>
  );
}
