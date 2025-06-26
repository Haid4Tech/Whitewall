import { getPropertyBySlug } from "@/firebase/properties";
import { getAbsoluteUrl } from "@/lib/utils";
import type { Metadata } from "next";
import PropertyDetailPage from "./property-page-client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  // Fetch the property data based on the slug
  const listing = await getPropertyBySlug(slug);

  if (!listing) {
    return {
      title: "Listing Not Found",
    };
  }

  const imageUrl = `${listing.images[0]}?auto=format&fit=crop&w=1200&h=630`;
  const currentUrl = getAbsoluteUrl(`/properties/${listing.slug}`);

  return {
    title: listing.title,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      type: "article",
      url: currentUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
      siteName: "WhiteWall Real Estate",
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.description,
      images: [imageUrl],
      site: "@whitewall", // Ensure this is your actual Twitter handle
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let propertyData;
  try {
    propertyData = await getPropertyBySlug(slug);
  } catch (e) {
    console.error("Error fetching property:", e);
    notFound();
  }

  if (!propertyData) {
    notFound(); //
  }

  const plainListing = JSON.parse(JSON.stringify(propertyData));

  return <PropertyDetailPage property={plainListing} />;
}
