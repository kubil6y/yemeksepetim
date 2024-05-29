import { categories } from "@/db/schema";

export const categoriesData: (typeof categories.$inferSelect)[] = [
    {
        id: "c1",
        name: "Pizza",
        imageUrl: "pizza.webp",
    },
    {
        id: "c2",
        name: "Burger",
        imageUrl: "burger.webp",
    },
    {
        id: "c3",
        name: "Salad",
        imageUrl: "salad.webp",
    },
    {
        id: "c4",
        name: "Coffee",
        imageUrl: "coffee.webp",
    },
    {
        id: "c5",
        name: "Desert",
        imageUrl: "desert.webp",
    },
    {
        id: "c6",
        name: "Chicken",
        imageUrl: "chicken.webp",
    },
    {
        id: "c7",
        name: "Kebab",
        imageUrl: "kebab.webp",
    },
];
