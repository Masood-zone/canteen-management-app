import { useState } from "react";
import { format } from "date-fns";
import {
  useAbsentStudentRecordsByClassAndDate,
  useUpdateStudentStatus,
} from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { TableSkeleton } from "../../page-loader/loaders";
import { Button } from "@/components/ui/button";
import ButtonLoader from "../../button-loader/button-loader";
import { ColumnDef } from "@tanstack/react-table";
import { CanteenTable } from "@/components/tables/canteen-table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AbsentStudentsTable() {
  const { assigned_class } = useAuthStore();
  const classId = assigned_class?.id ?? 0;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const {
    data: absent_students,
    isLoading,
    error,
  } = useAbsentStudentRecordsByClassAndDate(
    classId,
    selectedDate?.toISOString().split("T")[0] ?? ""
  );

  const { mutate: updateToPaid, isLoading: updatingLoader } =
    useUpdateStudentStatus();

  const handleUpdateToPresent = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${
        record.student?.name
      } as present for ${format(selectedDate!, "PP")}?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        hasPaid: false,
        isAbsent: false,
        date: selectedDate?.toISOString().split("T")[0] ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateToPaid = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${
        record.student?.name
      } as paid for ${format(selectedDate!, "PP")}?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        hasPaid: true,
        isAbsent: false,
        date: selectedDate?.toISOString().split("T")[0] ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching absent students</div>;

  const columnsAbsent: ColumnDef<CanteenRecord>[] = [
    {
      accessorKey: "student",
      header: "Student Name",
      cell: ({ row }) => {
        const student = row.original.student;
        return student ? `${student.name}` : "N/A";
      },
    },
    {
      accessorKey: "settingsAmount",
      header: "Amount",
      cell: ({ row }) => `₵${row.original.settingsAmount.toFixed(2)}`,
    },
    {
      accessorKey: "submitedAt",
      header: "Date",
      cell: ({ row }) => format(new Date(row.original.submitedAt), "PPp"),
    },
    {
      accessorKey: "isPrepaid",
      header: "Prepaid",
      cell: ({ row }) => (row.original.isPrepaid ? "Yes" : "No"),
    },
    {
      accessorKey: "hasPaid",
      header: "Payment Status",
      cell: ({ row }) => (row.original.hasPaid ? "Paid" : "Unpaid"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const record = row.original;

        return (
          <div className="flex space-x-2">
            <Button
              variant={record.hasPaid ? "destructive" : "default"}
              onClick={() => handleUpdateToPaid(record)}
              disabled={updatingLoader}
            >
              <ButtonLoader
                fallback="Mark as Paid"
                isPending={updatingLoader}
                loadingText="Updating..."
              />
            </Button>
            {record.isAbsent && (
              <Button
                variant="outline"
                onClick={() => handleUpdateToPresent(record)}
              >
                Mark as Present
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground">
          Filter absent students by date:
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
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <CanteenTable
        columns={columnsAbsent}
        data={absent_students || []}
        searchField="student.name"
      />
    </div>
  );
}
