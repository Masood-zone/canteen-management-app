import GoBackButton from "@/components/shared/go-back/go-back";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { classesList } from "@/utils/mock";
import { useParams } from "react-router-dom";
import EditClassForm from "./edit-class-form";

export default function EditClass() {
  const { id } = useParams();

  const classData = classesList.find(
    (classItem) => classItem.class_id === Number(id)
  );

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
        <EditClassForm classData={classData} />
      </Card>
    </section>
  );
}
