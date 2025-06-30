import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner size="md" />
    </div>
  );
}
