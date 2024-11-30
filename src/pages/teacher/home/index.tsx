import { useAuthStore } from "@/store/authStore";

export default function TeacherHome() {
  const { user, assigned_class } = useAuthStore();

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
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
