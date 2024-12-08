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
  useCreateRecordsAmount,
  useFetchRecordsAmount,
  useUpdateRecordsAmount,
} from "@/services/api/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Canteen() {
  const { mutate: createRecordsAmount, isLoading: creatingPriceLoader } =
    useCreateRecordsAmount();
  const { mutate: updateRecordsAmount, isLoading: updatingPriceLoader } =
    useUpdateRecordsAmount();
  const { data: amountSetting, isLoading, error } = useFetchRecordsAmount();

  // State for edit mode and input value
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState<string | number>("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching records amount:", error);
      toast.error("Failed to fetch records amount.");
    }
    if (amountSetting) {
      setPrice(amountSetting?.data?.value || ""); // Populate initial price
    }
  }, [error, amountSetting]);

  // Handle save/update
  const handleSave = () => {
    if (!price || Number(price) < 0) {
      toast.error("Price must be a valid positive number.");
      return;
    }

    updateRecordsAmount(
      { value: String(price) },
      {
        onSuccess: () => {
          toast.success("Canteen pricing updated successfully.");
          setIsEditing(false); // Exit edit mode
        },
        onError: () => {
          toast.error("Failed to update canteen pricing.");
        },
      }
    );
  };

  // Handle create if price doesn't exist
  const handleCreate = () => {
    if (!price || Number(price) < 0) {
      toast.error("Price must be a valid positive number.");
      return;
    }

    createRecordsAmount(
      { value: String(price) },
      {
        onSuccess: () => {
          toast.success("Canteen pricing created successfully.");
          setIsEditing(false); // Exit edit mode
        },
        onError: () => {
          toast.error("Failed to create canteen pricing.");
        },
      }
    );
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
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="canteen-price">Canteen Pricing</Label>
              <p className="text-sm text-muted-foreground">
                Change the pricing of the canteen items.
              </p>
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-56 bg-muted/50" />
            ) : (
              <div className="flex items-center w-56 text-right">
                {!isEditing ? (
                  <span className="text-lg font-medium text-primary">
                    Ghc{price || "Not Set"}
                  </span>
                ) : (
                  <Input
                    id="canteen-price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full"
                    min="0"
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                disabled={creatingPriceLoader || updatingPriceLoader}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={creatingPriceLoader || updatingPriceLoader}
                >
                  Cancel
                </Button>
                <Button
                  onClick={amountSetting ? handleSave : handleCreate}
                  disabled={creatingPriceLoader || updatingPriceLoader}
                >
                  {creatingPriceLoader || updatingPriceLoader
                    ? "Saving..."
                    : "Save"}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
