import {
  useUnpaidStudentRecordsByClassAndDate,
  useUpdateStudentStatus,
} from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { TableSkeleton } from "../../page-loader/loaders";
import { CanteenTable } from "@/components/tables/canteen-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ButtonLoader from "../../button-loader/button-loader";

export default function UnpaidStudentsTable() {
  //   Fetch unpaid students
  const { assigned_class } = useAuthStore();
  const classId = assigned_class?.id ?? 0;
  const today = new Date().toISOString().split("T")[0];
  const {
    data: unpaid_students,
    isLoading,
    error,
  } = useUnpaidStudentRecordsByClassAndDate(classId, today);
  //   Update student status
  const { mutate: updateToPaid, isLoading: updatingLoader } =
    useUpdateStudentStatus();

  const handleUpdateToPaid = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${record.student?.name} as paid?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        hasPaid: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   Loading and error states
  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching unpaid students</div>;

  //   Columns
  const columnsUnpaid: ColumnDef<CanteenRecord>[] = [
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
            {!record.hasPaid && !record.isAbsent && (
              <Button variant="outline">Mark as Absent</Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CanteenTable
        columns={columnsUnpaid}
        data={unpaid_students || []}
        searchField="student"
      />
    </>
  );
}
