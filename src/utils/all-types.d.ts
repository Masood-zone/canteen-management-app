// Test types
interface LoginFormProps {
  email: string;
  password: string;
}

interface ForgotPasswordFormProps {
  email: string;
}

interface ResetPasswordFormProps {
  password: string;
  confirmPassword: string;
}

type Teacher = {
  teacher_id: number;
  first_name: string;
  last_name: string;
  assigned_class: string;
  teacher_status: string;
};

type Class = {
  class_id: string | number;
  class_name: string;
  class_teacher: string;
};

type Student = {
  id: string | number;
  first_name: string;
  last_name: string;
  class: string;
  student_status: string;
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileUrl: string;
  class?: {
    id: string;
    name: string;
  };
  password?: string;
}

type CanteenRecord = {
  id: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
  };
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
  date: Date;
  amount: number;
  paid: boolean;
  absent: boolean;
};

// Real-time types
interface User {
  role: string;
}
interface AuthStore {
  user: User | null | undefined;
  isAuthenticated: boolean;
  login: (user) => void;
  isLoading?: boolean;
  setLoading: () => void;
  setLoaded: () => void;
}
interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}
