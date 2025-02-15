"use client";

import { formatDate } from "@/lib/utils";
import { Streak } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Streak>[] = [
  {
    accessorKey: "streak",
    header: "Streak",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "lastOpenedDate",
    header: "Ùltima Abertura",
    cell: ({ cell }) => {
      return formatDate(cell.row.original.lastOpenedDate.toDateString());
    },
  },
];
