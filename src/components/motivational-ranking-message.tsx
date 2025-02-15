import { getMotivationalRankingMessage } from "@/lib/utils";

interface MotivationalMessageProps {
  ranking: number | null;
}

export async function MotivationalRankingMessage({
  ranking,
}: MotivationalMessageProps) {
  return (
    <div className="border rounded-md p-4 shadow-2xs">
      <p className="font-medium">🏆 {getMotivationalRankingMessage(ranking)}</p>
    </div>
  );
}
