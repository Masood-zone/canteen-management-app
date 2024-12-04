import { AnalyticsCard } from "@/components/shared/cards/analytic-cards";
import { CardsSkeleton } from "@/components/shared/page-loader/loaders";
import {
  useFetchRecordsAmount,
  useTeacherAnalytics,
} from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { CurrencyIcon, UserCheck, Users, UserX } from "lucide-react";

export default function TeacherHome() {
  const { user, assigned_class } = useAuthStore();
  const { data: price, error: canteenPriceError } = useFetchRecordsAmount();
  const {
    data: analytics,
    isLoading,
    error,
  } = useTeacherAnalytics(assigned_class?.id ?? 0);

  return (
    <>
      {/* Welcome message */}
      <div className="flex items-center md:flex-row flex-col justify-between w-full">
        <div className="space-y-2 p-4">
          <h1 className="text-2xl font-bold">Welcome, {user?.user?.name}</h1>
          <p className="">
            You are in charge of{" "}
            <span className="font-bold">{assigned_class?.name}</span> class.
          </p>
        </div>
        <div className="">
          <h2 className="w-full">
            Canteen Price
            {Boolean(canteenPriceError) && (
              <p className="text-red-500">Error fetching canteen price</p>
            )}
            <span className="text-2xl font-bold text-primary text-center px-2">
              Gh₵{price?.setting?.value || 0}
            </span>
          </h2>
          <p>This is the current price of the canteen.</p>
        </div>
      </div>
      {/* Analytics */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {isLoading ? (
          <CardsSkeleton count={4} />
        ) : error ? (
          <div className="">
            <CardsSkeleton count={3} />
            <p className="text-center text-red-500">Error fetching analytics</p>
          </div>
        ) : (
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AnalyticsCard
              title="Total Amount"
              value={`₵${analytics?.totalAmount || 0}`}
              icon={<CurrencyIcon className="size-6 text-muted-foreground" />}
              notice="Total expected amount from all students"
            />
            <AnalyticsCard
              title="Total Students"
              value={analytics?.totalStudents || 0}
              icon={<Users className="size-6 text-muted-foreground" />}
              notice="Total number of students in the class"
            />
            <AnalyticsCard
              title="Paid Students"
              value={analytics?.paidStudents?.count || 0}
              secondaryValue={`₵${analytics?.paidStudents?.amount || 0}`}
              icon={<UserCheck className="size-6 text-muted-foreground" />}
              notice="Number of paid students and total amount paid"
            />
            <AnalyticsCard
              title="Unpaid Students"
              value={analytics?.unpaidStudents?.count || 0}
              secondaryValue={`₵${analytics?.unpaidStudents?.amount || 0}`}
              icon={<UserX className="size-6 text-muted-foreground" />}
              notice="Number of unpaid students and total amount due"
            />
          </div>
        )}
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
