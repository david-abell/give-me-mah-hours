"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TotalDuration from "../total-duration";
import { SquareX } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setData,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDelete = (rowIndex: number) => {
    setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
  };

  return (
    <div className="rounded-md border p-2 flex flex-col gap-8">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <button
                      onClick={() => handleDelete(rowIndex)}
                      aria-label="Delete row"
                      className="ml-auto flex items-center content-center p-0"
                    >
                      <SquareX size={24} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <TotalDuration
        rows={table.getRowModel().rows as unknown as Row<object>[]}
        fromKey="fromTime"
        toKey="toTime"
      />
    </div>
  );
}
