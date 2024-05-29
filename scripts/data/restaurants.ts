import { restaurants } from "@/db/schema";

export const restaurantsData: (typeof restaurants.$inferSelect)[] = [
    {
        id: "r1",
        name: "McDonald's",
        imageUrl: "mcdonalds.webp",
        isPopular: true,
    },
    {
        id: "r2",
        name: "Little Caesars Pizza",
        imageUrl: "little_caesars.webp",
        isPopular: true,
    },
    {
        id: "r3",
        name: "Starbucks Coffee",
        imageUrl: "starbucks.webp",
        isPopular: true,
    },
    {
        id: "r4",
        name: "Pasaport Pizza",
        imageUrl: "pasaport_pizza.webp",
        isPopular: true,
    },
    {
        id: "r5",
        name: "Burger King",
        imageUrl: "burger_king.webp",
        isPopular: true,
    },
    {
        id: "r6",
        name: "Popeyes",
        imageUrl: "popeyes.webp",
        isPopular: true,
    },
];
