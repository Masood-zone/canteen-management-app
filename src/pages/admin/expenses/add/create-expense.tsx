import ButtonLoader from "@/components/shared/button-loader/button-loader";
import GoBackButton from "@/components/shared/go-back/go-back";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCreateExpense, useFetchReferences } from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ReferenceModal from "./reference-modal";

export default function AddExpense() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Expense>();
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { mutate: createExpense, isLoading } = useCreateExpense();

  const referenceId = watch("references.id");
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const submittedBy = user?.user?.id;
  const { data: references } = useFetchReferences();

  const onSubmit = async (data: Expense) => {
    try {
      await createExpense({
        ...data,
        date: formattedDate,
        references: {
          id: Number(data?.references?.id),
        },
        submittedBy: submittedBy,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Setup Expense</h1>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            <p>Setup a new expense to the system.</p>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* References */}
            <div className="flex w-full items-center justify-between space-x-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="reference.id">Reference</Label>
                <Select
                  value={referenceId?.toString()}
                  defaultValue=""
                  onValueChange={(value) =>
                    setValue("references.id", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {references?.map((ref: Reference) => (
                      <SelectItem
                        key={ref.id}
                        value={ref.id?.toString() || ""}
                        className="capitalize"
                      >
                        {ref.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ReferenceModal />
            </div>
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                placeholder="Amount"
                className={errors.amount ? "border-red-500" : "bg-transparent"}
                {...register("amount", { required: true })}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">Amount is required</p>
              )}
            </div>
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="block">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Description"
                className="bg-transparent"
                rows={5}
              />
            </div>
            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              <ButtonLoader
                isPending={isLoading}
                loadingText="Setting up expense..."
                fallback="Create Expense"
              />
            </Button>
          </CardContent>
        </form>
        <CardFooter>
          <div className="space-x-4 text-center text-gray-500">
            <Link to="/contact-us" className="text-sm hover:text-primary">
              Facing issues? Contact us
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
