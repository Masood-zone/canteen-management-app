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
import { format } from "date-fns";

export default function PaidStudentsTable() {
  const { assigned_class } = useAuthStore();
  const classId = assigned_class?.id ?? 0;
  const today = new Date().toISOString().split("T")[0];
  const {
    data: paid_students,
    isLoading,
    error,
  } = usePaidStudentRecordsByClassAndDate(classId, today);

  //   Update student status
  const { mutate: updateToPaid, isLoading: updatingLoader } =
    useUpdateStudentStatus();

  const handleUpdateToPaid = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${record.student?.name} as un-paid?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        hasPaid: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateToAbsent = async (record: CanteenRecord) => {
    const confirm = window.confirm(
      `Are you sure you want to mark ${record.student?.name} as absent?`
    );
    if (!confirm) return;
    try {
      await updateToPaid({
        ...record,
        isAbsent: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   Loading and error states
  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching unpaid students</div>;

  //   Columns
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
    <>
      <CanteenTable
        columns={columnsPaid}
        data={paid_students || []}
        searchField="student"
      />
    </>
  );
}
