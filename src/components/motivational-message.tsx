import { getMessage } from "@/lib/utils";

interface MotivationalMessageProps {
  streak: number;
}

export function MotivationalMessage({ streak }: MotivationalMessageProps) {
  return (
    <div className="border rounded-md p-4 shadow-2xs">
      <p className="font-medium">🚀 {getMessage(streak)}</p>
    </div>
  );
}
