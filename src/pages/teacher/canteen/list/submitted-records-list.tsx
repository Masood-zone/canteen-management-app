import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useTeacherSubmittedRecords } from "@/services/api/queries";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SubmittedRecords() {
  const navigate = useNavigate();
  const { assigned_class } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const formattedDate = selectedDate.toISOString().split("T")[0];

  const supervisorId = Number(assigned_class?.supervisorId) || 0;
  const {
    data: submittedRecords,
    isLoading,
    error,
  } = useTeacherSubmittedRecords(supervisorId, formattedDate);

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching submitted records</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Submitted Canteen Records</h1>
      <div className="mb-4">
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
      {submittedRecords && submittedRecords.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Paid Students</TableHead>
              <TableHead>Unpaid Students</TableHead>
              <TableHead>Absent Students</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submittedRecords.map(
              (record: {
                id: number;
                date: string;
                class: { name: string };
                paidStudents: [];
                unpaidStudents: [];
                absentStudents: [];
              }) => (
                <TableRow key={record.id}>
                  <TableCell>{format(new Date(record.date), "PP")}</TableCell>
                  <TableCell>{record.class.name}</TableCell>
                  <TableCell>{record.paidStudents.length}</TableCell>
                  <TableCell>{record.unpaidStudents.length}</TableCell>
                  <TableCell>{record.absentStudents.length}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      onClick={() =>
                        navigate(`/teacher/canteen/${record.id}/view`)
                      }
                    >
                      View
                    </Button>
                    {/* <Button
                      variant="secondary"
                      onClick={() =>
                        navigate(`/teacher/canteen/${record.id}/edit`)
                      }
                    >
                      Edit
                    </Button> */}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      ) : (
        <p>No submitted records found for this date.</p>
      )}
    </div>
  );
}
