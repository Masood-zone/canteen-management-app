import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  useFetchClasses,
  useStudentRecordsByClassAndDate,
  useUpdateStudentStatus,
  useSubmitTeacherRecord,
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

  const [records, setRecords] = useState<CanteenRecord[]>([]);
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const { data: classes, isLoading: classesLoading } = useFetchClasses();
  const { data: studentRecords, isLoading: recordsLoading } =
    useStudentRecordsByClassAndDate(parseInt(selectedClassId), formattedDate);
  const { mutate: updateStatus, isLoading: updatingLoader } =
    useUpdateStudentStatus();
  const { mutate: submitRecord, isLoading: submittingRecord } =
    useSubmitTeacherRecord();
  const classSupervisorId = classes?.find(
    (classItem: Class) => classItem.id === parseInt(selectedClassId)
  )?.supervisorId;

  useEffect(() => {
    if (studentRecords) {
      setRecords(studentRecords);
    }
  }, [studentRecords]);

  const handleUpdateStatus = async (
    record: CanteenRecord,
    newStatus: { hasPaid: boolean; isAbsent: boolean }
  ) => {
    try {
      const updatedRecord = {
        ...record,
        ...newStatus,
        submitedBy: classSupervisorId ?? 0,
        date: selectedDate?.toISOString().split("T")[0] ?? "",
      };
      await updateStatus(updatedRecord);
      setRecords((prevRecords) =>
        prevRecords.map((r) => (r.id === record.id ? updatedRecord : r))
      );
      toast.success("Student status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student status");
    }
  };

  const handleSubmitCanteen = async () => {
    if (!selectedClassId) {
      toast.error("Please select a class before submitting");
      return;
    }

    const payload = {
      classId: parseInt(selectedClassId),
      date: formattedDate,
      unpaidStudents: records
        .filter((r) => !r.hasPaid && !r.isAbsent)
        .map((r) => ({
          id: r.id,
          amount: r.settingsAmount,
          paidBy: r.payedBy?.toString() || "",
          hasPaid: false,
          date: formattedDate,
        })),
      paidStudents: records
        .filter((r) => r.hasPaid)
        .map((r) => ({
          id: r.id,
          amount: r.settingsAmount,
          paidBy: r.payedBy?.toString() || "",
          hasPaid: true,
          date: formattedDate,
        })),
      absentStudents: records
        .filter((r) => r.isAbsent)
        .map((r) => ({
          id: r.id,
          amount_owing: r.settingsAmount,
          paidBy: r.payedBy?.toString() || "",
          hasPaid: false,
          date: formattedDate,
        })),
      submittedBy: classSupervisorId,
    };

    try {
      await submitRecord(payload);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit canteen records");
    }
  };

  return (
    <section className="container mx-auto py-10 px-5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Canteen Setup</h1>
          <p className="text-muted-foreground">
            Setup canteen records for students in a class
          </p>
        </div>
        <Button
          onClick={handleSubmitCanteen}
          disabled={!selectedClassId || submittingRecord}
        >
          {submittingRecord ? "Submitting..." : "Submit Canteen Records"}
        </Button>
      </div>
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
          data={records}
        />
      )}
    </section>
  );
}
