import { create } from "zustand";


interface SearchState {
  search: string;
  changeSearch: (current: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  changeSearch: (current: string) => set({ search: current }),
}))
