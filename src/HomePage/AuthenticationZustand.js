import { create } from "zustand";

const Authentication = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (flag) =>
    set((state) => ({
      ...state,
      isAuthenticated: flag,
    })),
}));
export default Authentication;
