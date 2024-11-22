import Layout from "../components/layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Authentication */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          lazy={async () => {
            const { default: Login } = await import("../pages/auth/login");
            return { Component: Login };
          }}
        />
      </Route>

      {/* Admin Dashboard */}
      <Route
        path="admin"
        lazy={async () => {
          const { default: AdminLayout } = await import(
            "../components/layout/admin-layout"
          );
          return { Component: AdminLayout };
        }}
      >
        <Route
          index
          lazy={async () => {
            const { default: AdminHome } = await import("../pages/admin/home");
            return { Component: AdminHome };
          }}
        />
        <Route
          path="teachers"
          lazy={async () => {
            const { default: Teachers } = await import(
              "../pages/admin/teachers"
            );
            return { Component: Teachers };
          }}
        />
        <Route
          path="students"
          lazy={async () => {
            const { default: Students } = await import(
              "../pages/admin/students"
            );
            return { Component: Students };
          }}
        />
        <Route
          path="classes"
          lazy={async () => {
            const { default: Classes } = await import("../pages/admin/classes");
            return { Component: Classes };
          }}
        />
        <Route
          path="canteen-records"
          lazy={async () => {
            const { default: CanteenRecords } = await import(
              "../pages/admin/canteen"
            );
            return { Component: CanteenRecords };
          }}
        />
      </Route>

      {/* Teacher Dashboard */}
      <Route
        path="teacher"
        lazy={async () => {
          const { default: TeacherLayout } = await import(
            "../components/layout/teacher-layout"
          );
          return { Component: TeacherLayout };
        }}
      >
        <Route
          index
          lazy={async () => {
            const { default: TeacherHome } = await import(
              "../pages/teacher/home"
            );
            return { Component: TeacherHome };
          }}
        />
        <Route
          path="canteen"
          lazy={async () => {
            const { default: Canteen } = await import(
              "../pages/teacher/canteen"
            );
            return { Component: Canteen };
          }}
        />
        <Route
          path="students"
          lazy={async () => {
            const { default: ManageStudents } = await import(
              "../pages/teacher/students"
            );
            return { Component: ManageStudents };
          }}
        />
      </Route>
    </>
  )
);

export default rootRoutes;
