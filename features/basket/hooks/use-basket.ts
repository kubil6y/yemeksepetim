// https://docs.pmnd.rs/zustand/integrations/persisting-store-data
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FoodItem = {
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
    item: FoodItem;
};

interface BasketState {
    items: BasketItem[];
    addItem: (item: FoodItem, amount?: number) => void;
    removeItem: (itemId: string, amount?: number) => void;
    deleteItem: (itemId: string) => void;
    clearAll: () => void;
}

export const useBasket = create<BasketState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item: FoodItem, amount: number = 1) =>
                set((state) => {
                    const basketItem = { id: item.id, item, amount };
                    if (basketItem.amount <= 0) {
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
                        copyItem.amount += amount;
                        return { ...state, items: copyItems };
                    }
                }),
            removeItem: (itemId: string, amount: number = -1) =>
                set((state) => {
                    if (amount >= 0) {
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
                    copyItem.amount += amount;
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
            clearAll: () =>
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

export const useBasketItemCount = () =>{
    const basketItemCount = useBasket((state) => state.items.length);
    return basketItemCount;
}

export const useBasketTotal = () => {
    const total: number = useBasket((state) => {
        let sum = 0;
        for (const basketItem of state.items) {
            sum += (basketItem.amount) * basketItem.item.price;
        }
        return sum;
    })
    return total;
}

export const useBasketItemTotal = (id: string) => {
    const total: number = useBasket((state) => {
        const basketItem = state.items.find((item => item.id === id));
        if (!basketItem) {
            return 0;
        } 
        const sum: number = basketItem.amount * basketItem.item.price;
        return sum;
    })
    return total;
}
