import { create } from "zustand";
const userDetails = create((set) => ({
  name: null,
  password: null,
  email: null,
  setName: (name) =>
    set((state) => ({
      ...state,
      name: name,
    })),
  setPassword: (password) =>
    set((state) => ({
      ...state,
      password: password,
    })),
  setEmail: (email) =>
    set((state) => ({
      ...state,
      email: email,
    })),
}));
export default userDetails;
