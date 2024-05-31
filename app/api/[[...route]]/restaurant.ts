import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { restaurants } from "@/db/schema";

const app = new Hono().get(
    "/:id",
    zValidator(
        "param",
        z.object({
            id: z.string().optional(),
        })
    ),
    async (c) => {
        const { id } = c.req.valid("param");
        if (!id) {
            return c.json({ error: "Missing id" }, 400);
        }

        // TODO pagination and also food from restaurants
        const [data] = await db
            .select()
            .from(restaurants)
            .where(eq(restaurants.id, id));

        if (!data) {
            return c.json({ error: "restaurant not found" }, 404);
        }

        return c.json({ data });
    }
);

export default app;
