import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { restaurants } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { sleep } from "@/lib/utils";

const app = new Hono().get("/popular", async (c) => {
    await sleep(2_000);
    const popularRestaurants = await db
        .select()
        .from(restaurants)
        .where(eq(restaurants.isPopular, true))
        .limit(10);

    return c.json({ data: popularRestaurants });
});

export default app;
