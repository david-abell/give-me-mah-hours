"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

import { useState } from "react";

type Props = {
  handler: (
    startTime: DateTime<boolean> | null | undefined,
    endTime: DateTime<boolean> | null | undefined
  ) => void;
};

const currentHour = DateTime.now().startOf("hour");
const nextHour = DateTime.now().startOf("hour").plus({ hour: 1 });

export function TimeCard({ handler }: Props) {
  const [startTime, setStartTime] = useState<
    DateTime<boolean> | null | undefined
  >(currentHour);
  const [endTime, setEndTime] = useState<DateTime<boolean> | null | undefined>(
    nextHour
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Give me mah hours!!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4 items-center ">
          <div className="flex flex-col">
            <TimePicker
              ampm={false}
              label="From"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
          </div>
          <div className="flex flex-col">
            <TimePicker
              ampm={false}
              label="To"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
            />
          </div>
          <Button size={"lg"} onClick={() => handler(startTime, endTime)}>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
