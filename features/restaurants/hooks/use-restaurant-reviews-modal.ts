import { create } from "zustand";

interface RestaurantReviewsModalState {
    isOpen: boolean;
    restaurantId?: string;
    restaurantName?: string;
    restaurantImageSrc?: string;
    open: (restaurantId: string, restaurantName: string, restaurantImageSrc: string) => void;
    close: () => void;
}

export const useRestaurantReviewsModal = create<RestaurantReviewsModalState>()(
    (set) => ({
        isOpen: false,
        restaurantId: undefined,
        restaurantName: undefined,
        restaurantImageSrc: undefined,
        open: (restaurantId: string, restaurantName: string, restaurantImageSrc: string) =>
            set(() => ({
                isOpen: true,
                restaurantId,
                restaurantName,
                restaurantImageSrc,
            })),
        close: () =>
            set(() => ({
                isOpen: false,
                restaurantId: undefined,
                restaurantName: undefined,
                restaurantImageSrc: undefined,
            })),
    })
);
