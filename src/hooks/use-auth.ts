import { loginApi } from "@/services/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  const { login, setLoading, setLoaded } = useAuthStore();
  return useMutation(loginApi, {
    onMutate: () => setLoading(),
    onSuccess: (user) => {
      // Save user object in zustand
      login({ user, token: user?.token, assigned_class: user?.assigned_class });
      toast("Logged in successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast("Opps! Error", {
        description: "There was error loggin in!",
      });
    },
    onSettled: () => {
      setLoaded();
    },
  });
};

export const useLogout = () => {
  const { logout, setLoading, setLoaded } = useAuthStore();
  return useMutation(() => Promise.resolve(logout()), {
    onMutate: () => setLoading(),
    onSuccess: () => {
      toast("Logged out successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast("Opps! Error", {
        description: "There was error logging out!",
      });
    },
    onSettled: () => {
      // Do something after logout
      setLoaded();
    },
  });
};
