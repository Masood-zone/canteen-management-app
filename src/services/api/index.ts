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
 * Fetch class by id.
 */
export const fetchClass = async (id: number) => {
  try {
    const response = await apiClient.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching class:", error);
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
    return response.data;
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
 * Fetch all records of unpaid students.
 */
export const unpaidStudentRecordsByClassAndDate = async (
  classId: number,
  date: string
) => {
  try {
    const response = await apiClient.get(
      `/records/${classId}/unpaid?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching unpaid records:", error);
    throw error;
  }
};

/**
 * Fetch all records of paid students.
 */
export const paidStudentRecordsByClassAndDate = async (
  classId: number,
  date: string
) => {
  try {
    const response = await apiClient.get(
      `/records/${classId}/paid?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching paid records:", error);
    throw error;
  }
};

/**
 * Fetch all records of absent students.
 */
export const absentStudentRecordsByClassAndDate = async (
  classId: number,
  date: string
) => {
  try {
    const response = await apiClient.get(
      `/records/${classId}/absent?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching absent records:", error);
    throw error;
  }
};

/**
 * Update student status
 * PUT /records/:id/status
 * Body: {
  "hasPaid": true,
  "isAbsent": false
}
 */
export const updateStudentStatus = async (data: StudentRecord) => {
  try {
    const response = await apiClient.put(`/records/${data?.id}/status`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating student status:", error);
    throw error;
  }
};

/**
 * Generate daily records for a class.
 */
export const generateDailyRecordsForAClass = async (classId: number) => {
  try {
    const response = await apiClient.get(`/records/generate-daily/${classId}`);
    return response.data;
  } catch (error) {
    console.error("Error generating daily records:", error);
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

// Analytics
// Fetch teacher analytics
export const fetchTeacherAnalytics = async (classId: number) => {
  try {
    const response = await apiClient.get(`/analytics/teachers/${classId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher analytics:", error);
    throw error;
  }
};
