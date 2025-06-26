import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Folder, FileText } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  color: string;
}

export const BlogCategories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Home Staging",
      slug: "home-staging",
      description:
        "Tips and tricks for staging homes to sell faster and for better prices",
      postCount: 8,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "2",
      name: "Market Analysis",
      slug: "market-analysis",
      description: "Real estate market trends, statistics, and forecasts",
      postCount: 12,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "3",
      name: "Buyer Guide",
      slug: "buyer-guide",
      description: "Complete guides for first-time and experienced home buyers",
      postCount: 6,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "4",
      name: "Seller Tips",
      slug: "seller-tips",
      description:
        "Expert advice for homeowners looking to sell their properties",
      postCount: 9,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "5",
      name: "Investment",
      slug: "investment",
      description: "Real estate investment strategies and opportunities",
      postCount: 4,
      color: "bg-red-100 text-red-800",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "bg-gray-100 text-gray-800",
  });

  const colorOptions = [
    { value: "bg-blue-100 text-blue-800", label: "Blue" },
    { value: "bg-green-100 text-green-800", label: "Green" },
    { value: "bg-purple-100 text-purple-800", label: "Purple" },
    { value: "bg-yellow-100 text-yellow-800", label: "Yellow" },
    { value: "bg-red-100 text-red-800", label: "Red" },
    { value: "bg-indigo-100 text-indigo-800", label: "Indigo" },
    { value: "bg-pink-100 text-pink-800", label: "Pink" },
    { value: "bg-gray-100 text-gray-800", label: "Gray" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");

    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData, slug } : cat
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        slug,
        postCount: 0,
      };
      setCategories([...categories, newCategory]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: "bg-gray-100 text-gray-800",
    });
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    });
    setShowForm(true);
  };

  const handleDelete = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Categories</h2>
          <p className="text-gray-600">Organize your content with categories</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter category name..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of this category..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, color: option.value })
                      }
                      className={`p-2 rounded-md border-2 transition-colors ${
                        formData.color === option.value
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Badge className={option.value}>{option.label}</Badge>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  {editingCategory ? "Update Category" : "Create Category"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-gray-600" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <Badge className={category.color}>
                  {category.postCount} posts
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{category.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>/{category.slug}</span>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge className={category.color}>{category.name}</Badge>
                  <span className="text-sm text-gray-600">
                    {category.description}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    {category.postCount} posts
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(category.postCount / 12) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
