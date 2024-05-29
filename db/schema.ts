import { relations } from "drizzle-orm";
import { pgTable, text, primaryKey, integer, boolean } from "drizzle-orm/pg-core";

// TODO
// restaurant comments/points
// orders/basket

export const restaurants = pgTable("restaurants", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    isPopular: boolean("is_popular").notNull().default(false),
    imageUrl: text("image_url").notNull(),
});

export const restaurantsRelations = relations(restaurants, ({ many }) => ({
    categoriesToRestaurants: many(categoriesToRestaurants),
}));

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    categoriesToRestaurants: many(categoriesToRestaurants),
    foods: many(foods),
}));

export const categoriesToRestaurants = pgTable(
    "categories_to_restaurants",
    {
        categoryId: text("category_id")
            .notNull()
            .references(() => categories.id),
        restaurantId: text("restaurant_id")
            .notNull()
            .references(() => restaurants.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.categoryId, t.restaurantId] }),
    })
);

export const categoriesToRestaurantsRelations = relations(
    categoriesToRestaurants,
    ({ one }) => ({
        restaurant: one(restaurants, {
            fields: [categoriesToRestaurants.restaurantId],
            references: [restaurants.id],
        }),
        category: one(categories, {
            fields: [categoriesToRestaurants.categoryId],
            references: [categories.id],
        }),
    })
);

export const foods = pgTable("foods", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    price: integer("price").notNull(),
    restaurantId: text("restaurant_id")
        .notNull()
        .references(() => restaurants.id),
    categoryId: text("category_id")
        .notNull()
        .references(() => categories.id),
});

export const foodRelations = relations(foods, ({ one }) => ({
    restaurant: one(restaurants, {
        fields: [foods.restaurantId],
        references: [restaurants.id],
    }),
    category: one(categories, {
        fields: [foods.categoryId],
        references: [categories.id],
    }),
}));

//export const orders = pgTable("orders", {
//id: text("id").primaryKey(),
//restaurantId: text("restaurant_id").notNull().references(() => restaurants.id),
//price: integer("price").notNull(),
//userId: text("user_id").notNull(),
//address: text("address").notNull(),
//});
