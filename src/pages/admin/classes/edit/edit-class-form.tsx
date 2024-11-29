import ButtonLoader from "@/components/shared/button-loader/button-loader";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useFetchTeacher, useUpdateClass } from "@/services/api/queries";

export default function EditClassForm({
  classData,
  teachersList,
}: {
  teachersList: Teacher[];
  classData: Class;
}) {
  const { mutate: updateClass, isLoading } = useUpdateClass();
  const { register, handleSubmit, setValue, watch } = useForm<Class>();
  const supervisorId = watch("supervisorId");

  const teacherId = classData?.supervisorId;
  const { data: activeTeacher } = useFetchTeacher(Number(teacherId));

  const onSubmit = async (data: Class) => {
    try {
      await updateClass({
        ...data,
        supervisorId: Number(supervisorId),
        id: classData.id,
      });
    } catch (error) {
      console.error("Failed to update class:", error);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {/* Class Name*/}
        <div className="space-y-2">
          <Label htmlFor="class">Class Name</Label>
          <Input
            defaultValue={classData?.name}
            {...register("name")}
            type="text"
            className="bg-transparent"
            placeholder="Class Name"
          />
        </div>
        {/* Class Teacher */}
        <div className="space-y-2">
          <Label htmlFor="teacher">Teacher</Label>
          <Select
            value={supervisorId?.toString()}
            defaultValue={""}
            onValueChange={(value) => setValue("supervisorId", value)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={activeTeacher?.data?.name || "Select a teacher"}
              />
            </SelectTrigger>
            <SelectContent>
              {teachersList?.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Class Description */}
        <div className="space-y-2">
          <Label htmlFor="class">Description</Label>
          <Textarea
            {...register("description")}
            defaultValue={classData?.description}
            placeholder="Description"
            className="bg-transparent"
            rows={5}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          <ButtonLoader
            isPending={isLoading}
            fallback="Update Class"
            loadingText="Updating Class"
          />
        </Button>
      </CardContent>
      <CardFooter>
        <div className="space-x-4 text-center text-gray-500">
          <Link to="/contact-us" className="text-sm hover:text-primary">
            Facing issues? Contact us
          </Link>
        </div>
      </CardFooter>
    </form>
  );
}
