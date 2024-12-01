import GoBackButton from "@/components/shared/go-back/go-back";
import { PaleTableSkeleton } from "@/components/shared/page-loader/loaders";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useFetchClassById, useFetchStudent } from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { Edit2Icon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ViewStudent() {
  const { user } = useAuthStore();
  const { id } = useParams();
  const {
    data: studentData,
    isLoading,
    error,
  } = useFetchStudent(Number(id) as number);
  const { data: classData, isLoading: classLoader } = useFetchClassById(
    Number(studentData?.classId)
  );
  const student = studentData;
  const teacher = user?.user;
  return (
    <section className="w-full space-y-5">
      {/* Go back */}
      <GoBackButton />
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="size-36 rounded-full  gap-3 bg-gray-200"></div>
        {/* Name and class */}
        <div className="flex flex-col w-2/3 space-y-2">
          <h1 className="text-2xl font-bold">{student?.name}</h1>
          <p>
            <span className="font-medium text-lg">{student?.age}</span>
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Link to={`/teacher/students/${id}/edit`}>
              <Button>
                <Edit2Icon />
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* List */}
      {isLoading ? (
        <PaleTableSkeleton />
      ) : error ? (
        <p>{error instanceof Error ? error.message : "An error occurred"}</p>
      ) : (
        <div className="max-w-4xl w-full">
          <Table className="border rounded-lg w-full">
            <TableCaption>{student?.name} Info</TableCaption>
            <TableBody>
              <TableRow>
                <TableHead className="w-1/3 text-left">Full Name</TableHead>
                <TableCell>{student?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-1/3 text-left">
                  Parent's Number
                </TableHead>
                <TableCell>{student?.parentPhone}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-1/3 text-left">Teacher</TableHead>
                <TableCell>
                  {teacher?.role === "TEACHER" || teacher?.role === "Teacher"
                    ? teacher?.name
                    : teacher?.role === "SUPER_ADMIN" && "Admin"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-1/3 text-left">Class/Level</TableHead>
                <TableCell>
                  {classLoader ? "Loading..." : classData?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-1/3 text-left">Gender</TableHead>
                <TableCell className="capitalize">{student?.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-1/3 text-left">Age</TableHead>
                <TableCell>{student?.age} years old</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
