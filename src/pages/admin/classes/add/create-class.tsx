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

export default function AddClass() {
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
        <form autoComplete="off">
          <CardContent className="space-y-4">
            {/* Class Name*/}
            <div className="space-y-2">
              <Label htmlFor="class">Class Name</Label>
              <Input type="text" name="class" placeholder="Class Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                placeholder="Class Description"
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full" disabled={false}>
              <ButtonLoader
                isPending={false}
                loadingText="Creating class..."
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
