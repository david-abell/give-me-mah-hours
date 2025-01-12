"use client";
import { DataTable } from "../components/timetable/data-table";
import { useState } from "react";
import { columns, TimePeriod } from "../components/timetable/columns";
import { DateTime } from "luxon";
import { TimeCard } from "@/components/timecard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const eightOclockToday = DateTime.now().set({
  hour: 8,
  minute: 0,
  second: 0,
  millisecond: 0,
});

export default function Home() {
  const [periods, setPeriods] = useState<TimePeriod[]>([]);
  const [lastBlockEnd, setLastBlockEnd] =
    useState<DateTime<true>>(eightOclockToday);

  const handleTimes = (
    fromTime: DateTime<boolean> | null | undefined,
    toTime: DateTime<boolean> | null | undefined
  ) => {
    if (fromTime && toTime) {
      setPeriods((prev) => prev.concat({ fromTime, toTime }));
    }
  };

  const handleClear = () => {
    const lastEnd = periods.at(-1)?.toTime;
    if (lastEnd) {
      setLastBlockEnd(lastEnd);
    }
    setPeriods([]);
  };

  const lastPeriodEnd = periods.at(-1)?.toTime ?? lastBlockEnd;

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div className="flex flex-col mx-auto p-20 gap-8 max-w-4xl">
        <TimeCard
          handler={handleTimes}
          lastPeriodEnd={lastPeriodEnd}
          key={"timecard" + periods.length}
        />
        <DataTable columns={columns} data={periods} setData={setPeriods} />
        <Button onClick={handleClear}>Reset</Button>
      </div>
      <Toaster />
    </LocalizationProvider>
  );
}
