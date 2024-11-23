import GoBackButton from "@/components/shared/go-back/go-back";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { teachersList } from "@/utils/mock";
import { Edit2Icon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ViewTeacher() {
  const { id } = useParams();
  const teacher = teachersList.find(
    (teacher) => teacher.teacher_id === Number(id)
  );

  return (
    <section className="w-full space-y-5">
      {/* Go back */}
      <GoBackButton />
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Profile */}
        <div className="size-36 rounded-full  gap-3 bg-gray-200"></div>
        {/* Name and email */}
        <div className="flex flex-col w-2/3 space-y-2">
          <h1 className="text-2xl font-bold">
            {teacher?.first_name} {teacher?.last_name}
          </h1>
          <p>Email: teacher@gmail.com</p>
          {/* <p>{teacher.email}</p> */}
          <div className="mt-2 flex items-center gap-2">
            <Link to={`/admin/teachers/${id}/edit`}>
              <Button>
                <Edit2Icon />
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* List */}
      <div className="max-w-4xl w-full">
        <Table className="border rounded-lg w-full">
          <TableCaption>Teacher Info</TableCaption>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 text-left">Phone Number</TableHead>
              <TableCell>0554476906</TableCell>
              {/* <TableCell>{teacher.phoneNumber}</TableCell> */}
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Email</TableHead>
              <TableCell>Teacher@gmail.com</TableCell>
              {/* <TableCell>{teacher.email}</TableCell> */}
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Gender</TableHead>
              <TableCell>Teacher gender</TableCell>
              {/* <TableCell>{teacher.gender}</TableCell> */}
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Assigned Class</TableHead>
              <TableCell>{teacher?.assigned_class}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Credentials</TableHead>
              <TableCell>{teacher?.teacher_status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
