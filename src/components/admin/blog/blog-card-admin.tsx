/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  User,
  Clock,
  Edit,
  Trash2,
  Eye,
  Heart,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/common/types";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { deleteBlog } from "@/firebase/blog";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface ILoadingStates {
  isEdit: boolean;
  isDelete: boolean;
  isPreview: boolean;
}

const loadingStatesInitial = {
  isEdit: false,
  isDelete: false,
  isPreview: false,
};

type IBlogCard = BlogPost & { id: string };

interface AdminBlogCardProps {
  post: IBlogCard;
  setDeleted: Dispatch<SetStateAction<boolean>>;
}

export const AdminBlogCard = ({ post, setDeleted }: AdminBlogCardProps) => {
  const router = useRouter();
  const [states, setStates] = useState<ILoadingStates>(loadingStatesInitial);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);

  const handleDelete = async (blog: BlogPost) => {
    setBlogToDelete(blog);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setStates((prev) => ({ ...prev, isDelete: true }));

      const isDeleted = await deleteBlog(post.id);

      if (isDeleted) {
        setDeleted(isDeleted);
        toast.success("Deleted post successfully!");
      }
    } catch (error) {
      throw error;
    } finally {
      setStates((prev) => ({ ...prev, isDelete: false }));
    }
  };

  const cancelDelete = () => {
    setBlogToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const formatDate = (date: any) => {
    if (!date) return "No Date";
    if (typeof date === "object" && typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
        {states.isDelete && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm font-medium">Deleting...</span>
            </div>
          </div>
        )}

        <div className="relative overflow-hidden">
          {post?.coverImageUrl ? (
            <Image
              width={200}
              height={200}
              src={post?.coverImageUrl ?? ""}
              alt={post.title || "Blog post"}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              className={`${getStatusColor(
                post.isPublished ? "published" : "draft"
              )} border`}
            >
              {post.isPublished ? "published" : "draft"}
            </Badge>
          </div>

          {/* Category Badge */}
          {post.category && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-white/90 text-foreground"
              >
                {post.category}
              </Badge>
            </div>
          )}

          {/* Admin Controls Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => router.push(`/admin/blogs/${post.slug}/edit`)}
              className="bg-white/90 hover:bg-white text-black"
            >
              <Edit size={15} />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(post)}
              className="bg-red-500/90 hover:bg-red-600"
            >
              <Trash2 size={15} />
            </Button>
          </div>
        </div>

        <CardContent className="pb-4 px-4 pt-0">
          <div className="flex items-start justify-between mb-2 h-14">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors flex-1">
              {post.title || "Untitled Post"}
            </h3>
          </div>

          <div className={"h-15"}>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {post.excerpt || "No excerpt available..."}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {post.author?.name || "Unknown"}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(post.publishDate)}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime || 0} min
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {post.views || 0}
            </div>
            <div className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              {post.likes || 0}
            </div>
            <div className="flex items-center">
              <BarChart3 className="h-3 w-3 mr-1" />
              SEO: {post.seoScore || 0}%
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags?.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {(post.tags?.length || 0) > 2 && (
              <Badge variant="outline" className="text-xs">
                +{(post.tags?.length || 0) - 2}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setStates((prev) => ({ ...prev, isPreview: true }));
                router.push(`/admin/blogs/${post.id}`);
              }}
              className="flex-1"
            >
              {states.isPreview ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Eye size={15} />
                  View
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setStates((prev) => ({ ...prev, isEdit: true }));
                router.push(`/admin/blogs/${post.id}/edit`);
              }}
              className="flex-1"
            >
              {states.isEdit ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Edit size={15} />
                  Edit
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="delete"
              onClick={() => handleDelete(post)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {states.isDelete ? (
                <LoadingSpinner
                  className="border-primary-danger/10 border-t-primary-danger"
                  size="sm"
                />
              ) : (
                <Trash2 size={15} />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Property"
        description={
          blogToDelete
            ? `Are you sure you want to delete "${blogToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Post"
        cancelText="Cancel"
        variant="danger"
        isLoading={states.isDelete}
      />
    </>
  );
};
