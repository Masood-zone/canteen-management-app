import TeachersData from "@/utils/mock/teachers-data.json";
import ClassData from "@/utils/mock/classes-data.json";
import StudentsData from "@/utils/mock/students-data.json";

export const teachersList = TeachersData;
export const classesList = ClassData;
export const studentsList = StudentsData;

export const canteenRecords = [
  {
    id: "rec1",
    student: {
      id: "stu1",
      firstName: "John",
      lastName: "Doe",
    },
    teacher: {
      id: "tch1",
      firstName: "Emma",
      lastName: "Smith",
    },
    date: new Date("2024-11-01T09:00:00Z"),
    amount: 15.0,
  },
  {
    id: "rec2",
    student: {
      id: "stu2",
      firstName: "Jane",
      lastName: "Doe",
    },
    teacher: {
      id: "tch2",
      firstName: "Michael",
      lastName: "Johnson",
    },
    date: new Date("2024-11-01T10:00:00Z"),
    amount: 12.5,
  },
  {
    id: "rec3",
    student: {
      id: "stu3",
      firstName: "Alice",
      lastName: "Williams",
    },
    teacher: {
      id: "tch3",
      firstName: "Olivia",
      lastName: "Brown",
    },
    date: new Date("2024-11-02T09:15:00Z"),
    amount: 20.0,
  },
  {
    id: "rec4",
    student: {
      id: "stu4",
      firstName: "Charlie",
      lastName: "Taylor",
    },
    teacher: {
      id: "tch1",
      firstName: "Emma",
      lastName: "Smith",
    },
    date: new Date("2024-11-02T09:30:00Z"),
    amount: 18.75,
  },
  {
    id: "rec5",
    student: {
      id: "stu5",
      firstName: "Sophia",
      lastName: "Miller",
    },
    teacher: {
      id: "tch2",
      firstName: "Michael",
      lastName: "Johnson",
    },
    date: new Date("2024-11-02T10:00:00Z"),
    amount: 25.0,
  },
  {
    id: "rec6",
    student: {
      id: "stu6",
      firstName: "Liam",
      lastName: "Davis",
    },
    teacher: {
      id: "tch3",
      firstName: "Olivia",
      lastName: "Brown",
    },
    date: new Date("2024-11-03T09:00:00Z"),
    amount: 10.0,
  },
  {
    id: "rec7",
    student: {
      id: "stu7",
      firstName: "Noah",
      lastName: "Wilson",
    },
    teacher: {
      id: "tch1",
      firstName: "Emma",
      lastName: "Smith",
    },
    date: new Date("2024-11-03T09:30:00Z"),
    amount: 8.5,
  },
  {
    id: "rec8",
    student: {
      id: "stu8",
      firstName: "Isabella",
      lastName: "Moore",
    },
    teacher: {
      id: "tch2",
      firstName: "Michael",
      lastName: "Johnson",
    },
    date: new Date("2024-11-03T10:00:00Z"),
    amount: 14.25,
  },
  {
    id: "rec9",
    student: {
      id: "stu9",
      firstName: "Lucas",
      lastName: "Anderson",
    },
    teacher: {
      id: "tch3",
      firstName: "Olivia",
      lastName: "Brown",
    },
    date: new Date("2024-11-04T09:15:00Z"),
    amount: 11.5,
  },
  {
    id: "rec10",
    student: {
      id: "stu10",
      firstName: "Mia",
      lastName: "Thomas",
    },
    teacher: {
      id: "tch1",
      firstName: "Emma",
      lastName: "Smith",
    },
    date: new Date("2024-11-04T09:30:00Z"),
    amount: 16.0,
  },
];
