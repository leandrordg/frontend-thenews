import { getMotivationalMessage } from "@/lib/utils";
import { Streak, User } from "@prisma/client";

interface MotivationalMessageProps {
  streak?: Streak & {
    position: number;
    user: User;
  };
}

export function MotivationalRankingMessage({
  streak,
}: MotivationalMessageProps) {
  if (!streak) return null;

  const message = getMotivationalMessage(streak.position);

  return (
    <div className="border rounded-md p-4 shadow-2xs">
      <p className="font-medium">🏆 {message}</p>
    </div>
  );
}
