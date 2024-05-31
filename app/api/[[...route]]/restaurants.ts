import { db } from "@/db/drizzle";
import { count, desc, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { foods, restaurants } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { readCSV, readInt, readString } from "@/lib/hono";
import { RestaurantsQueryFilters } from "@/lib/validations";
import { calculateMetadata } from "@/lib/filters";
//import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

const app = new Hono()
.get("/", async (c) => {
    // Parse and validate filters
    const f = new RestaurantsQueryFilters();
    f.sorting = readString(c, "sorting", "suggested");
    f.categories = readCSV(c, "categories", []);
    f.minOrderAmount = readInt(c, "min_order_amount", 50);
    f.filters.page = readInt(c, "page", 1);
    f.filters.pageSize = readInt(c, "page_size", 10);
    f.filters.sort = readString(c, "sorting", "suggested");

    const result = f.validate();
    if (!result.success) {
        return c.json({ error: result.error.flatten() }, 422);
    }
    return c.json({
        result: result.data,
        categories: f.getCategories(),
        sorting: f.sorting,
        minOrderAmount: f.minOrderAmount,
        limit: f.filters.limit(),
        offset: f.filters.offset(),
        sortDirection: f.filters.sortDirection(),
        sortColumn: f.filters.sortColumn(),
        metadata: calculateMetadata(100, 2, 8),
    });

    //const categoriesArray = (categoriesQs ?? "").split(",");
    //const data = await db
    //.select()
    //.from(foods)
    //.where(inArray(foods.categoryId, categoriesArray));

    return c.json({ data: [] });
})
.get("/popular", async (c) => {
    // https://orm.drizzle.team/learn/guides/count-rows
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

//const resturantsQuerySchema = z.object({
//sorting: z.enum([
//"suggested",
//"food_rating",
//"-food_rating",
//"restaurant_rating",
//"-restaurant_rating",
//]),
//categories: z.string().optional(),
//minOrderAmount: z.string().optional(),
//});
