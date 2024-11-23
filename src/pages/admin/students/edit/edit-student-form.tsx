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
import { Link } from "react-router-dom";

export default function EditStudentForm({
  studentData,
}: {
  studentData: Student | undefined;
}) {
  return (
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
            defaultValue={studentData?.first_name}
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
            defaultValue={studentData?.last_name}
            className="bg-transparent"
            required
          />
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
        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status">
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={false}>
          <ButtonLoader
            isPending={false}
            fallback="Update Teacher"
            loadingText="Updating Teacher"
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
