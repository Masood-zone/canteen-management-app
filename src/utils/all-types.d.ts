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
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
    role: string;
    avatar?: string;
    gender: string;
    assigned_class?: {
      id: number;
      name: string;
      description: string;
      supervisorId: number;
    };
  };
}
interface FormUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: string;
  avatar?: string;
  gender: string;
}

type Student = {
  id: string | number;
  name: string;
  parentPhone: string;
  age: number;
  classId: string | number;
  gender: "male" | "female";
};

type RecordsAmount = {
  id: number;
  name: string;
  value: string;
};

type Teacher = {
  id?: number;
  name: string;
  phone: string;
  assigned_class?: {
    id: number;
    name: string;
  };
  role: string;
  email: string;
  gender: "male" | "female";
  password?: string;
};

type Class = {
  id: number;
  name: string;
  description: string;
  supervisorId: string | number;
  class_teacher?: {
    name: string;
  };
};

interface AuthStore {
  user: User | null | undefined;
  token: token | string | null;
  assigned_class: Class | null;
  isAuthenticated: boolean;
  login: (user) => void;
  logout: () => void;
  isLoading?: boolean;
  setLoading: () => void;
  setLoaded: () => void;
}

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

type CanteenRecord = {
  id: number;
  amount: number;
  submitedAt: string;
  submitedBy: number;
  payedBy: number | null;
  isPrepaid: boolean;
  hasPaid: boolean;
  classId: number;
  student: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;
};

type StudentRecord = {
  id?: number;
  amount?: number;
  payedBy: number | null;
  isPrepaid: boolean;
  hasPaid: boolean;
  submitedBy: number;
  classId: number;
  settingsAmount?: number;
  isAbsent: boolean;
};
