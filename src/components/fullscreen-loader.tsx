import { EllipsisIcon } from "lucide-react";

export function FullScreenLoader({ label }: { label?: string }) {
  return (
    <main className="min-h-dvh flex flex-col gap-2 items-center justify-center">
      <EllipsisIcon className="size-6 animate-pulse" />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </main>
  );
}
