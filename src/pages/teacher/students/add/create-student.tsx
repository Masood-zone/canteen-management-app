import ButtonLoader from "@/components/shared/button-loader/button-loader";
import GoBackButton from "@/components/shared/go-back/go-back";
import { PageHeading } from "@/components/typography/heading";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateStudent } from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function AddStudent() {
  const { assigned_class } = useAuthStore();
  const { mutate: createStudent, isLoading } = useCreateStudent();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Student>();
  const gender = watch("gender");
  const teacherClass = assigned_class;
  const onSubmit = async (data: Student) => {
    try {
      await createStudent({
        ...data,
        age: Number(data.age),
        classId: Number(teacherClass?.id),
      });
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <PageHeading>Register Student</PageHeading>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            <p>Register a student for {`${teacherClass?.name}`}</p>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="name"
                id="name"
                {...register("name", { required: true })}
                autoComplete="off"
                placeholder="Student's first name"
                className="bg-transparent"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
            {/* Parent contact */}
            <div className="space-y-2">
              <Label htmlFor="parentPhone">Parent Contact</Label>
              <Input
                type="name"
                id="parentPhone"
                {...register("parentPhone", { required: true })}
                autoComplete="off"
                placeholder="Student's Parent Contact"
                className="bg-transparent"
                required
              />
              {errors.parentPhone && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                {...register("age", { required: true })}
                id="age"
                placeholder="Student's age"
                autoComplete="off"
                className="bg-transparent"
                required
              />
              {errors.age && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
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
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              <ButtonLoader
                isPending={isLoading}
                loadingText="Registering..."
                fallback="Register"
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
      </Card>
    </section>
  );
}
