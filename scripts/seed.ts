import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, foods, restaurants } from "@/db/schema";
import { restaurantsData } from "./data/restaurants";
import { categoriesData } from "./data/categories";
import { foodsMcdonalds } from "./data/foods/mcdonalds";
import { foodsStarbucks } from "./data/foods/starbucks";
import { foodsLittleCaesars } from "./data/foods/litte-caesars";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { logger: true });

function generateFoods(): (typeof foods.$inferSelect)[] {
    return [...foodsMcdonalds, ...foodsStarbucks, ...foodsLittleCaesars];
}

async function main() {
    console.log("Seeding started...");

    console.log("Cleaning up databases...");
    await db.delete(categories).execute();
    await db.delete(restaurants).execute();
    await db.delete(foods).execute();
    console.log("Clean up completed!");

    await db.insert(restaurants).values(restaurantsData);
    await db.insert(categories).values(categoriesData);
    await db.insert(foods).values(generateFoods());

    console.log("Seeding completed!");
}

main();
