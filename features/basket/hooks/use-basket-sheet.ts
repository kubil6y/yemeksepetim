import { create } from "zustand";

interface BasketSheetState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useBasketSheet = create<BasketSheetState>()((set) => ({
    isOpen: false,
    open: () => set(() => ({ isOpen: true })),
    close: () => set(() => ({ isOpen: false })),
}));
