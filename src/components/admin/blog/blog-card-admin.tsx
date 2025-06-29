"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/common/types";
// import { BlogFormDialog } from "./BlogFormDialog";
// import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

type IBlogCard = BlogPost & { id: string };

interface AdminBlogCardProps {
  post: IBlogCard;
  onEdit?: (post: IBlogCard) => void;
  onDelete?: (id: string) => void;
}

export const AdminBlogCard = ({
  post,
  onEdit,
  onDelete,
}: AdminBlogCardProps) => {
  const router = useRouter();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
    setShowDeleteDialog(false);
  };

  const handleSaveEdit = (updatedPost: BlogPost) => {
    if (onEdit) {
      onEdit({ ...updatedPost, id: post.id });
    }
    setShowEditDialog(false);
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
        <div className="relative overflow-hidden">
          {post.featuredImage ? (
            <Image
              width={200}
              height={200}
              src={post.featuredImage}
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
              className={`${getStatusColor(post.status || "draft")} border`}
            >
              {post.status || "draft"}
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
              onClick={handleDelete}
              className="bg-red-500/90 hover:bg-red-600"
            >
              <Trash2 size={15} />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors flex-1">
              {post.title || "Untitled Post"}
            </h3>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {post.excerpt || "No excerpt available..."}
          </p>

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
              onClick={() => router.push(`/admin/blogs/${post.slug}/edit`)}
              className="flex-1"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* <BlogFormDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={post}
        onSave={handleSaveEdit}
        mode="edit"
      />

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title={post.title || "Untitled Post"}
      /> */}
    </>
  );
};
