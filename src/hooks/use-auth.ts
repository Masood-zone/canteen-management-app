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
      login({ user, token: user?.token });
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
