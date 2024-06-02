// https://docs.pmnd.rs/zustand/integrations/persisting-store-data
import { foods } from "@/db/schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Food = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    restaurantName: string;
}

export type BasketItem = {
    id: string; // itemId should be foodId
    amount: number;
    item: typeof foods.$inferSelect;
};

interface BasketState {
    items: BasketItem[];
    addItem: (item: typeof foods.$inferSelect, amount?: number) => void;
    removeItem: (itemId: string, amount: number) => void;
    deleteItem: (itemId: string) => void;
    clearItems: () => void;
}

export const useBasket = create<BasketState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item: typeof foods.$inferSelect, amount: number = 1) =>
                set((state) => {
                    const basketItem = { id: item.id, item, amount };
                    if (basketItem.amount <= 0) {
                        console.log("are you adding item?");
                        return state;
                    }
                    const existingItemIndex = state.items.findIndex((item) => {
                        return item.id === basketItem.id;
                    });
                    if (existingItemIndex === -1) {
                        const copyItems = [...state.items, basketItem];
                        return { ...state, items: copyItems };
                    } else {
                        const copyItems = [...state.items];
                        const copyItem = copyItems[existingItemIndex];
                        copyItem.amount += basketItem.amount;
                        return { ...state, items: copyItems };
                    }
                }),
            removeItem: (itemId: string, amount: number) =>
                set((state) => {
                    if (amount >= 0) {
                        console.log("are you removing item?");
                        return state;
                    }
                    const existingItemIndex = state.items.findIndex((item) => {
                        return item.id === itemId;
                    });
                    if (existingItemIndex === -1) {
                        return state;
                    }
                    const copyItems = [...state.items];
                    const copyItem = copyItems[existingItemIndex];
                    copyItem.amount -= amount;
                    if (copyItem.amount <= 0) {
                        copyItems.splice(existingItemIndex, 1);
                    }
                    return { ...state, items: copyItems };
                }),
            deleteItem: (itemId: string) =>
                set((state) => {
                    const existingItemIndex = state.items.findIndex((item) => {
                        return item.id === itemId;
                    });
                    if (existingItemIndex === -1) {
                        return state;
                    }
                    const copyItems = [...state.items];
                    copyItems.splice(existingItemIndex, 1);
                    return { ...state, items: copyItems };
                }),
            clearItems: () =>
                set((state) => {
                    return { ...state, items: [] };
                }),
        }),
        {
            name: "basket_storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
