import { useState } from "react";
import { format } from "date-fns";
import {
  useFetchClasses,
  useStudentRecordsByClassAndDate,
  useUpdateStudentStatus,
} from "@/services/api/queries";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CanteenTable } from "@/components/tables/canteen-table";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";
import { columns } from "./columns";

export default function SetupCanteen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const formattedDate = selectedDate.toISOString().split("T")[0];

  const { data: classes, isLoading: classesLoading } = useFetchClasses();
  const { data: studentRecords, isLoading: recordsLoading } =
    useStudentRecordsByClassAndDate(parseInt(selectedClassId), formattedDate);
  const { mutate: updateStatus, isLoading: updatingLoader } =
    useUpdateStudentStatus();
  const classSupervisorId = classes?.supervisorId;
  const handleUpdateStatus = async (
    record: CanteenRecord,
    newStatus: { hasPaid: boolean; isAbsent: boolean }
  ) => {
    try {
      await updateStatus({
        ...record,
        ...newStatus,
        submitedBy: classSupervisorId ?? 0,
        date: selectedDate?.toISOString().split("T")[0] ?? "",
      });
      toast.success("Student status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student status");
    }
  };

  return (
    <section className="container mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-6">Admin Canteen Setup</h1>
      <p className="text-muted-foreground mb-6">
        Setup canteen records for students in a class
      </p>
      <div className="flex items-center space-x-4 mb-6">
        <Select onValueChange={setSelectedClassId} value={selectedClassId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {classes?.map((classItem: Class) => (
              <SelectItem key={classItem.id} value={classItem.id.toString()}>
                {classItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      {classesLoading || recordsLoading ? (
        <TableSkeleton />
      ) : (
        <CanteenTable
          columns={columns(handleUpdateStatus, updatingLoader)}
          data={studentRecords || []}
          // searchField="amount"
        />
      )}
    </section>
  );
}
