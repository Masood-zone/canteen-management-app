"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import CanteenList from "./list/table";

export default function Canteen() {
  const navigate = useNavigate();
  const { user, assigned_class } = useAuthStore();
  const teacher = user?.user;

  return (
    <section className="container mx-auto py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Teacher info with assigned class */}
        <div>
          <h1 className="text-2xl font-bold">Hello, {teacher?.name}</h1>
          <p className="text-xl py-2">{assigned_class?.name}</p>
          <p className="text-base">Record canteen for {assigned_class?.name}</p>
        </div>
        {/* Record canteen button */}
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Submit canteen records</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will submit the canteen
                  records for {teacher?.name} to the admin for approval.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => navigate("/teacher/canteen/submit")}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {/* Canteen tables */}
      <CanteenList />
    </section>
  );
}
