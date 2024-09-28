import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import { DateType, FilterTypes, SalesType } from "../types/types.ts";

interface FiltersState extends FilterTypes {
  changeDate: (current: DateType) => void;
  changeSaleType: (current: SalesType[]) => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      date: DateType.DAY,
      salesType: [SalesType.TERMINAL, SalesType.PAYMENT_LINK],
      changeDate: (current: DateType) => set({ date: current }),
      changeSaleType: (current: SalesType[]) => set({ salesType: current }),
    }),
    {
      name: "filters-storage",
      storage: createJSONStorage(() => sessionStorage), // Cambiar a sessionStorage en vez de localStorage
    }
  )
);
