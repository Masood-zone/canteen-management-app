import ButtonLoader from "@/components/shared/button-loader/button-loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function CreateCanteenForm() {
  const [date, setDate] = useState<Date | null>(null);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today || isWeekend(date);
  };

  return (
    <CardContent>
      <form>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="student">Student</Label>
            <Select name="student">
              <SelectTrigger className="bg-transparent">
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student-1">Student 1</SelectItem>
                <SelectItem value="student-2">Student 2</SelectItem>
                <SelectItem value="no-students" disabled>
                  No students found
                </SelectItem>
                {/* {studentList.length > 0 ? (
              studentList.map((item) => (
                <SelectItem key={item.id} value={JSON.stringify(item)}>
                  {item.firstName} {item.lastName}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-students" disabled>
                No students found
              </SelectItem>
            )} */}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex flex-col space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={!date ? "text-muted-foreground" : ""}
                >
                  {date ? format(date, "PPP") : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={(day) => setDate(day ?? null)}
                  disabled={isDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={false}>
            <ButtonLoader
              isPending={false}
              fallback="Record Transaction"
              loadingText="Recording transaction..."
            />
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
