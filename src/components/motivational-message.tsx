import { getMessage } from "@/lib/utils";

interface MotivationalMessageProps {
  streak: number;
}

export function MotivationalMessage({ streak }: MotivationalMessageProps) {
  return (
    <div className="rounded-lg bg-muted p-4 text-primary">
      <p className="font-medium">🚀 {getMessage(streak)}</p>
    </div>
  );
}
