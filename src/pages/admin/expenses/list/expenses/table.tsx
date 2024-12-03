import { DataTable } from "@/components/ui/data-table";
import { useDeleteResource, useFetchExpenses } from "@/services/api/queries";
import { expensesColumn } from "./columns";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";

export default function ExpensesTable() {
  const { data: expenses, isLoading, error } = useFetchExpenses();
  const { mutateAsync: deleteExpense } = useDeleteResource(
    "expenses",
    "expenses"
  );

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching expenses</div>;

  return (
    <>
      <DataTable
        data={expenses || []}
        columns={expensesColumn(deleteExpense)}
        searchField="description"
      />
    </>
  );
}
