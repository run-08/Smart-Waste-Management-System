import { create } from "zustand";
const DayMonth = create((set) => ({
  day: Math.floor(Math.random() * 31),
  month: Math.floor(Math.random() * 12),
  display: "none",
  setDay: (day) =>
    set((state) => ({
      ...state,
      day: day,
    })),
  setMonth: (month) =>
    set((state) => ({
      ...state,
      month: month,
    })),
  setDisplay: (display) =>
    set((state) => ({
      ...state,
      display: display,
    })),
}));
export default DayMonth;
