import { DataTable } from "@/components/ui/data-table";
import { useDeleteResource, useFetchClasses } from "@/services/api/queries";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ActionMenu from "@/components/actions/action-menu";

export default function StudentsTable({
  data,
  isLoading,
  error,
}: {
  data: Student[];
  isLoading: boolean;
  error: unknown;
}) {
  const { data: classList } = useFetchClasses();
  const { mutateAsync: deleteStudent } = useDeleteResource(
    "students",
    "students"
  );

  const columns: ColumnDef<Student>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select All"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select Row ${row.index + 1}`}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "gender",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gender
          </Button>
        );
      },
      cell: ({ row }) => {
        const gender = row.original.gender;
        return <span className="text-center capitalize">{gender}</span>;
      },
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Age
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "classId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Class
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { classId } = row.original;
        const classData = classList?.find(
          (c: Class) => c.id === Number(classId)
        );
        return <span>{classData?.name}</span>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const teacher = row.original;
        return (
          <ActionMenu
            id={teacher.id}
            resourceName="Student"
            onDelete={(id) => deleteStudent(id)}
          />
        );
      },
    },
  ];

  return (
    <div className="container w-full mx-auto py-10 px-4 sm:px-0 lg:px-0">
      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <div>There was an error!</div>
      ) : (
        <DataTable columns={columns} data={data} searchField="name" />
      )}
    </div>
  );
}
