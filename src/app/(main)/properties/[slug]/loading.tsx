import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center">
      <LoadingSpinner size="lg" />
      <p className="mt-6 text-slate-600 text-lg">Loading your dream home...</p>
    </div>
  );
}
