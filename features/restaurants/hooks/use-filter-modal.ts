// https://docs.pmnd.rs/zustand/guides/updating-state
import { create } from "zustand";

interface FilterModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useFilterModal = create<FilterModalState>()((set) => ({
    isOpen: false,
    open: () => set(() => ({ isOpen: true })),
    close: () => set(() => ({ isOpen: false })),
}));
