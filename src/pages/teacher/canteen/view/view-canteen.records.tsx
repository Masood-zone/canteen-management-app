import GoBackButton from "@/components/shared/go-back/go-back";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";
import { CanteenTable } from "@/components/tables/canteen-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTeacherSubmittedRecords } from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { viewColumns } from "./columns";

export default function ViewCanteenRecord() {
  const { assigned_class } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const supervisorId = Number(assigned_class?.supervisorId) || 0;
  const formattedDate = selectedDate?.toISOString().split("T")[0] ?? "";
  const {
    data: submittedRecords,
    isLoading,
    error,
  } = useTeacherSubmittedRecords(supervisorId, formattedDate);
  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching submitted records</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            Canteen Record {assigned_class?.name}
          </h1>
        </div>
        <div className="space-x-2">
          <GoBackButton />
        </div>
      </div>
      <div className="space-y-4">
        {/* Date selector */}
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">
            Filter students records by date:
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* Tabs */}
        <Tabs defaultValue="unpaid" className="w-full">
          <TabsList>
            <TabsTrigger value="unpaid">Unpaid Students</TabsTrigger>
            <TabsTrigger value="paid">Paid Students</TabsTrigger>
            <TabsTrigger value="absent">Absent Students</TabsTrigger>
          </TabsList>

          <TabsContent value="unpaid">
            <CanteenTable
              columns={viewColumns}
              data={submittedRecords[0]?.unpaidStudents || []}
              searchField="student.name"
            />
          </TabsContent>
          <TabsContent value="paid">
            <CanteenTable
              columns={viewColumns}
              data={submittedRecords[0]?.paidStudents || []}
              searchField="student.name"
            />
          </TabsContent>
          <TabsContent value="absent">
            <CanteenTable
              columns={viewColumns}
              data={submittedRecords[0]?.absentStudents || []}
              searchField="student.name"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
