import { z } from "zod";
import { db } from "@/db/drizzle";
import { ilike } from "drizzle-orm";
import { Hono } from "hono";
import { restaurants } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { readString } from "@/lib/hono";

const app = new Hono().get(
    "/",
    zValidator(
        "query",
        z.object({
            term: z.string().optional(),
        })
    ),
    async (c) => {
        const term = readString(c, "term", "");
        if (!term) {
            return c.json({ data: [] });
        }
        const searchTerm = `%${term}%`;
        const data = await db
            .select({
                id: restaurants.id,
                name: restaurants.name,
                imageUrl: restaurants.imageUrl,
            })
            .from(restaurants)
            .where(ilike(restaurants.name, searchTerm));
        return c.json({ data });
    }
);
export default app;
