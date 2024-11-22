import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to Canteen Management System! These terms and conditions outline
        the rules and regulations for the use of Canteen Management System,
        developed and maintained by Gree Software Solutions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing this application, you agree to be bound by these terms and
        conditions. If you disagree with any part of these terms, please refrain
        from using the application.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use License</h2>
      <p className="mb-4">
        Permission is granted to temporarily use the materials on Canteen
        Management System&apos;s website and app for personal, non-commercial
        use only. You may not:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Modify or copy the materials.</li>
        <li>Use the materials for any commercial purpose.</li>
        <li>
          Attempt to reverse engineer any software contained on the application.
        </li>
        <li>
          Transfer the materials to another person or &quot;mirror&quot; the
          materials on any other server.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        3. Limitation of Liability
      </h2>
      <p className="mb-4">
        Gree Software Solutions will not be held accountable for any damages
        that arise due to the use or inability to use the materials on Canteen
        Management System, even if we or an authorized representative has been
        notified of the possibility of such damages.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        4. Accuracy of Information
      </h2>
      <p className="mb-4">
        The materials appearing on Canteen Management System could include
        technical, typographical, or photographic errors. Gree Software
        Solutions does not guarantee that any of the materials are accurate,
        complete, or current. We may make changes to the materials at any time
        without notice.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">5. Modifications</h2>
      <p className="mb-4">
        Gree Software Solutions may revise these terms and conditions for its
        application at any time without notice. By using this application, you
        are agreeing to be bound by the then-current version of these terms and
        conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">6. Governing Law</h2>
      <p className="mb-4">
        Any claim related to Canteen Management System shall be governed by the
        laws of our jurisdiction without regard to its conflict of law
        provisions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms, please contact us at:
      </p>
      <p className="mb-4">
        <strong>Gree Software Solutions</strong>
        <br />
        Email:{" "}
        <Link
          to="mailto:greesoftwareacademycontact@gmail.com"
          className="hover:text-primary hover:underline"
          target="_blank"
        >
          greesoftwareacademycontact@gmail.com
        </Link>
        <br />
        Phone:
        <Link
          to="tel:+233597812947"
          className="hover:text-primary hover:underline"
        >
          +233 (59)781-2947
        </Link>
      </p>

      <p className="text-sm text-gray-500 mt-10">
        Last updated:
        <time dateTime="2022-02-22"> 8th September 2024</time>
      </p>
    </div>
  );
}
