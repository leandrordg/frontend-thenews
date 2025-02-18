import { cn, formatLastStreaks } from "@/lib/utils";
import { Streak } from "@prisma/client";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HistoryCalendarProps {
  streaks: Streak[];
}

export function HistoryCalendar({ streaks }: HistoryCalendarProps) {
  const lastStreaks = formatLastStreaks(streaks);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className="text-xs text-center font-medium rounded-md bg-transparent text-muted-foreground truncate"
          >
            {formatDate(new Date(0, 0, i), "E", { locale: ptBR })}
          </div>
        ))}

        {Array.from({ length: lastStreaks[0].date.getDay() }, (_, i) => (
          <div key={`empty-${i}`} className="p-4 rounded-md bg-transparent" />
        ))}

        {lastStreaks.map((day, i) => (
          <div
            key={i}
            className={cn(
              "text-xs font-medium p-4 rounded-md border flex items-center justify-center select-none",
              {
                "bg-[#FFCE04] text-black/90": day.count > 0,
                "bg-transparent text-muted-foreground": day.count === 0,
                "bg-muted text-muted-foreground cursor-not-allowed":
                  day.isSunday,
              }
            )}
          >
            <span>{formatDate(day.date, "dd/MM", { locale: ptBR })}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-[#FFCE04] border" />
          <span>Acessado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-transparent border" />
          <span>Não acessado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-sm bg-muted cursor-not-allowed" />
          <span>Domingo (desabilitado)</span>
        </div>
      </div>
    </div>
  );
}
