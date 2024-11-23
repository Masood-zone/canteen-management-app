import { Outlet } from "react-router-dom";

export default function ManageStudents() {
  return (
    <section className="p-5">
      <Outlet />
    </section>
  );
}
