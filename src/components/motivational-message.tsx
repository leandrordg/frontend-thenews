import { getMotivationalMessage } from "@/lib/utils";
import { Streak } from "@prisma/client";

interface MotivationalMessageProps {
  streaks?: Streak[];
}

export function MotivationalMessage({ streaks }: MotivationalMessageProps) {
  const activeStreak = streaks?.find((streak) => streak.status === "ativo");

  return (
    <div className="border rounded-md p-4 shadow-2xs">
      <p className="font-medium">🚀 {getMotivationalMessage(activeStreak?.streakDays)}</p>
    </div>
  );
}
