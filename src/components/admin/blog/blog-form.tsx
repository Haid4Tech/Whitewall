"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import InputWithLabel from "@/components/general/input-field";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { BlogPost } from "@/common/types";
import { initialBlogData } from "@/common/initial-values";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import MarkDownInstructions from "@/components/general/markdown-instructions";
import {
  createBlog,
  updateBlog,
  getBlogDocumentById,
  isAnyBlogFeatured,
  isBlogFeatured,
} from "@/firebase/blog";
import { uploadImagesToSpaces } from "@/lib/spaces-upload";
import DropdownSelect from "@/components/general/select-comp";
import { CATEGORIES } from "@/lib/constants";

interface IloadingStateProps {
  submitting: boolean;
  isCancel: boolean;
}

const loadingStatesInitial = {
  submitting: false,
  isCancel: false,
};

interface BlogFormProps {
  postId?: string;
  blogformType: "create" | "edit";
}

const BlogForm: React.FC<BlogFormProps> = ({ postId, blogformType }) => {
  const router = useRouter();
  const isEditing = Boolean(postId);

  const [formData, setFormData] = useState<BlogPost>({
    ...initialBlogData,
  });

  const [youtubeInput, setYoutubeInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [states, setStates] =
    useState<IloadingStateProps>(loadingStatesInitial);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          coverImageFile: file,
          coverImageUrl: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newImages = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") &&
          !formData.images?.some((img) => img.name === file.name)
      );

      if ((formData.images?.length || 0) + newImages.length > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData((prev) => ({
            ...prev,
            images: [...(prev.images || []), file],
            imageUrls: [...(prev.imageUrls || []), e.target?.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    },
    [formData.images]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleImageUpload(e.dataTransfer.files);
    },
    [handleImageUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
      imageUrls: prev.imageUrls?.filter((_, i) => i !== index),
    }));
  };

  const removeYoutubeLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      youtubeLinks: prev.youtubeLinks?.filter((_, i) => i !== index),
    }));
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev?.tags?.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (blogformType === "edit" && postId) {
      (async () => {
        const post = (await getBlogDocumentById(postId)) as BlogPost | null;
        if (post) {
          setFormData({
            ...initialBlogData,
            ...post,
            coverImageUrl: (post as BlogPost).coverImageUrl || "",
            tags: post.tags || [],
            youtubeLinks: post.youtubeLinks || [],
            images: [],
            imageUrls: post.imageUrls || [],
          });
        }
      })();
    }
  }, [blogformType, postId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStates((prev) => ({ ...prev, submitting: true }));

    const imageFiles = formData.images ?? [];
    const uploadFiles = [
      ...(formData.coverImageFile ? [formData.coverImageFile] : []),
      ...imageFiles,
    ];

    try {
      let uploadedUrls: string[] = [];

      if (uploadFiles.length > 0) {
        uploadedUrls = await uploadImagesToSpaces(uploadFiles);
      }

      const coverImageUrl = formData.coverImageFile
        ? uploadedUrls[0]
        : formData.coverImageUrl || "";
      const additionalImageUrls =
        formData.coverImageFile && uploadedUrls.length > 1
          ? uploadedUrls.slice(1)
          : uploadedUrls;

      const payload: BlogPost = {
        ...formData,
        coverImageUrl,
        imageUrls: additionalImageUrls,
        coverImageFile: undefined, // strip File from payload
        images: undefined, // strip File array from payload
      };

      // Check if another blog is already featured
      if (formData.featured) {
        const alreadyFeatured = await isAnyBlogFeatured();
        const thisIsFeatured = isEditing && (await isBlogFeatured(postId!));

        if (alreadyFeatured && !thisIsFeatured) {
          toast.error(
            "Another blog is already marked as featured. Unfeature it first."
          );
          setStates((prev) => ({ ...prev, submitting: false }));
          return;
        }
      }

      if (isEditing) {
        // TODO: handle update logic
        await updateBlog(payload);
      } else {
        const blogId = await createBlog(payload);

        if (blogId) {
          setFormData(initialBlogData);
        }
      }

      toast.success(`Post ${isEditing ? "updated" : "created"} successfully`);
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setStates((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
      {/* Cover Image */}
      <div className="space-y-2">
        <Label>Cover Image</Label>
        <div
          className="border border-dashed rounded-lg p-4 text-center cursor-pointer"
          onClick={() => coverInputRef.current?.click()}
        >
          {formData.coverImageUrl ? (
            <img
              src={formData.coverImageUrl}
              alt="Cover Preview"
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <p className="text-gray-500">Click to upload a cover image</p>
          )}
        </div>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="hidden"
        />
      </div>

      {/* Title & Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputWithLabel
          items={{
            htmlfor: "title",
            label: "Title",
            name: "title",
            type: "text",
            placeholder: "Enter Title",
            compulsory: true,
          }}
          value={formData?.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <InputWithLabel
          items={{
            htmlfor: "author",
            label: "Author",
            name: "author",
            type: "text",
            placeholder: "Enter Author",
            compulsory: true,
          }}
          value={formData?.author?.name || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              author: { ...formData.author, name: e.target.value },
            })
          }
        />
      </div>

      {/* YouTube Links & Category */}
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
        <div className="space-y-3">
          <Label>YouTube Videos</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Paste YouTube link"
              value={youtubeInput}
              onChange={(e) => setYoutubeInput(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => {
                if (youtubeInput.trim()) {
                  setFormData((prev) => ({
                    ...prev,
                    youtubeLinks: [
                      ...(prev.youtubeLinks || []),
                      youtubeInput.trim(),
                    ],
                  }));
                  setYoutubeInput("");
                }
              }}
            >
              Add
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.youtubeLinks?.map((link, index) => {
              const videoId = link.split("/").pop();
              return (
                <div key={index} className="relative group">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allowFullScreen
                    className="w-full aspect-video rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeYoutubeLink(index)}
                    className="cursor-pointer absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                  >
                    <X size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <DropdownSelect
          compulsory
          name="category"
          label="Category"
          placeholder="Category"
          value={formData?.category ?? ""}
          handleChange={handleInputChange}
          items={CATEGORIES}
        />
      </div>

      {/* Markdown Content with Toggle */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="content">Content *</Label>
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions
                ? "Close Instructions"
                : "Formatting Instructions"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>

        {showInstructions && <MarkDownInstructions />}
        {!showPreview ? (
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Write blog post in Markdown format..."
            rows={12}
            required
          />
        ) : (
          <div className="bg-gray-50 p-4 rounded-md border space-y-4 text-base leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-sm mb-4 text-gray-800">{children}</p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold mb-2">{children}</h2>
                ),
                li: ({ children }) => (
                  <li className="text-sm list-disc ml-6">{children}</li>
                ),
              }}
            >
              {formData.content || "No content..."}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Excert and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-base gap-6">
        <InputWithLabel
          items={{
            htmlfor: "excerpt",
            label: "Excerpt",
            name: "excerpt",
            type: "text",
            placeholder: "Enter Excerpt",
            compulsory: true,
          }}
          value={formData?.excerpt ?? ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
          }
        />

        <div className="space-y-3">
          <Label>Tags</Label>
          <div className="flex space-x-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagInput.trim()) {
                  e.preventDefault();
                  if (!formData?.tags?.includes(tagInput.trim())) {
                    setFormData((prev) => ({
                      ...prev,
                      tags: [...(prev?.tags ?? []), tagInput.trim()],
                    }));
                    setTagInput("");
                  }
                }
              }}
            />
            <Button
              type="button"
              onClick={() => {
                if (
                  tagInput.trim() &&
                  !formData?.tags?.includes(tagInput.trim())
                ) {
                  setFormData((prev) => ({
                    ...prev,
                    tags: [...(prev?.tags ?? []), tagInput.trim()],
                  }));
                  setTagInput("");
                }
              }}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData?.tags?.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-xs"
              >
                {tag}
                <button
                  type="button"
                  className="cursor-pointer ml-2 text-gray-600 hover:text-red-600"
                  onClick={() => removeTag(index)}
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed p-8 text-center cursor-pointer rounded-lg"
      >
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p>
          {formData.imageUrls?.length
            ? `${formData.imageUrls.length} images uploaded`
            : "Drop or click to upload images"}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {(formData.imageUrls?.length ?? 0) > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(formData.imageUrls ?? []).map((url, index) => (
            <div key={index} className="relative group">
              <Image
                src={url}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-32"
              />
              <button
                type="button"
                className="cursor-pointer absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Publish */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isPublished}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isPublished: checked })
            }
          />
          <Label>Publish immediately</Label>
        </div>

        <div className="flex flex-row gap-3 items-center md:ml-auto">
          <Checkbox
            id={"featured"}
            checked={formData.featured}
            onCheckedChange={(checked: boolean) =>
              setFormData((prev) => ({
                ...prev,
                featured: checked,
              }))
            }
          />
          <div>
            <Label htmlFor={"featured"} className="text-sm font-semibold">
              Featured Blog Post
            </Label>
            <p className="text-xs text-gray-600">
              Featured blogs appear in Blog Hero
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setStates((prev) => ({ ...prev, isCancel: true }));
            router.push("/admin/blogs");
          }}
          disabled={states.submitting}
        >
          {states.isCancel ? <LoadingSpinner size="sm" /> : " Cancel"}
        </Button>
        <Button type="submit" disabled={states.submitting}>
          {states.submitting ? (
            <>
              <LoadingSpinner size="sm" />
              {blogformType === "edit" ? "Updating..." : "Creating..."}
            </>
          ) : blogformType === "edit" ? (
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
