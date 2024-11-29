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
        </>
      )}
    </section>
  );
}
