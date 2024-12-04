import ButtonLoader from "@/components/shared/button-loader/button-loader";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateStudent } from "@/services/api/queries";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function EditStudentForm({
  studentData,
  classList,
}: {
  studentData: Student;
  classList: Class[];
}) {
  const { mutate: updateStudent, isLoading } = useUpdateStudent();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm<Student>();

  const gender = watch("gender");
  const classId = watch("classId");
  const activeClass = classList?.find((c) => c.id === classId);

  const onSubmit = async (data: Student) => {
    try {
      await updateStudent({
        ...data,
        gender,
        classId: Number(classId),
        age: Number(data?.age),
        id: studentData?.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="name"
            id="name"
            {...register("name", { required: true })}
            autoComplete="off"
            defaultValue={studentData?.name}
            className="bg-transparent"
            required
          />
        </div>
        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            id="age"
            {...register("age", { required: true })}
            autoComplete="off"
            defaultValue={studentData?.age}
            placeholder="Age"
            className="bg-transparent"
            required
          />
        </div>
        {/* Class */}
        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Select
            value={classId?.toString()}
            onValueChange={(value) =>
              setValue("classId", Number(value), {
                shouldValidate: true,
              })
            }
            defaultValue=""
          >
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder={activeClass?.name || "Select Class"} />
            </SelectTrigger>
            <SelectContent>
              {classList?.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id.toString()}>
                  {classItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={gender} // Bind `Select`'s value to `watch` output
            onValueChange={(value) =>
              setValue("gender", value as "male" | "female", {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="bg-transparent">
              <SelectValue
                placeholder={studentData?.gender || "Male/Female"}
                className="capitalize"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          <ButtonLoader
            isPending={isLoading}
            fallback="Update Student"
            loadingText="Updating Student..."
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
