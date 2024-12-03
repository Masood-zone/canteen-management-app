import { TableSkeleton } from "@/components/shared/page-loader/loaders";
import { DataTable } from "@/components/ui/data-table";
import { useDeleteResource, useFetchReferences } from "@/services/api/queries";
import ReferenceModal from "../../add/reference-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal } from "lucide-react";
import EditReferenceModal from "../../edit/edit-reference-modal";

export default function ReferencesTable() {
  const { data: references, isLoading, error } = useFetchReferences();
  const { mutateAsync: deleteReference } = useDeleteResource(
    "references",
    "references"
  );

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching expenses</div>;

  const referencesColumn: ColumnDef<Reference>[] = [
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
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "actions",
      header: () => <span>Actions</span>,
      cell: ({ row }) => {
        const referenceData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <div className="w-full flex flex-col space-y-2">
                {/* Edit Modal */}
                <EditReferenceModal referenceId={referenceData.id ?? 0} />
                {/* Delete Modal */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will delete the
                        reference.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteReference(referenceData?.id?.toString() || "")
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="w-full mt-5">
      <div className="flex items-center space-x-8 w-full">
        <div>
          <h1 className="text-xl font-bold">References</h1>
          <p>
            References are used to categorize expenses. <br />
            You can add, edit and delete references here.
          </p>
        </div>
        <ReferenceModal />
      </div>
      <DataTable
        data={references || []}
        columns={referencesColumn}
        searchField="description"
      />
    </div>
  );
}
