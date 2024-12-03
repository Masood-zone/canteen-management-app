import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useFetchTeacherRecordsSummary } from "@/services/api/queries";
import { CardsSkeleton } from "@/components/shared/page-loader/loaders";

export default function CanteenRecords() {
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const {
    data: teacherRecords,
    isLoading,
    error,
  } = useFetchTeacherRecordsSummary(
    date?.from ?? new Date(),
    date?.to ?? new Date()
  );

  const handleViewRecords = (teacherId: number) => {
    navigate(`/admin/canteen-records/${teacherId}/records`, {
      state: { dateRange: date },
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Canteen Records</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {isLoading ? (
        <CardsSkeleton count={3} />
      ) : error ? (
        <p>Error loading teacher records</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teacherRecords?.map((teacher: TeacherRecord) => (
            <Card
              key={teacher.id}
              className="hover:bg-accent/50 transition-colors"
            >
              <CardHeader>
                <CardTitle>{teacher.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  ₵{teacher.totalAmount.toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  className="mt-2 w-full justify-between"
                  onClick={() => handleViewRecords(teacher.id)}
                >
                  View Records
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
