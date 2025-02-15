import { Loader2Icon } from "lucide-react";

export function FullScreenLoader({ label }: { label?: string }) {
  return (
    <main className="min-h-dvh flex flex-col gap-2 items-center justify-center">
      <Loader2Icon className="size-6 animate-spin" />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </main>
  );
}
