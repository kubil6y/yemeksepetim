import { createId } from "@paralleldrive/cuid2";
import { restaurants } from "@/db/schema";

export const restaurantsData: (typeof restaurants.$inferSelect)[] = [
    {
        id: createId(),
        name: "McDonald's",
        imageUrl: "mcdonalds.webp",
        isPopular: true,
    },
    {
        id: createId(),
        name: "Little Caesars Pizza",
        imageUrl: "little_caesars.webp",
        isPopular: true,
    },
    {
        id: createId(),
        name: "Starbucks Coffee",
        imageUrl: "starbucks.webp",
        isPopular: true,
    },
    {
        id: createId(),
        name: "Pasaport Pizza",
        imageUrl: "pasaport_pizza.webp",
        isPopular: true,
    },
    {
        id: createId(),
        name: "Burger King",
        imageUrl: "burger_king.webp",
        isPopular: true,
    },
    {
        id: createId(),
        name: "Popeyes",
        imageUrl: "popeyes.webp",
        isPopular: true,
    },
];
