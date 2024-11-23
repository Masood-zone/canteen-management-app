import { Outlet } from "react-router-dom";

export default function StudentsLayout() {
  return (
    <section className="p-5">
      <Outlet />
    </section>
  );
}
