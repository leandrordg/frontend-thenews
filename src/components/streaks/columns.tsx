"use client";

import { formatLastStreakDate } from "@/lib/utils";
import { Streak, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Streak & { user: User; position: number }>[] = [
  {
    accessorKey: "position",
    header: "Posição",
    cell: ({ row }) => {
      const { position } = row.original;
      switch (position) {
        case 1:
          return "🥇";
        case 2:
          return "🥈";
        case 3:
          return "🥉";
        default:
          return `#${position}`;
      }
    },
  },
  {
    accessorKey: "count",
    header: "Streak",
    cell: ({ row }) => {
      const { count } = row.original;
      return `${count} dias`;
    },
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "lastDate",
    header: "Ùltima Abertura",
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return formatLastStreakDate(updatedAt);
    },
  },
];
