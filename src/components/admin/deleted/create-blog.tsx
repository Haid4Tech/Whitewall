"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { BlogPost } from "@/common/types";
import { toast } from "sonner";

const CreateBlogForm = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    content: "",
    excerpt: "",
    author: {
      name: "",
      image: "",
    },
    isPublished: false,
    featuredImage: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      loadPost(id as string);
    }
  }, [id, isEditing]);

  const loadPost = async (postId: string) => {
    try {
      setLoading(true);

      if (post) {
        setFormData({
          title: post?.title,
          content: post?.content ?? "",
          excerpt: post.excerpt,
          author: {
            name: post?.author?.name ?? "",
            image: post?.author?.image ?? "",
          },
          isPublished: post.isPublished,
          image: post?.image ?? "",
          tags: post.tags,
        });
        setTagInput(post.tags.join(", "));
      }
    } catch (error) {
      console.error("Error loading blog post:", error);
      toast("Error", {
        description: "Failed to load blog post",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) {
      toast("Error", {
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      setSubmitting(true);
      const tags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      const dataToSubmit = { ...formData, tags };

      if (isEditing && id) {
        await blogService.updatePost(id, dataToSubmit);
        toast("Success", {
          description: "Blog post updated successfully",
        });
      } else {
        await blogService.createPost(dataToSubmit);
        toast("Success", {
          description: "Blog post created successfully",
        });
      }
      router.push("/blog");
    } catch (error) {
      console.error("Error loading blog post:", error);
      toast("Error", {
        description: `Failed to ${isEditing ? "update" : "create"} blog post`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div className="mb-6">
        <h1 className={"text-2xl font-semibold text-gray-900"}>
          {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <p className="text-gray-600">
          {isEditing
            ? "Update your blog post"
            : "Share your insights and expertise"}
        </p>
      </div>

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
              value={formData.author?.name}
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
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
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
    </div>
  );
};

export default CreateBlogForm;
