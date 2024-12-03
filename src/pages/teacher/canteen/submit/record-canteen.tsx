import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  useStudentRecordsByClassAndDate,
  useSubmitTeacherRecord,
} from "@/services/api/queries";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SubmitCanteenRecords() {
  const navigate = useNavigate();
  const { user, assigned_class } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [records, setRecords] = useState<CanteenRecord[]>([]);

  const classId = assigned_class?.id ?? 0;
  const formattedDate = selectedDate.toISOString().split("T")[0];

  const {
    data: studentRecords,
    isLoading,
    error,
  } = useStudentRecordsByClassAndDate(classId, formattedDate);
  const { mutate: submitRecord, isLoading: isSubmitting } =
    useSubmitTeacherRecord();

  useEffect(() => {
    if (studentRecords) {
      setRecords(studentRecords);
    }
  }, [studentRecords]);

  const handleSubmit = () => {
    const payload = {
      classId,
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
      submittedBy: user?.user?.id ?? 0,
    };

    submitRecord(payload, {
      onSuccess: () => {
        navigate("/teacher");
      },
    });
  };

  const handleStatusChange = (
    id: number,
    field: "hasPaid" | "isAbsent",
    value: boolean
  ) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              [field]: value,
              ...(field === "isAbsent" && value ? { hasPaid: false } : {}),
            }
          : record
      )
    );
  };

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching student records</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Submit Canteen Records</h1>
      <div className="mb-4">
        <Label>Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
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
      <div className="space-y-4">
        {records?.map((record) => (
          <div key={record.id} className="flex items-center space-x-4">
            <span className="w-1/4">{record.student?.name}</span>
            <span className="w-1/4">₵{record.settingsAmount.toFixed(2)}</span>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`paid-${record.id}`}
                checked={record.hasPaid}
                onCheckedChange={(checked) =>
                  handleStatusChange(record.id, "hasPaid", checked as boolean)
                }
                disabled={record.isAbsent}
              />
              <Label htmlFor={`paid-${record.id}`}>Paid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`absent-${record.id}`}
                checked={record.isAbsent}
                onCheckedChange={(checked) =>
                  handleStatusChange(record.id, "isAbsent", checked as boolean)
                }
              />
              <Label htmlFor={`absent-${record.id}`}>Absent</Label>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={isSubmitting} className="mt-4">
        {isSubmitting ? "Submitting..." : "Submit Records"}
      </Button>
    </div>
  );
}
