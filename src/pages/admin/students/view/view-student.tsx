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
import { studentsList } from "@/utils/mock";
import { Edit2Icon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ViewStudent() {
  const { id } = useParams();
  const student = studentsList.find((student) => student.id === Number(id));

  return (
    <section className="w-full space-y-5">
      {/* Go back */}
      <GoBackButton />
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="size-36 rounded-full  gap-3 bg-gray-200"></div>
        {/* Name and class */}
        <div className="flex flex-col w-2/3 space-y-2">
          <h1 className="text-2xl font-bold">
            {student?.first_name} {student?.first_name}
          </h1>
          <p>
            {/* <span className="font-medium text-lg">{student.age}</span> */}
            10 years old
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Link to={`/admin/students/${id}/edit`}>
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
          <TableCaption>
            {student?.first_name} {student?.last_name} Info
          </TableCaption>
          <TableBody>
            <TableRow>
              <TableHead className="w-1/3 text-left">Full Name</TableHead>
              <TableCell>
                {student?.first_name}
                {student?.last_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Class/Level</TableHead>
              <TableCell>{student?.class}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Gender</TableHead>
              <TableCell>Male</TableCell>
              {/* <TableCell>{student.gender}</TableCell> */}
            </TableRow>
            <TableRow>
              <TableHead className="w-1/3 text-left">Age</TableHead>
              <TableCell>10 years old</TableCell>
              {/* <TableCell>{student.age} years old</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
