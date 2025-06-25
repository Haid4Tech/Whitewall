"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PropertyEditDialog } from "@/components/admin/properties/property-edit-modal";
import { getPropertyBySlug } from "@/firebase/properties";
import { Property } from "@/common/types";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyEditMobilePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      setError(null);
      try {
        const prop = await getPropertyBySlug(slug);
        if (!prop) {
          setError("Property not found");
        } else {
          setProperty(prop);
          setShowForm(true);
        }
      } catch (e) {
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProperty();
  }, [slug]);

  const handleSave = (updated: Property) => {
    // After save, redirect to property details
    router.replace(`/admin/properties/${updated.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Loading property...</p>
      </div>
    );
  }
  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-destructive mb-4">{error || "Property not found"}</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Edit Property</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {showForm && (
          <PropertyEditDialog
            isOpen={true}
            onClose={() => router.back()}
            property={property}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
} 