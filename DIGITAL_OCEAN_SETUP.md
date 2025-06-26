# Digital Ocean Spaces Setup

This guide will help you set up Digital Ocean Spaces for image uploads in the Add Property page using a server-side approach to avoid CORS issues.

## 1. Create a Digital Ocean Account

1. Go to [Digital Ocean](https://www.digitalocean.com/) and create an account
2. Add a payment method to your account

## 2. Create a Spaces Bucket

1. In your Digital Ocean dashboard, go to "Spaces"
2. Click "Create a Space"
3. Choose a region (e.g., NYC3)
4. Choose a name for your bucket (e.g., `whitewall-properties`)
5. Set the file listing to "Public" (so images can be accessed via URL)
6. Click "Create a Space"

## 3. Generate API Keys

1. Go to "API" in your Digital Ocean dashboard
2. Click "Generate New Token"
3. Give it a name (e.g., "Whitewall Spaces Access")
4. Select "Write" permissions
5. Copy the generated token (you'll only see it once!)

## 4. Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Digital Ocean Spaces Configuration (Server-side only)
SPACES_ENDPOINT=https://nyc3.digitaloceanspaces.com
SPACES_BUCKET=your-bucket-name
SPACES_ACCESS_KEY=your-access-key
SPACES_SECRET_KEY=your-secret-key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Important Notes:**
- The Spaces credentials are **NOT** prefixed with `NEXT_PUBLIC_` because they're only used server-side
- This prevents exposing sensitive credentials to the browser
- The upload happens through Next.js API routes, avoiding CORS issues

Replace the values with your actual configuration:
- `SPACES_ENDPOINT`: Your region endpoint (e.g., `https://nyc3.digitaloceanspaces.com`)
- `SPACES_BUCKET`: Your bucket name
- `SPACES_ACCESS_KEY`: Your access key
- `SPACES_SECRET_KEY`: Your secret key

## 5. How It Works

The upload process now works as follows:

1. **Client-side**: User selects images in the browser
2. **FormData**: Images are wrapped in FormData
3. **API Route**: FormData is sent to `/api/upload-images`
4. **Server-side**: Next.js API route handles the upload to Digital Ocean Spaces
5. **Response**: API returns the uploaded image URLs
6. **Firebase**: Property data with image URLs is saved to Firestore

This approach completely avoids CORS issues because:
- No direct browser-to-Spaces communication
- All uploads go through your Next.js server
- Credentials are kept secure on the server

## 6. API Routes Created

The following API routes handle the upload process:

- **`/api/upload-images`**: Handles image uploads to Digital Ocean Spaces
- **`/api/delete-image`**: Handles image deletion from Digital Ocean Spaces

Both routes include:
- File validation (type, size)
- Error handling
- CORS support
- Security checks

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/admin/properties/add`
3. Try uploading an image
4. Check if the image appears in your Digital Ocean Spaces bucket
5. Verify the image URLs are saved in Firebase

## Troubleshooting

### Common Issues:

1. **"Credentials not configured" error**
   - Make sure all environment variables are set correctly
   - Restart your development server after adding environment variables
   - Ensure variables are NOT prefixed with `NEXT_PUBLIC_`

2. **Upload fails with 500 error**
   - Check your API key permissions
   - Verify your bucket name and region
   - Check the server console for detailed error messages

3. **File validation errors**
   - Ensure files are JPG, PNG, or WebP
   - Check file size (max 10MB)
   - Verify file integrity

4. **CORS errors (should not occur)**
   - The server-side approach eliminates CORS issues
   - If you see CORS errors, check your API route configuration

### Security Benefits:

- ✅ No client-side credentials exposure
- ✅ Server-side validation and security
- ✅ No CORS configuration needed
- ✅ Better error handling and logging
- ✅ Rate limiting capabilities (can be added)

## Production Deployment

For production deployment:

1. Set up environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Use production API keys with appropriate permissions
3. Consider implementing rate limiting on the API routes
4. Set up monitoring for upload failures and storage usage
5. Consider implementing image optimization and CDN

## File Structure

```
src/
├── app/
│   └── api/
│       ├── upload-images/
│       │   └── route.ts          # Handles image uploads
│       └── delete-image/
│           └── route.ts          # Handles image deletion
├── lib/
│   └── spaces-upload.ts          # Client-side upload utilities
└── app/admin/properties/add/
    └── page.tsx                  # Add Property page
```

This server-side approach provides a robust, secure, and CORS-free solution for image uploads to Digital Ocean Spaces. 