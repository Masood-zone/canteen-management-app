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

export default function ForgotPassword() {
  return (
    <main className="flex flex-col items-center justify-center h-[80dvh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <form action="">
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                className="bg-transparent"
                required
                placeholder="Email/Phone Number"
              />
            </div>
            <Button type="submit" className="w-full ">
              Verify
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
