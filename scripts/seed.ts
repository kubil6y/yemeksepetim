import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, restaurants } from "@/db/schema";
import { restaurantsData } from "./data/restaurants";
import { categoriesData } from "./data/categories";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { logger: true });

async function main() {
    console.log("Seeding started...");

    console.log("Cleaning up databases...");
    //await db.delete(restaurants).execute();
    //await db.delete(categories).execute();
    console.log("Clean up completed!");

    //await db.insert(restaurants).values(restaurantsData);
    //await db.insert(categories).values(categoriesData);
    console.log("Seeding completed!");
}

main();
