import { Property } from "@/common/types";
import { getPropertyBySlug } from "@/firebase/properties";
import { getAbsoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import PropertyDetailPage from "./property-page-client";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params;
  const slug = param.slug;

  const listing = await getPropertyBySlug(slug);

  console.log(listing);

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
      site: "@whitewall",
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}
export default async function Page({ params }: { params: { slug: string } }) {
  const param = await params;
  const slug = param.slug;

  const propertyData = await getPropertyBySlug(slug);
  const plainListing = JSON.parse(JSON.stringify(propertyData));

  return <PropertyDetailPage property={plainListing} />;
}
