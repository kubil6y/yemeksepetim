import {
    restaurants,
    restaurantReviews,
    createReviewSchema,
} from "@/db/schema";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";

const app = new Hono().get(
    "/:id",
    zValidator(
        "param",
        z.object({
            id: z.string().optional(),
        })
    ),
    zValidator(
        "json",
        createReviewSchema.pick({
            text: true,
            score: true,
            username: true,
            restaurantId: true,
        })
    ),
    clerkMiddleware(),
    async (c) => {
        const { id } = c.req.valid("param");
        if (!id) {
            return c.json({ error: "missing restaurant id" }, 400);
        }
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const { text, score, username, restaurantId } = c.req.valid("json");

        const [restaurant] = await db
            .select()
            .from(restaurants)
            .where(eq(restaurants.id, restaurantId));
        if (!restaurant) {
            return c.json({ error: "Restaurant not found" }, 404);
        }

        const [data] = await db
            .insert(restaurantReviews)
            .values({
                id: createId(),
                username: username,
                restaurantId,
                score,
                text,
                createdAt: new Date(),
            })
            .returning();

        return c.json({ data });
    }
);
export default app;
