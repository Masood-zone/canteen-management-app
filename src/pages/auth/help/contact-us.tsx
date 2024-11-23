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
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <main className="flex flex-col items-center justify-center h-[80dvh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            We would love to hear from you, please fill the form below
          </CardDescription>
        </CardHeader>
        <form action="" autoComplete="off">
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                className="bg-transparent"
                required
                placeholder="example@email.com"
              />
            </div>
            {/* Select - Report an issue, Emergency, Talk to a professional */}
            <div className="space-y-2">
              <Label htmlFor="select-issue">Select an issue</Label>
              <Select>
                <SelectTrigger className="bg-transparent">
                  <SelectValue placeholder="Issue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="report">Report an issue</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="talk">Talk to a professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Description*/}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="bg-transparent"
                id="description"
                name="description"
                required
                placeholder="Please describe your issue"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full ">
              Submit
            </Button>
          </CardContent>
          <CardFooter>
            <div className="space-x-4 text-center text-gray-500">
              <Link to="/contact-us" className="text-sm hover:text-primary">
                <span>&copy;CMS</span> Contact
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-sm hover:text-primary"
              >
                Terms & Conditions
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
