import GoBackButton from "@/components/shared/go-back/go-back";
import { PageHeading } from "@/components/typography/heading";
import { useFetchClassById, useFetchTeacher } from "@/services/api/queries";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { PaleTableSkeleton } from "@/components/shared/page-loader/loaders";
import { Button } from "@/components/ui/button";

export default function ViewClass() {
  const { id } = useParams();
  const { data: classData, isLoading } = useFetchClassById(Number(id));
  const {
    data: teacher,
    error: teacherError,
    isLoading: teacherLoading,
  } = useFetchTeacher(Number(id));

  if (!classData)
    return (
      <div className="flex items-center justify-center h-96 w-full border">
        <h1>Not Found</h1>
      </div>
    );
  const teacherData = teacher?.data;
  return (
    <section className="w-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <PageHeading>View Class</PageHeading>
        <GoBackButton />
      </div>
      {/* Content */}
      {isLoading ? (
        <PaleTableSkeleton />
      ) : (
        <>
          <div className="max-w-4xl w-full">
            <Table className="border rounded-lg w-full">
              <TableCaption>{classData?.name} Info</TableCaption>
              <TableBody>
                <TableRow>
                  <TableHead className="w-1/3 text-left">
                    Class Teacher
                  </TableHead>
                  <TableCell>
                    {teacherLoading
                      ? "Loading..."
                      : teacherError
                      ? "Error fetching teacher"
                      : teacherData?.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 text-left">Class Name</TableHead>
                  <TableCell>{classData?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 text-left">Description</TableHead>
                  <TableCell>{classData?.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* Students in the class table */}
          <div className="max-w-4xl w-full">
            <h1 className="mt-2 text-xl py-2">Students in {classData?.name}</h1>
            <Table className="border rounded-lg w-full">
              <TableBody>
                <TableRow>
                  <TableHead className="w-1/4 text-left bg-primary text-white">
                    Name
                  </TableHead>
                  <TableHead className="w-1/4 text-left bg-primary text-white">
                    Age
                  </TableHead>
                  <TableHead className="w-1/4 text-left bg-primary text-white">
                    Parent Phone
                  </TableHead>
                  <TableHead className="w-1/4 text-left bg-primary text-white">
                    Gender
                  </TableHead>
                  <TableHead className="w-1/4 text-left bg-primary text-white">
                    Actions
                  </TableHead>
                </TableRow>
                {classData?.students?.map((student: Student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.parentPhone}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell className="flex items-center space-x-2">
                      <Button>
                        <a href={`/admin/students/${student.id}`}>View</a>
                      </Button>
                      <Button variant="ghost">
                        <a href={`/admin/students/${student.id}/edit`}>Edit</a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {classData?.students?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </section>
  );
}
