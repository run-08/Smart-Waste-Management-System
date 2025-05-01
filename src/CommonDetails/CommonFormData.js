import { create } from "zustand";
const CommonFormData = create((set) => ({
  isDashboardPage: true,
  isCustomerPage: false,
  setDashboardPage: () =>
    set((state) => ({
      ...state,
      isDashboardPage: true,
      isCustomerPage: false,
    })),
  setCustomerPage: () =>
    set((state) => ({
      ...state,
      isDashboardPage: false,
      isCustomerPage: true,
    })),
}));
export default CommonFormData;
