import { create } from "zustand";

interface RestaurantCommentsModalState {
    isOpen: boolean;
    restaurantId: string;
    open: (restaurantId: string) => void;
    close: () => void;
}

export const useRestaurantCommentsModal =
    create<RestaurantCommentsModalState>()((set) => ({
        isOpen: false,
        restaurantId: "",
        open: (restaurantId: string) =>
            set(() => ({ isOpen: true, restaurantId })),
        close: () => set(() => ({ isOpen: false, restaurantId: undefined })),
    }));
