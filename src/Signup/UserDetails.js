import { create } from "zustand";
const userDetails = create((set) => ({
  isAuthorized: false,
  isSignUpPage: true,
  isLoginPage: false,
  isPublicUser: true,
  isInvestor: false,
  isMunicipalities: false,
  setIsPublicUser: () =>
    set((state) => ({
      ...state,
      isPublicUser: true,
      isMunicipalities: false,
      isInvestor: false,
    })),
  setIsMunicipalities: () =>
    set((state) => ({
      ...state,
      isMunicipalities: true,
      isPublicUser: false,
      isInvestor: false,
    })),
  setIsInvestor: () =>
    set((state) => ({
      ...state,
      isInvestor: true,
      isMunicipalities: false,
      isPublicUser: false,
    })),
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
