import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { restaurants } from "@/db/schema";
import { restaurantsData } from "./data/restaurants-data";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
    console.log("Seeding started...");

    console.log("Cleaning up databases...");
    await db.delete(restaurants).execute();
    console.log("Clean up completed!");

    await db.insert(restaurants).values(restaurantsData);
    console.log("Seeding completed!");
}

main();
