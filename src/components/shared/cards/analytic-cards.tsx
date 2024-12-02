import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  notice?: string;
}

export function AnalyticsCard({
  title,
  value,
  icon,
  notice,
}: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
      {notice && (
        <CardFooter>
          <p className="text-xs text-muted-foreground flex items-center space-x-2">
            <Info className="size-4" />
            <span className="hover:scale-110">{notice}</span>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
