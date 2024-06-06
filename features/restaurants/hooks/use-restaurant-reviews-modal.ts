import { create } from "zustand";

interface RestaurantReviewsModalState {
    isOpen: boolean;
    restaurantId?: string;
    open: (restaurantId: string) => void;
    close: () => void;
}

export const useRestaurantReviewsModal = create<RestaurantReviewsModalState>()(
    (set) => ({
        isOpen: false,
        restaurantId: undefined,
        open: (restaurantId: string) =>
            set(() => ({
                isOpen: true,
                restaurantId,
            })),
        close: () =>
            set(() => ({
                isOpen: false,
                restaurantId: undefined,
            })),
    })
);
