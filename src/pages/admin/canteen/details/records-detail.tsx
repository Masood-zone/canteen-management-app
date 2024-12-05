import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useFetchTeacherRecordsDetail } from "@/services/api/queries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";
import { PageHeading } from "@/components/typography/heading";

export default function TeacherRecordsDetail() {
  const { teacherId } = useParams<{ teacherId: string | undefined }>();
  const location = useLocation();
  const { date } = location.state as { date: Date };

  const {
    data: records,
    isLoading,
    error,
  } = useFetchTeacherRecordsDetail(date);

  if (isLoading)
    return (
      <div className="p-5">
        <PageHeading>Canteen Record Details</PageHeading>
        <TableSkeleton />
      </div>
    );
  if (error) return <p>Error loading teacher records</p>;

  const transformedRecords = records
    ?.filter(
      (record: { teacher: { id: string } }) =>
        teacherId !== undefined &&
        parseInt(record.teacher.id) === parseInt(teacherId)
    )
    .flatMap(
      (record: {
        date: string;
        classId: string;
        paidStudents: Student[];
        unpaidStudents: Student[];
        absentStudents: Student[];
      }) => {
        const date = record.date;

        const normalizeStudents = (students: Student[], status: string) =>
          students.map((student: Student) => ({
            id: student.id,
            submitedAt: date,
            student: { name: student?.name }, // Adjust if student names are fetched elsewhere
            amount: student.amount,
            hasPaid: status === "Paid",
            isAbsent: status === "Absent",
          }));

        return [
          ...normalizeStudents(record.paidStudents, "Paid"),
          ...normalizeStudents(record.unpaidStudents, "Unpaid"),
          ...normalizeStudents(record.absentStudents, "Absent"),
        ];
      }
    );
  const teacher = records?.find(
    (record: { teacher: { id: string } }) =>
      teacherId !== undefined &&
      parseInt(record.teacher.id) === parseInt(teacherId)
  )?.teacher;
  const teacherClass = records?.find(
    (record: { teacher: { id: string } }) =>
      teacherId !== undefined &&
      parseInt(record.teacher.id) === parseInt(teacherId)
  )?.class;

  // Calculate statistics
  const totalPaid = transformedRecords
    .filter((record: CanteenRecord) => record.hasPaid)
    .reduce((sum: number, record: CanteenRecord) => sum + record.amount, 0);

  const totalUnpaid = transformedRecords
    .filter((record: CanteenRecord) => !record.hasPaid && !record.isAbsent)
    .reduce((sum: number, record: CanteenRecord) => sum + record.amount, 0);

  const totalOutstanding = totalPaid + totalUnpaid;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Records</h1>
        <Button onClick={() => window.history.back()}>Back to Summary</Button>
      </div>
      <p className="mb-4">Records for {teacherClass?.name}</p>
      <p>
        <span className="font-bold">Teacher: </span>
        {teacher?.name}
      </p>
      <p>
        <span className="font-bold">Date: </span>
        {format(new Date(date), "LLL dd, y")}
      </p>
      <Table className="mt-2 rounded-lg overflow-hidden">
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-primary-foreground">Students</TableHead>
            <TableHead className="text-primary-foreground">Amount</TableHead>
            <TableHead className="text-primary-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transformedRecords.map(
            (record: {
              id: number;
              submitedAt: string;
              student: { name: string };
              class: { name: string };
              amount: number;
              hasPaid: boolean;
              isAbsent: boolean;
            }) => (
              <TableRow key={record.id}>
                <TableCell>{record.student.name}</TableCell>
                <TableCell>₵{record.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {record.hasPaid
                    ? "Paid"
                    : record.isAbsent
                    ? "Absent"
                    : "Unpaid"}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        {/* Footer for statistics */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-bold">
              Outstanding Amount:
            </TableCell>
            <TableCell
              colSpan={2}
              className={`${
                totalOutstanding === 0 ? "text-red-500" : "text-gray-700"
              }`}
            >
              ₵{totalOutstanding.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="font-bold">
              Total Paid:
            </TableCell>
            <TableCell colSpan={2} className="text-green-500">
              ₵{totalPaid.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="font-bold">
              Total Remaining:
            </TableCell>
            <TableCell
              colSpan={2}
              className={`${
                totalUnpaid === 0 ? "text-red-500" : "text-gray-700"
              }`}
            >
              ₵{totalUnpaid.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
