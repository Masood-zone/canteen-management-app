import ButtonLoader from "@/components/shared/button-loader/button-loader";
import GoBackButton from "@/components/shared/go-back/go-back";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useCreateClass, useFetchTeachers } from "@/services/api/queries";
import { SubmitHandler, useForm } from "react-hook-form";

export default function AddClass() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Class>();
  const { mutate: createClass, isLoading } = useCreateClass();

  const { data: teachers } = useFetchTeachers();
  const supervisorId = watch("supervisorId");
  const onSubmit: SubmitHandler<Class> = async (data) => {
    try {
      await createClass({ ...data, supervisorId: Number(data.supervisorId) });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Register Class</h1>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            <p>
              Register a new class to the system. You can add teachers, students
              to the class once it is registered.
            </p>
          </CardDescription>
        </CardHeader>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Class Name*/}
            <div className="space-y-2">
              <Label htmlFor="class">Class Name</Label>
              <Input
                type="text"
                placeholder="Class Name"
                className={errors.name ? "border-red-500" : "bg-transparent"}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Class name is required</p>
              )}
            </div>
            {/* Class Teacher */}
            <div className="space-y-2">
              <Label htmlFor="teacher">Class Teacher</Label>
              <Select
                value={supervisorId?.toString()}
                onValueChange={(value) =>
                  setValue("supervisorId", value, { shouldValidate: true })
                }
                defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers?.map((teacher: Teacher) => (
                    <SelectItem
                      key={teacher?.id}
                      value={teacher?.id?.toString() || ""}
                    >
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Class Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Class Description"
                className={
                  errors.description ? "border-red-500" : "bg-transparent"
                }
                {...register("description", { required: true })}
                rows={5}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  Class description is required
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <ButtonLoader
                isPending={isLoading}
                loadingText="Creating class..."
                fallback="Register"
              />
            </Button>
          </CardContent>
        </form>
        <CardFooter>
          <div className="space-x-4 text-center text-gray-500">
            <Link to="/contact-us" className="text-sm hover:text-primary">
              Facing issues? Contact us
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
