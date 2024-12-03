import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useFetchTeacherRecordsDetail } from "@/services/api/queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeacherRecordsDetail() {
  const { teacherId } = useParams<{ teacherId: string }>();
  const location = useLocation();
  const { dateRange } = location.state as {
    dateRange: { from: Date; to: Date };
  };

  const {
    data: records,
    isLoading,
    error,
  } = useFetchTeacherRecordsDetail(
    parseInt(teacherId!),
    dateRange.from,
    dateRange.to
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading teacher records</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Records</h1>
        <Button onClick={() => window.history.back()}>Back to Summary</Button>
      </div>
      <p className="mb-4">
        Date Range: {format(dateRange.from, "LLL dd, y")} -{" "}
        {format(dateRange.to, "LLL dd, y")}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                {format(new Date(record.submitedAt), "LLL dd, y")}
              </TableCell>
              <TableCell>{record.student.name}</TableCell>
              <TableCell>{record.class.name}</TableCell>
              <TableCell>₵{record.amount.toFixed(2)}</TableCell>
              <TableCell>
                {record.hasPaid
                  ? "Paid"
                  : record.isAbsent
                  ? "Absent"
                  : "Unpaid"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
