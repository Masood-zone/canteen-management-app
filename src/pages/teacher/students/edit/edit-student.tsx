import GoBackButton from "@/components/shared/go-back/go-back";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { studentsList } from "@/utils/mock";
import { useParams } from "react-router-dom";
import EditStudentForm from "./edit-student-form";

export default function EditStudent() {
  const { id } = useParams();
  const studentData = studentsList.find((student) => student.id === Number(id));
  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit Student</h1>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            Fill in the details below to edit a student.
          </CardDescription>
        </CardHeader>
        <EditStudentForm studentData={studentData} />
      </Card>
    </section>
  );
}
