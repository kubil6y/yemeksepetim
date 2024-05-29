import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { categories, foods } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

const app = new Hono().get("/", async (c) => {
    const data = await db
        .select({
            id: categories.id,
            name: categories.name,
            imageUrl: categories.imageUrl,
            itemCount: sql`count(${foods.id})`.mapWith(Number),
        })
        .from(categories)
        .leftJoin(foods, eq(categories.id, foods.categoryId))
        .groupBy(categories.id)
        .limit(10);

    return c.json({ data });
});

export default app;
