import { z } from "zod";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { foods, orderItems, orders } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createId } from "@paralleldrive/cuid2";

const createOrderSchema = z.object({
    address: z.string(),
    items: z.array(
        z.object({
            foodId: z.string(),
            amount: z.number(),
        })
    ),
});

const app = new Hono()
.get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
    }
    // No need for pagination
    const data = await db
        .select({
            id: orderItems.id,
            orderId: orders.id,
            name: foods.name,
            description: foods.description,
            imageUrl: foods.imageUrl,
            price: orderItems.price,
            restaurantId: foods.restaurantId,
            createdAt: orders.createdAt,
        })
        .from(orders)
        .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
        .innerJoin(foods, eq(foods.id, orderItems.foodId))
        .where(eq(orders.userId, auth.userId));

    return c.json({ data });
})
.post(
    "/",
    clerkMiddleware(),
    zValidator("json", createOrderSchema),
    async (c) => {
        const auth = getAuth(c);
        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }
        const { address, items } = c.req.valid("json");
        const [order] = await db
            .insert(orders)
            .values({
                id: createId(),
                address,
                userId: auth.userId,
            })
            .returning();

        const orderItemsToBeInserted: (typeof orderItems.$inferSelect)[] =
            [];
        for (const item of items) {
            const [food] = await db
                .select({
                    id: foods.id,
                    price: foods.price,
                })
                .from(foods)
                .where(eq(foods.id, item.foodId));
            orderItemsToBeInserted.push({
                id: createId(),
                price: food.price,
                foodId: food.id,
                amount: item.amount,
                orderId: order.id,
            });
        }
        await db.insert(orderItems).values(orderItemsToBeInserted);
        return c.json({ message: "ok" }, 201);
    }
);

export default app;
