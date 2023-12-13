import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createLoginSlice, ILoginSlice } from './createLoginSlice';

interface IStore extends ILoginSlice {}

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createLoginSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
