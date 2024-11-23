import ErrorBoundary from "@/components/error/error-boundary.tsx";
import Error from "@/components/error/error.tsx";
import BaseLayout from "@/components/layout";
import AdminLayout from "@/components/layout/admin-layout.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import TeacherLayout from "../components/layout/teacher-layout";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Base Layout */}
      <Route
        path="/"
        element={
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <Error error={error} reset={reset} />
            )}
          >
            <BaseLayout />
          </ErrorBoundary>
        }
      >
        {/* Login */}
        <Route
          index
          lazy={async () => {
            const { default: Login } = await import("../pages/auth/login");
            return { Component: Login };
          }}
        />
        {/* Forgot password */}
        <Route
          path="forgot-password"
          lazy={async () => {
            const { default: ForgotPassword } = await import(
              "../pages/auth/forgot-password.tsx"
            );
            return { Component: ForgotPassword };
          }}
        />
        {/* Reset Password*/}
        <Route
          path="reset-password"
          lazy={async () => {
            const { default: ResetPassword } = await import(
              "../pages/auth/reset-password.tsx"
            );
            return { Component: ResetPassword };
          }}
        />
        {/* Contact Us */}
        <Route
          path="contact-us"
          lazy={async () => {
            const { default: ContactUs } = await import(
              "../pages/auth/help/contact-us.tsx"
            );
            return { Component: ContactUs };
          }}
        />
        {/* Terms and Conditions */}
        <Route
          path="terms-and-conditions"
          lazy={async () => {
            const { default: TermsAndConditions } = await import(
              "../pages/auth/help/terms-and-conditions.tsx"
            );
            return { Component: TermsAndConditions };
          }}
        />
        <Route
          path="*"
          lazy={async () => {
            const { default: NotFound } = await import(
              "../pages/not-found/not-found.tsx"
            );
            return { Component: NotFound };
          }}
        />
      </Route>

      {/* Admin Dashboard */}
      <Route
        path="admin"
        element={
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <Error error={error} reset={reset} />
            )}
          >
            <AdminLayout />
          </ErrorBoundary>
        }
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
        {/* Not found */}
        <Route
          path="*"
          lazy={async () => {
            const { default: NotFound } = await import(
              "../pages/not-found/not-found.tsx"
            );
            return { Component: NotFound };
          }}
        />
      </Route>

      {/* Teacher Dashboard */}
      <Route
        path="teacher"
        element={
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <Error error={error} reset={reset} />
            )}
          >
            <TeacherLayout />
          </ErrorBoundary>
        }
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
        <Route
          path="*"
          lazy={async () => {
            const { default: NotFound } = await import(
              "../pages/not-found/not-found.tsx"
            );
            return { Component: NotFound };
          }}
        />
      </Route>
    </>
  )
);

export default rootRoutes;
