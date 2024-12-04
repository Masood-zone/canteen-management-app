import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useFetchRecordsAmount,
  useUpdateRecordsAmount,
} from "@/services/api/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function Canteen() {
  const { mutate: updateRecordsAmount, isLoading: updatingPriceLoader } =
    useUpdateRecordsAmount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordsAmount>();
  const { data: amountSetting, isLoading, error } = useFetchRecordsAmount();

  useEffect(() => {
    if (error) {
      console.error("Error fetching records amount:", error);
      toast.error("Failed to fetch records amount.");
    }
  }, [error]);

  const onSubmit = async (data: RecordsAmount) => {
    try {
      await updateRecordsAmount(data);
    } catch (error) {
      console.error("Error updating records amount:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Canteen Settings</h1>
        <p className="text-muted-foreground">
          Manage your canteen preferences and notifications.
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Canteen Notification Preferences</CardTitle>
          <CardDescription>
            Choose what notifications you want to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="daily-menu">Daily Payments Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about the daily payments updates.
              </p>
            </div>
            <Switch id="daily-menu" />
          </div>
          <Separator />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="canteen-price">Canteen Pricing</Label>
                <p className="text-sm text-muted-foreground">
                  Change the pricing of the canteen items.
                </p>
              </div>
              {isLoading ? (
                <div>
                  <Skeleton className="h-8 w-56 bg-muted/50" />
                </div>
              ) : (
                <>
                  <Input
                    id="canteen-price"
                    type="number"
                    defaultValue={amountSetting?.setting?.value}
                    {...register("value")}
                    className="w-56 text-right"
                    min="0"
                  />
                  {errors.value && (
                    <p className="text-red-500 text-sm">
                      {typeof errors.value?.message === "string" && (
                        <p className="text-red-500 text-sm">
                          {errors.value.message}
                        </p>
                      )}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={updatingPriceLoader}>
                {updatingPriceLoader ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
