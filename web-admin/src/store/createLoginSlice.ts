import { StateCreator } from 'zustand';

export interface ILoginSlice {
  isLoggedIn: boolean;
  user: any;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: any) => void;
}

export const createLoginSlice: StateCreator<ILoginSlice> = set => ({
  isLoggedIn: false,
  user: {},
  setIsLoggedIn: (isLoggedIn): void => {
    set({ isLoggedIn });
  },
  setUser: user => {
    set({ user });
  },
});
