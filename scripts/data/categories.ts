import { categories } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const categoriesData: (typeof categories.$inferSelect)[] = [
    {
        id: createId(),
        name: "Pizza",
        imageUrl: "pizza.webp",
    },
    {
        id: createId(),
        name: "Burger",
        imageUrl: "burger.webp",
    },
    {
        id: createId(),
        name: "Salad",
        imageUrl: "salad.webp",
    },
    {
        id: createId(),
        name: "Coffee",
        imageUrl: "coffee.webp",
    },
    {
        id: createId(),
        name: "Desert",
        imageUrl: "desert.webp",
    },
    {
        id: createId(),
        name: "Chicken",
        imageUrl: "chicken.webp",
    },
    {
        id: createId(),
        name: "Kebab",
        imageUrl: "kebab.webp",
    },
];
