import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  assigned_class:
    (JSON.parse(localStorage.getItem("assigned_class") || "null") as Class) ||
    null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  login: ({ user, token, assigned_class }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("assigned_class", JSON.stringify(assigned_class));
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: !!token, assigned_class });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("assigned_class");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      assigned_class: null,
    });
  },
  setLoading: () => set({ isLoading: true }),
  setLoaded: () => set({ isLoading: false }),
}));
