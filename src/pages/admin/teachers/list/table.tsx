import { DataTable } from "@/components/ui/data-table";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";
import ActionMenu from "@/components/actions/action-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteResource } from "@/services/api/queries";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export default function TeachersTable({
  data,
  isLoading,
  error,
}: {
  data: Teacher[];
  isLoading: boolean;
  error: unknown;
}) {
  const { mutateAsync: deleteTeacher } = useDeleteResource(
    "teachers",
    "teachers" // Query key
  );

  const columns: ColumnDef<Teacher>[] = [
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
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
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
      accessorKey: "assigned_class.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Class
          </Button>
        );
      },
      cell: ({ row }) => {
        const className = row.original.assigned_class?.name;
        return <span className="">{className || "Not assigned"}</span>;
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
            resourceName="Teacher"
            onDelete={(id) => deleteTeacher(id)}
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
