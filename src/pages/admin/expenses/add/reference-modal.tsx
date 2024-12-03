import { useState } from "react";
import ButtonLoader from "@/components/shared/button-loader/button-loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReference } from "@/services/api/queries";
import { PlusIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ReferenceModal() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Reference>();

  const { mutate: createReference, isLoading: creatingReference } =
    useCreateReference();

  const onSubmit: SubmitHandler<Reference> = async (data) => {
    try {
      await createReference(data);
      setOpen(false); // Close the dialog
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="bg-primary text-white w-10 h-10 mx-auto rounded-lg text-center mt-8"
        onClick={() => setOpen(true)}
      >
        <span>
          <PlusIcon className="size-5 text-center m-auto" />
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>References</DialogTitle>
          <DialogDescription>Create Reference type</DialogDescription>
        </DialogHeader>
        {/* Create Reference */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Name</Label>
            <Input
              {...register("name")}
              placeholder="Name"
              className={errors.name ? "border-red-500" : "bg-transparent"}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Reference name is required</p>
            )}
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Description"
              className="bg-transparent"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>
          {/* Submit */}
          <DialogFooter>
            <Button type="submit">
              <ButtonLoader
                isPending={creatingReference}
                loadingText="Creating..."
                fallback="Create Reference"
              />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
