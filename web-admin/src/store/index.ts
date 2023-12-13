import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createLoginSlice, ILoginSlice } from "./createLoginSlice";
import { createMedicineSlice, IMedicineSlice } from "./createMedicineSlice";

interface IStore extends ILoginSlice, IMedicineSlice {}

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createLoginSlice(set, get, api),
      ...createMedicineSlice(set, get, api),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => window.localStorage),
    }
  )
);
