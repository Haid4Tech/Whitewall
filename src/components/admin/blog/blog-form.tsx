"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { BlogPost } from "@/common/types";
import { initialBlogData } from "@/common/initial-values";
import { getBlogDocumentById } from "@/firebase/blog";

interface BlogFormProps {
  postId?: string;
  blogformType: "create" | "edit";
}

const BlogForm: React.FC<BlogFormProps> = ({ postId, blogformType }) => {
  const router = useRouter();
  const isEditing = Boolean(postId);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<BlogPost>(initialBlogData);

  useEffect(() => {
    if (blogformType === "create") return;

    if (blogformType === "edit") {
      if (postId) {
        (async () => {
          const post = await getBlogDocumentById(postId);

          console.log("Blog Post", post);
          if (post) {
            setFormData({ ...post, id: postId });
          }
        })();
      }
    }
  }, []);

  const [tagInput, setTagInput] = useState(
    initialBlogData?.tags?.join(", ") || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) {
      toast("Error", {
        description: "Please fill in all required fields",
      });
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-lg p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter blog post title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            value={formData?.author?.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                author: { ...formData.author, name: e.target.value },
              })
            }
            placeholder="Author name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          placeholder="Brief description of the blog post"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Write your blog post content here..."
          rows={12}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="featuredImage">Featured Image URL</Label>
          <Input
            id="featuredImage"
            value={formData?.featuredImage}
            onChange={(e) =>
              setFormData({ ...formData, featuredImage: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="real estate, tips, investment"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isPublished: checked })
          }
        />
        <Label htmlFor="isPublished">Publish immediately</Label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/blog")}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : isEditing ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
