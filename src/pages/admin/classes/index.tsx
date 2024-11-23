import { Outlet } from "react-router-dom";

export default function ClassesLayout() {
  return (
    <section className="p-5">
      <Outlet />
    </section>
  );
}
