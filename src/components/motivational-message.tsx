import { Streak } from "@prisma/client";

interface MotivationalMessageProps {
  streaks?: Streak[];
}

export function MotivationalMessage({}: MotivationalMessageProps) {
  return (
    <div className="border rounded-md p-4 shadow-2xs">
      <p className="font-medium">🚀 message</p>
    </div>
  );
}
