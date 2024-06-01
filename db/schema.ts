import { relations } from "drizzle-orm";
import { pgTable, text, integer, boolean } from "drizzle-orm/pg-core";

export const restaurants = pgTable("restaurants", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    isPopular: boolean("is_popular").notNull().default(false),
    imageUrl: text("image_url").notNull(),
});

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    foods: many(foods),
}));

export const foods = pgTable("foods", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    price: integer("price").notNull(),
    restaurantId: text("restaurant_id")
        .notNull()
        .references(() => restaurants.id, { onDelete: "cascade" }),
    categoryId: text("category_id")
        .notNull()
        .references(() => categories.id, { onDelete: "cascade" }),
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
