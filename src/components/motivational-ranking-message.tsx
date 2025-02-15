import { getMotivationalRankingMessage } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Streak } from "@prisma/client";

interface MotivationalMessageProps {
  streakRanking: (Streak & {
    position: number;
  })[];
}

export async function MotivationalRankingMessage({
  streakRanking,
}: MotivationalMessageProps) {
  const user = await currentUser();

  const position = streakRanking.find(
    (entry) => entry.email === user?.primaryEmailAddress?.emailAddress
  )?.position;

  return (
    <div className="border rounded-md p-4 shadow-2xs">
      <p className="font-medium">
        🏆 {getMotivationalRankingMessage(position)}
      </p>
    </div>
  );
}
