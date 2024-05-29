import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";

const app = new Hono().get("/", async (c) => {
    const data = await db
        .select()
        .from(categories)
        .limit(10);

    return c.json({ data });
});

export default app;
