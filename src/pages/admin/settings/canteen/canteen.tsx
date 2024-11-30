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

export default function Canteen() {
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
        <form>
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
              <Input
                id="canteen-price"
                type="number"
                className="w-56 text-right"
                min="0"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
