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
  const { assigned_class } = useAuthStore();
  const classId = assigned_class?.id ?? 0;
  const today = new Date().toISOString().split("T")[0];

  const {
    data: records,
    isLoading,
    error,
  } = useFetchRecordsByClassAndDate(classId, today);

  const [unpaidRecords, setUnpaidRecords] = useState([]);
  const [paidRecords, setPaidRecords] = useState([]);
  const [absentRecords, setAbsentRecords] = useState([]);
  const [updatingStudentId, setUpdatingStudentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (records) {
      setUnpaidRecords(records?.unpaidStudents);
      setPaidRecords(records?.paidStudents);
      setAbsentRecords([]);
    }
  }, [records]);

  const { mutate: submitRecord } = useSubmitStudentRecord();

  const handlePaymentStatusChange = async (
    id: number,
    isPaid: boolean,
    record: StudentRecord
  ) => {
    setUpdatingStudentId(id);
    try {
      const recordToUpdate = record;
      await submitRecord({
        amount: recordToUpdate.settingsAmount ?? 0,
        submitedBy: recordToUpdate.submitedBy,
        payedBy: recordToUpdate.payedBy,
        isPrepaid: recordToUpdate.isPrepaid,
        hasPaid: isPaid,
        classId: recordToUpdate.classId,
        isAbsent: recordToUpdate.isAbsent,
      });
    } catch (error) {
      console.error(`There was an error updating student record`, error);
    } finally {
      setUpdatingStudentId(null);
    }
  };

  const handleAbsentStatusChange = async (id: number, isAbsent: boolean) => {
    setUpdatingStudentId(id);
    try {
      const recordToUpdate = unpaidRecords.find(
        (record: CanteenRecord) => record.id === id.toString()
      ) as StudentRecord | undefined;
      if (recordToUpdate) {
        await submitRecord({
          amount: recordToUpdate?.settingsAmount ?? 0,
          submitedBy: recordToUpdate?.submitedBy,
          payedBy: recordToUpdate?.payedBy,
          isPrepaid: recordToUpdate?.isPrepaid,
          hasPaid: false,
          classId: recordToUpdate?.classId,
          isAbsent: isAbsent,
        });
      }
    } catch (error) {
      console.error(`There was an error marking student as absent`, error);
    } finally {
      setUpdatingStudentId(null);
    }
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
          columns={columns(
            handlePaymentStatusChange,
            handleAbsentStatusChange,
            updatingStudentId
          )}
          data={unpaidRecords}
          searchField="student"
        />
      </TabsContent>
      <TabsContent value="paid">
        <CanteenTable
          columns={columns(
            handlePaymentStatusChange,
            handleAbsentStatusChange,
            updatingStudentId
          )}
          data={paidRecords}
          searchField="student"
        />
      </TabsContent>
      <TabsContent value="absent">
        <CanteenTable
          columns={columns(
            handlePaymentStatusChange,
            handleAbsentStatusChange,
            updatingStudentId
          )}
          data={absentRecords}
          searchField="student"
        />
      </TabsContent>
    </Tabs>
  );
}
