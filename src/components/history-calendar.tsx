import { cn } from "@/lib/utils";

interface HistoryEntry {
  date: Date;
  accessed: boolean;
  isSunday: boolean;
}

export function HistoryCalendar({ history }: { history: HistoryEntry[] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-14 gap-2">
        {history.map((day, i) => (
          // FEATURE: no futuro, podemos adicionar um dialog para ver os conteúdos vistos em cada dia
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

      <div className="flex flex-wrap items-center justify-end gap-4 text-sm text-muted-foreground">
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
