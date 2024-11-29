import GoBackButton from "@/components/shared/go-back/go-back";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchClassById, useFetchTeachers } from "@/services/api/queries";
import { useParams } from "react-router-dom";
import EditClassForm from "./edit-class-form";

export default function EditClass() {
  const { id } = useParams();
  const {
    data: classData,
    isLoading,
    error,
  } = useFetchClassById(Number(id) || 0) as {
    data: Class;
    isLoading: boolean;
    error: { message: string } | null;
  };
  const { data: teachers } = useFetchTeachers();

  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit Class</h1>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            Fill in the details below to edit a class.
          </CardDescription>
        </CardHeader>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-500" role="alert">
            Error:
            {error?.message}
          </div>
        ) : (
          <EditClassForm classData={classData} teachersList={teachers} />
        )}
      </Card>
    </section>
  );
}
