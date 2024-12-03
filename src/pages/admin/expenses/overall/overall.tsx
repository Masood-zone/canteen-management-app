import { useFetchRecords } from "@/services/api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Receipt, Loader2 } from "lucide-react";

export default function OverallTotals() {
  const { data: overall, error, isLoading } = useFetchRecords();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;
  if (error) return <div>Error fetching records</div>;

  const filterPaidStudents = overall?.filter(
    (student: Student) => student.hasPaid === true
  );
  const filterUnpaidStudents = overall?.filter(
    (student: Student) => student.hasPaid === false
  );

  const totalPaid = filterPaidStudents?.reduce(
    (sum: number, student: Student) => sum + (student?.settingsAmount ?? 0),
    0
  );

  const totalUnpaid = filterUnpaidStudents?.reduce(
    (sum: number, student: Student) => sum + (student?.settingsAmount ?? 0),
    0
  );

  const totalAmount = overall?.reduce(
    (sum: number, student: Student) => sum + (student?.settingsAmount ?? 0),
    0
  );

  return (
    <section className="p-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              Ghc{totalAmount}
            </div>
            <p className="text-base pt-2 text-muted-foreground">
              From {overall?.length} students
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overall?.length}</div>
            <p className="text-base pt-2 text-muted-foreground">
              <span className="text-primary">
                {filterPaidStudents?.length} paid,{" "}
              </span>
              <span className="text-destructive">
                {filterUnpaidStudents?.length} unpaid
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              Ghc{totalPaid}
            </div>
            <p className="text-base pt-2 text-muted-foreground">
              From {filterPaidStudents?.length} students
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unpaid</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              -Ghc{totalUnpaid}
            </div>
            <p className="text-base pt-2 text-muted-foreground">
              Owings: {filterUnpaidStudents?.length} students
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
