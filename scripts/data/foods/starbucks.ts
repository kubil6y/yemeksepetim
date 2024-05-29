import { foods } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const foodsStarbucks: (typeof foods.$inferSelect)[] = [
    {
        id: createId(),
        name: "Iced Caffe Latte",
        description: "Iced milk coffee",
        imageUrl: "foods/starbucks/ice_latte.jpg",
        price: 109,
        restaurantId: "r3",
        categoryId: "c4",
    },

    {
        id: createId(),
        name: "Caffe Americano",
        description: "Espresso with hot water",
        imageUrl: "foods/starbucks/americano.jpg",
        price: 90,
        restaurantId: "r3",
        categoryId: "c4",
    },

    {
        id: createId(),
        name: "Iced Caffe Americano",
        description: "Iced espresso with added water",
        imageUrl: "foods/starbucks/ice_americano.jpg",
        price: 90,
        restaurantId: "r3",
        categoryId: "c4",
    },
    {
        id: createId(),
        name: "Cool Lime Refresha",
        description: "Iced beverage flavored with kumquat lemon",
        imageUrl: "foods/starbucks/cool_lime.jpg",
        price: 137,
        restaurantId: "r3",
        categoryId: "c4",
    },
];
