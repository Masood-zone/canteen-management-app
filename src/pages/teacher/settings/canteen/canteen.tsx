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
import { useFetchRecordsAmount } from "@/services/api/queries";
import { Skeleton } from "@/components/ui/skeleton";

export default function Canteen() {
  const { data: amountSetting, isLoading, error } = useFetchRecordsAmount();

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
          <form>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="canteen-price">Canteen Pricing</Label>
                <p className="text-sm text-muted-foreground">
                  Here is the current price for the canteen.
                </p>
              </div>
              {isLoading ? (
                <div>
                  <Skeleton className="h-8 w-56 bg-muted/50" />
                </div>
              ) : error ? (
                <div className="text-red-500">
                  Could not fetch the canteen price. Please try again later.
                </div>
              ) : (
                <>
                  <span className="text-muted-foreground">Price per meal:</span>
                  <span>Ghc{amountSetting?.setting?.value}</span>
                </>
              )}
            </div>
            {/* <div className="flex justify-end">
              <Button type="submit" disabled={false}>
                {false ? "Saving..." : "Save Changes"}
              </Button>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
