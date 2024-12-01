import GoBackButton from "@/components/shared/go-back/go-back";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import EditStudentForm from "./edit-student-form";
import { useFetchClasses, useFetchStudent } from "@/services/api/queries";
import { useEffect } from "react";
import { toast } from "sonner";

export default function EditStudent() {
  const { id } = useParams();
  const { data: student, error } = useFetchStudent(Number(id)) as {
    data: Student;
    error: { message: string };
  };
  const { data: classList, error: classListError } = useFetchClasses();

  // Show error toast if there is an error fetching classes
  useEffect(() => {
    if (classListError) {
      toast("Failed to fetch classes, please refresh the page and try again.");
    }
  }, [classListError]);

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
        {error ? (
          <p>{error.message}</p>
        ) : (
          <EditStudentForm studentData={student} classList={classList} />
        )}
      </Card>
    </section>
  );
}
