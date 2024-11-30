import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchClasses,
  assignTeacherToClass,
  fetchClassByName,
  createClass,
  fetchStudents,
  createStudent,
  fetchRecords,
  createRecord,
  fetchTeachers,
  fetchTeacher,
  updateTeacher,
  createTeacher,
  updateClass,
  fetchStudent,
  updateStudent,
  updateUser,
  fetchRecordsAmount,
  updateRecordsAmount,
} from "@/services/api";
import { apiClient } from "../root";
import { useNavigate } from "react-router-dom";
/**
 * Query: Fetch records amount.
 */
export const useFetchRecordsAmount = () => {
  return useQuery(["recordsAmount"], fetchRecordsAmount, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch records amount.");
    },
  });
};
/**
 * Query: Fetch all teachers.
 */
export const useFetchTeachers = () => {
  return useQuery(["teachers"], fetchTeachers, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch teachers.");
    },
  });
};
/**
 * Query: Fetch teacher
 */
export const useFetchTeacher = (id: number) => {
  return useQuery(["teachers", id], () => fetchTeacher(id), {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch teacher.");
    },
  });
};
/**
 * Query: Fetch all classes.
 */
export const useFetchClasses = () => {
  return useQuery(["classes"], fetchClasses, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch classes.");
    },
  });
};
/**
 * Query: Fetch details of a class by name.
 */
export const useFetchClassById = (id: number) => {
  return useQuery(["classes", id], () => fetchClassByName(id), {
    enabled: !!id, // Ensure query runs only if id is provided
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch class details.");
    },
  });
};

/**
 * Query: Fetch all students.
 */
export const useFetchStudents = () => {
  return useQuery(["students"], fetchStudents, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch students.");
    },
  });
};
/**
 * Query: Fetch a student.
 */
export const useFetchStudent = (id: number) => {
  return useQuery(["teachers", id], () => fetchStudent(id), {
    onError: (error) => {
      console.log(error);
      toast.error("Failed to fetch student.");
    },
  });
};

/**
 * Query: Fetch all records.
 */
export const useFetchRecords = () => {
  return useQuery(["records"], fetchRecords, {
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch records.");
    },
  });
};

/**
 * Mutation: Update records amount..
 */
export const useUpdateRecordsAmount = () => {
  return useMutation((amount: number) => updateRecordsAmount(amount), {
    onSuccess: () => {
      toast.success("Records amount updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update records amount. Please try again.");
    },
  });
};

/**
 * Mutation: Update a user by calling upon updateUser function
 */
export const useUpdateUser = () => {
  return useMutation((data: FormUser) => updateUser(data), {
    onSuccess: () => {
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update user. Please try again.");
    },
    onSettled: (data) => {
      // Update the user in localStorage after updating
      const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...existingUser,
        user: {
          ...existingUser.user,
          email: data?.data.email,
          gender: data?.data.gender,
          name: data?.data.name,
          phone: data?.data.phone,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
  });
};

/**
 * Mutation: Create a teacher.
 */
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((data: Teacher) => createTeacher(data), {
    onSuccess: () => {
      toast.success("Teacher created successfully!");
      // Invalidate the query to refresh the table
      queryClient.invalidateQueries(["teachers"]);
      //Navigate to the teachers page after creating a teacher
      navigate("/admin/teachers");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create teacher. Please try again.");
    },
  });
};
/**
 * Mutation: Update a teacher.
 */
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((data: Teacher) => updateTeacher(data), {
    onSuccess: () => {
      toast.success("Teacher updated successfully!");
      // Invalidate the query to refresh the table
      queryClient.invalidateQueries(["teachers"]);
      //Navigate to the teachers page after updating a teacher
      navigate("/admin/teachers");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update teacher. Please try again.");
    },
  });
};
/**
 * Mutation: Assign a teacher to a class.
 */
export const useAssignTeacher = () => {
  return useMutation(
    ({
      className,
      teacherEmail,
    }: {
      className: string;
      teacherEmail: string;
    }) => assignTeacherToClass(className, teacherEmail),
    {
      onSuccess: () => {
        toast.success("Teacher assigned successfully!");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to assign teacher. Please try again.");
      },
    }
  );
};

/**
 * Mutation: Create a new class.
 */
export const useCreateClass = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    (data: { name: string; description: string; supervisorId: number }) =>
      createClass(data),
    {
      onSuccess: () => {
        toast.success("Class created successfully!");
        // Invalidate the query to refresh the table
        queryClient.invalidateQueries(["classes"]);
        //Navigate to the classes page after creating a class
        navigate("/admin/classes");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create class. Please try again.");
      },
    }
  );
};
/**
 * Mutation: Update a class.
 */
export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((data: Class) => updateClass(data), {
    onSuccess: () => {
      toast.success("Class updated successfully!");
      // Invalidate the query to refresh the table
      queryClient.invalidateQueries(["classes"]);
      //Navigate to the classes page after updating a class
      navigate("/admin/classes");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update class. Please try again.");
    },
  });
};

/**
 * Mutation: Create a new student.
 */
export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((data: Student) => createStudent(data), {
    onSuccess: () => {
      toast.success("Student created successfully!");
      // Invalidate the query to refresh the table
      queryClient.invalidateQueries(["students"]);
      //Navigate to the students page after creating a student
      navigate("/admin/students");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create student. Please try again.");
    },
  });
};
/**
 * Mutation: Update a student.
 */
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((data: Student) => updateStudent(data), {
    onSuccess: () => {
      toast.success("Student updated successfully!");
      // Invalidate the query to refresh the table
      queryClient.invalidateQueries(["students"]);
      //Navigate to the students page after updating a student
      navigate("/admin/students");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update student. Please try again.");
    },
  });
};

/**
 * Mutation: Create a new record.
 */
export const useCreateRecord = () => {
  return useMutation(
    (data: {
      amount: number;
      submiter_email: string;
      student_name: string;
      isPrepaid: boolean;
    }) => createRecord(data),
    {
      onSuccess: () => {
        toast.success("Record created successfully!");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to create record. Please try again.");
      },
    }
  );
};

/**
 * Delete a resource and handle errors.
 * @param resource - API endpoint for the resource (e.g., "teachers").
 */
export const useDeleteResource = (resource: string, queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string | number) => apiClient.delete(`/${resource}/${id}`),
    {
      onMutate: (id) => {
        toast(`Deleting ${resource} with ID ${id}...`);
      },
      onSuccess: () => {
        // Invalidate the query to refresh the table
        queryClient.invalidateQueries([queryKey]);
        toast.success(`${resource} deleted successfully!`);
      },
      onError: (error, id) => {
        console.error(error);
        toast.error(`Failed to delete ${resource} with ID ${id}.`);
      },
    }
  );
};
