import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto p-4 py-16 space-y-8">
      <Skeleton className="w-full h-24" />
      <Skeleton className="w-full h-32" />
      <Skeleton className="w-full h-40" />
      <Skeleton className="w-full h-24" />
      <Skeleton className="w-full h-32" />
      <Skeleton className="w-full h-40" />
    </main>
  );
}
