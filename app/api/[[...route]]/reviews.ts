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
import { eq, count, desc } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { formatName } from "@/lib/utils";

const app = new Hono()
.get(
    "/:id",
    zValidator(
        "param",
        z.object({
            id: z.string().optional(),
        })
    ),
    async (c) => {
        // no auth required
        // cba pagination
        // return -> review count, score average, all reviews

        const { id } = c.req.valid("param");
        if (!id) {
            return c.json({ error: "missing restaurant id" }, 400);
        }

        const data = await db
            .select({
                id: restaurantReviews.id,
                text: restaurantReviews.text,
                username: restaurantReviews.username,
                userId: restaurantReviews.userId,
                score: restaurantReviews.score,
                createdAt: restaurantReviews.createdAt,
            })
            .from(restaurants)
            .innerJoin(
                restaurantReviews,
                eq(restaurants.id, restaurantReviews.restaurantId)
            )
            .where(eq(restaurants.id, id))
            .orderBy(desc(restaurantReviews.createdAt));

        return c.json({ data });
    }
)
.post(
    "/:id",
    clerkMiddleware(),
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
            restaurantId: true,
        })
    ),
    async (c) => {
        const { id } = c.req.valid("param");
        if (!id) {
            return c.json({ error: "missing restaurant id" }, 400);
        }
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const user = await clerkClient.users.getUser(auth.userId);
        const username: string = formatName(
            user.firstName,
            user.lastName,
            user.username
        );

        const { text, score, restaurantId } = c.req.valid("json");

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
                username,
                score,
                text,
                restaurantId,
                userId: auth.userId,
                createdAt: new Date(),
            })
            .returning();

        return c.json({ data });
    }
);

export default app;
