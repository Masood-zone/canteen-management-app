import { useState } from "react";
import { format } from "date-fns";
import {
  usePaidStudentRecordsByClassAndDate,
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

export default function PaidStudentsTable() {
  const { assigned_class } = useAuthStore();
  const classId = assigned_class?.id ?? 0;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const {
    data: paid_students,
    isLoading,
    error,
  } = usePaidStudentRecordsByClassAndDate(
    classId,
    selectedDate?.toISOString().split("T")[0] ?? ""
  );

  const { mutate: updateToPaid, isLoading: updatingLoader } =
    useUpdateStudentStatus();

  const handleUpdateToPaid = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${
        record.student?.name
      } as un-paid for ${format(selectedDate!, "PP")}?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        hasPaid: false,
        date: selectedDate?.toISOString().split("T")[0] ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateToAbsent = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${
        record.student?.name
      } as absent for ${format(selectedDate!, "PP")}?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        isAbsent: true,
        date: selectedDate?.toISOString().split("T")[0] ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching paid students</div>;

  const columnsPaid: ColumnDef<CanteenRecord>[] = [
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
                fallback="Mark as Unpaid"
                isPending={updatingLoader}
                loadingText="Updating..."
              />
            </Button>
            {!record.hasPaid && !record.isAbsent && (
              <Button
                variant="outline"
                onClick={() => handleUpdateToAbsent(record)}
              >
                Mark as Absent
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
          Filter paid students by date:
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
        columns={columnsPaid}
        data={paid_students || []}
        searchField="student"
      />
    </div>
  );
}
