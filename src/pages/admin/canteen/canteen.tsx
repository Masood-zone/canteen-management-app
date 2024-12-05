import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTeacherRecords } from "@/services/api/queries";
import { CardsSkeleton } from "@/components/shared/page-loader/loaders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CanteenRecords() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const formattedDate = date.toISOString().split("T")[0];
  const {
    data: teacherRecords,
    isLoading,
    error,
  } = useTeacherRecords(formattedDate);

  const handleViewRecords = (teacherId: number) => {
    navigate(`/admin/canteen-records/${teacherId}/records`, {
      state: { date },
    });
  };

  const calculateTotals = (record: TeacherRecord) => {
    const totalPaid =
      record.paidStudents?.reduce((sum, student) => sum + student.amount, 0) ||
      0;
    const totalUnpaid =
      record.unpaidStudents?.reduce(
        (sum, student) => sum + student.amount,
        0
      ) || 0;
    const totalAbsent =
      record.absentStudents?.reduce(
        (sum, student) => sum + student.amount_owing,
        0
      ) || 0;
    const totalAmount = totalPaid + totalUnpaid + totalAbsent;
    const paidCount = record.paidStudents?.length || 0;
    const unpaidCount = record.unpaidStudents?.length || 0;
    const absentCount = record.absentStudents?.length || 0;
    const totalStudents = paidCount + unpaidCount + absentCount;

    return {
      totalAmount,
      paidCount,
      unpaidCount,
      absentCount,
      totalStudents,
    };
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
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Tabs defaultValue="submitted-records">
        <TabsList>
          <TabsTrigger value="submitted-records">All Records</TabsTrigger>
        </TabsList>
        <TabsContent value="submitted-records">
          {isLoading ? (
            <CardsSkeleton count={3} />
          ) : error ? (
            <p>Error loading teacher records</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teacherRecords?.map((record: TeacherRecord) => {
                const totals = calculateTotals(record);
                return (
                  <Card
                    key={record.classId}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <CardHeader>
                      <CardTitle>{record?.teacher?.name}</CardTitle>
                      <CardDescription className="text-lg">
                        <span className="">Gross:</span>{" "}
                        <span className="text-primary font-bold">
                          ₵{totals.totalAmount.toFixed(2)}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Paid: {totals.paidCount} | Unpaid: {totals.unpaidCount}{" "}
                        | Absent: {totals.absentCount}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Total Students: {totals.totalStudents}
                      </p>
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() =>
                          record?.teacher?.id !== undefined &&
                          handleViewRecords(record.teacher.id)
                        }
                      >
                        View Records
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
