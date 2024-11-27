import { loginApi } from "@/services/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const { login, setLoading, setLoaded } = useAuthStore();
  const navigate = useNavigate();

  return useMutation(loginApi, {
    onMutate: () => setLoading(),
    onSuccess: (user) => {
      // Save user object in zustand
      login(user);
      // Redirect based on role
      if (user.role === "SUPER_ADMIN") {
        navigate("/admin");
      } else if (user.role === "TEACHER") {
        navigate("/teacher");
      } else {
        navigate("/");
      }
      // Toast a message to the user
      // toast(`Welcome, ${user}`)
    },
    onError: (error) => {
      console.log(error);
      toast("Opps! Error", {
        description: "There was error loggin in!",
      });
    },
    onSettled: () => setLoaded(),
  });
};
