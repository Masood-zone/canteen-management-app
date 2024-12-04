import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useStudentRecordsByClassAndDate,
  useUpdateStudentStatus,
} from "@/services/api/queries";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CanteenTable } from "@/components/tables/canteen-table";
import { ColumnDef } from "@tanstack/react-table";

export default function Canteen() {
  const navigate = useNavigate();
  const { user, assigned_class } = useAuthStore();
  const teacher = user?.user;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const classId = assigned_class?.id ?? 0;
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const { data: studentRecords } = useStudentRecordsByClassAndDate(
    classId,
    formattedDate
  );
  const { mutate: updateStatus, isLoading: updatingLoader } =
    useUpdateStudentStatus();

  const handleUpdateStatus = async (
    record: CanteenRecord,
    newStatus: { hasPaid: boolean; isAbsent: boolean }
  ) => {
    try {
      await updateStatus({
        ...record,
        ...newStatus,
        date: selectedDate?.toISOString().split("T")[0] ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnDef<CanteenRecord>[] = [
    {
      accessorKey: "student.name",
      header: "Student Name",
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
              onClick={() =>
                handleUpdateStatus(record, {
                  hasPaid: !record.hasPaid,
                  isAbsent: false,
                })
              }
              disabled={updatingLoader}
            >
              {record.hasPaid ? "Mark as Unpaid" : "Mark as Paid"}
            </Button>
            {!record.hasPaid && !record.isAbsent && (
              <Button
                variant="outline"
                onClick={() =>
                  handleUpdateStatus(record, { hasPaid: false, isAbsent: true })
                }
                disabled={updatingLoader}
              >
                Mark as Absent
              </Button>
            )}
            {record.isAbsent && (
              <Button
                variant="outline"
                onClick={() =>
                  handleUpdateStatus(record, {
                    hasPaid: false,
                    isAbsent: false,
                  })
                }
                disabled={updatingLoader}
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
    <section className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Hello, {teacher?.name}</h1>
          <p className="text-xl py-2">{assigned_class?.name}</p>
          <p className="text-base">Record canteen for {assigned_class?.name}</p>
        </div>
        <div className="space-x-2">
          <Button variant="ghost">
            <Link to="/teacher/canteen/submitted-records">
              View Submitted Records
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Submit canteen records</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will submit the canteen
                  records for {teacher?.name} to the admin for approval.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => navigate("/teacher/canteen/submit")}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="space-y-4">
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
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Unpaid Students</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <CanteenTable
              columns={columns}
              data={studentRecords || []}
              searchField="student.name"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
