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
  class_id: string;
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
