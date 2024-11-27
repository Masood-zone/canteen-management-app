import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  isAuthenticated: !!localStorage.getItem("user"),
  isLoading: false,
  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isAuthenticated: true, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
  setLoading: () => set({ isLoading: true }),
  setLoaded: () => set({ isLoading: false }),
}));
