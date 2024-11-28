import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  login: ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: !!token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
  setLoading: () => set({ isLoading: true }),
  setLoaded: () => set({ isLoading: false }),
}));
