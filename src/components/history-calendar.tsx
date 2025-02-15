import { cn } from "@/lib/utils";

interface HistoryEntry {
  date: Date;
  accessed: boolean;
  isSunday: boolean;
}

export function HistoryCalendar({ history }: { history: HistoryEntry[] }) {
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dayStatus = history.find(
      (entry) => new Date(entry.date).toDateString() === date.toDateString()
    );

    return {
      date,
      accessed: dayStatus ? dayStatus.accessed : false,
      isSunday: date.getDay() === 0,
    };
  }).reverse();

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 lg:grid-cols-14 gap-2">
        {data.map((day, i) => (
          <div
            key={i}
            className={cn("aspect-square rounded-md select-none border", {
              "bg-[#FFCE04] cursor-pointer": day.accessed,
              "bg-muted": !day.accessed,
              "bg-card cursor-not-allowed": day.isSunday,
            })}
          >
            <div className="flex items-center justify-center h-full">
              <span
                className={cn(
                  "text-xs font-semibold",
                  day.accessed ? "text-black/80" : "text-muted-foreground"
                )}
              >
                {day.date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-[#FFCE04] border" />
          <span>Acessado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-muted border" />
          <span>Não acessado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-card border" />
          <span>Domingo (desabilitado)</span>
        </div>
      </div>
    </div>
  );
}
