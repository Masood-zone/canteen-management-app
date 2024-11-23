import GoBackButton from "@/components/shared/go-back/go-back";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateCanteenForm from "./create-canteen-form";
import { PageHeading } from "@/components/typography/heading";

export default function RecordCanteen() {
  return (
    <section className="w-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <PageHeading>Record Canteen Transaction</PageHeading>
            <GoBackButton />
          </CardTitle>
          <CardDescription>
            <p>
              Record a new canteen transaction. You can add students, teachers
              to the transaction once it is recorded.
            </p>
          </CardDescription>
        </CardHeader>
        <CreateCanteenForm />
      </Card>
    </section>
  );
}
