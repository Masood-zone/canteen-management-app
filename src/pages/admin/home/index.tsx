import { AnalyticsCard } from "@/components/shared/cards/analytic-cards";
import { CardsSkeleton } from "@/components/shared/page-loader/loaders";
import { useAdminDashboardAnalytics } from "@/services/api/queries";
import { BookOpen, CurrencyIcon, School, Users } from "lucide-react";

export default function AdminHome() {
  const { data: analytics, isLoading, error } = useAdminDashboardAnalytics();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-semibold py-3">Overview</h1>
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
              title="Total Teachers"
              value={analytics?.totalTeachers || 0}
              icon={<Users className="size-6 text-muted-foreground" />}
              notice="Total number of teachers in the school"
            />
            <AnalyticsCard
              title="Total Students"
              value={analytics?.totalStudents || 0}
              icon={<School className="size-6 text-muted-foreground" />}
              notice="Total number of students in the school"
            />
            <AnalyticsCard
              title="Total Collections"
              value={`₵${analytics?.totalCollections || 0}`}
              icon={<CurrencyIcon className="size-6 text-muted-foreground" />}
              notice="Total expected amount from all students"
            />
            <AnalyticsCard
              title="Total Classes"
              value={analytics?.totalClasses || 0}
              icon={<BookOpen className="size-6 text-muted-foreground" />}
              notice="Total number of classes in the school"
            />
          </div>
        )}
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
