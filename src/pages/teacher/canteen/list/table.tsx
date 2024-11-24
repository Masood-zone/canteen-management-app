import { useState } from "react";
import { CanteenTable } from "@/components/tables/canteen-table";
import { columns } from "./columns";
import { canteenRecords } from "@/utils/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CanteenList() {
  const [unpaidRecords, setUnpaidRecords] = useState(
    canteenRecords.filter((record) => !record.paid && !record.absent)
  );
  const [paidRecords, setPaidRecords] = useState(
    canteenRecords.filter((record) => record.paid)
  );
  const [absentRecords, setAbsentRecords] = useState(
    canteenRecords.filter((record) => record.absent)
  );

  const handlePaymentStatusChange = (id: string, isPaid: boolean) => {
    if (isPaid) {
      const record = unpaidRecords.find((r) => r.id === id);
      if (record) {
        setUnpaidRecords(unpaidRecords.filter((r) => r.id !== id));
        setPaidRecords([...paidRecords, { ...record, paid: true }]);
      }
    } else {
      const record = paidRecords.find((r) => r.id === id);
      if (record) {
        setPaidRecords(paidRecords.filter((r) => r.id !== id));
        setUnpaidRecords([...unpaidRecords, { ...record, paid: false }]);
      }
    }
  };

  const handleAbsentStatusChange = (id: string, isAbsent: boolean) => {
    if (isAbsent) {
      const record = unpaidRecords.find((r) => r.id === id);
      if (record) {
        setUnpaidRecords(unpaidRecords.filter((r) => r.id !== id));
        setAbsentRecords([...absentRecords, { ...record, absent: true }]);
      }
    } else {
      const record = absentRecords.find((r) => r.id === id);
      if (record) {
        setAbsentRecords(absentRecords.filter((r) => r.id !== id));
        setUnpaidRecords([...unpaidRecords, { ...record, absent: false }]);
      }
    }
  };

  return (
    <Tabs defaultValue="unpaid" className="w-full">
      <TabsList>
        <TabsTrigger value="unpaid">Unpaid Students</TabsTrigger>
        <TabsTrigger value="paid">Paid Students</TabsTrigger>
        <TabsTrigger value="absent">Absent Students</TabsTrigger>
      </TabsList>
      <TabsContent value="unpaid">
        <CanteenTable
          columns={columns(handlePaymentStatusChange, handleAbsentStatusChange)}
          data={unpaidRecords}
          searchField="student.firstName"
        />
      </TabsContent>
      <TabsContent value="paid">
        <CanteenTable
          columns={columns(handlePaymentStatusChange, handleAbsentStatusChange)}
          data={paidRecords}
          searchField="student.firstName"
        />
      </TabsContent>
      <TabsContent value="absent">
        <CanteenTable
          columns={columns(handlePaymentStatusChange, handleAbsentStatusChange)}
          data={absentRecords}
          searchField="student.firstName"
        />
      </TabsContent>
    </Tabs>
  );
}
