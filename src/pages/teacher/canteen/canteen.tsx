"use client";

import { Button } from "@/components/ui/button";
import CanteenList from "./list/table";
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

export default function Canteen() {
  const navigate = useNavigate();
  const currentUser = {
    id: "90",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    role: "TEACHER",
    profileUrl: "",
    class: {
      id: "2012",
      name: "Class 5",
    },
  };

  return (
    <section className="container mx-auto py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Teacher info with assigned class */}
        <div>
          <h1 className="text-2xl font-bold">
            Hello, {currentUser?.firstName} {currentUser?.lastName}
          </h1>
          <p className="text-base">{currentUser?.class?.name}</p>
          <p className="text-base">
            Record canteen transactions for {currentUser?.class?.name}
          </p>
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
                  records for {currentUser?.class?.name} to the admin for
                  approval.
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
