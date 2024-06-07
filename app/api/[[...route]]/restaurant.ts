import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { count, eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { foods, restaurantReviews, restaurants } from "@/db/schema";
import { calculateMetadata } from "@/lib/filters";
import { RestaurantQueryFilters } from "@/lib/validations";
import { readInt } from "@/lib/hono";

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
            return c.json({ error: "Missing id" }, 400);
        }

        const [foodCount] = await db
            .select({
                count: count(),
            })
            .from(restaurants)
            .innerJoin(foods, eq(restaurants.id, foods.restaurantId))
            .where(eq(restaurants.id, id));

        const [restaurant] = await db
            .select({
                id: restaurants.id,
                name: restaurants.name,
                imageUrl: restaurants.imageUrl,
                reviewCount: sql`COUNT(${restaurantReviews.id})`.mapWith(
                    Number
                ),
                averageScore:
                sql`SUM(ABS(${restaurantReviews.score})) / CAST(COUNT(${restaurantReviews.id}) AS FLOAT)`.mapWith(
                    Number
                ),
            })
            .from(restaurants)
            .leftJoin(
                restaurantReviews,
                eq(restaurants.id, restaurantReviews.restaurantId)
            )
            .where(eq(restaurants.id, id))
            .groupBy(restaurants.id);

        if (!restaurant) {
            return c.json({ error: "not found!" }, 404);
        }

        return c.json({
            data: { restaurant, foodCount: foodCount.count },
        });
    }
)
.get(
    "/:id/menu",
    zValidator(
        "param",
        z.object({
            id: z.string().optional(),
        })
    ),
    zValidator(
        "query",
        z.object({
            page: z.string().optional(),
            page_size: z.string().optional(),
        })
    ),
    async (c) => {
        const { id } = c.req.valid("param");
        if (!id) {
            return c.json({ error: "Missing id" }, 400);
        }

        const foodsPerPage = 6;
        const f = new RestaurantQueryFilters();
        f.filters.page = readInt(c, "page", 1);
        f.filters.pageSize = readInt(c, "page_size", foodsPerPage);

        const result = f.validate();
        if (!result.success) {
            return c.json({ error: result.error.flatten() }, 422);
        }

        const [totalRecords] = await db
            .select({ count: count() })
            .from(foods)
            .leftJoin(restaurants, eq(foods.restaurantId, restaurants.id))
            .where(eq(foods.restaurantId, id));

        const data = await db
            .select({
                id: foods.id,
                name: foods.name,
                description: foods.description,
                imageUrl: foods.imageUrl,
                price: foods.price,
                restaurantId: restaurants.id,
                restaurantName: restaurants.name,
            })
            .from(foods)
            .innerJoin(restaurants, eq(foods.restaurantId, restaurants.id))
            .where(eq(restaurants.id, id))
            .limit(f.filters.limit())
            .offset(f.filters.offset());

        const metadata = calculateMetadata(
            totalRecords.count,
            f.filters.page,
            f.filters.pageSize
        );

        return c.json({ metadata, data });
    }
);

export default app;
