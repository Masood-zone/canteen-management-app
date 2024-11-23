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

export default function AddTeacher() {
  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <PageHeading>Register Teacher</PageHeading>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            <p>Register a new teacher to the platform</p>
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                type="name"
                name="first-name"
                id="first-name"
                autoComplete="off"
                className="bg-transparent"
                required
              />
            </div>
            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                type="name"
                name="last-name"
                id="last-name"
                autoComplete="off"
                className="bg-transparent"
                required
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-gray-400">(Optional)</span>
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                className="bg-transparent"
              />
            </div>
            {/* Telephone */}
            <div className="space-y-2">
              <Label htmlFor="phone_number">Telephone</Label>
              <Input
                type="text"
                name="phone_number"
                id="phone_number"
                autoComplete="off"
                className="bg-transparent"
                required
              />
            </div>
            {/* Gender */}
            <div className="space-y-2">
              <Label className="block" htmlFor="gender">
                Gender
              </Label>
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
            {/* Class */}
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select name="class">
                <SelectTrigger name="class" className="bg-transparent">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jss1">JSS 1</SelectItem>
                  <SelectItem value="jss2">JSS 2</SelectItem>
                  <SelectItem value="jss3">JSS 3</SelectItem>
                  <SelectItem value="sss1">SSS 1</SelectItem>
                  <SelectItem value="sss2">SSS 2</SelectItem>
                  <SelectItem value="sss3">SSS 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Credentials</Label>
              </div>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                className="bg-transparent"
                required
              />
            </div>
            <Button type="submit" className="w-full " disabled={false}>
              <ButtonLoader
                isPending={false}
                loadingText="Creating Teacher..."
                fallback="Create Teacher"
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
