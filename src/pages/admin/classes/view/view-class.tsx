import { classesList } from "@/utils/mock";
import { useParams } from "react-router-dom";

export default function ViewClass() {
  const { id } = useParams();
  const classData = classesList.find(
    (classItem) => classItem.class_id === Number(id)
  );

  return (
    <section className="w-full  space-y-5">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">
          Class {classData?.class_name}
        </h1>
        <p>
          Teacher:
          {classData?.class_teacher}
        </p>
      </div>
    </section>
  );
}
