import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CanteenList from "./list/table";

export default function Canteen() {
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
    <section className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Teacher info with assigned class */}
        <div className="">
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
          <Link to="/teacher/canteen/add">
            <Button>Record canteen</Button>
          </Link>
        </div>
      </div>
      {/* Canteen table */}
      <CanteenList />
    </section>
  );
}
