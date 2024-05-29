import { foods } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const foodsLittleCaesars: (typeof foods.$inferSelect)[] = [
    {
        id: createId(),
        name: "Chicken Bites",
        description: "Specially coated crispy chicken balls baked in the oven",
        imageUrl: "foods/pizza/chicken_bites.jpg",
        price: 55,
        restaurantId: "r2",
        categoryId: "c1",
    },

    {
        id: createId(),
        name: "Medium Pizza",
        description:
            "Valid for Medium Opportunity group pizza. Classic group pizzas can be obtained for an additional 15 TL, Extra group pizzas for an additional 25 TL, Premium group pizzas for an additional 35 TL, and Gourmet group pizzas for an additional 45 TL.",
        imageUrl: "foods/pizza/chicken_bites.jpg",
        price: 210,
        restaurantId: "r2",
        categoryId: "c1",
    },

    {
        id: createId(),
        name: "Large Pizza",
        description:
            "Valid for Large Opportunity group pizza. Classic group pizzas can be obtained for an additional 20 TL, Extra group pizzas for an additional 30 TL, Premium group pizzas for an additional 40 TL, and Gourmet group pizzas for an additional 50 TL.",
        imageUrl: "foods/pizza/chicken_bites.jpg",
        price: 285,
        restaurantId: "r2",
        categoryId: "c1",
    },
];
