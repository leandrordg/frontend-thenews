"use client";

import { formatDate } from "@/lib/utils";
import { Streak } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Streak & { position: number }>[] = [
  {
    accessorKey: "position",
    header: "Posição",
    cell: ({ row }) => {
      const { position } = row.original;
      return `${position}º lugar`;
    },
  },
  {
    accessorKey: "streak",
    header: "Streak",
    cell: ({ row }) => {
      const { streak } = row.original;
      return `${streak} dias`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "lastOpenedDate",
    header: "Ùltima Abertura",
    cell: ({ row }) => {
      const { lastOpenedDate } = row.original;
      return formatDate(lastOpenedDate.toString());
    },
  },
];
