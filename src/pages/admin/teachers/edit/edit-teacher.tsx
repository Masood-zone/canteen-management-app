import GoBackButton from "@/components/shared/go-back/go-back";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { teachersList } from "@/utils/mock";
import { useParams } from "react-router-dom";
import EditTeacherForm from "./edit-teacher-form";

export default function EditTeacher() {
  const { id } = useParams();
  const teacherData = teachersList.find(
    (teacher) => teacher.teacher_id === Number(id)
  );

  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit Teacher</h1>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            Fill in the details below to edit a teacher.
          </CardDescription>
        </CardHeader>
        <EditTeacherForm teacherData={teacherData} />
      </Card>
    </section>
  );
}
