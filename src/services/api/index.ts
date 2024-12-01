import { apiClient } from "../root";

/**
 * Fetch records amount.
 */
export const fetchRecordsAmount = async () => {
  try {
    const response = await apiClient.get("/settings/amount");
    return response.data;
  } catch (error) {
    console.error("Error fetching records amount:", error);
    throw error;
  }
};

/**
 * Update User
 */
export const updateUser = async (data: FormUser) => {
  try {
    const response = await apiClient.put(`/users/update/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

/**
 * Fetch all teachers.
 */
export const fetchTeachers = async () => {
  try {
    const response = await apiClient.get("/teachers");
    return response.data.teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};
/**
 * Fetch teacher
 */
export const fetchTeacher = async (id: number) => {
  try {
    const response = await apiClient.get(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};
/**
 * Create teacher
 */
export const createTeacher = async (data: Teacher) => {
  try {
    const response = await apiClient.post("/signup", data);
    return response.data;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};
/**
 * Update teacher
 */
export const updateTeacher = async (data: Teacher) => {
  try {
    const response = await apiClient.put(`/teachers/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
};
/**
 * Fetch all classes.
 */
export const fetchClasses = async () => {
  try {
    const response = await apiClient.get("/classes");
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

/**
 * Assign a teacher to a class.
 * @param className - Name of the class.
 * @param teacherEmail - Email of the teacher.
 */
export const assignTeacherToClass = async (
  className: string,
  teacherEmail: string
) => {
  try {
    const response = await apiClient.put(`/classes/${className}/assign`, {
      teacher_email: teacherEmail,
    });
    return response.data;
  } catch (error) {
    console.error("Error assigning teacher to class:", error);
    throw error;
  }
};
/**
 * Update class
 */
export const updateClass = async (data: Class) => {
  try {
    const response = await apiClient.put(`/classes/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

/**
 * Fetch details of a specific class by name.
 * @param className - Name of the class.
 */
export const fetchClassByName = async (id: number) => {
  try {
    const response = await apiClient.get(`/classes/${id}`);
    return response.data?.current_class;
  } catch (error) {
    console.error("Error fetching class by name:", error);
    throw error;
  }
};

/**
 * Create a new class.
 * @param data - Class creation data.
 */
export const createClass = async (data: {
  name: string;
  description: string;
  supervisorId: number;
}) => {
  try {
    const response = await apiClient.post("/classes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};

/**
 * Fetch all students.
 */
export const fetchStudents = async () => {
  try {
    const response = await apiClient.get("/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

/**
 * Fetch all students in a class.
 */
export const fetchStudentsInClass = async (id: number) => {
  try {
    const response = await apiClient.get(`/students/class/${id}`);
    return response.data.students;
  } catch (error) {
    console.error("Error fetching students in class:", error);
    throw error;
  }
};

/**
 * Fetch a student.
 */
export const fetchStudent = async (id: number) => {
  try {
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error;
  }
};
/**
 * Update a student.
 */
export const updateStudent = async (data: Student) => {
  try {
    const response = await apiClient.put(`/students/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

/**
 * Create a new student.
 * @param data - Student creation data.
 */
export const createStudent = async (data: Student) => {
  try {
    const response = await apiClient.post("/students", data);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

/**
 * Fetch all records of a class by date.
 */
export const fetchRecordsByClassAndDate = async (
  classId: number,
  date: string
) => {
  try {
    const response = await apiClient.get(`/records/${classId}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

/**
 * Submit a student record.
 */
export const submitStudentRecord = async (data: {
  amount: number;
  payedBy: number;
  hasPaid: boolean;
  submitedBy: number;
  classId: number;
}) => {
  try {
    const response = await apiClient.post("/records", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting student record:", error);
    throw error;
  }
};

/**
 * Get preset amount.
 */
export const getPresetAmount = async () => {
  try {
    const response = await apiClient.get("/preset-amount");
    return response.data;
  } catch (error) {
    console.error("Error fetching preset amount:", error);
    throw error;
  }
};

/**
 *  Update settings amount */
export const updateRecordsAmount = async (data: RecordsAmount) => {
  try {
    const response = await apiClient.put("/settings/amount", data);
    return response.data;
  } catch (error) {
    console.log("Error updating preset amount");
    throw error;
  }
};
