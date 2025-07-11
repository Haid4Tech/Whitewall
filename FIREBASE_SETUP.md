# Firebase Firestore Setup for Properties

This document explains how to set up Firebase Firestore to work with the properties feature.

## Prerequisites

1. A Firebase project with Firestore enabled
2. Firebase configuration environment variables set up in your `.env.local` file

## Environment Variables

Make sure you have the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECTID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firestore Database Structure

The properties are stored in a collection called `properties` with the following document structure:

```typescript
{
  id: string;                    // Auto-generated by Firestore
  title: string;                 // Property title
  location: string;              // Property location
  price: number;                 // Property price
  priceType: string;             // "for sale" or "per month"
  bedrooms: number;              // Number of bedrooms
  bathrooms: number;             // Number of bathrooms
  sqft: number;                  // Square footage
  type: string;                  // Property type (house, apartment, villa, condo)
  image: string;                 // Image URL
  featured: boolean;             // Whether property is featured
  description: string;           // Property description
  amenities: string[];           // Array of amenities
  createdAt: Timestamp;          // Auto-generated timestamp
  updatedAt: Timestamp;          // Auto-generated timestamp
}
```

## Seeding the Database

To populate your Firestore database with the existing properties data, you can run the seeding script:

1. Navigate to the project directory
2. Open the browser console or create a temporary page to run the seeding function
3. Import and run the seeding function:

```typescript
import { seedProperties } from './src/scripts/seed-properties';

// Run the seeding
seedProperties();
```

## Firestore Security Rules

Make sure your Firestore security rules allow read access to the properties collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to properties
    match /properties/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

## Features Implemented

- ✅ Fetch all properties from Firestore
- ✅ Fetch single property by ID
- ✅ Fetch featured properties
- ✅ Search properties with filters
- ✅ Create new properties
- ✅ Update existing properties
- ✅ Delete properties
- ✅ Loading states and error handling
- ✅ Client-side filtering and search

## Usage

The properties page now automatically fetches data from Firebase Firestore instead of using static data. The implementation includes:

- Loading states while fetching data
- Error handling for failed requests
- Client-side filtering and search
- Real-time data from Firestore

## Troubleshooting

1. **Properties not loading**: Check your Firebase configuration and ensure Firestore is enabled
2. **Permission errors**: Verify your Firestore security rules allow read access
3. **Empty results**: Make sure you've seeded the database with properties data
4. **Environment variables**: Ensure all Firebase environment variables are correctly set 