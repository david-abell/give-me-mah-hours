"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";

export type TimePeriod = {
  fromTime: DateTime;
  toTime: DateTime;
};

export const columns: ColumnDef<TimePeriod>[] = [
  {
    accessorKey: "fromTime",
    header: "From",
    cell: ({ getValue }) => {
      const value = getValue<DateTime>();
      const formattedTime = value.toFormat("HH:mm");
      return formattedTime;
    },
  },
  {
    accessorKey: "toTime",
    header: "To",
    cell: ({ getValue }) => {
      const value = getValue<DateTime>();
      const formattedTime = value.toFormat("HH:mm");
      return formattedTime;
    },
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const fromTime = row.getValue<DateTime>("fromTime");
      const toTime = row.getValue<DateTime>("toTime");
      if (fromTime && toTime) {
        const duration = toTime.diff(fromTime, ["hours", "minutes"]);
        return `${duration.hours}h ${duration.minutes}m`;
      }
      return "Invalid time range";
    },
  },
];
