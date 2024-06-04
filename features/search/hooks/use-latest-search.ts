import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const MAX_SEARCH_RESULTS = 4;

//const dummy: SearchItem[] = [
//{ id: "1", term: "McDonald's"},
//{ id: "2", term: "Pizza"},
//]

type SearchItem = {
    id: string;
    term: string;
};

interface LatestSearchState {
    items: SearchItem[];
    addItem: (id: string, term: string) => void;
    removeItem: (id: string) => void;
    clearAll: () => void;
}

export const useLatestSearch = create<LatestSearchState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (id: string, term: string) =>
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.id === id
                    );
                    const copyItems = [...state.items];
                    if (existingItemIndex === -1) {
                        const newItem = { id, term };
                        if (state.items.length >= MAX_SEARCH_RESULTS) {
                            copyItems.pop(); // remove least recent
                        }
                        return {
                            ...state,
                            items: [newItem, ...copyItems],
                        };
                    } else {
                        const copyItem = { ...state.items[existingItemIndex]};
                        copyItems.splice(existingItemIndex, 1);
                        return {...state, items: [copyItem, ...copyItems]}
                    }
                }),
            removeItem: (id: string) =>
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.id === id
                    );
                    if (existingItemIndex === -1) {
                        return state;
                    }
                    const copyItems = [...state.items];
                    copyItems.splice(existingItemIndex, 1);
                    return state;
                }),
            clearAll: () =>
                set((state) => {
                    return { ...state, items: [] };
                }),
        }),
        {
            name: "latest_search_storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useGetLatestSearchTerms = () => {
    const terms = useLatestSearch((state) => state.items);
    return terms;
};
