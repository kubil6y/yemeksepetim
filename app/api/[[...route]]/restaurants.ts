import { db } from "@/db/drizzle";
import { count, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { foods, restaurants } from "@/db/schema";
//import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

const app = new Hono()
.get("/popular", async (c) => {
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
})

export default app;
