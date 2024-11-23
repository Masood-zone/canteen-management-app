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
import { Link } from "react-router-dom";

export default function AddStudent() {
  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <PageHeading>Register Student</PageHeading>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            <p>Register a new student to the platform</p>
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="name"
                name="firstName"
                id="firstName"
                autoComplete="off"
                placeholder="Student's first name"
                className="bg-transparent"
                required
              />
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="name"
                name="lastName"
                id="lastName"
                autoComplete="off"
                placeholder="Student's last name"
                className="bg-transparent"
                required
              />
            </div>
            {/* Class */}
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select name="class">
                <SelectTrigger name="class" className="bg-transparent">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JSS1">JSS1</SelectItem>
                  <SelectItem value="JSS2">JSS2</SelectItem>
                  <SelectItem value="JSS3">JSS3</SelectItem>
                  <SelectItem value="SS1">SS1</SelectItem>
                  <SelectItem value="SS2">SS2</SelectItem>
                  <SelectItem value="SS3">SS3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                name="age"
                id="age"
                placeholder="Student's age"
                autoComplete="off"
                className="bg-transparent"
                required
              />
            </div>
            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger name="gender" className="bg-transparent">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Submit */}
            <Button type="submit" className="w-full" disabled={false}>
              <ButtonLoader
                isPending={false}
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
