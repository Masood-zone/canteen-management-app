import { AnalyticsCard } from "@/components/shared/cards/analytic-cards";
import { CardsSkeleton } from "@/components/shared/page-loader/loaders";
import { useTeacherAnalytics } from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { CurrencyIcon, UserCheck, Users, UserX } from "lucide-react";

export default function TeacherHome() {
  const { user, assigned_class } = useAuthStore();
  const {
    data: analytics,
    isLoading,
    error,
  } = useTeacherAnalytics(assigned_class?.id ?? 0);

  return (
    <>
      {/* Welcome message */}
      <div className="space-y-2 p-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.user?.name}</h1>
        <p className="">
          You are in charge of{" "}
          <span className="font-bold">{assigned_class?.name}</span> class.
        </p>
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
              icon={<CurrencyIcon className="h-6 w-6 text-muted-foreground" />}
              notice="Total amount paid by students today"
            />
            <AnalyticsCard
              title="Total Students"
              value={analytics?.totalStudents || 0}
              icon={<Users className="h-6 w-6 text-muted-foreground" />}
            />
            <AnalyticsCard
              title="Paid Students"
              value={analytics?.paidStudents || 0}
              icon={<UserCheck className="h-6 w-6 text-muted-foreground" />}
            />
            <AnalyticsCard
              title="Unpaid Students"
              value={analytics?.unpaidStudents || 0}
              icon={<UserX className="h-6 w-6 text-muted-foreground" />}
            />
          </div>
        )}
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
