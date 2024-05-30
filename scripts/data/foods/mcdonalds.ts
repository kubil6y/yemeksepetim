import { foods } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const foodsMcdonalds: (typeof foods.$inferSelect)[] = [
    {
        id: createId(),
        name: "Big Mac™ Menu",
        description: "Big Mac™ + Potato Chips (Medium) + Coca-Cola",
        imageUrl: "foods/mcdonalds/big_mac.jpg",
        price: 255,
        restaurantId: "r1",
        categoryId: "c2",
    },

    {
        id: createId(),
        name: "Potato Chips",
        description: "Super size",
        imageUrl: "foods/mcdonalds/patates.jpg",
        price: 75,
        restaurantId: "r1",
        categoryId: "c2",
    },

    {
        id: createId(),
        name: "Double Cheeseburger Menu",
        description: "Big Mac™ + Potato Chips (Medium) + Coca-Cola",
        imageUrl: "foods/mcdonalds/double_cheese_burger.jpg",
        price: 245,
        restaurantId: "r1",
        categoryId: "c2",
    },

    {
        id: createId(),
        name: "2x Big Mac™ Menu",
        description: "2x Big Mac™ + Potato Chips (Medium) + Coca-Cola (1 L.)",
        imageUrl: "foods/mcdonalds/ikili_big_mac.jpg",
        price: 470,
        restaurantId: "r1",
        categoryId: "c2",
    },

    {
        id: createId(),
        name: "Double Quarter Pounder Menu",
        description:
            "Double Quarter Pounder + Potato Chips (Medium) + Coca-Cola",
        imageUrl: "foods/mcdonalds/double_quarter.jpg",
        price: 310,
        restaurantId: "r1",
        categoryId: "c2",
    },

    {
        id: createId(),
        name: "McChicken™ Menu",
        description: "McChicken + Potato Chips (Medium) + Coca-Cola",
        imageUrl: "foods/mcdonalds/big_mac.jpg",
        price: 215,
        restaurantId: "r1",
        categoryId: "c2",
    },
];