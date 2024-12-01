"use client";

import { useState, useEffect } from "react";
import { CanteenTable } from "@/components/tables/canteen-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useFetchRecordsByClassAndDate,
  useSubmitStudentRecord,
} from "@/services/api/queries";
import { useAuthStore } from "@/store/authStore";
import { TableSkeleton } from "@/components/shared/page-loader/loaders";

export default function CanteenList() {
  const { user, assigned_class } = useAuthStore();
  const classId = assigned_class?.id ?? 0;
  const today = new Date().toISOString().split("T")[0];

  const {
    data: records,
    isLoading,
    error,
  } = useFetchRecordsByClassAndDate(classId, today);

  const submitRecord = useSubmitStudentRecord();

  const [unpaidRecords, setUnpaidRecords] = useState([]);
  const [paidRecords, setPaidRecords] = useState([]);
  const [absentRecords, setAbsentRecords] = useState([]);

  useEffect(() => {
    if (records) {
      setUnpaidRecords(records?.unpaidStudents);
      setPaidRecords(records?.paidStudents);
      setAbsentRecords([]);
    }
  }, [records]);

  const handlePaymentStatusChange = async (id: number, isPaid: boolean) => {
    console.log("handlePaymentStatusChange", id, isPaid);
  };

  const handleAbsentStatusChange = (id: number, isAbsent: boolean) => {
    console.log("handleAbsentStatusChange", id, isAbsent);
  };

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error: There was an error</div>;

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
          searchField="student.name"
        />
      </TabsContent>
      <TabsContent value="paid">
        <CanteenTable
          columns={columns(handlePaymentStatusChange, handleAbsentStatusChange)}
          data={paidRecords}
          searchField="student.name"
        />
      </TabsContent>
      <TabsContent value="absent">
        <CanteenTable
          columns={columns(handlePaymentStatusChange, handleAbsentStatusChange)}
          data={absentRecords}
          searchField="student.name"
        />
      </TabsContent>
    </Tabs>
  );
}
