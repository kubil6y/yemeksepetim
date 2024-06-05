import {
    pgTable,
    text,
    integer,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

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

export const orderItems = pgTable("order_items", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    price: integer("price").notNull(), // price at the time
    foodId: text("food_id")
        .notNull()
        .references(() => foods.id, { onDelete: "cascade" }),
    orderId: text("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
});

export const orderItemRelations = relations(orderItems, ({ one }) => ({
    food: one(foods, {
        fields: [orderItems.id],
        references: [foods.id],
    }),
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
}));

export const orders = pgTable("orders", {
    id: text("id").primaryKey(),
    address: text("address").notNull(),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const orderRelations = relations(orders, ({ many }) => ({
    orderItems: many(orderItems),
}));

export const restaurantReviews = pgTable("restaurant_reviews", {
    id: text("id").primaryKey(),
    text: text("text").notNull(),
    score: integer("score").notNull(),
    createdAt: timestamp("date", { mode: "date" }).notNull().defaultNow(),
    username: text("user_name").notNull(),
    restaurantId: text("restaurant_id")
        .notNull()
        .references(() => restaurants.id, { onDelete: "cascade" }),
});

export const createReviewSchema = createInsertSchema(restaurantReviews);

export const restaurantReviewsRelations = relations(
    restaurantReviews,
    ({ one }) => ({
        restaurant: one(restaurants, {
            fields: [restaurantReviews.restaurantId],
            references: [restaurants.id],
        }),
    })
);
