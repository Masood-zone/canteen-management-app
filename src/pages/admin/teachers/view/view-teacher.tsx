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
import { useFetchTeacher } from "@/services/api/queries";
import { Edit2Icon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ViewTeacher() {
  const { id } = useParams();
  const { data: teacher } = useFetchTeacher(Number(id));

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
          <h1 className="text-2xl font-bold">{teacher?.name}</h1>
          <p>{teacher.email}</p>
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
              <TableCell>{teacher.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Email</TableHead>
              <TableCell>Teacher@gmail.com</TableCell>
              <TableCell>{teacher.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Gender</TableHead>
              <TableCell>Teacher gender</TableCell>
              <TableCell>{teacher.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Assigned Class</TableHead>
              <TableCell>{teacher?.assigned_class}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Credentials</TableHead>
              <TableCell>{teacher?.password}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
