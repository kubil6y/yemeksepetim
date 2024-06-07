import {
    restaurants,
    restaurantReviews,
    createReviewSchema,
    restaurantReviewRatings,
} from "@/db/schema";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";
import { eq, desc, and } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { formatName } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

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
            const { id } = c.req.valid("param");
            if (!id) {
                return c.json({ error: "missing restaurant id" }, 400);
            }

            const data = await db.query.restaurantReviews.findMany({
                where: (restaurantReviews, { eq }) =>
                    eq(restaurantReviews.restaurantId, id),
                with: {
                    ratings: {
                        columns: {
                            id: true,
                            userId: true,
                        },
                    },
                },
                orderBy: desc(restaurantReviews.createdAt),
            });

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
    )
    .post(
        "/like/:reviewId",
        clerkMiddleware(),
        zValidator(
            "param",
            z.object({
                reviewId: z.string().optional(),
            })
        ),
        zValidator(
            "json",
            z.object({
                action: z.enum(["like", "dislike"]),
                ratingId: z.string().optional(),
            })
        ),
        async (c) => {
            const { reviewId } = c.req.valid("param");
            if (!reviewId) {
                return c.json({ error: "missing review id" }, 400);
            }
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }
            const { action, ratingId } = c.req.valid("json");

            const [existingRating] = await db
                .select()
                .from(restaurantReviewRatings)
                .where(
                    and(
                        eq(
                            restaurantReviewRatings.restaurantReviewId,
                            reviewId
                        ),
                        eq(restaurantReviewRatings.userId, auth.userId)
                    )
                );

            if (action === "like") {
                if (!existingRating) {
                    await db
                        .insert(restaurantReviewRatings)
                        .values({
                            id: createId(),
                            userId: auth.userId,
                            restaurantReviewId: reviewId,
                        });
                    return c.json(null);
                }
            } else {
                if (existingRating) {
                    await db
                        .delete(restaurantReviewRatings)
                        .where(
                            and(
                                eq(restaurantReviewRatings.id, ratingId ?? ""),
                                eq(restaurantReviewRatings.userId, auth.userId)
                            )
                        );
                    return c.json(null, 200);
                }
            }
            return c.json(null);
        }
    );

export default app;
