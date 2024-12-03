import ButtonLoader from "@/components/shared/button-loader/button-loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  useFetchExpense,
  useFetchReferences,
  useUpdateExpense,
} from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function EditExpense() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { register, handleSubmit, setValue, watch } = useForm<Expense>();

  const referenceId = watch("references.id");
  const { data: expense, error } = useFetchExpense(Number(id));
  const { data: references } = useFetchReferences();
  const date = expense?.date;

  const [selectedDate, setSelectedDate] = useState<Date>(
    () => date && new Date(date)
  );
  const reference = references?.find(
    (reference: Reference) => reference?.id === expense?.reference?.id
  );
  const referenceName = reference?.name;
  const submitterId = user?.user?.id;

  const { mutate: updateExpense, isLoading: updatingExpense } =
    useUpdateExpense();

  const onSubmit = async (data: Expense) => {
    try {
      await updateExpense({
        ...data,
        id: Number(id),
        date: selectedDate ? selectedDate.toISOString() : "",
        references: { id: referenceId || expense?.reference?.id },
        submittedBy: submitterId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (error) {
    return <div>Error loading expense</div>;
  }

  if (!expense) {
    return (
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <h1 className="text-2xl font-bold">Expense Not found</h1>
        <p>
          The expense you are looking for does not exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-3">
      <h1 className="text-2xl font-bold">Edit Expense</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* References*/}
        <div className="space-y-2">
          <Label htmlFor="references">References</Label>
          <Select
            value={referenceId?.toString()}
            defaultValue={referenceName}
            onValueChange={(value) => setValue("references.id", Number(value))}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={referenceName || "No reference selected"}
              />
            </SelectTrigger>
            <SelectContent>
              {references?.map((reference: Reference) => (
                <SelectItem
                  key={reference.id}
                  value={reference?.id?.toString() || ""}
                >
                  {reference.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            {...register("amount")}
            defaultValue={expense?.amount}
            placeholder="Amount"
            className="bg-transparent"
          />
        </div>
        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description")}
            defaultValue={expense?.description}
            placeholder="Description"
            className="bg-transparent"
            rows={5}
          />
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
                selected={selectedDate ?? undefined}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" className="w-full" disabled={updatingExpense}>
          <ButtonLoader
            isPending={updatingExpense}
            fallback="Update"
            loadingText="Updating Expense..."
          />
        </Button>
      </form>
    </div>
  );
}
