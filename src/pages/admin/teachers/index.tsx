import { Outlet } from "react-router-dom";

export default function TeachersLayout() {
  return (
    <section className="p-5">
      <Outlet />
    </section>
  );
}
