"use client";

import { type Test } from "@/server/db/queries";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// export const getColumns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
// ];

export function getColumns(): ColumnDef<Test>[] {
  return [
    {
      accessorKey: "mid_code",
      header: "Код",
      cell: ({ row }) => (
        <div className="w-[60px] truncate">{row.getValue("mid_code")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "Назва",
      cell: ({ row }) => (
        <div className="w-[1000px] truncate">{row.getValue("title")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: () => null,
      cell: ({ row }) => {
        return (
          <div className="mx-auto w-full">
            <Button asChild variant={"outline"} size={"icon"}>
              <Link href={`/${row.original.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];
}
