import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import BlogForm from "@/components/admin/blog/blog-form";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <div>
      <div className="w-full mx-auto">
        <div className="mb-6">
          <h1 className={"text-2xl font-semibold text-gray-900"}>
            Create New Blog Post
          </h1>
          <p className="text-gray-600">Share your insights and expertise</p>
        </div>

        <BlogForm blogformType={"create"} />
      </div>
    </div>
  );
}
