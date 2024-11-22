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
import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <main className="flex flex-col items-center justify-center h-[80dvh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password, confirm and submit
          </CardDescription>
        </CardHeader>
        <form action="">
          <CardContent className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                type="password"
                name="password"
                autoComplete="off"
                className="bg-transparent"
                required
              />
            </div>
            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                autoComplete="off"
                className="bg-transparent"
                required
              />
            </div>
            <Button type="submit" className="w-full ">
              Reset Password
            </Button>
          </CardContent>
          <CardFooter>
            <div className="space-x-4 text-center text-gray-500">
              <Link to="/help/contact" className="text-sm hover:text-primary">
                <span>&copy;CMS</span> Contact
              </Link>
              <Link to="/help/terms" className="text-sm hover:text-primary">
                Terms & Conditions
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
