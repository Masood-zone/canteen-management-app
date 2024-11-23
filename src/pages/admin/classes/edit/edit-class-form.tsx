import ButtonLoader from "@/components/shared/button-loader/button-loader";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

export default function EditClassForm({
  classData,
}: {
  classData: Class | undefined;
}) {
  return (
    <form autoComplete="off">
      <CardContent className="space-y-4">
        {/* Class Name*/}
        <div className="space-y-2">
          <Label htmlFor="class">Class Name</Label>
          <Input
            defaultValue={classData?.class_name}
            name="class"
            type="text"
            className="bg-transparent"
            placeholder="Class Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="class">Description</Label>
          <Textarea
            name="description"
            defaultValue={"Class Description"}
            // defaultValue={classData.description}
            placeholder="Description"
            className="bg-transparent"
            rows={5}
          />
        </div>

        <Button type="submit" className="w-full" disabled={false}>
          <ButtonLoader
            isPending={false}
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
