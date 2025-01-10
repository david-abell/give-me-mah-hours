"use client";
import React from "react";
import { DateTime, Duration } from "luxon";
import { Row } from "@tanstack/react-table";
import CopyableTextField from "./copyable-text-field";

interface TotalDurationProps<TData> {
  rows: Row<TData>[];
  fromKey: "fromTime";
  toKey: "toTime";
}

const TotalDuration = <TData extends object>({
  rows,
  fromKey,
  toKey,
}: TotalDurationProps<TData>) => {
  // Calculate total duration
  const totalDuration = rows.reduce((total, row) => {
    const fromTime = row.getValue<DateTime>(fromKey as string);
    const toTime = row.getValue<DateTime>(toKey as string);

    if (fromTime && toTime) {
      const duration = toTime.diff(fromTime, ["hours", "minutes"]);
      return total.plus(duration);
    }

    return total;
  }, Duration.fromObject({ hours: 0, minutes: 0 }));

  const hours = Math.floor(totalDuration.as("hours"));
  const minutes = totalDuration.minutes % 60;

  return (
    <div className="text-2xl ml-2">
      Total Hours:
      <CopyableTextField text={`${hours}h ${minutes}m`} />
    </div>
  );
};

export default TotalDuration;
