import { useFetchReference, useUpdateReference } from "@/services/api/queries";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonLoader from "@/components/shared/button-loader/button-loader";
import { toast } from "sonner";

export default function EditReferenceModal({
  referenceId,
}: {
  referenceId?: number;
}) {
  const { data: reference, error } = useFetchReference(referenceId ?? 0);
  const { mutate: updateReference, isLoading: updatingReference } =
    useUpdateReference();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error("Error fetching reference");
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Reference>();

  const onSubmit = async (data: Reference) => {
    try {
      await updateReference({ ...data, id: referenceId });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <Button className="w-full">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>References</DialogTitle>
          <DialogDescription>Edit Reference</DialogDescription>
        </DialogHeader>
        {/* Create Reference */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="description">Name</Label>
            <Input
              {...register("name")}
              defaultValue={reference?.name}
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
              defaultValue={reference?.description}
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
                isPending={updatingReference}
                loadingText="Updating..."
                fallback="Update"
              />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
