import { getMotivationalRankingMessage } from "@/lib/utils";
import { Streak, User } from "@prisma/client";

interface MotivationalMessageProps {
  streak?: Streak & {
    position: number;
    user: User;
  };
}

export async function MotivationalRankingMessage({
  streak,
}: MotivationalMessageProps) {
  if (!streak) return null;

  return (
    <div className="border rounded-md p-4 shadow-2xs">
      <p className="font-medium">
        🏆 {getMotivationalRankingMessage(streak.position)}
      </p>
    </div>
  );
}
