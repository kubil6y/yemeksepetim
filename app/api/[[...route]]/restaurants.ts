import { z } from "zod";
import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { foods, restaurants } from "@/db/schema";
import { calculateMetadata } from "@/lib/filters";
import { RestaurantsQueryFilters } from "@/lib/validations";
import { readCSV, readInt, readString } from "@/lib/hono";
import { count, desc, eq, inArray, and, gte } from "drizzle-orm";

const app = new Hono()
.get(
    "/",
    zValidator(
        "query",
        z.object({
            page: z.string().optional(),
            page_size: z.string().optional(),
            sorting: z.string().optional(),
            min_order_amount: z.string().optional(),
            categories: z.string().optional(),
        })
    ),
    async (c) => {
        // Parse and validate filters
        const foodsPerPage = 6;
        const f = new RestaurantsQueryFilters();
        f.sorting = readString(c, "sorting", "suggested");
        f.categories = readCSV(c, "categories", []);
        f.minOrderAmount = readInt(c, "min_order_amount", 50);
        f.filters.page = readInt(c, "page", 1);
        f.filters.pageSize = readInt(c, "page_size", foodsPerPage);
        f.filters.sort = readString(c, "sorting", "suggested");

        const result = f.validate();
        if (!result.success) {
            return c.json({ error: result.error.flatten() }, 422);
        }

        const [totalRecords] = await db
            .select({ count: count() })
            .from(foods)
            .leftJoin(restaurants, eq(foods.restaurantId, restaurants.id))
            .where(
                and(
                    f.getCategories()
                        ? inArray(foods.categoryId, f.getCategories()!)
                        : undefined,
                    gte(foods.price, f.minOrderAmount)
                )
            );

        // TODO missing orderBy rating stuff (requires extra tables)
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
            .where(
                and(
                    f.getCategories()
                        ? inArray(foods.categoryId, f.getCategories()!)
                        : undefined,
                    gte(foods.price, f.minOrderAmount)
                )
            )
            .limit(f.filters.limit())
            .offset(f.filters.offset());

        const metadata = calculateMetadata(
            totalRecords.count,
            f.filters.page,
            f.filters.pageSize
        );
        return c.json({ metadata, data });
    }
)
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
});

export default app;
