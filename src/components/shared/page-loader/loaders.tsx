import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="container w-full mx-auto py-10 px-4 sm:px-0 lg:px-0">
      <DataTableSkeleton />
    </div>
  );
}

function DataTableSkeleton() {
  return (
    <div className="flex flex-col space-y-5">
      <Skeleton className="w-full h-16 bg-primary/75" />
      <Skeleton className="w-full h-16 bg-muted/50" />
      <Skeleton className="w-full h-16 bg-muted/50" />
      <Skeleton className="w-full h-16 bg-muted/50" />
    </div>
  );
}

export function PaleTableSkeleton() {
  return (
    <div className="flex flex-col space-y-5">
      <Skeleton className="w-full h-16 bg-muted/50" />
      <Skeleton className="w-full h-16 bg-muted/50" />
      <Skeleton className="w-full h-16 bg-muted/50" />
      <Skeleton className="w-full h-16 bg-muted/50" />
    </div>
  );
}
