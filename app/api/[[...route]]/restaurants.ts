import { z } from "zod";
import { db } from "@/db/drizzle";
import { count, desc, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { categories, foods, restaurants } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
//import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

const resturantsQuerySchema = z.object({
    sorting: z
        .enum(["suggested", "restaurant_rating", "food_rating"])
        .optional(),
    categories: z.string().optional(),
    minOrderAmount: z.string().optional(),
});

const app = new Hono()
    .get("/", zValidator("query", resturantsQuerySchema), async (c) => {
        console.log(c.req.query("sorting"));
        console.log(c.req.query("min_order_amount"));
        console.log(c.req.query("categories"));
        const {
            sorting,
            categories: categoriesQs,
            minOrderAmount,
        } = c.req.valid("query");

        const categoriesArray = (categoriesQs ?? "").split(",");
        const data = await db
            .select()
            .from(foods)
            .where(inArray(foods.categoryId, categoriesArray));

        return c.json({ data });
    })
    .get("/popular", async (c) => {
        // https://orm.drizzle.team/learn/guides/count-rows
        const popularRestaurants = await db
            .select({
                id: restaurants.id,
                name: restaurants.name,
                imageUrl: restaurants.imageUrl,
                itemCount: count(foods.id),
            })
            .from(restaurants)
            .leftJoin(foods, eq(restaurants.id, foods.restaurantId))
            .where(eq(restaurants.isPopular, true))
            .groupBy(restaurants.id)
            .orderBy(desc(count(foods.id)))
            .limit(10);

        return c.json({ data: popularRestaurants });
    });

export default app;
