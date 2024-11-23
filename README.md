# **Canteen Management App**

This project is a **React** application powered by **TypeScript** and **Vite**, designed to provide a robust management system for school canteens. The app features an **Admin Dashboard**, **Teacher Dashboard**, and **Authentication** functionalities.

## **Tech Stack**

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn/UI
- **State Management**: Zustand, Redux Query
- **Routing**: React Router
- **Build Tool**: Vite

---

## **Features Overview**

### **Authentication**

- Responsive Navbar for authentication-related pages.
- Features include:
  - **Login**
  - **Forgot Password**
  - **Reset Password**
  - **Contact Us**
  - **Terms and Conditions**
- Route protection for authenticated users based on roles.

### **Admin Dashboard**

- Responsive sidebar with route outlets.
- CRUD operations for:
  - **Users**: Teachers are categorized under Users.
  - **Students** and **Classes**: Assign students to classes and classes to teachers.
  - **Canteen Records**: Manage records for meal payments and dues.
- **Table Component** with:
  - Search functionality
  - Header filters
  - Pagination
- Modal dialogs for delete actions.
- View, edit, and delete capabilities for all records.

### **Teacher Dashboard**

- Navbar displaying the **current date, time, and day**.
- Create **canteen records** for assigned classes:
  - Only show **unpaid students** while creating records.
- Manage and review records before submission to the admin.
- **Table Component** for displaying canteen records.

---

## **Second Week Features (Analytics)**

### **Admin Analytics**

- Dashboard showing:
  - Overview of **students, classes, teachers**, and approved canteen records.
  - Charts depicting:
    - Total payments during the week.
    - Monthly and yearly payment trends.
- Comprehensive records view:
  - Payments by teachers during the week and day.
  - Every submitted and approved canteen record.

### **Teacher Analytics**

- Dashboard showing:
  - Total students.
  - Students who have paid or not during the day.
  - Canteen record status for the day.
  - Payment trends for students during the week.

---

## **Folder Structure**

The project uses a modular folder structure to maintain scalability and readability:

src/
├── components/ // Shared reusable components
├── layouts/ // Dashboard and authentication layouts
├── pages/ // React Router pages
├── routes/ // Application routes
├── store/ // Zustand and Redux Query configurations
├── services/ // API handlers using Redux Query
├── utils/ // Helper functions and utilities
├── App.js // Main app entry
├── index.js // React DOM rendering
└── styles/ // TailwindCSS configuration

---

## **Development Setup**

### **Prerequisites**

- Node.js v16+ and npm v7+
- Code editor (e.g., VSCode)

### **Install Dependencies**

Clone the repository and install dependencies:

````bash
npm install

### **Run the Application**
Start the development server:

```bash
npm run dev

### **Build for Production**
Create a production build:

```bash
Copy code
npm run build


Below is the content in Markdown (.md or .mdx) format, ready to be used as your README.md file:

mdx
Copy code
# **Canteen Management App**

This project is a **React** application powered by **TypeScript** and **Vite**, designed to provide a robust management system for school canteens. The app features an **Admin Dashboard**, **Teacher Dashboard**, and **Authentication** functionalities.

# **Tech Stack**
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn/UI
- **State Management**: Zustand, Redux Query
- **Routing**: React Router
- **Build Tool**: Vite

---

# **Features Overview**

### **Authentication**
- Responsive Navbar for authentication-related pages.
- Features include:
  - **Login**
  - **Forgot Password**
  - **Reset Password**
  - **Contact Us**
  - **Terms and Conditions**
- Route protection for authenticated users based on roles.

### **Admin Dashboard**
- Responsive sidebar with route outlets.
- CRUD operations for:
  - **Users**: Teachers are categorized under Users.
  - **Students** and **Classes**: Assign students to classes and classes to teachers.
  - **Canteen Records**: Manage records for meal payments and dues.
- **Table Component** with:
  - Search functionality
  - Header filters
  - Pagination
- Modal dialogs for delete actions.
- View, edit, and delete capabilities for all records.

### **Teacher Dashboard**
- Navbar displaying the **current date, time, and day**.
- Create **canteen records** for assigned classes:
  - Only show **unpaid students** while creating records.
- Manage and review records before submission to the admin.
- **Table Component** for displaying canteen records.

---

## **Second Week Features (Analytics)**

### **Admin Analytics**
- Dashboard showing:
  - Overview of **students, classes, teachers**, and approved canteen records.
  - Charts depicting:
    - Total payments during the week.
    - Monthly and yearly payment trends.
- Comprehensive records view:
  - Payments by teachers during the week and day.
  - Every submitted and approved canteen record.

### **Teacher Analytics**
- Dashboard showing:
  - Total students.
  - Students who have paid or not during the day.
  - Canteen record status for the day.
  - Payment trends for students during the week.

---

## **Folder Structure**

The project uses a modular folder structure to maintain scalability and readability:

src/ ├── components/ // Shared reusable components ├── layouts/ // Dashboard and authentication layouts ├── pages/ // React Router pages ├── routes/ // Application routes ├── store/ // Zustand and Redux Query configurations ├── services/ // API handlers using Redux Query ├── utils/ // Helper functions and utilities ├── App.js // Main app entry ├── index.js // React DOM rendering └── styles/ // TailwindCSS configuration

yaml
Copy code

---

## Development Setup

### **Prerequisites**
- Node.js v16+ and npm v7+
- Code editor (e.g., VSCode)

### **Install Dependencies**
Clone the repository and install dependencies:
```bash
npm install

### How to Use

- Save this content in your `README.md` file at the root of your project directory.
- Customize sections like **Contributing**, **License**, or any additional details specific to your project.
- Optionally, add screenshots, logos, or badges at the top of the file for a professional look. Let me know if you’d like help with this!
````
