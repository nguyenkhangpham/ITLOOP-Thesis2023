import endpoint from "services/network/endpoint";
import { callAPI } from "utils/callAPIHelper";
import { StateCreator } from "zustand";

export interface IMedicineSlice {
  medicines: any[];
  getMedicines: () => void;
  clearMedicines: () => void;
}

export const createMedicineSlice: StateCreator<IMedicineSlice> = (set) => ({
  medicines: [],
  getMedicines: () => {
    callAPI({
      API: endpoint.getMedicines,
      onSuccess: (res) => set({ medicines: res.data }),
    });
  },
  clearMedicines: () => {
    set({ medicines: [] });
  },
});
