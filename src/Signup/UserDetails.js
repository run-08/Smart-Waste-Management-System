import { create } from "zustand";
const userDetails = create((set) => ({
  isAuthorized: false,
  isSignUpPage: true,
  isLoginPage: false,
  setIsAuthorized: (flagAuthorization) =>
    set((state) => ({
      ...state,
      isAuthorized: flagAuthorization === true,
    })),
  setIsLoginPage: () =>
    set((state) => ({
      ...state,
      isLoginPage: true,
      isSignUpPage: false,
    })),
  setIsSignUpPage: () =>
    set((state) => ({
      ...state,
      isSignUpPage: true,
      isLoginPage: false,
    })),
  setIsAuthorized: (flag) =>
    set((state) => ({
      ...state,
      isAuthorized: flag,
    })),
}));
export default userDetails;
