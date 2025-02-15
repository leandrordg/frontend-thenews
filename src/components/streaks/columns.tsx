"use client";

import { Streak } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Streak>[] = [
  {
    accessorKey: "position",
    header: "Posição",
  },
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
  },
];
